# Visual fallback orchestration

Status: **P5 COMPLETE; initial P6 safety architecture COMPLETE; P7 first real-use promotion COMPLETE; P8 trusted resource provenance COMPLETE at the product task-invocation owner boundary; P9 external invocation integration ACTIVE**.

## Validated / observed states

- P1–P4: `PHYSICALLY_VALIDATED`
- P5A: `PHYSICALLY_VALIDATED`
- P5B: `CONTRACT_VALIDATED`
- P5C: `PHYSICALLY_VALIDATED`
- P5D: `PHYSICALLY_VALIDATED`
- P5E: `PHYSICALLY_VALIDATED`
- P6A: `PHYSICALLY_VALIDATED`
- P6B: `PHYSICALLY_OBSERVED`
- P6C: `PHYSICALLY_VALIDATED`
- P6D: `PHYSICALLY_VALIDATED`
- P7A: `DIAGNOSTIC_OBSERVED`
- P7B: `DIAGNOSTIC_OBSERVED`
- P7C: `REAL_USE_CANDIDATE_PHYSICALLY_VALIDATED`
- P7D: `CONTRACT_VALIDATED`
- P7E: `PHYSICALLY_VALIDATED`
- P8A: `PROVENANCE_GAP_CONFIRMED`
- P8B: `CONTRACT_VALIDATED`
- P8C: `CONTRACT_VALIDATED`
- P8D: `PHYSICALLY_VALIDATED`
- P8E: `PHYSICALLY_VALIDATED`
- P8 trusted resource provenance: `COMPLETE` at the product task-invocation owner boundary
- P9 external invocation / higher-level integration: `ACTIVE`

Detailed operational state is in `docs/handoff.md`. Physical evidence is under `docs/evidence/`.

## Fixed invariants

- Semantic-first: visual perception is not run merely because it exists.
- A successful semantic operation is never replaced by a coordinate click.
- Only explicit structured semantic observability/resolution gaps may be visually eligible.
- Planner output remains semantic and contains no coordinates, native IDs, provider identity, caller-context identity, resource identity, scope identity, surface identity or fabricated success criteria.
- Visual fallback requires deterministic caller-owned target + postcondition and explicit authorization.
- Computer Use owns perception interpretation, provider selection, policy and success verification.
- Computer Control owns observation/action delivery mechanics.
- `CLICK_POSTED` is delivery only.
- `VERIFIED_SUCCESS` requires independent post-action evidence.
- Runtime surface preconditions are checked before provider selection/action delivery.
- Resource provenance is explicit and must not be inferred from UI state.
- Perception payloads and coordinates remain ephemeral and out of ordinary logs/evidence.
- No mandatory network/account/cloud API dependency is introduced.
- Evidence is immutable; Git advances forward-only.

## P5 — initial semantic-first visual fallback

Status: `COMPLETE` for the initial narrow scope.

Validated path:

```text
semantic intent
→ semantic-first execution
→ structured visual eligibility
→ optional local perception-provider selection
→ exact-text visual fallback
→ Computer Control delivery
→ independent exact-text postcondition
→ VERIFIED_SUCCESS
```

Authoritative P5E:

- session: `cu-perception-p5e-agent-loop-visual-fallback-public-s01`
- evidence: `d18e82d06456438f289eb0bf6c6f630973b5a99f`
- result: 8 PASS / 0 FAIL / 0 BLOCKED

## P6 — caller-owned safety architecture

Status: `COMPLETE`.

### P6A — deterministic caller-contract registry

Status: `PHYSICALLY_VALIDATED`.

Exact bounded lookup separated caller knowledge from provider selection and Computer Control.

- evidence: `21ad01e93a5de4e5276b49c193269a26ad66b164`

### P6B — real-application discovery

Status: `PHYSICALLY_OBSERVED`.

A real Safari instance on a controlled loopback canvas proved semantic gap → local Vision → `CLICK_POSTED` → independent `VERIFIED_SUCCESS`.

- evidence: `e8a2899c58c5e6d3725d4457af18aefc25923580`
- result: 10 PASS / 0 FAIL / 0 BLOCKED

This is not generic Safari/web authorization.

### P6C — scoped caller integration

Status: `PHYSICALLY_VALIDATED`.

Scope remains outside planner output; wrong scope fails closed.

- evidence: `c66eb5ba69d9e0435cb894731b1d1cea832c31e1`
- result: 11 PASS / 0 FAIL / 0 BLOCKED

