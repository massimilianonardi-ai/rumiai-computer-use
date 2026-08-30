"use strict";

const path=require("node:path");
const {
  selectScopedVisualFallbackContractsForPlan,
}=require("./visual-fallback-contract-manager");

const PULSAR_ENCODING_SELECTOR_SCOPE_ID="pulsar.encoding-selector.current-document.v1";
const PULSAR_UTF8_CONTRACT_ID="pulsar.encoding-selector.open.utf8.v1";
const PULSAR_APPLICATION="Pulsar";
const PULSAR_UTF8_TARGET="UTF-8";
const PULSAR_ENCODING_SELECTOR_POSTCONDITION="UTF-16 LE";

function failure(error,detail=null){
  return {
    ok:false,
    state:error,
    error,
    ...(detail?{detail}:{}),
    recoveryPolicy:"NONE",
  };
}

function canonicalizeMacosCallerPath(value){
  const raw=String(value||"").trim();
  if(!raw||!path.isAbsolute(raw))return null;
  const normalized=path.normalize(raw);
  if(normalized==="/var")return "/private/var";
  if(normalized.startsWith("/var/"))return `/private${normalized}`;
  return normalized;
}

function derivePulsarDocumentWindowTitle(documentPath){
  const canonicalDocumentPath=canonicalizeMacosCallerPath(documentPath);
  if(!canonicalDocumentPath)return failure("PULSAR_DOCUMENT_PATH_INVALID");

  const fileName=path.basename(canonicalDocumentPath);
  const parentPath=path.dirname(canonicalDocumentPath);
  if(!fileName||fileName==="/"||fileName==="."||fileName===".."){
    return failure("PULSAR_DOCUMENT_PATH_INVALID");
  }

  return {
    ok:true,
    state:"PULSAR_DOCUMENT_SURFACE_DERIVED",
    document:{
      fileName,
      parentPath,
    },
    windowTitle:`${fileName} — ${parentPath}`,
  };
}

function materializePulsarUtf8VisualFallbackCallerContract({documentPath}={}){
  const surface=derivePulsarDocumentWindowTitle(documentPath);
  if(!surface.ok)return surface;

  return {
    ok:true,
    state:"PULSAR_UTF8_VISUAL_FALLBACK_CALLER_CONTRACT_MATERIALIZED",
    scopeId:PULSAR_ENCODING_SELECTOR_SCOPE_ID,
    contract:{
      id:PULSAR_UTF8_CONTRACT_ID,
      scopeId:PULSAR_ENCODING_SELECTOR_SCOPE_ID,
      application:PULSAR_APPLICATION,
      intent:"OPEN",
      target:PULSAR_UTF8_TARGET,
      postcondition:PULSAR_ENCODING_SELECTOR_POSTCONDITION,
      surfacePrecondition:{
        kind:"window-title",
        match:"exact",
        text:surface.windowTitle,
      },
      providerRequest:{
        capabilities:["text-region"],
        locality:"local",
      },
    },
    descriptor:{
      application:PULSAR_APPLICATION,
      target:PULSAR_UTF8_TARGET,
      surfacePreconditionKind:"window-title",
      surfaceBinding:"caller-document-path",
      postcondition:PULSAR_ENCODING_SELECTOR_POSTCONDITION,
    },
  };
}

function selectPulsarUtf8VisualFallbackContractsForPlan(
  plan,
  {documentPath,initialApplication}={}
){
  const materialized=materializePulsarUtf8VisualFallbackCallerContract({documentPath});
  if(!materialized.ok)return materialized;

  return selectScopedVisualFallbackContractsForPlan(plan,{
    scopeId:materialized.scopeId,
    initialApplication,
    contracts:[materialized.contract],
  });
}

module.exports={
  PULSAR_ENCODING_SELECTOR_SCOPE_ID,
  PULSAR_UTF8_CONTRACT_ID,
  PULSAR_APPLICATION,
  PULSAR_UTF8_TARGET,
  PULSAR_ENCODING_SELECTOR_POSTCONDITION,
  canonicalizeMacosCallerPath,
  derivePulsarDocumentWindowTitle,
  materializePulsarUtf8VisualFallbackCallerContract,
  selectPulsarUtf8VisualFallbackContractsForPlan,
};
