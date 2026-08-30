# RumiAI Computer Use — handoff

Date: 2026-08-30

Repository state plus immutable evidence commits are authoritative when chat history differs.

## Current authoritative state

- P1–P4: `PHYSICALLY_VALIDATED`
- P5: initial narrow semantic-first visual fallback `COMPLETE`
- P6A: `PHYSICALLY_VALIDATED`
- P6B: `PHYSICALLY_OBSERVED`
- P6C: `PHYSICALLY_VALIDATED`
- P6D: `PHYSICALLY_VALIDATED`
- initial P6 visual-fallback safety architecture: `COMPLETE`
- P7A: `DIAGNOSTIC_OBSERVED`
- P7B: `DIAGNOSTIC_OBSERVED`
- P7C: `REAL_USE_CANDIDATE_PHYSICALLY_VALIDATED`
- P7D: `CONTRACT_VALIDATED`
- P7E: `PHYSICALLY_VALIDATED`
- P7 first real-use promotion: `COMPLETE` at explicit `runTask` caller-context boundary
- P8A: `PROVENANCE_GAP_CONFIRMED`
- P8B: `CONTRACT_VALIDATED`
- P8C: `CONTRACT_VALIDATED`
- P8D: `PHYSICALLY_VALIDATED`
- active checkpoint: **P8E real resource-owning product caller**

## Latest authoritative physical validation

P8D is the current top checkpoint.

- Computer Use validated runtime: `9088b0c2371852265b6334197f97ac13fd574070`
- Computer Control dependency: `e3a3f13d66546cf8f0fca50075bd4607c2c3d003`
- session: `cu-perception-p8d-task-resource-context-physical-public-s01`
- evidence: `56439d05268b67427b901d686bac94ede4c12eb9`
- frozen physical source: `66542db8413ea28e42a36332f680b1fc83348271`
- tested PoC: `c562f7662dbfad9bbf96e1b146f462b605625b19`
- result: **17 PASS / 0 FAIL / 0 BLOCKED**

See `docs/evidence/perception-p8d-task-resource-context-public-physical.md`.

P8D validated that `runTask` can receive only a provenance-bearing `taskResourceContext`, derive the already-bounded `pulsar-document` caller context, retain semantic-first execution and complete the real Pulsar `UTF-8` fallback with independent success evidence.

## P8 authoritative lineage

### P8A — provenance gap

State: `PROVENANCE_GAP_CONFIRMED`.

- session: `cu-perception-p8a-caller-context-provenance-gap-public-s01`
- evidence: `fde64d9aab6cc14f8583864222b7581f177b86f7`
- result: 14 PASS / 0 FAIL / 0 BLOCKED

Conclusion: existing Pulsar skills/session/default CLI did not legitimately own a current-document path. No UI/planner inference is authorized to fill the gap.

### P8B — task resource provenance boundary

State: `CONTRACT_VALIDATED`.

Product: `app/task-resource-context.js`.

- session: `cu-perception-p8b-task-resource-context-public-s01`
- evidence: `d08f48dee5fd7c14e3000821bb516dcafeca9da7`
- product: `e55e038bdb5ffd5fc5c846cd74d8f69d872a73b3`
- result: 15 PASS / 0 FAIL / 0 BLOCKED

Bounded initial resource shape:

```text
version = 1
resources[]:
  kind = file
  role = current-document
  application = Pulsar
  path = absolute caller-owned path
```

The boundary performs no filesystem discovery and no UI/perception inference. Relative paths, unsupported versions/resources, oversized contexts and ambiguous current-document ownership fail closed.

### P8C — normal `runTask` resource wiring

State: `CONTRACT_VALIDATED`.

- session: `cu-perception-p8c-agent-loop-task-resource-context-public-s01`
- evidence: `aabe4a69a4a4b4c0ef86ebb3cfd659300aa103d8`
- Computer Use: `9088b0c2371852265b6334197f97ac13fd574070`
- result: 16 PASS / 0 FAIL / 0 BLOCKED

`runTask` visual-knowledge sources are explicit and mutually exclusive:

```text
visualFallbackContracts
XOR visualFallbackCallerContext
XOR taskResourceContext
```

Zero sources is valid and means no visual knowledge. `agent-loop.js` still does not contain `documentPath`; the default interactive CLI still calls `runTask(task)` without task resources.

### P8D — physical task resource path

State: `PHYSICALLY_VALIDATED`.

The physical session supplied only one explicit temporary Pulsar `current-document` file resource through `taskResourceContext`. It supplied neither `visualFallbackContracts` nor `visualFallbackCallerContext`.

Validated chain:

```text
caller-owned file resource
→ taskResourceContext
→ derived pulsar-document caller context
→ bounded P7D contract
→ semantic OPEN UTF-8
→ structured NO_SEMANTIC_TARGET
→ exact window-title surface guard
→ lazy local Vision
→ exact UTF-8 target
→ Computer Control CLICK_POSTED
→ independent exact UTF-16 LE observation
→ VERIFIED_SUCCESS
```

Physical markers:

- `source=task-resource-context`: PASS
- derived caller context `pulsar-document`: PASS
- explicit caller context absent: PASS
- explicit contracts absent: PASS
- semantic-only planner: PASS
- semantic `NO_SEMANTIC_TARGET`: PASS
- exact current-document surface guard: PASS
- provider selection after gap/guard: one call
- `CLICK_POSTED`: PASS, delivery only
- independent exact `UTF-16 LE`: PASS
- `VERIFIED_SUCCESS`: PASS
- temporary document hash unchanged: PASS
- no encoding selection confirmed: PASS
- no screenshot/OCR/coordinates persisted: PASS
- no test-initiated external network: PASS
- selector/pointer/Pulsar/runtime/temp cleanup: PASS
- product trees clean: PASS

