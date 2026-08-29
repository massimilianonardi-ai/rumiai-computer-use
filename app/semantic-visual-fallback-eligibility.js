"use strict";

const SEMANTIC_RESULT_CODES = Object.freeze({
  NO_SEMANTIC_TARGET:"NO_SEMANTIC_TARGET",
  SURFACE_NOT_OBSERVABLE:"SURFACE_NOT_OBSERVABLE",
  APPLICATION_NOT_READY:"APPLICATION_NOT_READY",
  PERMISSION_OR_BACKEND_BLOCKED:"PERMISSION_OR_BACKEND_BLOCKED",
  SEMANTIC_ACTION_DELIVERY_FAILED:"SEMANTIC_ACTION_DELIVERY_FAILED",
  SEMANTIC_POSTCONDITION_VERIFICATION_FAILED:"SEMANTIC_POSTCONDITION_VERIFICATION_FAILED",
  INTERNAL_EXCEPTION:"INTERNAL_EXCEPTION",
  INVALID_INTENT:"INVALID_INTENT",
  INVALID_PRECONDITION:"INVALID_PRECONDITION",
});

const KNOWN_CODES = new Set(Object.values(SEMANTIC_RESULT_CODES));
const VISUAL_ELIGIBLE_CODES = new Set([
  SEMANTIC_RESULT_CODES.NO_SEMANTIC_TARGET,
  SEMANTIC_RESULT_CODES.SURFACE_NOT_OBSERVABLE,
]);

function classifySemanticToVisualFallbackEligibility(result) {
  if (!result || typeof result !== "object" || Array.isArray(result)) {
    return {
      ok:false,
      state:"SEMANTIC_VISUAL_ELIGIBILITY_UNCLASSIFIED",
      eligible:false,
      code:null,
      reason:"STRUCTURED_SEMANTIC_RESULT_REQUIRED",
    };
  }

  if (result.ok === true) {
    return {
      ok:true,
      state:"VISUAL_FALLBACK_INELIGIBLE",
      eligible:false,
      code:typeof result.code === "string" ? result.code : null,
      reason:"SEMANTIC_PATH_SUCCEEDED",
    };
  }

  if (result.ok !== false || typeof result.code !== "string" || !result.code) {
    return {
      ok:false,
      state:"SEMANTIC_VISUAL_ELIGIBILITY_UNCLASSIFIED",
      eligible:false,
      code:null,
      reason:"STRUCTURED_SEMANTIC_FAILURE_CODE_REQUIRED",
    };
  }

  if (!KNOWN_CODES.has(result.code)) {
    return {
      ok:false,
      state:"SEMANTIC_VISUAL_ELIGIBILITY_UNCLASSIFIED",
      eligible:false,
      code:result.code,
      reason:"UNKNOWN_SEMANTIC_RESULT_CODE",
    };
  }

  if (VISUAL_ELIGIBLE_CODES.has(result.code)) {
    return {
      ok:true,
      state:"VISUAL_FALLBACK_ELIGIBLE",
      eligible:true,
      code:result.code,
      reason:"SEMANTIC_OBSERVABILITY_OR_RESOLUTION_GAP",
    };
  }

  return {
    ok:true,
    state:"VISUAL_FALLBACK_INELIGIBLE",
    eligible:false,
    code:result.code,
    reason:"SEMANTIC_FAILURE_CLASS_INELIGIBLE",
  };
}

module.exports = {
  SEMANTIC_RESULT_CODES,
  classifySemanticToVisualFallbackEligibility,
};
