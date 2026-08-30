# Visual fallback orchestration

Status: **P5 COMPLETE for the initial narrow scope; initial P6 safety architecture COMPLETE; P7 real-use promotion COMPLETE at the `runTask` API boundary; P8 caller-context provenance ACTIVE**.

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

Detailed perception/action contracts are in `docs/perception.md`; operational resume state is in `docs/handoff.md`.

## Fixed invariants

- Semantic-first: visual perception is not run merely because it exists.
- A successful semantic operation is never replaced by a coordinate click.
- Only explicit structured semantic observability/resolution gaps may be visually eligible.
- Planner output remains semantic and contains no screen coordinates, native IDs, provider identity, caller-context identity, scope identity, surface identity or fabricated success criteria.
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

Discovery found two real semantic gaps that were exact-visible to local Vision:

- `JavaScript`
- `UTF-8`

`LF` and `Spaces: 2` were not exact-visible and were not promoted. The temporary filename was not available as a usable `semantic-text` surface identity.

### P7B — deterministic Pulsar document surface identity

Status: `DIAGNOSTIC_OBSERVED`.

- evidence: `5f5045693400f8957e98baea6ba76fc428011e7f`
- result: 12 PASS / 0 FAIL / 0 BLOCKED

Two distinct temporary documents proved a deterministic caller-derivable Pulsar current-window-title shape. `window-title` + `exact` verified the current document and rejected the other document with zero matches.

This evidence authorized exact current-document surface binding; it did not authorize prefix/fuzzy matching or generic status-bar clicking.

### P7C — real-use candidate end-to-end proof

Status: `REAL_USE_CANDIDATE_PHYSICALLY_VALIDATED`.

P7C selected only `UTF-8` as the first candidate. Pulsar upstream source fixed `UTF-16 LE` as a known encoding-selector item before delivery, allowing a predetermined independent postcondition.

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

The contract was still injected by the physical fixture, so P7C did not yet constitute shipped caller knowledge.

See `docs/evidence/perception-p7c-pulsar-utf8-real-use-public-physical.md`.

### P7D — bounded caller-owned Pulsar contract materializer

Status: `CONTRACT_VALIDATED`.

Product module:

`app/pulsar-encoding-selector-visual-contract.js`

It materializes only the bounded knowledge:

```text
caller-owned absolute documentPath
+ Pulsar
+ OPEN
+ exact UTF-8
+ exact current-document window-title precondition
+ local text-region requirement
+ exact UTF-16 LE postcondition
```

It contains no coordinates, provider object or Computer Control action logic.

Authoritative validation:

- session: `cu-perception-p7d-pulsar-utf8-caller-contract-public-s01`
- evidence: `31f10c01244d98eee1c8f309e46b0578d2d60337`
- Computer Use: `d1ca1c61affbe3aef5c477a4e0093f442765330a`
- result: 12 PASS / 0 FAIL / 0 BLOCKED

### P7E — explicit caller context in normal `runTask`

Status: `PHYSICALLY_VALIDATED`.

Product modules/boundary:

- `app/visual-fallback-caller-context.js`
- `app/agent-loop.js`

`runTask` now accepts an explicit abstract caller context. The first supported kind is `pulsar-document`. The agent loop does not infer a document path from foreground/window/snapshot data and does not put it into planner output.

Contract-only validation:

- session: `cu-perception-p7e-agent-loop-caller-context-public-s01`
- evidence: `e1bb360188c3713653b09b0c2320fe45d4261f2d`
- result: 13 PASS / 0 FAIL / 0 BLOCKED

Authoritative physical validation:

- session: `cu-perception-p7e-agent-loop-caller-context-physical-public-s01`
- evidence: `6af4a606eb71418cde61eddd3cdd1fade9b083d2`
- Computer Use expected/observed: `158cc475c209ade1c3260f0f2d6d4d4bc97f2f4a`
- Computer Control expected/observed: `e3a3f13d66546cf8f0fca50075bd4607c2c3d003`
- frozen physical test source: `540abac1a7f534f36a809b0f8bb1036ceb57eb3f`
- tested PoC: `5d10f4af586e1ec9e02e78ab90a8ae19eaa12823`
- result: **14 PASS / 0 FAIL / 0 BLOCKED**

The physical run passed only:

```text
visualFallbackCallerContext = {
  kind: pulsar-document,
  documentPath: <caller-owned absolute path>
}
```

No pre-materialized visual contract was supplied. Product code materialized the P7D contract after semantic planning. Semantic `NO_SEMANTIC_TARGET` occurred before perception. The exact surface guard verified before provider selection. Local Vision was selected exactly once. Computer Control returned `CLICK_POSTED` without success. A fresh independent observation saw exact `UTF-16 LE` and only then produced `VERIFIED_SUCCESS`. The temporary document hash remained unchanged and cleanup was complete.

See `docs/evidence/perception-p7e-pulsar-caller-context-public-physical.md`.

### P7 completion boundary

P7 is complete because one real-use visual fallback has moved through:

```text
physical gap discovery
→ exact surface discovery
→ real-use end-to-end candidate proof
→ bounded product knowledge materialization
→ explicit caller-context API integration
→ physical validation through normal runTask
```

This completion is intentionally narrow. It authorizes only trusted callers that already own the current Pulsar document path. It does **not** authorize generic Pulsar status-bar clicking, arbitrary targets, automatic document-path inference, or generic caller-context synthesis.

## P8 — trusted caller-context provenance

Status: `ACTIVE`.

The next problem is not visual perception. The visual path is already physically validated. P8 must establish how a real product workflow/competence that legitimately owns a document path passes that context into `runTask` without asking the planner or GUI to reconstruct it.

P8 invariants:

- caller context must originate from an owning deterministic workflow/competence, not from free-form planner output;
- do not infer `documentPath` from current window title, semantic snapshot, OCR, Vision or coordinates;
- provenance must be explicit and inspectable;
- context must be bounded to the task/run and fail closed when absent, stale or incompatible;
- no new Computer Control mechanics are required merely to transport caller context;
- the planner remains semantic-only;
- P7D/P7E contract selection remains exact and bounded;
- provider selection remains after a P5B-eligible semantic gap and after the runtime surface guard;
- `CLICK_POSTED` remains delivery only;
- physical validation must prove the provenance-bearing caller path end-to-end before the default/interactive path claims support.

First P8 checkpoint: identify the smallest existing deterministic workflow that already owns a Pulsar document path, define a provenance-bearing caller-context envelope, and contract-test that boundary before any physical run.

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

Immediate next checkpoint: **P8 trusted caller-context provenance**.
