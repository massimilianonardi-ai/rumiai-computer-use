"use strict";

function failure(error, detail = null) {
  return {
    ok:false,
    state:"FAILED",
    error,
    ...(detail ? {detail} : {}),
    recoveryPolicy:"NONE",
  };
}

function validResolvedVisualTarget(result) {
  const target=result?.semanticTarget;
  const point=target?.logicalPoint;
  return Boolean(
    result &&
    result.ok === true &&
    result.state === "VISUAL_TARGET_RESOLVED" &&
    target?.state === "RESOLVED" &&
    target?.kind === "visual-text-region" &&
    target?.resolution?.policy === "exact-text-single-match" &&
    target?.semanticIdentity === null &&
    target?.actionable === false &&
    result.actionPolicy?.state === "NOT_EVALUATED" &&
    result.actionCoordinateMapping?.state === "RESOLVED" &&
    result.actionCoordinateMapping?.validation?.state === "PHYSICALLY_VALIDATED" &&
    Number.isFinite(Number(point?.x)) && Number(point.x) >= 0 &&
    Number.isFinite(Number(point?.y)) && Number(point.y) >= 0 &&
    point?.coordinateSpace?.kind === "primary-display-logical" &&
    point?.coordinateSpace?.origin === "top-left"
  );
}

function validClickRequest(request) {
  return Boolean(
    request &&
    typeof request === "object" &&
    request.kind === "pointer-click" &&
    request.button === "left" &&
    request.display === "primary"
  );
}

function validPolicy(policy) {
  return Boolean(
    policy &&
    typeof policy === "object" &&
    typeof policy.allowVisualFallback === "boolean"
  );
}

function rejected(targetResult, request, reason) {
  return {
    ok:true,
    state:"VISUAL_FALLBACK_REJECTED",
    semanticTarget:targetResult?.semanticTarget || {state:"UNRESOLVED"},
    actionCoordinateMapping:targetResult?.actionCoordinateMapping,
    actionPolicy:{
      state:"REJECTED",
      reason,
      requestedAction:request && typeof request === "object" ? {
        kind:request.kind || null,
        button:request.button || null,
        display:request.display || null,
      } : null,
    },
    actionPlan:{state:"NOT_CREATED"},
    delivery:{state:"NOT_ATTEMPTED"},
    semanticConsequence:{state:"NOT_OBSERVED"},
    persistence:targetResult?.persistence,
  };
}

function evaluateVisualFallbackPolicy(targetResult, request, policy) {
  if (!validPolicy(policy)) return failure("VISUAL_FALLBACK_POLICY_INVALID");
  if (!validResolvedVisualTarget(targetResult)) return rejected(targetResult,request,"TARGET_NOT_SAFELY_RESOLVED");
  if (!validClickRequest(request)) return rejected(targetResult,request,"ACTION_NOT_SUPPORTED_BY_INITIAL_POLICY");
  if (policy.allowVisualFallback !== true) return rejected(targetResult,request,"VISUAL_FALLBACK_NOT_EXPLICITLY_ALLOWED");

  const point=targetResult.semanticTarget.logicalPoint;
  return {
    ok:true,
    state:"VISUAL_FALLBACK_AUTHORIZED",
    semanticTarget:targetResult.semanticTarget,
    actionCoordinateMapping:targetResult.actionCoordinateMapping,
    actionPolicy:{
      state:"AUTHORIZED",
      policy:"explicit-single-target-left-click",
      basis:{
        targetResolution:"exact-text-single-match",
        mappingValidation:"PHYSICALLY_VALIDATED",
        explicitVisualFallbackConsent:true,
      },
    },
    actionPlan:{
      state:"READY",
      kind:"pointer-click",
      button:"left",
      display:"primary",
      point:{
        x:Number(point.x),
        y:Number(point.y),
        coordinateSpace:{kind:"primary-display-logical",origin:"top-left"},
      },
      source:"visual-target-policy",
    },
    delivery:{state:"NOT_ATTEMPTED"},
    semanticConsequence:{state:"NOT_OBSERVED"},
    persistence:targetResult.persistence,
  };
}

module.exports = {
  evaluateVisualFallbackPolicy,
  validResolvedVisualTarget,
  validClickRequest,
  validPolicy,
};
