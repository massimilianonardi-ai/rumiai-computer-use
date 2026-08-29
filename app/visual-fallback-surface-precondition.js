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

  if (precondition.match !== "exact") {
    return failure("SURFACE_PRECONDITION_EXACT_MATCH_REQUIRED");
  }

  const text = String(precondition.text || "").trim();
  if (!text) return failure("SURFACE_PRECONDITION_TEXT_REQUIRED");

  if (precondition.kind === "semantic-text") {
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

  if (precondition.kind === "window-title") {
    if (String(precondition.role || "").trim()) {
      return failure("WINDOW_TITLE_PRECONDITION_ROLE_NOT_SUPPORTED");
    }
    return {
      ok:true,
      value:{
        kind:"window-title",
        match:"exact",
        text,
      },
    };
  }

  return failure("SURFACE_PRECONDITION_KIND_NOT_SUPPORTED");
}

function evaluateSemanticTextSurfacePrecondition(value, runtimeContext) {
  const snapshot = String(runtimeContext?.state?.snapshot || "");
  if (!snapshot.trim()) return failure("SURFACE_PRECONDITION_SNAPSHOT_REQUIRED");

  const wantedText = normText(value.text);
  const wantedRole = value.role ? normText(value.role) : null;
  const matches = parseSnapshot(snapshot).filter(node =>
    node?.name &&
    normText(node.name) === wantedText &&
    (!wantedRole || normText(node.role) === wantedRole)
  );

  if (matches.length === 0) {
    return failure(
      "SURFACE_PRECONDITION_NOT_MET",
      null,
      {matchCount:0, kind:value.kind}
    );
  }

  if (matches.length > 1) {
    return failure(
      "SURFACE_PRECONDITION_AMBIGUOUS",
      null,
      {matchCount:matches.length, kind:value.kind}
    );
  }

  return {
    ok:true,
    state:"SURFACE_PRECONDITION_VERIFIED",
    metadata:{
      kind:value.kind,
      match:value.match,
      matchCount:1,
      ...(value.role ? {role:value.role} : {}),
    },
  };
}

function evaluateWindowTitleSurfacePrecondition(value, runtimeContext) {
  const windowTitle = String(
    runtimeContext?.currentWindow?.title ??
    runtimeContext?.window?.title ??
    runtimeContext?.windowTitle ??
    ""
  ).trim();

  if (!windowTitle) {
    return failure("SURFACE_PRECONDITION_WINDOW_TITLE_REQUIRED");
  }

  if (normText(windowTitle) !== normText(value.text)) {
    return failure(
      "SURFACE_PRECONDITION_NOT_MET",
      null,
      {matchCount:0, kind:value.kind}
    );
  }

  return {
    ok:true,
    state:"SURFACE_PRECONDITION_VERIFIED",
    metadata:{
      kind:value.kind,
      match:value.match,
      matchCount:1,
    },
  };
}

function evaluateSemanticSurfacePrecondition(precondition, runtimeContext = {}) {
  const validated = validateSemanticSurfacePrecondition(precondition);
  if (!validated.ok) return validated;

  if (validated.value.kind === "semantic-text") {
    return evaluateSemanticTextSurfacePrecondition(validated.value, runtimeContext);
  }
  if (validated.value.kind === "window-title") {
    return evaluateWindowTitleSurfacePrecondition(validated.value, runtimeContext);
  }
  return failure("SURFACE_PRECONDITION_KIND_NOT_SUPPORTED");
}

module.exports = {
  validateSemanticSurfacePrecondition,
  evaluateSemanticSurfacePrecondition,
};
