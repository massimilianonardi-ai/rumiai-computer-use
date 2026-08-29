"use strict";

const fs=require("node:fs");
const path=require("node:path");

const ROOT=path.resolve(__dirname,"..");
const CONTRACT_DIR=process.env.RUMIAI_VISUAL_FALLBACK_CONTRACT_DIR || path.join(ROOT,"visual-fallback-contracts");

function normalizeText(value){return String(value||"").trim();}
function normalizeApplication(value){return normalizeText(value).toLowerCase();}

function normalizeContract(raw,source="unknown"){
  if(!raw||typeof raw!=="object"||Array.isArray(raw))return null;
  const id=normalizeText(raw.id);
  const application=normalizeText(raw.application);
  const intent=normalizeText(raw.intent||"OPEN");
  const target=normalizeText(raw.target);
  const postcondition=normalizeText(raw.postcondition);
  if(!id||!application||intent!=="OPEN"||!target||!postcondition)return null;

  const providerRequest=raw.providerRequest&&typeof raw.providerRequest==="object"
    ? raw.providerRequest
    : {};
  const capabilities=Array.isArray(providerRequest.capabilities)
    ? [...new Set(providerRequest.capabilities.map(normalizeText).filter(Boolean))]
    : ["text-region"];
  if(!capabilities.length)return null;
  const locality=normalizeText(providerRequest.locality||"local");
  if(!["local","remote","unknown","any"].includes(locality))return null;

  return Object.freeze({
    id,
    application,
    intent:"OPEN",
    target,
    postcondition,
    providerRequest:Object.freeze({
      capabilities:Object.freeze(capabilities),
      locality,
      ...(providerRequest.providerId?{providerId:normalizeText(providerRequest.providerId)}:{}),
    }),
    source,
  });
}

function loadVisualFallbackContracts(options={}){
  const dir=options.directory||CONTRACT_DIR;
  if(!fs.existsSync(dir))return [];
  return fs.readdirSync(dir)
    .filter(name=>name.endsWith(".json"))
    .sort()
    .map(name=>{
      const full=path.join(dir,name);
      let parsed;
      try{parsed=JSON.parse(fs.readFileSync(full,"utf8"));}
      catch(error){throw new Error(`Invalid visual fallback contract ${name}: ${error.message}`);}
      const normalized=normalizeContract(parsed,name);
      if(!normalized)throw new Error(`Invalid visual fallback contract ${name}: id, application, OPEN target and postcondition are required`);
      return normalized;
    });
}

function contractToExecutionContract(contract){
  return {
    intent:"OPEN",
    targetQuery:{kind:"text",match:"exact",text:contract.target},
    actionRequest:{kind:"pointer-click",button:"left",display:"primary"},
    policy:{allowVisualFallback:true},
    postcondition:{kind:"text",match:"exact",text:contract.postcondition},
    providerRequest:{
      capabilities:[...contract.providerRequest.capabilities],
      locality:contract.providerRequest.locality,
      ...(contract.providerRequest.providerId?{providerId:contract.providerRequest.providerId}:{}),
    },
    callerContract:{
      id:contract.id,
      application:contract.application,
      source:contract.source,
    },
  };
}

function selectVisualFallbackCallerContract(intent,state={},options={}){
  if(intent?.intent!=="OPEN")return {ok:true,state:"NO_VISUAL_FALLBACK_CONTRACT",contract:null};
  const target=normalizeText(intent.target);
  const application=normalizeApplication(intent.app||state.currentApp);
  if(!target||!application)return {ok:true,state:"NO_VISUAL_FALLBACK_CONTRACT",contract:null};

  const contracts=Array.isArray(options.contracts)
    ? options.contracts.map((item,index)=>normalizeContract(item,`injected:${index}`)).filter(Boolean)
    : loadVisualFallbackContracts(options);
  const matches=contracts.filter(contract=>
    normalizeApplication(contract.application)===application &&
    contract.intent==="OPEN" &&
    contract.target===target
  );

  if(matches.length===0)return {ok:true,state:"NO_VISUAL_FALLBACK_CONTRACT",contract:null};
  if(matches.length>1){
    return {
      ok:false,
      state:"VISUAL_FALLBACK_CONTRACT_AMBIGUOUS",
      error:"VISUAL_FALLBACK_CONTRACT_AMBIGUOUS",
      recoveryPolicy:"NONE",
      matches:matches.map(contract=>contract.id).sort(),
    };
  }

  return {
    ok:true,
    state:"VISUAL_FALLBACK_CONTRACT_SELECTED",
    contract:contractToExecutionContract(matches[0]),
    descriptor:{
      id:matches[0].id,
      application:matches[0].application,
      target:matches[0].target,
      source:matches[0].source,
    },
  };
}

module.exports={
  CONTRACT_DIR,
  normalizeContract,
  loadVisualFallbackContracts,
  contractToExecutionContract,
  selectVisualFallbackCallerContract,
};
