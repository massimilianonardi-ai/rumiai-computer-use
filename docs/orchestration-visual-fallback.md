# Visual fallback orchestration

Status: **P5 COMPLETE for the initial narrow scope; P6A PHYSICALLY_VALIDATED; P6B PHYSICALLY_OBSERVED; P6C PHYSICALLY_VALIDATED; P6D PHYSICALLY_VALIDATED; initial P6 safety architecture COMPLETE; P7 ACTIVE**.

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

Status: `PHYSICALLY_VALIDATED`.

P6D closes the gap left by P6C: caller scope identifies who owns a contract, while the runtime surface precondition proves that the currently active application surface is the one the bounded contract was designed for.

The validated boundary is:

```text
semantic OPEN first
→ P5B-eligible structured gap
→ deterministic caller-owned runtime surface precondition
→ fail closed on missing/ambiguous/mismatched surface
→ only then lazy Computer Use-owned perception-provider selection
→ bounded visual fallback
→ CLICK_POSTED delivery
→ independent post-action evidence
→ VERIFIED_SUCCESS
```

The P6D product supports declarative surface preconditions outside planner output. The authoritative Safari proof uses the existing `semantic-text` + `exact` precondition against the document title that Safari exposes deterministically in its semantic snapshot.

Authoritative validation:

- session: `cu-perception-p6d-semantic-title-surface-precondition-public-s10`
- evidence: `ec7e9757dada06ca313e585c09a42fcf7202e90d`
- Computer Use runtime: `a90ab782d85e1283e76b4b64aa9bdbe54a7e4e0e`
- Computer Control: `e3a3f13d66546cf8f0fca50075bd4607c2c3d003`
- frozen physical test source: `d5b6d9561b98409d52a84f4c1a45aa59de489357`
- tested PoC: `8eeaa3654b65cf15bf079240badb8aa3ccd47532`
- result: 12 PASS / 0 FAIL / 0 BLOCKED

The negative BETA surface produced one exact BETA semantic match while the ALPHA contract precondition failed with `SURFACE_PRECONDITION_NOT_MET`; provider selection stayed at zero and no click was delivered. The same Safari tab then reloaded the same controlled document as ALPHA; a fresh semantic snapshot produced exactly one ALPHA match, the precondition verified, local Vision was selected exactly once, Computer Control returned `CLICK_POSTED`, and only fresh independent post-action perception produced `VERIFIED_SUCCESS`.

The s01–s07 failures and s08–s09 diagnostics remain immutable. They established that arbitrary DOM heading identity and Safari's browser-owned current-window-title suffix were not appropriate representations for this proof; no prefix/contains/fuzzy matching was introduced.

See `docs/evidence/perception-p6d-surface-precondition-public-physical.md`.

The P6D BETA/ALPHA titles, `PROCEED → FINISHED`, scope and controlled page remain test-owned and are not shipped as generic Safari knowledge.

## P6 completion boundary

The initial P6 visual-fallback safety architecture is `COMPLETE`:

1. P6A — deterministic caller-owned contract registry;
2. P6B — real-application visual-gap discovery;
3. P6C — explicit caller scope and plan-aware bounded selection;
4. P6D — runtime surface precondition before provider selection/action delivery.

This completion does not mean arbitrary applications or surfaces are authorized. It means the mechanism required to promote future real-use-case knowledge safely is physically validated.

## P7 — evidence-backed real-use-case discovery

Status: `ACTIVE`.

P7 must discover and validate a genuinely useful deterministic real application use case before any built-in caller contract/skill knowledge is promoted.

Selection constraints:

- choose a stable supported application/surface with a useful user outcome;
- prefer a surface whose runtime identity can be observed deterministically;
- keep caller scope and surface identity outside planner output;
- keep planner intents semantic;
- require semantic-first execution and a P5B-eligible gap before visual perception;
- keep provider selection lazy and Computer Use-owned;
- require exact target and independently verifiable postcondition for the first promoted case;
- do not infer generic Safari/web behavior from the controlled P6 evidence;
- physically observe the candidate before adding shipped registry/skill knowledge.

System Settings should not be the first P7 candidate because earlier physical work exposed AX fragility there. Safari is eligible only for a genuinely bounded real use case with real surface identity, not as generic browser fallback.

## Deferred hardening

Still separate evidence programs:

- provider packaging/cache/version hardening;
- additional local/remote providers and ranking;
- fuzzy/contextual text matching;
- icon/object/VLM observations;
- secondary/rotated displays;
- richer pointer/keyboard gestures;
- richer postconditions/recovery.

Immediate next checkpoint: **P7 evidence-backed real-use-case discovery**.
