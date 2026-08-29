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

async function resolveEligibleVisualFallbackContext(executionContext, args) {
  if (typeof executionContext?.resolveVisualFallbackContext !== "function") {
    return {
      ok:true,
      executionContext,
      metadata:null,
    };
  }

  let resolved;
  try {
    resolved = await Promise.resolve(
      executionContext.resolveVisualFallbackContext(args)
    );
  } catch (error) {
    return {
      ok:false,
      reason:"VISUAL_FALLBACK_CONTEXT_RESOLUTION_EXCEPTION",
      detail:error?.message || String(error),
    };
  }

  if (!resolved || resolved.ok === false) {
    return {
      ok:false,
      reason:resolved?.reason || resolved?.error || "VISUAL_FALLBACK_CONTEXT_RESOLUTION_FAILED",
      detail:resolved?.detail || null,
    };
  }

  return {
    ok:true,
    executionContext:resolved.executionContext || resolved.context || resolved,
    metadata:resolved.metadata || null,
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

  const resolvedContext = await resolveEligibleVisualFallbackContext(
    executionContext,
    {intent, state, semanticResult, eligibility}
  );

  if (!resolvedContext.ok) {
    return {
      ...semanticResult,
      recoveryPolicy:"NONE",
      executionPath:"semantic",
      visualFallbackEligibility:eligibility,
      visualFallback:{
        state:"NOT_RUN",
        reason:resolvedContext.reason,
        ...(resolvedContext.detail ? {detail:resolvedContext.detail} : {}),
      },
    };
  }

  const validated = validateOpenVisualFallbackContext(
    resolvedContext.executionContext,
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
      ...(resolvedContext.metadata ? {visualFallbackProviderSelection:resolvedContext.metadata} : {}),
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
    ...(resolvedContext.metadata ? {visualFallbackProviderSelection:resolvedContext.metadata} : {}),
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
  resolveEligibleVisualFallbackContext,
  executeOpenSemanticFirst,
};
