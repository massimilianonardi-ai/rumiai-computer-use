"use strict";

const {resolveExactTextTarget} = require("./perception-target");

function failure(error, detail = null) {
  return {
    ok:false,
    state:"FAILED",
    error,
    ...(detail ? {detail} : {}),
    recoveryPolicy:"NONE",
  };
}

function externalClickPointer(params) {
  return require("./computer-control-external").clickPointer(params);
}

function validAuthorizedClickPlan(result) {
  const plan=result?.actionPlan;
  const point=plan?.point;
  return Boolean(
    result &&
    result.ok === true &&
    result.state === "VISUAL_FALLBACK_AUTHORIZED" &&
    result.actionPolicy?.state === "AUTHORIZED" &&
    result.actionPolicy?.policy === "explicit-single-target-left-click" &&
    result.semanticTarget?.state === "RESOLVED" &&
    result.semanticTarget?.semanticIdentity === null &&
    result.semanticTarget?.actionable === false &&
    result.actionCoordinateMapping?.state === "RESOLVED" &&
    result.actionCoordinateMapping?.validation?.state === "PHYSICALLY_VALIDATED" &&
    plan?.state === "READY" &&
    plan?.kind === "pointer-click" &&
    plan?.button === "left" &&
    plan?.display === "primary" &&
    plan?.source === "visual-target-policy" &&
    Number.isFinite(Number(point?.x)) && Number(point.x) >= 0 &&
    Number.isFinite(Number(point?.y)) && Number(point.y) >= 0 &&
    point?.coordinateSpace?.kind === "primary-display-logical" &&
    point?.coordinateSpace?.origin === "top-left" &&
    result.delivery?.state === "NOT_ATTEMPTED" &&
    result.semanticConsequence?.state === "NOT_OBSERVED"
  );
}

function validExactTextPostcondition(postcondition) {
  return Boolean(
    postcondition &&
    typeof postcondition === "object" &&
    postcondition.kind === "text" &&
    postcondition.match === "exact" &&
    typeof postcondition.text === "string" &&
    postcondition.text.trim().length > 0
  );
}

function postedDelivery(controlResult) {
  return Boolean(
    controlResult &&
    controlResult.ok !== false &&
    controlResult.state === "CLICK_POSTED" &&
    controlResult.positionVerified === true &&
    controlResult.buttonDelivery === "POSTED" &&
    controlResult.semanticConsequenceVerified === false
  );
}

function deliveredBase(policyResult, controlResult) {
  return {
    semanticTarget:policyResult.semanticTarget,
    actionCoordinateMapping:policyResult.actionCoordinateMapping,
    actionPolicy:policyResult.actionPolicy,
    actionPlan:policyResult.actionPlan,
    delivery:{
      state:"POSTED",
      controlState:controlResult.state,
      positionVerified:true,
      buttonDelivery:"POSTED",
      semanticConsequenceVerified:false,
    },
    persistence:policyResult.persistence,
  };
}

function executeAuthorizedVisualClickAndVerify(
  policyResult,
  {
    clickPointer=externalClickPointer,
    observeAfterDelivery,
    postcondition,
  }={}
) {
  if (!validAuthorizedClickPlan(policyResult)) return failure("VISUAL_FALLBACK_ACTION_PLAN_INVALID");
  if (typeof clickPointer !== "function") return failure("VISUAL_FALLBACK_CLICK_EXECUTOR_INVALID");
  if (typeof observeAfterDelivery !== "function") return failure("VISUAL_FALLBACK_POST_ACTION_OBSERVER_INVALID");
  if (!validExactTextPostcondition(postcondition)) return failure("VISUAL_FALLBACK_POSTCONDITION_INVALID");

  const point=policyResult.actionPlan.point;
  let controlResult;
  try {
    controlResult=clickPointer({display:"primary",x:Number(point.x),y:Number(point.y),button:"left"});
  } catch (error) {
    return {
      ...failure("VISUAL_FALLBACK_CLICK_EXCEPTION",error?.message||"click executor threw"),
      delivery:{state:"FAILED"},
      semanticConsequence:{state:"NOT_OBSERVED"},
      taskOutcome:{state:"NOT_VERIFIED_SUCCESS"},
    };
  }

  if (!postedDelivery(controlResult)) {
    return {
      ok:false,
      state:"VISUAL_FALLBACK_DELIVERY_FAILED",
      error:controlResult?.error || "VISUAL_FALLBACK_CLICK_NOT_POSTED",
      detail:controlResult?.detail || "Computer Control did not return the validated CLICK_POSTED delivery contract",
      recoveryPolicy:controlResult?.recoveryPolicy || "NONE",
      delivery:{state:"FAILED",controlState:controlResult?.state || null},
      semanticConsequence:{state:"NOT_OBSERVED"},
      taskOutcome:{state:"NOT_VERIFIED_SUCCESS"},
      persistence:policyResult.persistence,
    };
  }

  const base=deliveredBase(policyResult,controlResult);
  let postActionObservation;
  try {
    postActionObservation=observeAfterDelivery();
  } catch (error) {
    return {
      ok:true,
      state:"VISUAL_FALLBACK_DELIVERED_UNVERIFIED",
      ...base,
      semanticConsequence:{state:"NOT_VERIFIED",reason:"POST_ACTION_OBSERVER_EXCEPTION"},
      taskOutcome:{state:"NOT_VERIFIED_SUCCESS"},
    };
  }

  const resolved=resolveExactTextTarget(postActionObservation,postcondition);
  if (!resolved?.ok || resolved.state !== "VISUAL_TARGET_RESOLVED") {
    return {
      ok:true,
      state:"VISUAL_FALLBACK_POSTCONDITION_NOT_SATISFIED",
      ...base,
      semanticConsequence:{
        state:"OBSERVED_NOT_SATISFIED",
        verificationPolicy:"post-action-exact-text-single-match",
        resolutionState:resolved?.state || "FAILED",
      },
      taskOutcome:{state:"NOT_VERIFIED_SUCCESS"},
    };
  }

  return {
    ok:true,
    state:"VISUAL_FALLBACK_VERIFIED",
    ...base,
    semanticConsequence:{
      state:"SATISFIED",
      verificationPolicy:"post-action-exact-text-single-match",
      independentPostActionObservation:true,
    },
    taskOutcome:{
      state:"VERIFIED_SUCCESS",
      basis:"post-action-independent-observation",
    },
  };
}

module.exports = {
  executeAuthorizedVisualClickAndVerify,
  validAuthorizedClickPlan,
  validExactTextPostcondition,
  postedDelivery,
};
