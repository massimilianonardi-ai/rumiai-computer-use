"use strict";

const {mapCapturePointToPrimaryLogical} = require("./perception");

function failure(error, detail = null) {
  return {
    ok:false,
    state:"FAILED",
    error,
    ...(detail ? {detail} : {}),
    recoveryPolicy:"NONE",
  };
}

function validInterpretationResult(result) {
  return Boolean(
    result &&
    result.ok === true &&
    result.state === "VISUAL_INTERPRETATION_OBSERVED" &&
    result.interpretation?.state === "OBSERVED" &&
    Array.isArray(result.interpretation?.observations) &&
    result.semanticTarget?.state === "UNRESOLVED" &&
    result.actionPolicy?.state === "NOT_EVALUATED" &&
    result.actionCoordinateMapping?.state === "RESOLVED" &&
    result.actionCoordinateMapping?.validation?.state === "PHYSICALLY_VALIDATED"
  );
}

function validExactTextQuery(query) {
  return Boolean(
    query &&
    typeof query === "object" &&
    query.kind === "text" &&
    query.match === "exact" &&
    typeof query.text === "string" &&
    query.text.trim().length > 0
  );
}

function centerOfRegion(region) {
  return {
    x:Number(region.x) + Number(region.width) / 2,
    y:Number(region.y) + Number(region.height) / 2,
  };
}

function unresolved(interpretationResult, queryText, reason, count) {
  return {
    ok:true,
    state:reason === "MULTIPLE_EXACT_TEXT_MATCHES" ? "VISUAL_TARGET_AMBIGUOUS" : "VISUAL_TARGET_UNRESOLVED",
    interpretation:interpretationResult.interpretation,
    actionCoordinateMapping:interpretationResult.actionCoordinateMapping,
    semanticTarget:{
      state:reason === "MULTIPLE_EXACT_TEXT_MATCHES" ? "AMBIGUOUS" : "UNRESOLVED",
      kind:"visual-text-region",
      query:{kind:"text",match:"exact",text:queryText},
      reason,
      matchCount:count,
      semanticIdentity:null,
      actionable:false,
    },
    actionPolicy:{state:"NOT_EVALUATED"},
    persistence:interpretationResult.persistence,
  };
}

function resolveExactTextTarget(interpretationResult, query) {
  if (!validInterpretationResult(interpretationResult)) return failure("VISUAL_TARGET_INTERPRETATION_INVALID");
  if (!validExactTextQuery(query)) return failure("VISUAL_TARGET_QUERY_INVALID");

  const queryText=query.text.trim();
  const matches=[];
  for (let index=0; index<interpretationResult.interpretation.observations.length; index++) {
    const observation=interpretationResult.interpretation.observations[index];
    if (observation?.kind !== "text-region" || typeof observation.text !== "string") continue;
    if (observation.text.trim() === queryText) matches.push({index,observation});
  }

  if (matches.length === 0) return unresolved(interpretationResult,queryText,"NO_EXACT_TEXT_MATCH",0);
  if (matches.length > 1) return unresolved(interpretationResult,queryText,"MULTIPLE_EXACT_TEXT_MATCHES",matches.length);

  const {index,observation}=matches[0];
  const capturePoint=centerOfRegion(observation.region);
  const mapped=mapCapturePointToPrimaryLogical(interpretationResult.actionCoordinateMapping,capturePoint);
  if (!mapped?.ok || mapped.state !== "MAPPED") return failure("VISUAL_TARGET_POINT_MAPPING_FAILED");

  return {
    ok:true,
    state:"VISUAL_TARGET_RESOLVED",
    interpretation:interpretationResult.interpretation,
    actionCoordinateMapping:interpretationResult.actionCoordinateMapping,
    semanticTarget:{
      state:"RESOLVED",
      kind:"visual-text-region",
      query:{kind:"text",match:"exact",text:queryText},
      resolution:{policy:"exact-text-single-match",observationIndex:index},
      confidence:observation.confidence,
      captureRegion:{
        x:observation.region.x,
        y:observation.region.y,
        width:observation.region.width,
        height:observation.region.height,
        coordinateSpace:{kind:"capture-pixel",origin:"top-left"},
      },
      capturePoint:{...capturePoint,coordinateSpace:{kind:"capture-pixel",origin:"top-left"}},
      logicalPoint:{...mapped.point,coordinateSpace:{kind:"primary-display-logical",origin:"top-left"}},
      semanticIdentity:null,
      actionable:false,
    },
    actionPolicy:{state:"NOT_EVALUATED"},
    persistence:interpretationResult.persistence,
  };
}

module.exports = {
  resolveExactTextTarget,
  validInterpretationResult,
  validExactTextQuery,
  centerOfRegion,
};
