# P8D — Task resource context physical validation

Status: `PHYSICALLY_VALIDATED`

Authoritative physical session:

- session: `cu-perception-p8d-task-resource-context-physical-public-s01`
- evidence commit: `56439d05268b67427b901d686bac94ede4c12eb9`
- Computer Use expected/observed: `9088b0c2371852265b6334197f97ac13fd574070`
- Computer Control expected/observed: `e3a3f13d66546cf8f0fca50075bd4607c2c3d003`
- physical source: `66542db8413ea28e42a36332f680b1fc83348271`
- PoC tested: `c562f7662dbfad9bbf96e1b146f462b605625b19`
- result: `17 PASS / 0 FAIL / 0 BLOCKED`

## What P8D validates

P8D validates the real Pulsar `UTF-8` visual fallback path when the only trusted caller input is a provenance-bearing `taskResourceContext`:

```text
taskResourceContext
  -> explicit current-document file resource for Pulsar
  -> derived pulsar-document caller context
  -> bounded P7D visual contract
  -> semantic OPEN UTF-8 first
  -> structured NO_SEMANTIC_TARGET gap
  -> exact window-title surface precondition
  -> lazy local text-region provider selection
  -> visual UTF-8 target resolution
  -> CLICK_POSTED delivery
  -> independent post-action observation of UTF-16 LE
  -> VERIFIED_SUCCESS
```

The physical session confirms:

- `source=task-resource-context`;
- explicit resource ownership is present;
- `visualFallbackCallerContext` is not supplied by the caller;
- `visualFallbackContracts` are not supplied by the caller;
- one bounded `pulsar-document` caller context is derived from the task resource boundary;
- the planner remains semantic-only and contains no path, scope, surface precondition, postcondition, coordinates or provider object;
- semantic execution fails with structured `NO_SEMANTIC_TARGET` before visual perception becomes eligible;
- the exact `window-title` surface precondition is verified once before provider selection;
- the local `rumiai.local.macos-vision-text-region` provider is selected exactly once after the eligible semantic gap;
- Computer Control reports `CLICK_POSTED` only as delivery;
- delivery has `semanticConsequenceVerified=false`;
- task success is `VERIFIED_SUCCESS` only from `post-action-independent-observation`;
- the exact postcondition observed is `UTF-16 LE`;
- the temporary document content hash is unchanged;
- no encoding selection is confirmed by the test;
- no screenshot payload, OCR payload or visual coordinates are persisted;
- test-initiated external network use is false;
- selector dismissal, pointer restoration, Pulsar cleanup, Computer Control cleanup and temporary-file cleanup all pass.

## P8 lineage

- P8A: `PROVENANCE_GAP_CONFIRMED`, evidence `fde64d9aab6cc14f8583864222b7581f177b86f7`.
- P8B: `CONTRACT_VALIDATED`, evidence `d08f48dee5fd7c14e3000821bb516dcafeca9da7`.
- P8C: `CONTRACT_VALIDATED`, evidence `aabe4a69a4a4b4c0ef86ebb3cfd659300aa103d8`.
- P8D: `PHYSICALLY_VALIDATED`, evidence `56439d05268b67427b901d686bac94ede4c12eb9`.

## Architectural boundary preserved

P8D does **not** authorize UI-derived resource provenance. A document path must still originate from a caller that legitimately owns the resource before `runTask`; it must not be inferred from window titles, semantic snapshots, OCR, Vision, coordinates or planner text.

P8D also does not promote generic Pulsar status-bar clicking. The validated knowledge remains the bounded real-use case `Pulsar + current-document resource + OPEN UTF-8`, with exact surface identity and exact independent postcondition.

`CLICK_POSTED` remains delivery only. `delivery != success` is unchanged.

## Next checkpoint

P8E must identify or introduce the smallest real product caller that owns a current-document resource before `runTask` and can construct `taskResourceContext` from that ownership. The default interactive CLI must not invent resource provenance.
