"use strict";

const {
  selectPulsarUtf8VisualFallbackContractsForPlan,
}=require("./pulsar-encoding-selector-visual-contract");

const PULSAR_DOCUMENT_CALLER_CONTEXT_KIND="pulsar-document";

function failure(error,detail=null){
  return {
    ok:false,
    state:error,
    error,
    ...(detail?{detail}:{}),
    recoveryPolicy:"NONE",
  };
}

function normalizeCallerContext(raw){
  if(raw==null)return {ok:true,state:"NO_VISUAL_FALLBACK_CALLER_CONTEXT",context:null};
  if(!raw||typeof raw!=="object"||Array.isArray(raw)){
    return failure("VISUAL_FALLBACK_CALLER_CONTEXT_INVALID");
  }

  const kind=String(raw.kind||"").trim();
  if(!kind)return failure("VISUAL_FALLBACK_CALLER_CONTEXT_INVALID");
  if(kind!==PULSAR_DOCUMENT_CALLER_CONTEXT_KIND){
    return failure("VISUAL_FALLBACK_CALLER_CONTEXT_UNSUPPORTED");
  }

  const documentPath=String(raw.documentPath||"").trim();
  if(!documentPath)return failure("VISUAL_FALLBACK_CALLER_CONTEXT_INVALID");

  return {
    ok:true,
    state:"VISUAL_FALLBACK_CALLER_CONTEXT_NORMALIZED",
    context:Object.freeze({
      kind:PULSAR_DOCUMENT_CALLER_CONTEXT_KIND,
      documentPath,
    }),
  };
}

function resolveVisualFallbackContractsFromCallerContext(plan,rawContext,options={}){
  if(!Array.isArray(plan))return failure("INVALID_SEMANTIC_PLAN");

  const normalized=normalizeCallerContext(rawContext);
  if(!normalized.ok)return normalized;
  if(!normalized.context){
    return {
      ok:true,
      state:"NO_VISUAL_FALLBACK_CALLER_CONTEXT",
      contracts:[],
      descriptors:[],
      callerContext:null,
    };
  }

  const selected=selectPulsarUtf8VisualFallbackContractsForPlan(plan,{
    documentPath:normalized.context.documentPath,
    initialApplication:options.initialApplication,
  });
  if(!selected.ok)return selected;

  return {
    ...selected,
    callerContext:Object.freeze({
      kind:PULSAR_DOCUMENT_CALLER_CONTEXT_KIND,
      application:"Pulsar",
      surfaceBinding:"caller-document-path",
    }),
  };
}

module.exports={
  PULSAR_DOCUMENT_CALLER_CONTEXT_KIND,
  normalizeCallerContext,
  resolveVisualFallbackContractsFromCallerContext,
};