### P6D — runtime surface precondition

Status: `PHYSICALLY_VALIDATED`.

Validated order:

```text
semantic OPEN
→ P5B-eligible gap
→ exact caller-owned runtime surface precondition
→ only then provider selection
→ visual fallback
→ CLICK_POSTED
→ independent post-action evidence
→ VERIFIED_SUCCESS
```

Authoritative validation:

- session: `cu-perception-p6d-semantic-title-surface-precondition-public-s10`
- evidence: `ec7e9757dada06ca313e585c09a42fcf7202e90d`
- result: 12 PASS / 0 FAIL / 0 BLOCKED

The immutable s01–s09 lineage established why arbitrary DOM headings and Safari browser-owned composite titles were unsuitable. No prefix/contains/fuzzy workaround was introduced.

## P7 — first evidence-backed real-use promotion

Status: `COMPLETE` at the explicit `runTask` caller-context boundary.

Real use case: Pulsar current-document encoding selector, exact `UTF-8` target, exact independent `UTF-16 LE` postcondition.

### P7A / P7B — discovery

- P7A evidence: `65c7a674984638529ee8be603a6df09445f68deb`
- P7B evidence: `5f5045693400f8957e98baea6ba76fc428011e7f`

P7A found `UTF-8` as a real semantic gap exact-visible to local Vision. P7B proved an exact caller-derivable current-document Pulsar `window-title` surface identity.

### P7C — real-use end-to-end candidate

Status: `REAL_USE_CANDIDATE_PHYSICALLY_VALIDATED`.

- s01 immutable fixture FAIL: `6d73c69ecac5e44d84bb12975c6020fa7fde0304`
- authoritative s02 PASS: `77fd94bd6b765a56182822cf2a43297b6baa1537`

Validated:

```text
semantic OPEN UTF-8
→ NO_SEMANTIC_TARGET
→ exact current-document guard
→ local Vision
→ exact UTF-8
→ CLICK_POSTED
→ independent exact UTF-16 LE
→ VERIFIED_SUCCESS
```

### P7D — bounded Pulsar contract materializer

Status: `CONTRACT_VALIDATED`.

Product: `app/pulsar-encoding-selector-visual-contract.js`.

- evidence: `31f10c01244d98eee1c8f309e46b0578d2d60337`

It contains no coordinates, concrete provider object or Computer Control logic.

### P7E — explicit caller context in normal `runTask`

Status: `PHYSICALLY_VALIDATED`.

Product boundary accepts abstract `pulsar-document` caller context; `agent-loop.js` does not infer `documentPath` from the UI.

- contract evidence: `e1bb360188c3713653b09b0c2320fe45d4261f2d`
- physical evidence: `6af4a606eb71418cde61eddd3cdd1fade9b083d2`
- result: 14 PASS / 0 FAIL / 0 BLOCKED

P7 completion authorizes only callers that already legitimately own the current Pulsar document path.

## P8 — trusted resource provenance

Status: `COMPLETE` at the product task-invocation owner boundary.

P8 moved ownership outward from `documentPath` caller context to an explicit pre-planner resource envelope and then to a real product invocation owner.

### P8A — provenance gap

Status: `PROVENANCE_GAP_CONFIRMED`.

- evidence: `fde64d9aab6cc14f8583864222b7581f177b86f7`
- result: 14 PASS / 0 FAIL / 0 BLOCKED

The existing default CLI/provider/skills did not legitimately own a current-document path. UI/planner inference was explicitly rejected.

### P8B — task resource context

Status: `CONTRACT_VALIDATED`.

Product: `app/task-resource-context.js`.

Bounded initial resource:

```text
version = 1
kind = file
role = current-document
application = Pulsar
path = absolute caller-owned path
```

- evidence: `d08f48dee5fd7c14e3000821bb516dcafeca9da7`
- result: 15 PASS / 0 FAIL / 0 BLOCKED

The boundary performs no filesystem/UI/perception discovery and fails closed on invalid/ambiguous resources.

### P8C — resource context wiring into `runTask`

Status: `CONTRACT_VALIDATED`.

Explicit visual-knowledge source rule:

```text
visualFallbackContracts
XOR visualFallbackCallerContext
XOR taskResourceContext
```

Zero sources remains valid and means no visual knowledge.

- evidence: `aabe4a69a4a4b4c0ef86ebb3cfd659300aa103d8`
- result: 16 PASS / 0 FAIL / 0 BLOCKED

