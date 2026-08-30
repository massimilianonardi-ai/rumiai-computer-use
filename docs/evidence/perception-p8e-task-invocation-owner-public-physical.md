# P8E — task invocation owner physical validation

Status: **PHYSICALLY_VALIDATED**

## Authoritative session

- session: `cu-perception-p8e-task-invocation-owner-physical-public-s01`
- evidence commit: `48474a6c7ae94905c68eee69afa453bd52aea7e0`
- Computer Use expected/observed: `e045791532c981e844df8e7b1bb21dd723b6f72c`
- Computer Control expected/observed: `e3a3f13d66546cf8f0fca50075bd4607c2c3d003`
- frozen physical test source: `6caa5ac44ef05604310c4e792b085309db44c472`
- tested PoC: `64cddcdb0184c8585e22a1891976e546dc5e268f`
- result: **18 PASS / 0 FAIL / 0 BLOCKED**

Contract prerequisite:

- session: `cu-perception-p8e-task-invocation-owner-public-s01`
- evidence: `9ee985d84bd8aaf0f187783afdb20bdaf9c255da`
- result: 17 PASS / 0 FAIL / 0 BLOCKED

## Proven boundary

P8E adds a real product invocation owner in `app/task-invocation.js`.

The accepted invocation envelope is deliberately bounded:

```text
{
  version,
  task,
  resources[]
}
```

The invocation boundary owns the caller-supplied resource envelope before planner execution, normalizes it through the P8B task-resource contract, and invokes `runTask` exactly once with `taskResourceContext` as its only visual/provenance option.

It does not accept direct `documentPath`, `visualFallbackContracts`, `visualFallbackCallerContext`, `taskResourceContext`, hidden visual dependencies, or arbitrary option injection from the invocation envelope.

## Physical path proven

The authoritative physical session exercised the real Pulsar `UTF-8` selector case through `task-invocation.js`, not by directly calling `runTask` from the physical fixture:

```text
explicit task invocation JSON
→ task-invocation owner
→ taskResourceContext
→ derived pulsar-document caller context
→ semantic planner output
→ semantic OPEN UTF-8 first
→ structured NO_SEMANTIC_TARGET
→ exact current-document window-title precondition
→ lazy local macOS Vision provider selection
→ exact UTF-8 visual target
→ Computer Control CLICK_POSTED
→ fresh independent exact UTF-16 LE observation
→ VERIFIED_SUCCESS
```

Observed physical markers included:

- `p8e-task-invocation=PASS`
  - invocation version 1
  - explicit resources
  - invocation JSON
  - `runTaskCalls=1`
  - task preserved
  - forwarded source `taskResourceContext`
  - no alternate visual sources
- `p8e-provenance-chain=PASS`
  - owner `task-invocation`
  - source `task-resource-context`
  - derived caller context `pulsar-document`
  - no explicit caller context or contracts
  - exact `window-title` surface materialized
- `p8e-planner-boundary=PASS`
  - planner semantic-only
  - resource path, invocation, caller context, scope, surface precondition and postcondition all outside planner
  - no coordinates/provider object
- `p8e-semantic-first=PASS`
  - `NO_SEMANTIC_TARGET`
  - provider selection only after eligible semantic gap
- `p8e-provider=PASS`
  - `rumiai.local.macos-vision-text-region`
  - one provider-selection call
  - one window observation
  - one surface verification
- `p8e-postcondition=PASS`
  - exact `UTF-16 LE`
  - independent post-action observation
- `p8e-delivery-success-separation=PASS`
  - `CLICK_POSTED` is delivery only
  - `semanticConsequenceVerifiedAtDelivery=false`
  - task outcome becomes `VERIFIED_SUCCESS` only from `post-action-independent-observation`
- document content hash unchanged
- no encoding selection confirmed
- no raw snapshot, screenshot, OCR payload or coordinates persisted
- no test-initiated external network
- selector dismissed, pointer restored, Pulsar terminated, runtime shut down and temporary files removed

## Claims and non-claims

P8E proves a product-level, provenance-bearing, non-interactive task invocation boundary for callers that explicitly own and provide the current Pulsar document resource.

It does **not** claim that the default interactive CLI can discover or synthesize document provenance. The existing interactive entrypoint remains separate and must not infer a path from window title, semantic snapshot, OCR, Vision, coordinates, planner output, or foreground application state.

P8E does not authorize generic Pulsar status-bar clicking, arbitrary targets, prefix/fuzzy surface matching, generic application resource synthesis, or automatic promotion of resource context into persistent/default state.

`CLICK_POSTED != success` remains a hard invariant.