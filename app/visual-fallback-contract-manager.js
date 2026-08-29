"use strict";

const fs=require("node:fs");
const path=require("node:path");

const ROOT=path.resolve(__dirname,"..");
const CONTRACT_DIR=process.env.RUMIAI_VISUAL_FALLBACK_CONTRACT_DIR || path.join(ROOT,"visual-fallback-contracts");

function normalizeText(value){return String(value||"").trim();}
function normalizeApplication(value){return normalizeText(value).toLowerCase();}

function normalizeSurfacePrecondition(raw){
  if(raw==null)return null;
  if(!raw||typeof raw!=="object"||Array.isArray(raw))return undefined;
  const kind=normalizeText(raw.kind);
  const match=normalizeText(raw.match);
  const text=normalizeText(raw.text);
  const role=normalizeText(raw.role);
  if(match!=="exact"||!text)return undefined;
  if(kind==="semantic-text"){
    return Object.freeze({kind:"semantic-text",match:"exact",text,...(role?{role}:{})});
  }
  if(kind==="window-title"){
    if(role)return undefined;
    return Object.freeze({kind:"window-title",match:"exact",text});
  }
  return undefined;
}

function normalizeContract(raw,source="unknown"){
  if(!raw||typeof raw!=="object"||Array.isArray(raw))return null;
  const id=normalizeText(raw.id);
  const application=normalizeText(raw.application);
  const intent=normalizeText(raw.intent||"OPEN");
  const target=normalizeText(raw.target);
  const postcondition=normalizeText(raw.postcondition);
  const scopeId=normalizeText(raw.scopeId);
  const surfacePrecondition=normalizeSurfacePrecondition(raw.surfacePrecondition);
  if(!id||!application||intent!=="OPEN"||!target||!postcondition)return null;
  if(raw.surfacePrecondition!=null&&surfacePrecondition===undefined)return null;

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
    ...(scopeId?{scopeId}:{}),
    ...(surfacePrecondition?{surfacePrecondition}:{}),
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
      if(!normalized)throw new Error(`Invalid visual fallback contract ${name}: contract shape is not supported`);
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
    ...(contract.surfacePrecondition?{surfacePrecondition:{...contract.surfacePrecondition}}:{}),
    providerRequest:{
      capabilities:[...contract.providerRequest.capabilities],
      locality:contract.providerRequest.locality,
      ...(contract.providerRequest.providerId?{providerId:contract.providerRequest.providerId}:{}),
    },
    callerContract:{
      id:contract.id,
      application:contract.application,
      ...(contract.scopeId?{scopeId:contract.scopeId}:{}),
      source:contract.source,
    },
  };
}

function selectVisualFallbackCallerContract(intent,state={},options={}){
  if(intent?.intent!=="OPEN")return {ok:true,state:"NO_VISUAL_FALLBACK_CONTRACT",contract:null};
  const target=normalizeText(intent.target);
  const application=normalizeApplication(intent.app||state.currentApp);
  if(!target||!application)return {ok:true,state:"NO_VISUAL_FALLBACK_CONTRACT",contract:null};

  const requestedScopeId=normalizeText(options.scopeId);
  const requireScope=options.requireScope===true;
  if(requireScope&&!requestedScopeId){
    return {
      ok:false,
      state:"VISUAL_FALLBACK_SCOPE_REQUIRED",
      error:"VISUAL_FALLBACK_SCOPE_REQUIRED",
      recoveryPolicy:"NONE",
    };
  }

  const contracts=Array.isArray(options.contracts)
    ? options.contracts.map((item,index)=>normalizeContract(item,`injected:${index}`)).filter(Boolean)
    : loadVisualFallbackContracts(options);
  const matches=contracts.filter(contract=>{
    const baseMatch=
      normalizeApplication(contract.application)===application &&
      contract.intent==="OPEN" &&
      contract.target===target;
    if(!baseMatch)return false;
    if(contract.scopeId)return Boolean(requestedScopeId&&contract.scopeId===requestedScopeId);
    return !requireScope;
  });

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
      ...(matches[0].scopeId?{scopeId:matches[0].scopeId}:{}),
      ...(matches[0].surfacePrecondition?{surfacePreconditionKind:matches[0].surfacePrecondition.kind}:{}),
      source:matches[0].source,
    },
  };
}

function selectScopedVisualFallbackContractsForPlan(plan,options={}){
  if(!Array.isArray(plan)){
    return {ok:false,state:"INVALID_SEMANTIC_PLAN",error:"INVALID_SEMANTIC_PLAN",recoveryPolicy:"NONE"};
  }
  const scopeId=normalizeText(options.scopeId);
  if(!scopeId){
    return {ok:false,state:"VISUAL_FALLBACK_SCOPE_REQUIRED",error:"VISUAL_FALLBACK_SCOPE_REQUIRED",recoveryPolicy:"NONE"};
  }

  let currentApp=normalizeText(options.initialApplication);
  const selected=[];
  const descriptors=[];
  const selectedTargets=new Map();

  for(const step of plan){
    if(step?.intent==="ACTIVATE_APP"&&normalizeText(step.app)){
      currentApp=normalizeText(step.app);
      continue;
    }
    if(step?.intent!=="OPEN")continue;

    const selection=selectVisualFallbackCallerContract(
      step,
      {currentApp},
      {...options,scopeId,requireScope:true}
    );
    if(!selection.ok)return selection;
    if(selection.state!=="VISUAL_FALLBACK_CONTRACT_SELECTED")continue;

    const target=normalizeText(step.target);
    const prior=selectedTargets.get(target);
    if(prior&&prior!==selection.descriptor.id){
      return {
        ok:false,
        state:"VISUAL_FALLBACK_PLAN_TARGET_AMBIGUOUS",
        error:"VISUAL_FALLBACK_PLAN_TARGET_AMBIGUOUS",
        recoveryPolicy:"NONE",
        target,
        matches:[prior,selection.descriptor.id].sort(),
      };
    }
    if(prior===selection.descriptor.id)continue;

    selectedTargets.set(target,selection.descriptor.id);
    selected.push(selection.contract);
    descriptors.push(selection.descriptor);
  }

  return {
    ok:true,
    state:selected.length?"VISUAL_FALLBACK_PLAN_CONTRACTS_SELECTED":"NO_VISUAL_FALLBACK_CONTRACT",
    scopeId,
    contracts:selected,
    descriptors,
  };
}

module.exports={
  CONTRACT_DIR,
  normalizeSurfacePrecondition,
  normalizeContract,
  loadVisualFallbackContracts,
  contractToExecutionContract,
  selectVisualFallbackCallerContract,
  selectScopedVisualFallbackContractsForPlan,
};
