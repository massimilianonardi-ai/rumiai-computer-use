# Visual fallback orchestration

Status: **P5 COMPLETE for the initial narrow scope; initial P6 safety architecture COMPLETE; P7 real-use promotion COMPLETE at the `runTask` API boundary; P8 caller-context provenance ACTIVE at P8E**.

Validated/observed states:

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
- P8E: `ACTIVE`

Detailed perception/action contracts are in `docs/perception.md`; operational resume state is in `docs/handoff.md`.

## Fixed invariants

- Semantic-first: visual perception is not run merely because it exists.
- A successful semantic operation is never replaced by a coordinate click.
- Only explicit structured semantic observability/resolution gaps may be visually eligible.
- Planner output remains semantic and contains no screen coordinates, native IDs, provider identity, caller-context identity, resource identity, scope identity, surface identity or fabricated success criteria.
- Visual fallback requires deterministic caller-owned target + postcondition and explicit authorization.
- Computer Use owns perception interpretation, provider selection, policy and success verification.
- Computer Control owns observation/action delivery mechanics and remains perception-provider-free.
- `CLICK_POSTED` is delivery only.
- `VERIFIED_SUCCESS` requires independent post-action evidence.
- Runtime surface preconditions are checked before provider selection/action delivery.
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
→ explicit primary-display left-click authorization
→ Computer Control delivery
→ independent exact-text postcondition
→ VERIFIED_SUCCESS
```

Authoritative P5E validation:

- session: `cu-perception-p5e-agent-loop-visual-fallback-public-s01`
- evidence: `d18e82d06456438f289eb0bf6c6f630973b5a99f`
- Computer Use runtime: `3e52ebaebc20398787d904d6ed6e2d2111fe5710`
- Computer Control: `e3a3f13d66546cf8f0fca50075bd4607c2c3d003`
- result: 8 PASS / 0 FAIL / 0 BLOCKED

The normal agent-loop plan remained semantic. Provider selection occurred only after structured `NO_SEMANTIC_TARGET`; real Computer Control returned `CLICK_POSTED`; only fresh post-action local Vision evidence produced `VERIFIED_SUCCESS`.

## P6 — caller-owned safety architecture

Status: `COMPLETE`.

### P6A — deterministic caller-contract registry

Status: `PHYSICALLY_VALIDATED`.

`app/visual-fallback-contract-manager.js` provides deterministic caller-owned visual execution knowledge separate from competence skills and perception-provider selection.

Original bounded lookup:

```text
application + OPEN + exact target
```

Authoritative evidence: `21ad01e93a5de4e5276b49c193269a26ad66b164`.

See `docs/evidence/perception-p6a-caller-contract-registry-public-physical.md`.

### P6B — real-application discovery

Status: `PHYSICALLY_OBSERVED`.

A real Safari instance loaded a controlled loopback page with a target rendered only into canvas. The authoritative session proved `NO_SEMANTIC_TARGET`, local Vision exact target resolution, `CLICK_POSTED`, and `VERIFIED_SUCCESS` only after fresh independent post-action perception.

- session: `cu-perception-p6b-safari-canvas-discovery-public-s06`
- evidence: `e8a2899c58c5e6d3725d4457af18aefc25923580`
- result: 10 PASS / 0 FAIL / 0 BLOCKED

P6B is observation, not generic Safari authorization.

See `docs/evidence/perception-p6b-safari-canvas-discovery-public-physical.md`.

### P6C — scoped caller integration

Status: `PHYSICALLY_VALIDATED`.

Bounded lookup became:

```text
scopeId + application + OPEN + exact target
```

Scope stays outside planner output. Wrong scope fails closed. Provider selection does not occur during contract selection.

- session: `cu-perception-p6c-scoped-caller-integration-public-s01`
- evidence: `c66eb5ba69d9e0435cb894731b1d1cea832c31e1`
- result: 11 PASS / 0 FAIL / 0 BLOCKED

See `docs/evidence/perception-p6c-scoped-caller-integration-public-physical.md`.

### P6D — runtime surface precondition

Status: `PHYSICALLY_VALIDATED`.

P6D added the missing runtime guard:

```text
semantic OPEN first
→ P5B-eligible structured gap
→ deterministic caller-owned runtime surface precondition
→ fail closed on missing/ambiguous/mismatched surface
→ only then lazy Computer Use-owned provider selection
→ bounded visual fallback
→ CLICK_POSTED
→ independent post-action evidence
→ VERIFIED_SUCCESS
```

Authoritative validation:

- session: `cu-perception-p6d-semantic-title-surface-precondition-public-s10`
- evidence: `ec7e9757dada06ca313e585c09a42fcf7202e90d`
- Computer Use runtime: `a90ab782d85e1283e76b4b64aa9bdbe54a7e4e0e`
- frozen physical test source: `d5b6d9561b98409d52a84f4c1a45aa59de489357`
- tested PoC: `8eeaa3654b65cf15bf079240badb8aa3ccd47532`
- result: 12 PASS / 0 FAIL / 0 BLOCKED

The s01–s07 failures and s08–s09 diagnostics remain immutable. They established that arbitrary DOM headings and Safari's browser-owned window-title suffix were unsuitable for the proof. No prefix/contains/fuzzy matching was introduced.

See `docs/evidence/perception-p6d-surface-precondition-public-physical.md`.

### P6 completion boundary

P6 proves the mechanism required to promote future real-use-case knowledge safely. It does not authorize arbitrary applications, surfaces or web content.

## P7 — first evidence-backed real-use promotion

Status: `COMPLETE` at the explicit `runTask` caller-context boundary.

P7 moved from generic mechanism validation to one genuinely useful, bounded, real-application case: opening the encoding selector for the current Pulsar document by visually activating exact `UTF-8` only when semantic execution cannot resolve that target.

### P7A — real-use gap discovery

Status: `DIAGNOSTIC_OBSERVED`.

- evidence: `65c7a674984638529ee8be603a6df09445f68deb`
- application: Pulsar
- result: 12 PASS / 0 FAIL / 0 BLOCKED

Discovery found two real semantic gaps that were exact-visible to local Vision: `JavaScript` and `UTF-8`. `LF` and `Spaces: 2` were not exact-visible and were not promoted. The temporary filename was not available as a usable `semantic-text` surface identity.

### P7B — deterministic Pulsar document surface identity

Status: `DIAGNOSTIC_OBSERVED`.

- evidence: `5f5045693400f8957e98baea6ba76fc428011e7f`
- result: 12 PASS / 0 FAIL / 0 BLOCKED

Two distinct temporary documents proved a deterministic caller-derivable Pulsar current-window-title shape. `window-title` + `exact` verified the current document and rejected the other document with zero matches.

### P7C — real-use candidate end-to-end proof

Status: `REAL_USE_CANDIDATE_PHYSICALLY_VALIDATED`.

Immutable lineage:

- s01 evidence `6d73c69ecac5e44d84bb12975c6020fa7fde0304`: fixture FAIL before delivery because it accepted a transient first non-empty Pulsar title.
- s02 evidence `77fd94bd6b765a56182822cf2a43297b6baa1537`: authoritative PASS.

s02 proved:

```text
semantic OPEN UTF-8
→ NO_SEMANTIC_TARGET
→ exact current-document surface guard
→ lazy local Vision
→ exact UTF-8
→ CLICK_POSTED
→ fresh independent exact UTF-16 LE observation
→ VERIFIED_SUCCESS
```

See `docs/evidence/perception-p7c-pulsar-utf8-real-use-public-physical.md`.

### P7D — bounded caller-owned Pulsar contract materializer

Status: `CONTRACT_VALIDATED`.

Product module: `app/pulsar-encoding-selector-visual-contract.js`.

It materializes only caller-owned absolute document path + Pulsar + `OPEN UTF-8` + exact current-document window-title precondition + local text-region requirement + exact `UTF-16 LE` postcondition. It contains no coordinates, provider object or Computer Control action logic.

- evidence: `31f10c01244d98eee1c8f309e46b0578d2d60337`
- result: 12 PASS / 0 FAIL / 0 BLOCKED

### P7E — explicit caller context in normal `runTask`

Status: `PHYSICALLY_VALIDATED`.

`runTask` accepts an explicit abstract `pulsar-document` caller context. The agent loop does not infer a document path from foreground/window/snapshot data and does not put it into planner output.

- contract evidence: `e1bb360188c3713653b09b0c2320fe45d4261f2d`
- physical evidence: `6af4a606eb71418cde61eddd3cdd1fade9b083d2`
- physical result: 14 PASS / 0 FAIL / 0 BLOCKED

No pre-materialized visual contract was supplied. Product code materialized the P7D contract after semantic planning; only independent `UTF-16 LE` observation produced `VERIFIED_SUCCESS`.

See `docs/evidence/perception-p7e-pulsar-caller-context-public-physical.md`.

### P7 completion boundary

P7 authorizes only trusted callers that already own the current Pulsar document path. It does **not** authorize generic Pulsar status-bar clicking, arbitrary targets, automatic document-path inference, or generic caller-context synthesis.

## P8 — trusted resource provenance

Status: `ACTIVE` at P8E.

P8 moves the path one level outward: from a caller context that already contains `documentPath` to an explicit resource envelope that represents ownership before visual-fallback knowledge is materialized.

### P8A — provenance gap discovery

Status: `PROVENANCE_GAP_CONFIRMED`.

- session: `cu-perception-p8a-caller-context-provenance-gap-public-s01`
- evidence: `fde64d9aab6cc14f8583864222b7581f177b86f7`
- result: 14 PASS / 0 FAIL / 0 BLOCKED

P8A confirmed that the existing Pulsar provider/skills/session context/default CLI did not legitimately own a current document path before the planner. It explicitly rejected filling this gap through window title, semantic snapshot, OCR, Vision, coordinates or free-form planner output.

### P8B — provenance-bearing task resource context

Status: `CONTRACT_VALIDATED`.

Product module: `app/task-resource-context.js`.

Initial bounded schema:

```text
version = 1
resources[]:
  kind = file
  role = current-document
  application = Pulsar
  path = absolute caller-owned path
