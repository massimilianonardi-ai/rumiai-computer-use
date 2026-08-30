#!/usr/bin/env node
"use strict";

const fs=require("node:fs");
const {
  TASK_RESOURCE_CONTEXT_VERSION,
  normalizeTaskResourceContext,
}=require("./task-resource-context");

const TASK_INVOCATION_VERSION=1;
const MAX_TASK_CHARS=65536;
const MAX_STDIN_BYTES=1024*1024;
const ALLOWED_FIELDS=new Set(["version","task","resources"]);

function failure(error,detail=null){
  return {
    ok:false,
    state:error,
    error,
    ...(detail?{detail}:{}),
    recoveryPolicy:"NONE",
  };
}

function normalizeTaskInvocation(raw){
  if(!raw||typeof raw!=="object"||Array.isArray(raw)){
    return failure("TASK_INVOCATION_INVALID");
  }

  for(const key of Object.keys(raw)){
    if(!ALLOWED_FIELDS.has(key)){
      return failure("TASK_INVOCATION_FIELD_UNSUPPORTED");
    }
  }

  if(Number(raw.version)!==TASK_INVOCATION_VERSION){
    return failure("TASK_INVOCATION_VERSION_UNSUPPORTED");
  }

  if(typeof raw.task!=="string"||!raw.task.trim()||raw.task.length>MAX_TASK_CHARS){
    return failure("TASK_INVOCATION_TASK_INVALID");
  }

  if(!Array.isArray(raw.resources)){
    return failure("TASK_INVOCATION_RESOURCES_INVALID");
  }

  const resourceContext=normalizeTaskResourceContext({
    version:TASK_RESOURCE_CONTEXT_VERSION,
    resources:raw.resources,
  });
  if(!resourceContext.ok)return resourceContext;

  return {
    ok:true,
    state:"TASK_INVOCATION_NORMALIZED",
    invocation:Object.freeze({
      version:TASK_INVOCATION_VERSION,
      task:raw.task,
      taskResourceContext:resourceContext.context,
    }),
  };
}

async function runTaskInvocation(raw,{runTask}={}){
  const normalized=normalizeTaskInvocation(raw);
  if(!normalized.ok)return normalized;

  const runTaskFn=typeof runTask==="function"
    ? runTask
    : require("./agent-loop").runTask;

  const result=await runTaskFn(normalized.invocation.task,{
    taskResourceContext:normalized.invocation.taskResourceContext,
  });

  return {
    ok:result?.ok===true,
    state:result?.ok===true?"TASK_INVOCATION_COMPLETED":"TASK_INVOCATION_FAILED",
    result,
  };
}

function readInvocationFromStdin(){
  const input=fs.readFileSync(0,{encoding:"utf8"});
  if(Buffer.byteLength(input,"utf8")>MAX_STDIN_BYTES){
    return failure("TASK_INVOCATION_INPUT_TOO_LARGE");
  }
  if(!input.trim())return failure("TASK_INVOCATION_INPUT_EMPTY");

  let parsed;
  try{parsed=JSON.parse(input);}catch{return failure("TASK_INVOCATION_JSON_INVALID");}
  return {ok:true,state:"TASK_INVOCATION_INPUT_PARSED",value:parsed};
}

async function main(){
  const read=readInvocationFromStdin();
  if(!read.ok){
    console.error(read.error);
    process.exitCode=2;
    return;
  }

  let executed;
  try{
    executed=await runTaskInvocation(read.value);
  }catch(error){
    console.error(`TASK_INVOCATION_EXECUTION_EXCEPTION: ${error.message}`);
    process.exitCode=1;
    return;
  }

  if(!executed.ok){
    console.error(executed.error||executed.state||"TASK_INVOCATION_FAILED");
    process.exitCode=1;
    return;
  }

  process.exitCode=0;
}

if(require.main===module){
  main().catch(error=>{
    console.error(error.stack||error.message);
    process.exit(1);
  });
}

module.exports={
  TASK_INVOCATION_VERSION,
  MAX_TASK_CHARS,
  MAX_STDIN_BYTES,
  normalizeTaskInvocation,
  runTaskInvocation,
  readInvocationFromStdin,
};