### P8D — physical task-resource validation

Status: `PHYSICALLY_VALIDATED`.

- session: `cu-perception-p8d-task-resource-context-physical-public-s01`
- evidence: `56439d05268b67427b901d686bac94ede4c12eb9`
- result: 17 PASS / 0 FAIL / 0 BLOCKED

Validated chain:

```text
explicit file resource
→ taskResourceContext
→ pulsar-document caller context
→ semantic OPEN UTF-8
→ NO_SEMANTIC_TARGET
→ exact surface guard
→ local Vision
→ CLICK_POSTED
→ independent UTF-16 LE
→ VERIFIED_SUCCESS
```

See `docs/evidence/perception-p8d-task-resource-context-public-physical.md`.

### P8E — real resource-owning product caller

Status: `PHYSICALLY_VALIDATED`.

Product: `app/task-invocation.js`.

Bounded invocation envelope:

```text
{
  version,
  task,
  resources[]
}
```

The invocation owner validates resources before planner execution and calls `runTask` exactly once with `taskResourceContext` as its only provenance/visual option. Alternate visual knowledge fields are rejected at the invocation boundary.

Contract validation:

- session: `cu-perception-p8e-task-invocation-owner-public-s01`
- evidence: `9ee985d84bd8aaf0f187783afdb20bdaf9c255da`
- result: 17 PASS / 0 FAIL / 0 BLOCKED

Authoritative physical validation:

- session: `cu-perception-p8e-task-invocation-owner-physical-public-s01`
- evidence: `48474a6c7ae94905c68eee69afa453bd52aea7e0`
- Computer Use expected/observed: `e045791532c981e844df8e7b1bb21dd723b6f72c`
- Computer Control expected/observed: `e3a3f13d66546cf8f0fca50075bd4607c2c3d003`
- frozen physical source: `6caa5ac44ef05604310c4e792b085309db44c472`
- tested PoC: `64cddcdb0184c8585e22a1891976e546dc5e268f`
- result: **18 PASS / 0 FAIL / 0 BLOCKED**

Physical markers prove:

```text
explicit invocation JSON
→ owner=task-invocation
→ taskResourceContext only
→ derived pulsar-document context
→ semantic NO_SEMANTIC_TARGET
→ exact window-title surface guard
→ local Vision selected once
→ CLICK_POSTED (delivery only)
→ independent exact UTF-16 LE observation
→ VERIFIED_SUCCESS
```

Task text was preserved, `runTask` was called once, no alternate visual source crossed the invocation boundary, document hash stayed unchanged, and cleanup passed completely.

See `docs/evidence/perception-p8e-task-invocation-owner-public-physical.md`.

### P8 completion boundary

P8 now proves a real product-level owner for explicit pre-planner file-resource provenance.

It does **not** claim that the default interactive CLI can infer or synthesize the resource. It does not authorize persistent/global resource state, generic Pulsar clicking, arbitrary targets, or UI-derived paths.

## P9 — external invocation / higher-level integration

Status: `ACTIVE`.

P9 must move one boundary farther outward without weakening P8: prove how a genuinely external/higher-level RumiAI caller hands a versioned invocation to the product owner while preserving exact resource provenance and fail-closed behavior.

P9 invariants:

- P8 task invocation schema remains the authoritative inner boundary;
- external transport must not add alternate visual knowledge fields;
- no external caller may synthesize a file path from UI/OCR/Vision/window state;
- resource identity remains explicit, task/run bounded and inspectable;
- planner remains semantic-only;
- provider selection remains after a P5B-eligible semantic gap and exact surface guard;
- `CLICK_POSTED` remains delivery only;
- independent post-action evidence remains mandatory for `VERIFIED_SUCCESS`;
- default interactive CLI provenance is a separate program and must not be implied by P9 unless explicitly designed and validated.

Immediate checkpoint: **P9A inspect the executable/stdin invocation path and available higher-level integration boundaries, then contract-test the smallest external transport without changing the P8 resource semantics.**

## Deferred hardening

Separate evidence programs remain for:

- default interactive CLI resource provenance;
- provider packaging/cache/version hardening;
- additional local/remote providers and ranking;
- fuzzy/contextual text matching;
- icon/object/VLM observations;
- secondary/rotated displays;
- richer pointer/keyboard gestures;
- richer postconditions/recovery;
- additional application/use-case promotions.