```

The boundary validates version/cardinality/resource shape, rejects relative paths and ambiguity, performs no filesystem/UI/perception discovery, and can derive only the bounded `pulsar-document` caller context already validated by P7E.

- session: `cu-perception-p8b-task-resource-context-public-s01`
- evidence: `d08f48dee5fd7c14e3000821bb516dcafeca9da7`
- result: 15 PASS / 0 FAIL / 0 BLOCKED

### P8C — `taskResourceContext` wiring into normal `runTask`

Status: `CONTRACT_VALIDATED`.

`runTask` accepts three explicit visual-knowledge sources with a fail-closed exclusivity rule:

```text
visualFallbackContracts
XOR visualFallbackCallerContext
XOR taskResourceContext
```

Zero sources remains valid and means no visual knowledge. Resource derivation occurs after semantic planning. `agent-loop.js` does not contain `documentPath`; the path remains inside the resource/caller-knowledge boundary. The default CLI still invokes `runTask(task)` without a resource context.

- session: `cu-perception-p8c-agent-loop-task-resource-context-public-s01`
- evidence: `aabe4a69a4a4b4c0ef86ebb3cfd659300aa103d8`
- Computer Use: `9088b0c2371852265b6334197f97ac13fd574070`
- result: 16 PASS / 0 FAIL / 0 BLOCKED

### P8D — physical task resource context validation

Status: `PHYSICALLY_VALIDATED`.

Authoritative validation:

- session: `cu-perception-p8d-task-resource-context-physical-public-s01`
- evidence: `56439d05268b67427b901d686bac94ede4c12eb9`
- Computer Use expected/observed: `9088b0c2371852265b6334197f97ac13fd574070`
- Computer Control expected/observed: `e3a3f13d66546cf8f0fca50075bd4607c2c3d003`
- physical source: `66542db8413ea28e42a36332f680b1fc83348271`
- tested PoC: `c562f7662dbfad9bbf96e1b146f462b605625b19`
- result: **17 PASS / 0 FAIL / 0 BLOCKED**

The physical run supplied only a versioned `taskResourceContext` with one explicit Pulsar `current-document` file resource. It supplied neither `visualFallbackCallerContext` nor `visualFallbackContracts`.

Validated chain:

```text
explicit caller-owned file resource
→ taskResourceContext
→ derived pulsar-document caller context
→ bounded P7D contract
→ semantic OPEN UTF-8
→ NO_SEMANTIC_TARGET
→ exact window-title surface guard
→ lazy local Vision
→ CLICK_POSTED
→ independent exact UTF-16 LE observation
→ VERIFIED_SUCCESS
```

The resource path remained outside planner output, provider selection occurred only after the semantic gap and verified surface guard, the temporary document hash remained unchanged, and cleanup passed completely.

See `docs/evidence/perception-p8d-task-resource-context-public-physical.md`.

### P8E — real resource-owning product caller

Status: `ACTIVE`.

P8D validates the transport and execution path but its physical fixture still owns the temporary file resource directly. The remaining product problem is to identify or introduce the smallest normal Computer Use caller/workflow that **legitimately owns** a document resource before invoking `runTask` and can therefore construct `taskResourceContext` without inference.

P8E constraints:

- resource ownership must arise from a deterministic product operation or invocation boundary;
- do not infer a path from window title, foreground state, semantic snapshot, OCR, Vision or coordinates;
- do not ask the planner to create resource provenance;
- do not add a generic implicit CLI resource context;
- stale/missing/incompatible resource ownership must fail closed;
- `taskResourceContext` remains task/run bounded and inspectable;
- P7D/P7E/P8B/P8C selection remains exact and bounded;
- provider selection remains lazy after a P5B-eligible semantic gap and surface guard;
- `CLICK_POSTED` remains delivery only and `VERIFIED_SUCCESS` still requires independent evidence.

Immediate checkpoint: **P8E discover/design the smallest real resource-owning invocation/workflow boundary, contract-test provenance, then physically validate the same Pulsar real-use path through that owner before claiming default product support.**

## Deferred hardening

Still separate evidence programs:

- provider packaging/cache/version hardening;
- additional local/remote providers and ranking;
- fuzzy/contextual text matching;
- icon/object/VLM observations;
- secondary/rotated displays;
- richer pointer/keyboard gestures;
- richer postconditions/recovery;
- additional application/use-case promotions.
