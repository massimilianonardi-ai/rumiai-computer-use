# Visual fallback orchestration

Status: **P5 COMPLETE for the initial narrow scope; P6A PHYSICALLY_VALIDATED; P6B PHYSICALLY_OBSERVED; P6C PHYSICALLY_VALIDATED; P6D ACTIVE**.

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

Detailed perception/action contracts are in `docs/perception.md`; operational resume state is in `docs/handoff.md`.

## Fixed invariants

- Semantic-first: visual perception is not run merely because it exists.
- A successful semantic operation is never replaced by a coordinate click.
- Only explicit structured semantic observability/resolution gaps may be visually eligible.
- Planner output remains semantic and contains no screen coordinates, native IDs, provider identity, scope identity or fabricated success criteria.
- Visual fallback requires deterministic caller-owned target + postcondition and explicit authorization.
- Computer Use owns perception interpretation, provider selection, policy and success verification.
- Computer Control owns observation/action delivery mechanics and remains perception-provider-free.
- `CLICK_POSTED` is delivery only.
- `VERIFIED_SUCCESS` requires independent post-action evidence.
- Perception payloads and coordinates remain ephemeral and out of ordinary logs/evidence.
- Evidence is immutable; Git advances forward-only.

## P5 closed capability

The initial validated product path is:

```text
semantic intent
→ semantic-first execution
→ structured visual eligibility
→ optional local perception-provider selection
→ exact-text visual fallback
→ explicit primary-display left-click authorization
→ Computer Control delivery
→ independent exact-text postcondition
→ verified agent-loop success
```

Authoritative P5E validation:

- session: `cu-perception-p5e-agent-loop-visual-fallback-public-s01`
- evidence: `d18e82d06456438f289eb0bf6c6f630973b5a99f`
- Computer Use runtime: `3e52ebaebc20398787d904d6ed6e2d2111fe5710`
- Computer Control: `e3a3f13d66546cf8f0fca50075bd4607c2c3d003`
- test source: `59094fe637d078eaa08436114e45d74308b45428`
- result: 8 PASS / 0 FAIL / 0 BLOCKED

The normal agent loop plan remained semantic (`ACTIVATE_APP`, `OPEN`), provider selection occurred only after structured `NO_SEMANTIC_TARGET`, real Computer Control returned `CLICK_POSTED`, and only a fresh post-action local Vision observation produced `VERIFIED_SUCCESS`.

## P6A — deterministic caller-contract registry

Status: `PHYSICALLY_VALIDATED`.

`app/visual-fallback-contract-manager.js` provides local deterministic caller-owned visual execution knowledge, separate from competence skills and perception-provider selection.

The original P6A registry lookup is exact on:

```text
application + OPEN + exact target
```

The selected execution contract contains exact target/postcondition, explicit visual-fallback policy, the validated primary-display left-click shape and declarative provider requirements. It contains no provider object, coordinates or native identity.

Authoritative validation:

- session: `cu-perception-p6a-caller-contract-registry-public-s01`
- evidence: `21ad01e93a5de4e5276b49c193269a26ad66b164`
- Computer Use runtime: `5e4daf5ebf352535653bfb21a559026238966a20`
- Computer Control: `e3a3f13d66546cf8f0fca50075bd4607c2c3d003`
- frozen test source: `66455683f3088b6cfb7fa9e1a49274a9c08269f5`
- tested PoC: `380c6f756dda2a2e798a7987e1d3aff2059060de`
- result: 9 PASS / 0 FAIL / 0 BLOCKED

See `docs/evidence/perception-p6a-caller-contract-registry-public-physical.md`.

## P6B — real-application discovery

Status: `PHYSICALLY_OBSERVED`.

Safari was the first real supported application surface. A loopback-only test-owned page rendered an exact target exclusively into a canvas and replaced it with an exact postcondition only after a pointer click.

Authoritative session:

