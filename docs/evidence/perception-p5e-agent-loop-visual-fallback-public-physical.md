# P5E normal agent-loop visual fallback — public physical validation

Status: `PHYSICALLY_VALIDATED` on the reference Mac.

Authoritative session:

- session: `cu-perception-p5e-agent-loop-visual-fallback-public-s01`
- evidence commit: `d18e82d06456438f289eb0bf6c6f630973b5a99f`
- Computer Use runtime: `3e52ebaebc20398787d904d6ed6e2d2111fe5710`
- Computer Control dependency: `e3a3f13d66546cf8f0fca50075bd4607c2c3d003`
- frozen test source: `59094fe637d078eaa08436114e45d74308b45428`
- tested PoC SHA: `fdb6a17ce2f0744533c123016bff5fce8f4e7704`
- result: 8 PASS / 0 FAIL / 0 BLOCKED

## Physically validated path

The session exercised the product-owned normal `agent-loop.js::runTask()` path with a deterministic test planner that returned only ordinary semantic intents:

```text
ACTIVATE_APP(RumiAI P5C Semantic Fixture)
OPEN(RUMIAI CLICK 517)
```

The planner output contained no visual-fallback fields, perception-provider identity, postcondition or coordinates. The injected planner is test infrastructure for deterministic physical validation; this checkpoint does not claim LLM planning accuracy.

The OPEN intent then followed the product path:

```text
normal agent loop
→ semantic OPEN first
→ structured NO_SEMANTIC_TARGET
→ P5B eligible classification
→ lazy visual execution-context resolution
→ P5D local text-region provider selection
→ P5A coordinator
→ mapped capture / provider-neutral interpretation / exact target resolution
→ explicit fallback authorization
→ real Computer Control click delivery
→ fresh independent post-action observation
→ deterministic exact postcondition
→ VERIFIED_SUCCESS
```

The selected concrete provider was `rumiai.local.macos-vision-text-region`, with `locality = local`. Provider selection remained owned by Computer Use and happened only after the eligible semantic gap.

## Delivery remains distinct from success

The physical run preserved the delivery boundary:

- Computer Control returned `CLICK_POSTED`;
- `semanticConsequenceVerified` remained `false` at delivery;
- delivery alone did not satisfy the task;
- a fresh post-action mapped frame was interpreted by the selected provider;
- the independently observed exact postcondition was required before `taskOutcome.state = VERIFIED_SUCCESS`.

Therefore P5E preserves the project invariant `delivery != success` through the normal agent loop.

## Planner and policy boundary

The deterministic visual target, primary-display left-click request, explicit `allowVisualFallback = true` policy and exact postcondition came from caller/skill execution context rather than planner output. The visual context was resolved lazily only after P5B classified the semantic result as eligible.

Ordinary CLI calls that provide no explicit visual-fallback contract do not gain implicit visual fallback. Semantic delivery failures, semantic verification failures, readiness/permission failures, invalid inputs and internal exceptions remain visually ineligible by default.

## Privacy and cleanup

The session evidence contains no screenshot payloads, OCR payload text or target/action coordinates. Perception helper cache data was kept in the session temporary directory. Pointer restoration, fixture shutdown, application cleanup and Computer Control runtime cleanup all passed. Both product trees were clean after the session.

## Scope

This closes P5 for the initial narrow scope. It does not claim general OCR accuracy, fuzzy matching, icon/object/VLM understanding, multi-display or rotated-display support, arbitrary gestures, arbitrary postconditions, or general product-skill coverage.

P1–P4 and prior P5 evidence remain immutable and were not physically rerun by this session.
