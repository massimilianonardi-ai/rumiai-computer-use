"use strict";

const { validProviderDescriptor } = require("./perception-provider");
const {
  createMacOSVisionTextRegionProvider,
} = require("./perception-providers/macos-vision");

function normalizeCapabilities(value) {
  if (!Array.isArray(value)) return [];
  return [...new Set(value.map(v => String(v || "").trim()).filter(Boolean))].sort();
}

function availabilityOf(provider) {
  const check = provider?.availability?.check;
  if (typeof check !== "function") {
    return {state:"UNAVAILABLE", available:false, reason:"EXPLICIT_AVAILABILITY_REQUIRED"};
  }

  try {
    const result = check();
    if (result === true) return {state:"AVAILABLE", available:true, reason:"AVAILABLE"};
    if (result === false) return {state:"UNAVAILABLE", available:false, reason:"UNAVAILABLE"};
    if (result && typeof result === "object" && result.available === true) {
      return {
        state:"AVAILABLE",
        available:true,
        reason:String(result.reason || "AVAILABLE"),
      };
    }
    return {
      state:"UNAVAILABLE",
      available:false,
      reason:String(result?.reason || "UNAVAILABLE"),
    };
  } catch (error) {
    return {
      state:"UNAVAILABLE",
      available:false,
      reason:"AVAILABILITY_CHECK_FAILED",
      detail:error?.message || "availability check threw",
    };
  }
}

function describePerceptionProvider(provider) {
  const capabilities = normalizeCapabilities(provider?.capabilities);
  const availability = availabilityOf(provider);
  const structurallyValid = validProviderDescriptor(provider);

  return {
    id:String(provider?.id || ""),
    locality:String(provider?.locality || "unknown"),
    capabilities,
    structurallyValid,
    availability,
    requirements:provider?.requirements && typeof provider.requirements === "object"
      ? {...provider.requirements}
      : {},
  };
}

function defaultPerceptionProviders() {
  return [createMacOSVisionTextRegionProvider()];
}

function listPerceptionProviders(options = {}) {
  const providers = Array.isArray(options.providers)
    ? options.providers
    : defaultPerceptionProviders();

  return providers
    .map(provider => ({provider, descriptor:describePerceptionProvider(provider)}))
    .sort((a, b) => a.descriptor.id.localeCompare(b.descriptor.id));
}

function selectionFailure(error, detail = null, candidates = []) {
  return {
    ok:false,
    state:"PERCEPTION_PROVIDER_NOT_SELECTED",
    error,
    ...(detail ? {detail} : {}),
    candidates:candidates.map(item => item.descriptor),
    recoveryPolicy:"NONE",
  };
}

function selectPerceptionProvider(request = {}, options = {}) {
  const requiredCapabilities = normalizeCapabilities(
    request.capabilities == null ? ["text-region"] : request.capabilities
  );
  const locality = request.locality == null ? "local" : String(request.locality);
  const providerId = request.providerId == null ? null : String(request.providerId).trim();

  if (!requiredCapabilities.length) {
    return selectionFailure("PERCEPTION_PROVIDER_CAPABILITIES_REQUIRED");
  }
  if (!["local", "remote", "unknown", "any"].includes(locality)) {
    return selectionFailure("PERCEPTION_PROVIDER_LOCALITY_INVALID");
  }

  const listed = listPerceptionProviders(options);
  const valid = listed.filter(item => item.descriptor.structurallyValid);

  if (providerId) {
    const exact = valid.find(item => item.descriptor.id === providerId);
    if (!exact) {
      return selectionFailure("PERCEPTION_PROVIDER_ID_NOT_FOUND", providerId, valid);
    }
    if (!requiredCapabilities.every(cap => exact.descriptor.capabilities.includes(cap))) {
      return selectionFailure("PERCEPTION_PROVIDER_CAPABILITY_UNAVAILABLE", providerId, [exact]);
    }
    if (locality !== "any" && exact.descriptor.locality !== locality) {
      return selectionFailure("PERCEPTION_PROVIDER_LOCALITY_MISMATCH", providerId, [exact]);
    }
    if (!exact.descriptor.availability.available) {
      return selectionFailure("PERCEPTION_PROVIDER_UNAVAILABLE", exact.descriptor.availability.reason, [exact]);
    }

    return {
      ok:true,
      state:"PERCEPTION_PROVIDER_SELECTED",
      provider:exact.provider,
      descriptor:exact.descriptor,
      selection:{
        method:"explicit-id",
        requiredCapabilities,
        locality,
      },
    };
  }

  const candidates = valid.filter(item =>
    requiredCapabilities.every(cap => item.descriptor.capabilities.includes(cap)) &&
    (locality === "any" || item.descriptor.locality === locality)
  );

  const available = candidates
    .filter(item => item.descriptor.availability.available)
    .sort((a, b) => a.descriptor.id.localeCompare(b.descriptor.id));

  if (!available.length) {
    const hasCapability = valid.some(item =>
      requiredCapabilities.every(cap => item.descriptor.capabilities.includes(cap))
    );
    return selectionFailure(
      hasCapability
        ? "PERCEPTION_PROVIDER_UNAVAILABLE"
        : "PERCEPTION_PROVIDER_CAPABILITY_UNAVAILABLE",
      locality === "any" ? null : `locality=${locality}`,
      candidates.length ? candidates : valid
    );
  }

  const selected = available[0];
  return {
    ok:true,
    state:"PERCEPTION_PROVIDER_SELECTED",
    provider:selected.provider,
    descriptor:selected.descriptor,
    selection:{
      method:"capability-locality-id-order",
      requiredCapabilities,
      locality,
    },
  };
}

module.exports = {
  normalizeCapabilities,
  availabilityOf,
  describePerceptionProvider,
  defaultPerceptionProviders,
  listPerceptionProviders,
  selectPerceptionProvider,
};
