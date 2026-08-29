"use strict";

const {
  classifySemanticToVisualFallbackEligibility,
} = require("./semantic-visual-fallback-eligibility");
const {
  runVisualTextFallback,
} = require("./perception-action-coordinator");

function validateOpenVisualFallbackContext(context, target) {
  const visual = context?.visualFallback;
  if (!visual || typeof visual !== "object" || Array.isArray(visual)) {
    return {ok:false, reason:"VISUAL_FALLBACK_CONTEXT_REQUIRED"};
  }

  if (visual.policy?.allowVisualFallback !== true) {
    return {ok:false, reason:"VISUAL_FALLBACK_NOT_EXPLICITLY_ALLOWED"};
  }

  if (!visual.provider || typeof visual.provider !== "object") {
    return {ok:false, reason:"PERCEPTION_PROVIDER_REQUIRED"};
  }

  const query = visual.targetQuery;
  if (
    !query ||
    query.kind !== "text" ||
    query.match !== "exact" ||
    typeof query.text !== "string" ||
    !query.text.trim()
  ) {
    return {ok:false, reason:"EXACT_VISUAL_TARGET_REQUIRED"};
  }

  if (query.text.trim() !== String(target || "").trim()) {
    return {ok:false, reason:"VISUAL_TARGET_MUST_MATCH_OPEN_TARGET"};
  }

  const action = visual.actionRequest;
  if (
    !action ||
    action.kind !== "pointer-click" ||
    action.button !== "left" ||
    action.display !== "primary"
  ) {
    return {ok:false, reason:"OPEN_VISUAL_ACTION_MUST_BE_PRIMARY_LEFT_CLICK"};
  }

  const postcondition = visual.postcondition;
  if (
    !postcondition ||
    postcondition.kind !== "text" ||
    postcondition.match !== "exact" ||
    typeof postcondition.text !== "string" ||
    !postcondition.text.trim()
  ) {
    return {ok:false, reason:"EXACT_VISUAL_POSTCONDITION_REQUIRED"};
  }

  if (typeof visual.observeAfterDelivery !== "function") {
    return {ok:false, reason:"POST_ACTION_OBSERVER_REQUIRED"};
  }

  return {
    ok:true,
    value:{
      provider:visual.provider,
      targetQuery:query,
      actionRequest:action,
      policy:visual.policy,
      postcondition,
      observeAfterDelivery:visual.observeAfterDelivery,
    },
  };
}

async function executeOpenSemanticFirst(
  {
    intent,
    state,
    executionContext = {},
    executeSemanticOpen,
  } = {},
  {
    classifyEligibility = classifySemanticToVisualFallbackEligibility,
    runVisualFallback = runVisualTextFallback,
  } = {}
) {
  if (typeof executeSemanticOpen !== "function") {
    throw new TypeError("executeSemanticOpen dependency is required");
  }

  const semanticResult = await executeSemanticOpen(intent, state);

  if (semanticResult?.ok === true) {
    return {
      ...semanticResult,
      executionPath:"semantic",
      visualFallback:{state:"NOT_RUN", reason:"SEMANTIC_PATH_SUCCEEDED"},
    };
  }

  const eligibility = classifyEligibility(semanticResult);
  if (!eligibility?.ok || eligibility.eligible !== true) {
    return {
      ...semanticResult,
      executionPath:"semantic",
      visualFallbackEligibility:eligibility,
      visualFallback:{state:"NOT_RUN", reason:"SEMANTIC_FAILURE_INELIGIBLE"},
    };
  }

  const validated = validateOpenVisualFallbackContext(
    executionContext,
    intent?.target
  );

  if (!validated.ok) {
    return {
      ...semanticResult,
      recoveryPolicy:"NONE",
      executionPath:"semantic",
      visualFallbackEligibility:eligibility,
      visualFallback:{state:"NOT_RUN", reason:validated.reason},
    };
  }

  let visualResult;
  try {
    visualResult = await Promise.resolve(runVisualFallback(validated.value));
  } catch (error) {
    return {
      ok:false,
      code:"INTERNAL_EXCEPTION",
      recoveryPolicy:"NONE",
      currentApp:state?.currentApp || null,
      snapshot:state?.snapshot || "",
      changed:null,
      executionPath:"visual-fallback",
      visualFallbackEligibility:eligibility,
      visualFallback:{state:"FAILED", reason:"COORDINATOR_EXCEPTION"},
      error:`OPEN visual fallback coordinator exception: ${error?.message || error}`,
    };
  }

  const verified = Boolean(
    visualResult?.ok === true &&
    visualResult?.taskOutcome?.state === "VERIFIED_SUCCESS"
  );

  const base = {
    currentApp:state?.currentApp || null,
    snapshot:state?.snapshot || "",
    changed:null,
    executionPath:"visual-fallback",
    visualFallbackEligibility:eligibility,
    visualFallback:{
      state:visualResult?.state || "UNKNOWN",
      verified,
    },
    delivery:visualResult?.delivery || null,
    semanticConsequence:visualResult?.semanticConsequence || null,
    taskOutcome:visualResult?.taskOutcome || null,
  };

  if (verified) {
    return {
      ...base,
      ok:true,
      error:null,
      detail:"OPEN visual fallback verified by independent post-action observation",
    };
  }

  return {
    ...base,
    ok:false,
    code:"VISUAL_FALLBACK_NOT_VERIFIED",
    recoveryPolicy:"NONE",
    error:visualResult?.error || visualResult?.state || "OPEN visual fallback was not independently verified",
  };
}

module.exports = {
  validateOpenVisualFallbackContext,
  executeOpenSemanticFirst,
};
