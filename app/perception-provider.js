"use strict";

function failure(error, detail = null) {
  return {
    ok:false,
    state:"FAILED",
    error,
    ...(detail ? {detail} : {}),
    recoveryPolicy:"NONE",
  };
}

function validProviderDescriptor(provider) {
  if (!provider || typeof provider !== "object") return false;
  if (typeof provider.id !== "string" || !provider.id.trim()) return false;
  if (provider.locality !== "local" && provider.locality !== "remote" && provider.locality !== "unknown") return false;
  if (!Array.isArray(provider.capabilities) || !provider.capabilities.includes("text-region")) return false;
  if (typeof provider.observe !== "function") return false;
  return true;
}

function validMappedFrame(mappedFrame) {
  return Boolean(
    mappedFrame &&
    mappedFrame.ok === true &&
    mappedFrame.state === "VISUAL_FRAME_MAPPED" &&
    mappedFrame.frame?.mediaType === "image/png" &&
    Number.isInteger(mappedFrame.frame?.width) && mappedFrame.frame.width > 0 &&
    Number.isInteger(mappedFrame.frame?.height) && mappedFrame.frame.height > 0 &&
    typeof mappedFrame.frame?.dataBase64 === "string" && mappedFrame.frame.dataBase64.length > 0 &&
    mappedFrame.frame?.coordinateSpace?.kind === "capture-pixel" &&
    mappedFrame.frame?.coordinateSpace?.origin === "top-left" &&
    mappedFrame.actionCoordinateMapping?.state === "RESOLVED" &&
    mappedFrame.actionCoordinateMapping?.validation?.state === "PHYSICALLY_VALIDATED"
  );
}

function normalizeTextRegionObservation(observation, frameWidth, frameHeight) {
  if (!observation || observation.kind !== "text-region") return {ok:false,error:"PERCEPTION_OBSERVATION_KIND_UNSUPPORTED"};
  if (typeof observation.text !== "string" || !observation.text.trim()) return {ok:false,error:"PERCEPTION_TEXT_INVALID"};
  const confidence = Number(observation.confidence);
  if (!Number.isFinite(confidence) || confidence < 0 || confidence > 1) return {ok:false,error:"PERCEPTION_CONFIDENCE_INVALID"};
  const region = observation.region || {};
  const x=Number(region.x), y=Number(region.y), width=Number(region.width), height=Number(region.height);
  if (![x,y,width,height].every(Number.isFinite) || x < 0 || y < 0 || width <= 0 || height <= 0) {
    return {ok:false,error:"PERCEPTION_REGION_INVALID"};
  }
  if (x + width > frameWidth || y + height > frameHeight) return {ok:false,error:"PERCEPTION_REGION_OUT_OF_BOUNDS"};
  if (region.coordinateSpace?.kind !== "capture-pixel" || region.coordinateSpace?.origin !== "top-left") {
    return {ok:false,error:"PERCEPTION_REGION_COORDINATE_SPACE_INVALID"};
  }

  return {
    ok:true,
    observation:{
      kind:"text-region",
      text:observation.text,
      confidence,
      region:{
        x,y,width,height,
        coordinateSpace:{kind:"capture-pixel",origin:"top-left"},
      },
      semanticIdentity:null,
      actionable:false,
    },
  };
}

function interpretMappedVisualFrame(mappedFrame, provider) {
  if (!validMappedFrame(mappedFrame)) return failure("PERCEPTION_MAPPED_FRAME_INVALID");
  if (!validProviderDescriptor(provider)) return failure("PERCEPTION_PROVIDER_INVALID");

  const providerFrame = Object.freeze({
    mediaType:mappedFrame.frame.mediaType,
    width:mappedFrame.frame.width,
    height:mappedFrame.frame.height,
    dataBase64:mappedFrame.frame.dataBase64,
    coordinateSpace:Object.freeze({kind:"capture-pixel",origin:"top-left",width:mappedFrame.frame.width,height:mappedFrame.frame.height}),
  });

  let providerResult;
  try {
    providerResult = provider.observe(providerFrame);
  } catch (error) {
    return failure("PERCEPTION_PROVIDER_EXCEPTION", error?.message || "provider threw");
  }

  if (!providerResult || providerResult.ok === false) {
    return {
      ok:false,
      state:providerResult?.state || "FAILED",
      error:providerResult?.error || "PERCEPTION_PROVIDER_FAILED",
      detail:providerResult?.detail || "perception provider failed",
      recoveryPolicy:providerResult?.recoveryPolicy || "NONE",
      provider:{id:provider.id,locality:provider.locality,capabilities:[...provider.capabilities]},
    };
  }
  if (providerResult.state !== "OBSERVED" || !Array.isArray(providerResult.observations)) {
    return failure("PERCEPTION_PROVIDER_RESPONSE_INVALID");
  }
  if (providerResult.coordinateSpace?.kind !== "capture-pixel" || providerResult.coordinateSpace?.origin !== "top-left" ||
      Number(providerResult.coordinateSpace.width) !== mappedFrame.frame.width || Number(providerResult.coordinateSpace.height) !== mappedFrame.frame.height) {
    return failure("PERCEPTION_PROVIDER_FRAME_GEOMETRY_MISMATCH");
  }

  const observations=[];
  for (const raw of providerResult.observations) {
    const normalized=normalizeTextRegionObservation(raw,mappedFrame.frame.width,mappedFrame.frame.height);
    if (!normalized.ok) return failure(normalized.error);
    observations.push(normalized.observation);
  }

  return {
    ok:true,
    state:"VISUAL_INTERPRETATION_OBSERVED",
    frame:mappedFrame.frame,
    provenance:mappedFrame.provenance,
    actionCoordinateMapping:mappedFrame.actionCoordinateMapping,
    interpretation:{
      state:"OBSERVED",
      provider:{id:provider.id,locality:provider.locality,capabilities:[...provider.capabilities]},
      coordinateSpace:{kind:"capture-pixel",origin:"top-left",width:mappedFrame.frame.width,height:mappedFrame.frame.height},
      observations,
      semanticIdentityClaimed:false,
    },
    semanticTarget:{state:"UNRESOLVED"},
    actionPolicy:{state:"NOT_EVALUATED"},
    persistence:mappedFrame.persistence,
  };
}

module.exports = {
  interpretMappedVisualFrame,
  normalizeTextRegionObservation,
  validMappedFrame,
  validProviderDescriptor,
};
