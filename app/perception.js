"use strict";

const PNG_SIGNATURE = Buffer.from([0x89,0x50,0x4e,0x47,0x0d,0x0a,0x1a,0x0a]);

function externalCaptureDisplay(params) {
  return require("./computer-control-external").captureDisplay(params);
}

function externalListDisplays() {
  return require("./computer-control-external").listDisplays();
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

function failureFromDisplayObservation(observation) {
  return {
    ok:false,
    state:observation?.state || "FAILED",
    error:observation?.error || "DISPLAY_OBSERVATION_FAILED",
    detail:observation?.detail || "Computer Control display.list failed",
    recoveryPolicy:observation?.recoveryPolicy || "NONE",
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

function primaryDisplayFromObservation(observation) {
  if (!observation || observation.ok === false) return {ok:false, failure:failureFromDisplayObservation(observation)};
  if (observation.state !== "OBSERVED" || !Array.isArray(observation.displays)) {
    return {ok:false, error:"PRIMARY_DISPLAY_OBSERVATION_INVALID"};
  }
  const matches = observation.displays.filter(display => display?.primary === true && display?.active === true && display?.online === true);
  if (matches.length !== 1) return {ok:false, error:"PRIMARY_DISPLAY_AMBIGUOUS"};
  const display = matches[0];
  const bounds = display.bounds || {};
  const geometry = {
    x:Number(bounds.x),
    y:Number(bounds.y),
    width:Number(bounds.width),
    height:Number(bounds.height),
    scale:Number(display.scale),
    rotationDegrees:Number(display.rotationDegrees),
  };
  if (![geometry.x,geometry.y,geometry.width,geometry.height,geometry.scale,geometry.rotationDegrees].every(Number.isFinite) ||
      geometry.width <= 0 || geometry.height <= 0 || geometry.scale <= 0) {
    return {ok:false, error:"PRIMARY_DISPLAY_GEOMETRY_INVALID"};
  }
  return {ok:true, display:geometry};
}

function sameDisplayGeometry(a,b) {
  return ["x","y","width","height","scale","rotationDegrees"].every(key => Number(a?.[key]) === Number(b?.[key]));
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

function acquireMappedPrimaryVisualFrame({captureDisplay = externalCaptureDisplay, listDisplays = externalListDisplays} = {}) {
  if (typeof listDisplays !== "function") {
    return {ok:false, state:"FAILED", error:"DISPLAY_OBSERVATION_PROVIDER_MISSING", recoveryPolicy:"NONE"};
  }

  const beforeChecked = primaryDisplayFromObservation(listDisplays());
  if (!beforeChecked.ok) {
    if (beforeChecked.failure) return beforeChecked.failure;
    return {ok:false, state:"FAILED", error:beforeChecked.error, recoveryPolicy:"NONE"};
  }
  if (beforeChecked.display.rotationDegrees !== 0) {
    return {ok:false, state:"FAILED", error:"PRIMARY_DISPLAY_ROTATION_UNSUPPORTED", recoveryPolicy:"NONE"};
  }

  const acquired = acquirePrimaryVisualFrame({captureDisplay});
  if (!acquired.ok) return acquired;

  const afterChecked = primaryDisplayFromObservation(listDisplays());
  if (!afterChecked.ok) {
    if (afterChecked.failure) return afterChecked.failure;
    return {ok:false, state:"FAILED", error:afterChecked.error, recoveryPolicy:"NONE"};
  }
  if (!sameDisplayGeometry(beforeChecked.display, afterChecked.display)) {
    return {ok:false, state:"FAILED", error:"PRIMARY_DISPLAY_TOPOLOGY_CHANGED", recoveryPolicy:"NONE"};
  }

  const logicalWidth = beforeChecked.display.width;
  const logicalHeight = beforeChecked.display.height;
  const pixelWidth = acquired.frame.width;
  const pixelHeight = acquired.frame.height;
  const pixelToLogicalX = logicalWidth / pixelWidth;
  const pixelToLogicalY = logicalHeight / pixelHeight;
  const logicalToPixelX = pixelWidth / logicalWidth;
  const logicalToPixelY = pixelHeight / logicalHeight;
  if (![pixelToLogicalX,pixelToLogicalY,logicalToPixelX,logicalToPixelY].every(value => Number.isFinite(value) && value > 0)) {
    return {ok:false, state:"FAILED", error:"PRIMARY_CAPTURE_MAPPING_INVALID", recoveryPolicy:"NONE"};
  }

  return {
    ...acquired,
    state:"VISUAL_FRAME_MAPPED",
    actionCoordinateMapping:{
      state:"RESOLVED",
      display:"primary",
      source:{kind:"capture-pixel",origin:"top-left",width:pixelWidth,height:pixelHeight},
      destination:{kind:"primary-display-logical",origin:"top-left",width:logicalWidth,height:logicalHeight},
      transform:{
        kind:"axis-aligned-scale",
        pixelToLogical:{x:pixelToLogicalX,y:pixelToLogicalY},
        logicalToPixel:{x:logicalToPixelX,y:logicalToPixelY},
        rotationDegrees:0,
      },
      validation:{
        state:"IMPLEMENTED",
        scope:"stable-unrotated-primary-display-topology",
        method:"display-list-before-after-plus-marker-discovery",
      },
    },
  };
}

function mapCapturePointToPrimaryLogical(mapping, point) {
  if (mapping?.state !== "RESOLVED" || mapping?.display !== "primary" || mapping?.source?.kind !== "capture-pixel" ||
      mapping?.destination?.kind !== "primary-display-logical" || mapping?.transform?.kind !== "axis-aligned-scale" ||
      mapping?.transform?.rotationDegrees !== 0) {
    return {ok:false, state:"FAILED", error:"ACTION_COORDINATE_MAPPING_UNRESOLVED"};
  }
  const x = Number(point?.x), y = Number(point?.y);
  if (!Number.isFinite(x) || !Number.isFinite(y) || x < 0 || y < 0 || x > mapping.source.width || y > mapping.source.height) {
    return {ok:false, state:"FAILED", error:"CAPTURE_POINT_OUT_OF_BOUNDS"};
  }
  const logicalX = x * mapping.transform.pixelToLogical.x;
  const logicalY = y * mapping.transform.pixelToLogical.y;
  if (!Number.isFinite(logicalX) || !Number.isFinite(logicalY)) {
    return {ok:false, state:"FAILED", error:"ACTION_COORDINATE_MAPPING_INVALID"};
  }
  return {
    ok:true,
    state:"MAPPED",
    point:{x:logicalX,y:logicalY},
    coordinateSpace:{kind:"primary-display-logical",origin:"top-left"},
  };
}

module.exports = {
  acquirePrimaryVisualFrame,
  acquireMappedPrimaryVisualFrame,
  mapCapturePointToPrimaryLogical,
  primaryDisplayFromObservation,
  sameDisplayGeometry,
  validateCapturedPng,
};
