"use strict";

const PNG_SIGNATURE = Buffer.from([0x89,0x50,0x4e,0x47,0x0d,0x0a,0x1a,0x0a]);

function externalCaptureDisplay(params) {
  return require("./computer-control-external").captureDisplay(params);
}

function failureFromCapture(capture) {
  return {
    ok:false,
    state:capture?.state || "FAILED",
    error:capture?.error || "DISPLAY_CAPTURE_FAILED",
    detail:capture?.detail || "Computer Control display.capture failed",
    recoveryPolicy:capture?.recoveryPolicy || "NONE",
  };
}

function validateCapturedPng(capture) {
  if (!capture || capture.ok === false) return {ok:false, failure:failureFromCapture(capture)};
  if (capture.state !== "CAPTURED") return {ok:false, error:"VISUAL_FRAME_INVALID_CAPTURE_STATE"};
  if (capture.display !== "primary") return {ok:false, error:"VISUAL_FRAME_INVALID_DISPLAY"};
  if (capture.format !== "image/png") return {ok:false, error:"VISUAL_FRAME_INVALID_FORMAT"};
  if (!Number.isInteger(capture.width) || capture.width <= 0) return {ok:false, error:"VISUAL_FRAME_INVALID_WIDTH"};
  if (!Number.isInteger(capture.height) || capture.height <= 0) return {ok:false, error:"VISUAL_FRAME_INVALID_HEIGHT"};
  if (!Number.isInteger(capture.byteCount) || capture.byteCount <= 0) return {ok:false, error:"VISUAL_FRAME_INVALID_BYTE_COUNT"};
  if (typeof capture.dataBase64 !== "string" || !capture.dataBase64) return {ok:false, error:"VISUAL_FRAME_MISSING_PAYLOAD"};
  if (capture.cursorIncluded !== false) return {ok:false, error:"VISUAL_FRAME_CURSOR_POLICY_MISMATCH"};

  let bytes;
  try { bytes = Buffer.from(capture.dataBase64, "base64"); }
  catch { return {ok:false, error:"VISUAL_FRAME_INVALID_BASE64"}; }

  if (bytes.length !== capture.byteCount) return {ok:false, error:"VISUAL_FRAME_BYTE_COUNT_MISMATCH"};
  if (bytes.toString("base64") !== capture.dataBase64) return {ok:false, error:"VISUAL_FRAME_NON_CANONICAL_BASE64"};
  if (bytes.length < PNG_SIGNATURE.length || !bytes.subarray(0, PNG_SIGNATURE.length).equals(PNG_SIGNATURE)) {
    return {ok:false, error:"VISUAL_FRAME_INVALID_PNG_SIGNATURE"};
  }

  return {ok:true};
}

function acquirePrimaryVisualFrame({captureDisplay = externalCaptureDisplay} = {}) {
  if (typeof captureDisplay !== "function") {
    return {ok:false, state:"FAILED", error:"VISUAL_FRAME_CAPTURE_PROVIDER_MISSING", recoveryPolicy:"NONE"};
  }

  const capture = captureDisplay({display:"primary"});
  const checked = validateCapturedPng(capture);
  if (!checked.ok) {
    if (checked.failure) return checked.failure;
    return {ok:false, state:"FAILED", error:checked.error, recoveryPolicy:"NONE"};
  }

  return {
    ok:true,
    state:"VISUAL_FRAME_ACQUIRED",
    frame:{
      mediaType:"image/png",
      width:capture.width,
      height:capture.height,
      byteCount:capture.byteCount,
      dataBase64:capture.dataBase64,
      cursorIncluded:false,
      coordinateSpace:{
        kind:"capture-pixel",
        origin:"top-left",
        width:capture.width,
        height:capture.height,
      },
    },
    provenance:{
      source:"computer-control",
      operation:"display.capture",
      display:"primary",
      captureState:"CAPTURED",
      observationMethod:capture.observation?.method || capture.method || null,
    },
    interpretation:{
      state:"NOT_RUN",
      candidates:[],
    },
    actionCoordinateMapping:{
      state:"UNRESOLVED",
      reason:"capture-pixel coordinates are not assumed to equal Computer Control logical pointer coordinates",
    },
    persistence:{
      policy:"EPHEMERAL",
      persistedByComputerUse:false,
    },
  };
}

module.exports = {
  acquirePrimaryVisualFrame,
  validateCapturedPng,
};
