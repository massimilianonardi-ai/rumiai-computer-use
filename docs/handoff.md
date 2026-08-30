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
- P7 first real-use promotion: `COMPLETE` at the explicit `runTask` caller-context boundary
- active program: **P8 trusted caller-context provenance**

## Latest authoritative physical validation

P7E is the current top checkpoint.

- Computer Use validated runtime: `158cc475c209ade1c3260f0f2d6d4d4bc97f2f4a`
- Computer Control dependency: `e3a3f13d66546cf8f0fca50075bd4607c2c3d003`
- session: `cu-perception-p7e-agent-loop-caller-context-physical-public-s01`
- evidence: `6af4a606eb71418cde61eddd3cdd1fade9b083d2`
- frozen physical test source: `540abac1a7f534f36a809b0f8bb1036ceb57eb3f`
- tested PoC: `5d10f4af586e1ec9e02e78ab90a8ae19eaa12823`
- result: **14 PASS / 0 FAIL / 0 BLOCKED**

See `docs/evidence/perception-p7e-pulsar-caller-context-public-physical.md`.

P7E contract-only prerequisite:

- session: `cu-perception-p7e-agent-loop-caller-context-public-s01`
- evidence: `e1bb360188c3713653b09b0c2320fe45d4261f2d`
- result: 13 PASS / 0 FAIL / 0 BLOCKED

P7D caller-contract prerequisite:

- session: `cu-perception-p7d-pulsar-utf8-caller-contract-public-s01`
- evidence: `31f10c01244d98eee1c8f309e46b0578d2d60337`
- Computer Use product: `d1ca1c61affbe3aef5c477a4e0093f442765330a`
- result: 12 PASS / 0 FAIL / 0 BLOCKED

## Non-negotiable invariants

1. Semantic-first: structured semantic operation is preferred whenever it can solve the task.
2. Visual fallback is explicit and is never a generic retry mechanism.
3. `delivery != success`; `CLICK_POSTED` is delivery evidence only.
4. `IMPLEMENTED != PHYSICALLY_VALIDATED`.
5. Planner output remains semantic: no coordinates, provider identity, caller context, document path, scope identity, surface identity or fabricated postconditions.
6. Only structured P5B-eligible semantic observability/resolution gaps may consider visual fallback.
7. Perception-provider selection belongs to Computer Use, never Computer Control.
8. Runtime surface preconditions are checked before provider selection/action delivery.
9. Caller-owned surface context must not be guessed from UI state.
10. No mandatory network/account/cloud API dependency.
11. Screenshot bytes, OCR text and coordinates remain ephemeral/out of ordinary logs.
12. Physical evidence is immutable and Git is forward-only.

## Current validated orchestration

The most advanced validated path is now:

```text
trusted caller-owned context
→ normal runTask
→ semantic planner output
→ bounded caller-context normalization
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

P6 proves the generic safety mechanism only. Controlled Safari evidence does not authorize generic Safari/web fallback.

See:

- `docs/evidence/perception-p6a-caller-contract-registry-public-physical.md`
- `docs/evidence/perception-p6b-safari-canvas-discovery-public-physical.md`
- `docs/evidence/perception-p6c-scoped-caller-integration-public-physical.md`
- `docs/evidence/perception-p6d-surface-precondition-public-physical.md`

## P7 — first real-use promotion

Status: `COMPLETE` at the explicit `runTask` API boundary.

### P7A — gap discovery

Evidence: `65c7a674984638529ee8be603a6df09445f68deb`.

Real Pulsar discovery found:

- `JavaScript`: semantic `NO_SEMANTIC_TARGET`, Vision exact
- `UTF-8`: semantic `NO_SEMANTIC_TARGET`, Vision exact
- `LF`: not Vision exact
- `Spaces: 2`: not Vision exact

The filename was not a usable `semantic-text` surface identity, so nothing was promoted at P7A.

### P7B — surface identity discovery

Evidence: `5f5045693400f8957e98baea6ba76fc428011e7f`.

Two distinct temporary Pulsar documents proved a caller-derivable exact current-window title. `window-title/exact` verified the current document and rejected the other document with zero matches.

### P7C — real-use end-to-end candidate

Chosen target: `UTF-8`.

Known independent postcondition: exact `UTF-16 LE`, based on Pulsar's encoding-selector source and fixed before delivery.

Lineage:

- s01 evidence `6d73c69ecac5e44d84bb12975c6020fa7fde0304`: immutable fixture FAIL before any click; transient Pulsar title accepted too early.
- s02 evidence `77fd94bd6b765a56182822cf2a43297b6baa1537`: authoritative physical PASS.

P7C s02 proved:

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

The P7C contract was injected by the fixture, so P7C was candidate validation, not final shipped caller integration.

See `docs/evidence/perception-p7c-pulsar-utf8-real-use-public-physical.md`.

### P7D — bounded product knowledge

Product: `app/pulsar-encoding-selector-visual-contract.js`.

The materializer accepts caller-owned `documentPath` and produces only the exact Pulsar `OPEN UTF-8` contract with current-document `window-title/exact`, local text-region requirement and exact `UTF-16 LE` postcondition.

It contains no coordinates, provider object or Computer Control logic.

Evidence: `31f10c01244d98eee1c8f309e46b0578d2d60337`.

State: `CONTRACT_VALIDATED`.

### P7E — explicit caller-context integration

Product:

- `app/visual-fallback-caller-context.js`
- `app/agent-loop.js`

Supported caller-context kind:

```text
pulsar-document
```

A trusted caller may provide an absolute `documentPath`. `agent-loop.js` itself does not infer that path from a window, snapshot, OCR or Vision.

Contract source rules:

- no caller context + no explicit contracts → no visual-fallback knowledge;
- explicit contracts only → existing compatibility path;
- caller context only → bounded resolver path;
- explicit contracts + caller context simultaneously → fail closed as ambiguous;
- invalid/unsupported caller context → fail closed.

P7E physical evidence `6af4a606eb71418cde61eddd3cdd1fade9b083d2` proved the real Pulsar task through normal `runTask` with **caller context only**, no injected `visualFallbackContracts`.

Physical markers:

- explicit caller document path: PASS
- P7D materialization from caller context: PASS
- planner semantic-only: PASS
- semantic `NO_SEMANTIC_TARGET`: PASS
- exact `window-title` surface guard: PASS
- local Vision selection after gap/guard: one call
- `CLICK_POSTED`: PASS, delivery only
- independent exact `UTF-16 LE`: PASS
- `VERIFIED_SUCCESS`: PASS
- document hash unchanged: PASS
- no encoding selection confirmed: PASS
- no screenshot/OCR/coordinates persisted: PASS
- no test-initiated external network: PASS
- selector/pointer/Pulsar/runtime/temp cleanup: PASS
- product trees clean: PASS

See `docs/evidence/perception-p7e-pulsar-caller-context-public-physical.md`.

### P7 completion boundary

P7 has shipped and physically validated one narrow real-use fallback at the API boundary:

```text
caller already owns current Pulsar documentPath
→ runTask receives pulsar-document caller context
→ exact bounded visual fallback may be materialized
```

Do **not** claim that the default interactive CLI can already discover/provide this context. `main()` still invokes `runTask(task)` without trusted document provenance.

Do **not** generalize P7 into:

- generic Pulsar status-bar clicking;
- arbitrary Pulsar OPEN targets;
- automatic document-path inference from UI state;
- generic application caller-context synthesis;
- prefix/contains/fuzzy surface matching.

## Active program: P8 trusted caller-context provenance

P8 must connect a real deterministic product workflow that legitimately owns a document path to the P7E caller-context API.

The problem is provenance, not visual perception.

Required properties:

1. Identify the smallest existing workflow/competence that already knows the Pulsar document path through its own deterministic state.
2. Define an explicit provenance-bearing caller-context envelope.
3. Keep `documentPath` out of planner output.
4. Never derive `documentPath` from window title, semantic snapshot, OCR, Vision or coordinates.
5. Bind the context to the owning task/run and fail closed when absent, stale or incompatible.
6. Do not add Computer Control mechanics merely to transport context.
7. Reuse P7D/P7E exact contract and runtime surface guard unchanged where possible.
8. Contract-test provenance and fail-closed behavior before physical testing.
9. Physically validate the provenance-bearing path before claiming support in the default/interactive product flow.

Immediate next checkpoint: **P8A caller-context provenance discovery and contract design**.

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

Immediate next checkpoint: **P8A caller-context provenance discovery and contract design**.