- session: `cu-perception-p6b-safari-canvas-discovery-public-s06`
- evidence: `e8a2899c58c5e6d3725d4457af18aefc25923580`
- Computer Use: `3a3148cdf89735d2d46d208bbe69dc1d26722e3b`
- Computer Control: `e3a3f13d66546cf8f0fca50075bd4607c2c3d003`
- frozen test source: `6d826092b93973905fa6f2c7f8ac1c1d68a92a31`
- tested PoC: `0ae7c087bf0072aac0c5f0d180b8d83933022a3c`
- result: 10 PASS / 0 FAIL / 0 BLOCKED

P6B proved that Safari really loaded the controlled page, the canvas text produced `NO_SEMANTIC_TARGET`, local Vision resolved exactly one target, Computer Control returned `CLICK_POSTED`, and only fresh independent post-action perception produced `VERIFIED_SUCCESS`.

Historical s01–s05 failures remain immutable and document PoC oracle/bootstrap defects; no product contract was weakened to obtain the PASS.

See `docs/evidence/perception-p6b-safari-canvas-discovery-public-physical.md`.

P6B is observation, not generic Safari authorization.

## P6C — scoped caller integration

Status: `PHYSICALLY_VALIDATED`.

P6C extends caller-contract knowledge with an explicit `scopeId` and a plan-aware selector. Scoped contracts are selected only when the caller explicitly supplies the matching scope; legacy unscoped lookup cannot accidentally select them.

The bounded lookup is effectively:

```text
scopeId + application + OPEN + exact target
```

The plan-aware helper follows semantic `ACTIVATE_APP` context, deduplicates repeated use of the same contract, and fails closed if the same planner target would map to different application contracts. It does not select a perception provider and does not introduce planner coordinates or success criteria.

Authoritative validation:

- session: `cu-perception-p6c-scoped-caller-integration-public-s01`
- evidence: `c66eb5ba69d9e0435cb894731b1d1cea832c31e1`
- Computer Use runtime: `a1bdddc813a89a16552b08ccec6b3aec00eb3157`
- Computer Control: `e3a3f13d66546cf8f0fca50075bd4607c2c3d003`
- frozen test source: `740be2179de17dd9e790f3c92025bb8c01376b16`
- tested PoC: `e2e246b335ebecf65e2e1445d7c9e18ac71d49d5`
- result: 11 PASS / 0 FAIL / 0 BLOCKED

The physical run reused the evidence-backed P6B Safari surface through normal `runTask`. It proved wrong-scope fail-closed behavior, semantic-only planner output, semantic `NO_SEMANTIC_TARGET` first, lazy local Vision selection, `CLICK_POSTED` delivery, and independent `VERIFIED_SUCCESS`.

See `docs/evidence/perception-p6c-scoped-caller-integration-public-physical.md`.

The P6C `PROCEED → FINISHED` contract remains test-owned. It is not shipped as generic Safari knowledge.

## P6D — runtime surface precondition

Status: `ACTIVE`.

P6C proves which caller scope owns a contract, but `scopeId` alone is not evidence that the currently active application surface is the one that contract was designed for. Before shipping reusable real-application knowledge, the runtime must fail closed unless a deterministic surface precondition is satisfied.

P6D must establish a contract boundary in which:

- surface identity/precondition remains outside planner output;
- a contract cannot run merely because application, scope and target text happen to match;
- the surface precondition is checked before provider selection/action delivery;
- failure or ambiguity prevents visual fallback with no click;
- semantic-first and P5B eligibility remain unchanged;
- provider selection remains lazy and Computer Use-owned;
- `CLICK_POSTED` remains delivery only;
- post-action success still requires independent evidence;
- no generic Safari/page inference is introduced.

The first P6D physical proof should reuse the controlled Safari surface and demonstrate both a positive surface match and a negative/mismatched-surface fail-closed case before any action.

## Deferred hardening

Still separate evidence programs:

- provider packaging/cache/version hardening;
- additional local/remote providers and ranking;
- fuzzy/contextual text matching;
- icon/object/VLM observations;
- secondary/rotated displays;
- richer pointer/keyboard gestures;
- richer postconditions/recovery.

Immediate next checkpoint: **P6D runtime surface precondition**.
