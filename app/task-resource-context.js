"use strict";

const path=require("node:path");
const {
  PULSAR_DOCUMENT_CALLER_CONTEXT_KIND,
}=require("./visual-fallback-caller-context");

const TASK_RESOURCE_CONTEXT_VERSION=1;
const FILE_RESOURCE_KIND="file";
const CURRENT_DOCUMENT_ROLE="current-document";
const MAX_TASK_RESOURCES=32;

function failure(error,detail=null){
  return {
    ok:false,
    state:error,
    error,
    ...(detail?{detail}:{}),
    recoveryPolicy:"NONE",
  };
}

function normalizeTaskResourceContext(raw){
  if(raw==null){
    return {
      ok:true,
      state:"NO_TASK_RESOURCE_CONTEXT",
      context:null,
    };
  }
  if(!raw||typeof raw!=="object"||Array.isArray(raw)){
    return failure("TASK_RESOURCE_CONTEXT_INVALID");
  }
  if(Number(raw.version)!==TASK_RESOURCE_CONTEXT_VERSION){
    return failure("TASK_RESOURCE_CONTEXT_VERSION_UNSUPPORTED");
  }
  if(!Array.isArray(raw.resources)){
    return failure("TASK_RESOURCE_CONTEXT_INVALID");
  }
  if(raw.resources.length>MAX_TASK_RESOURCES){
    return failure("TASK_RESOURCE_CONTEXT_TOO_LARGE");
  }

  const resources=[];
  for(const candidate of raw.resources){
    if(!candidate||typeof candidate!=="object"||Array.isArray(candidate)){
      return failure("TASK_RESOURCE_INVALID");
    }
    const kind=String(candidate.kind||"").trim();
    const role=String(candidate.role||"").trim();
    const application=String(candidate.application||"").trim();
    const resourcePath=String(candidate.path||"").trim();

    if(kind!==FILE_RESOURCE_KIND||role!==CURRENT_DOCUMENT_ROLE){
      return failure("TASK_RESOURCE_UNSUPPORTED");
    }
    if(!application||!resourcePath||resourcePath.includes("\0")||!path.isAbsolute(resourcePath)){
      return failure("TASK_RESOURCE_INVALID");
    }

    resources.push(Object.freeze({
      kind:FILE_RESOURCE_KIND,
      role:CURRENT_DOCUMENT_ROLE,
      application,
      path:resourcePath,
    }));
  }

  return {
    ok:true,
    state:resources.length?"TASK_RESOURCE_CONTEXT_NORMALIZED":"TASK_RESOURCE_CONTEXT_EMPTY",
    context:Object.freeze({
      version:TASK_RESOURCE_CONTEXT_VERSION,
      resources:Object.freeze(resources),
    }),
  };
}

function resolveCurrentDocumentResource(rawContext,{application}={}){
  const normalized=normalizeTaskResourceContext(rawContext);
  if(!normalized.ok)return normalized;
  if(!normalized.context){
    return {
      ok:true,
      state:"NO_TASK_RESOURCE_CONTEXT",
      resource:null,
    };
  }

  const requestedApplication=String(application||"").trim();
  const matches=normalized.context.resources.filter(resource=>
    resource.role===CURRENT_DOCUMENT_ROLE&&
    (!requestedApplication||resource.application===requestedApplication)
  );

  if(matches.length>1){
    return failure("CURRENT_DOCUMENT_RESOURCE_AMBIGUOUS");
  }
  if(matches.length===0){
    return {
      ok:true,
      state:"NO_CURRENT_DOCUMENT_RESOURCE",
      resource:null,
    };
  }

  return {
    ok:true,
    state:"CURRENT_DOCUMENT_RESOURCE_RESOLVED",
    resource:matches[0],
  };
}

function derivePulsarVisualFallbackCallerContextFromTaskResources(rawContext){
  const resolved=resolveCurrentDocumentResource(rawContext,{application:"Pulsar"});
  if(!resolved.ok)return resolved;
  if(!resolved.resource){
    return {
      ok:true,
      state:"NO_PULSAR_DOCUMENT_RESOURCE",
      callerContext:null,
    };
  }

  return {
    ok:true,
    state:"PULSAR_DOCUMENT_CALLER_CONTEXT_DERIVED",
    callerContext:Object.freeze({
      kind:PULSAR_DOCUMENT_CALLER_CONTEXT_KIND,
      documentPath:resolved.resource.path,
    }),
    resource:Object.freeze({
      kind:resolved.resource.kind,
      role:resolved.resource.role,
      application:resolved.resource.application,
    }),
  };
}

module.exports={
  TASK_RESOURCE_CONTEXT_VERSION,
  FILE_RESOURCE_KIND,
  CURRENT_DOCUMENT_ROLE,
  MAX_TASK_RESOURCES,
  normalizeTaskResourceContext,
  resolveCurrentDocumentResource,
  derivePulsarVisualFallbackCallerContextFromTaskResources,
};
