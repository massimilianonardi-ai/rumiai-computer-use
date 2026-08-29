"use strict";

const {
  selectPerceptionProvider,
} = require("./perception-provider-manager");
const {
  acquireMappedPrimaryVisualFrame,
} = require("./perception");
const {
  interpretMappedVisualFrame,
} = require("./perception-provider");

function failure(reason, detail = null) {
  return {
    ok:false,
    reason,
    ...(detail ? {detail} : {}),
    recoveryPolicy:"NONE",
  };
}

function validateOpenVisualFallbackContract(intent, contract) {
  if (!contract || typeof contract !== "object" || Array.isArray(contract)) {
    return failure("VISUAL_FALLBACK_CONTRACT_REQUIRED");
  }

  if (contract.policy?.allowVisualFallback !== true) {
    return failure("VISUAL_FALLBACK_NOT_EXPLICITLY_ALLOWED");
  }

  const targetQuery = contract.targetQuery;
  if (
    !targetQuery ||
    targetQuery.kind !== "text" ||
    targetQuery.match !== "exact" ||
    typeof targetQuery.text !== "string" ||
    !targetQuery.text.trim()
  ) {
    return failure("EXACT_VISUAL_TARGET_REQUIRED");
  }

  if (targetQuery.text.trim() !== String(intent?.target || "").trim()) {
    return failure("VISUAL_TARGET_MUST_MATCH_OPEN_TARGET");
  }

  const actionRequest = contract.actionRequest;
  if (
    !actionRequest ||
    actionRequest.kind !== "pointer-click" ||
    actionRequest.button !== "left" ||
    actionRequest.display !== "primary"
  ) {
    return failure("OPEN_VISUAL_ACTION_MUST_BE_PRIMARY_LEFT_CLICK");
  }

  const postcondition = contract.postcondition;
  if (
    !postcondition ||
    postcondition.kind !== "text" ||
    postcondition.match !== "exact" ||
    typeof postcondition.text !== "string" ||
    !postcondition.text.trim()
  ) {
    return failure("EXACT_VISUAL_POSTCONDITION_REQUIRED");
  }

  const providerRequest = contract.providerRequest && typeof contract.providerRequest === "object"
    ? contract.providerRequest
    : {capabilities:["text-region"], locality:"local"};

  return {
    ok:true,
    value:{
      targetQuery:{...targetQuery},
      actionRequest:{...actionRequest},
      policy:{allowVisualFallback:true},
      postcondition:{...postcondition},
      providerRequest:{
        capabilities:Array.isArray(providerRequest.capabilities)
          ? [...providerRequest.capabilities]
          : ["text-region"],
        locality:providerRequest.locality == null ? "local" : String(providerRequest.locality),
        ...(providerRequest.providerId ? {providerId:String(providerRequest.providerId)} : {}),
      },
    },
  };
}

function resolveOpenVisualFallbackExecutionContext(
  {intent, contract} = {},
  {
    selectProvider = selectPerceptionProvider,
    providerOptions = {},
    acquireMappedFrame = acquireMappedPrimaryVisualFrame,
    interpretFrame = interpretMappedVisualFrame,
  } = {}
) {
  const validated = validateOpenVisualFallbackContract(intent, contract);
  if (!validated.ok) return validated;

  const selected = selectProvider(validated.value.providerRequest, providerOptions);
  if (!selected?.ok || !selected.provider) {
    return failure(
      selected?.error || "PERCEPTION_PROVIDER_NOT_SELECTED",
      selected?.detail || selected?.state || null
    );
  }

  const provider = selected.provider;
  const observeAfterDelivery = () => {
    const mapped = acquireMappedFrame();
    if (!mapped?.ok) return mapped;
    return interpretFrame(mapped, provider);
  };

  return {
    ok:true,
    executionContext:{
      visualFallback:{
        provider,
        targetQuery:validated.value.targetQuery,
        actionRequest:validated.value.actionRequest,
        policy:validated.value.policy,
        postcondition:validated.value.postcondition,
        observeAfterDelivery,
      },
    },
    metadata:{
      provider:{
        id:selected.descriptor?.id || provider.id,
        locality:selected.descriptor?.locality || provider.locality,
        capabilities:[...(selected.descriptor?.capabilities || provider.capabilities || [])],
      },
      selection:{...(selected.selection || {})},
    },
  };
}

function createLazyOpenVisualFallbackExecutionContext(intent, contract, dependencies = {}) {
  return {
    resolveVisualFallbackContext:() =>
      resolveOpenVisualFallbackExecutionContext(
        {intent, contract},
        dependencies
      ),
  };
}

module.exports = {
  validateOpenVisualFallbackContract,
  resolveOpenVisualFallbackExecutionContext,
  createLazyOpenVisualFallbackExecutionContext,
};
