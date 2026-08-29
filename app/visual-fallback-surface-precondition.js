"use strict";

const {
  parseSnapshot,
  normText,
} = require("./semantic-ui");

function failure(reason, detail = null, metadata = null) {
  return {
    ok:false,
    reason,
    ...(detail ? {detail} : {}),
    ...(metadata ? {metadata} : {}),
    recoveryPolicy:"NONE",
  };
}

function validateSemanticSurfacePrecondition(precondition) {
  if (!precondition || typeof precondition !== "object" || Array.isArray(precondition)) {
    return failure("SURFACE_PRECONDITION_INVALID");
  }

  if (precondition.kind !== "semantic-text" || precondition.match !== "exact") {
    return failure("SURFACE_PRECONDITION_EXACT_SEMANTIC_TEXT_REQUIRED");
  }

  const text = String(precondition.text || "").trim();
  if (!text) return failure("SURFACE_PRECONDITION_TEXT_REQUIRED");

  const role = String(precondition.role || "").trim();
  return {
    ok:true,
    value:{
      kind:"semantic-text",
      match:"exact",
      text,
      ...(role ? {role} : {}),
    },
  };
}

function evaluateSemanticSurfacePrecondition(precondition, runtimeContext = {}) {
  const validated = validateSemanticSurfacePrecondition(precondition);
  if (!validated.ok) return validated;

  const snapshot = String(runtimeContext?.state?.snapshot || "");
  if (!snapshot.trim()) return failure("SURFACE_PRECONDITION_SNAPSHOT_REQUIRED");

  const wantedText = normText(validated.value.text);
  const wantedRole = validated.value.role ? normText(validated.value.role) : null;
  const matches = parseSnapshot(snapshot).filter(node =>
    node?.name &&
    normText(node.name) === wantedText &&
    (!wantedRole || normText(node.role) === wantedRole)
  );

  if (matches.length === 0) {
    return failure(
      "SURFACE_PRECONDITION_NOT_MET",
      null,
      {matchCount:0, kind:validated.value.kind}
    );
  }

  if (matches.length > 1) {
    return failure(
      "SURFACE_PRECONDITION_AMBIGUOUS",
      null,
      {matchCount:matches.length, kind:validated.value.kind}
    );
  }

  return {
    ok:true,
    state:"SURFACE_PRECONDITION_VERIFIED",
    metadata:{
      kind:validated.value.kind,
      match:validated.value.match,
      matchCount:1,
      ...(validated.value.role ? {role:validated.value.role} : {}),
    },
  };
}

module.exports = {
  validateSemanticSurfacePrecondition,
  evaluateSemanticSurfacePrecondition,
};
