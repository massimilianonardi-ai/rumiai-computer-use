"use strict";

const {acquireMappedPrimaryVisualFrame} = require("./perception");
const {interpretMappedVisualFrame} = require("./perception-provider");
const {resolveExactTextTarget} = require("./perception-target");
const {evaluateVisualFallbackPolicy} = require("./perception-action-policy");
const {executeAuthorizedVisualClickAndVerify} = require("./perception-action-execution");

function runVisualTextFallback(
  {
    provider,
    targetQuery,
    actionRequest,
    policy,
    postcondition,
    observeAfterDelivery,
  } = {},
  {
    captureDisplay,
    listDisplays,
    clickPointer,
  } = {}
) {
  const mappedFrame = acquireMappedPrimaryVisualFrame({captureDisplay,listDisplays});
  if (!mappedFrame?.ok) return mappedFrame;

  const interpreted = interpretMappedVisualFrame(mappedFrame,provider);
  if (!interpreted?.ok) return interpreted;

  const resolved = resolveExactTextTarget(interpreted,targetQuery);
  if (!resolved?.ok) return resolved;

  const authorized = evaluateVisualFallbackPolicy(resolved,actionRequest,policy);
  if (!authorized?.ok || authorized.state !== "VISUAL_FALLBACK_AUTHORIZED" || authorized.actionPlan?.state !== "READY") {
    return authorized;
  }

  return executeAuthorizedVisualClickAndVerify(authorized,{
    clickPointer,
    observeAfterDelivery,
    postcondition,
  });
}

module.exports = {
  runVisualTextFallback,
};