## Non-negotiable invariants

1. Semantic-first: structured semantic operation is preferred whenever it can solve the task.
2. Visual fallback is explicit and is never a generic retry mechanism.
3. `delivery != success`; `CLICK_POSTED` is delivery evidence only.
4. `IMPLEMENTED != PHYSICALLY_VALIDATED`.
5. Planner output remains semantic: no coordinates, provider identity, caller context, resource identity/path, scope identity, surface identity or fabricated postconditions.
6. Only structured P5B-eligible semantic observability/resolution gaps may consider visual fallback.
7. Perception-provider selection belongs to Computer Use, never Computer Control.
8. Runtime surface preconditions are checked before provider selection/action delivery.
9. Caller/resource-owned identity must not be guessed from UI state.
10. No mandatory network/account/cloud API dependency.
11. Screenshot bytes, OCR text and coordinates remain ephemeral/out of ordinary logs.
12. Physical evidence is immutable and Git is forward-only.

## Current validated orchestration

The most advanced validated path is now:

```text
trusted caller-owned file resource
→ versioned taskResourceContext
→ normal runTask
→ semantic planner output
→ bounded resource normalization
→ bounded caller-context derivation
→ bounded P7D contract materialization
→ semantic OPEN first
→ structured P5B-eligible gap
→ deterministic runtime surface precondition
→ fail closed if missing / ambiguous / mismatched
→ lazy Computer Use-owned local perception-provider selection
→ exact visual target
→ Computer Control CLICK_POSTED
→ independent post-action perception
→ exact postcondition
→ VERIFIED_SUCCESS
```

`CLICK_POSTED` never implies success.

## P6 closed safety architecture

P6 remains complete and must not be reopened merely because P7/P8 evolve.

- P6A registry evidence: `21ad01e93a5de4e5276b49c193269a26ad66b164`
- P6B Safari observation evidence: `e8a2899c58c5e6d3725d4457af18aefc25923580`
- P6C scoped integration evidence: `c66eb5ba69d9e0435cb894731b1d1cea832c31e1`
- P6D surface-precondition evidence: `ec7e9757dada06ca313e585c09a42fcf7202e90d`

Controlled Safari evidence does not authorize generic Safari/web fallback.

## P7 closed real-use promotion

P7 remains complete at the explicit caller-context API boundary.

- P7A evidence: `65c7a674984638529ee8be603a6df09445f68deb`
- P7B evidence: `5f5045693400f8957e98baea6ba76fc428011e7f`
- P7C physical evidence: `77fd94bd6b765a56182822cf2a43297b6baa1537`
- P7D contract evidence: `31f10c01244d98eee1c8f309e46b0578d2d60337`
- P7E contract evidence: `e1bb360188c3713653b09b0c2320fe45d4261f2d`
- P7E physical evidence: `6af4a606eb71418cde61eddd3cdd1fade9b083d2`

Do not generalize P7/P8 into generic Pulsar status-bar clicking, arbitrary targets, automatic path inference, prefix/contains/fuzzy surface matching or generic browser/application behavior.

## Active checkpoint: P8E real resource-owning product caller

P8D proves the resource transport/execution path, but the physical fixture itself owned the temporary file resource. P8E must move resource ownership into a normal product invocation/workflow boundary.

Required discovery/design question:

> Which smallest normal Computer Use caller already receives or deterministically creates a file path **before** `runTask` and can therefore construct `taskResourceContext` as an ownership fact rather than an inference?

If no such caller exists, add the smallest explicit resource-owning invocation boundary rather than reading the GUI.

P8E constraints:

1. Resource ownership must originate before the planner.
2. No window-title/snapshot/OCR/Vision/coordinate derivation of resource identity.
3. No free-form planner-produced resource paths.
4. No default implicit CLI resource context.
5. Missing, stale, ambiguous or incompatible ownership must fail closed.
6. Preserve `taskResourceContext` versioning and bounded cardinality.
7. Preserve P7D/P7E/P8B/P8C behavior unchanged.
8. Preserve lazy provider selection after semantic gap and surface guard.
9. Preserve `CLICK_POSTED != success`.
10. Contract-test the owner/provenance boundary before physical validation.
11. Physically validate the same real Pulsar use case through the real owner before claiming default product support.

## Reference paths

```text
Computer Use     /Volumes/RumiAI/rumiai-portable-runtime/app/computer-use
Computer Control /Volumes/RumiAI/rumiai-portable-runtime/lib/computer-control
PoC              /Volumes/RumiAI/rumiai-portable-runtime/test/computer-use-poc
Node             /Volumes/RumiAI/rumiai-portable-runtime/bin/nodejs/bin/node
agent-ctrl        /Volumes/RumiAI/rumiai-portable-runtime/bin/agent-ctrl
```

For every fresh manual terminal session, the first command must be `cd` into the relevant repository. Use `git pull --ff-only`; never reset or rewrite evidence history.

## Development workflow

1. Verify current remote heads before editing.
2. Fetch current blob SHA before every GitHub update.
3. Implement/discover forward-only.
4. Freeze exact product/test-source SHAs.
5. Add only runner + manifest after source freeze.
6. User runs the immutable session.
7. Inspect remote evidence, not only terminal summary.
8. Promote only the claims evidenced.

Immediate next checkpoint: **P8E real resource-owning product caller discovery/design**.
