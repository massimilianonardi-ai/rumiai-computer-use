# Visual fallback orchestration

Status: **P5 COMPLETE for the initial narrow scope; P6A PHYSICALLY_VALIDATED; P6B PHYSICALLY_OBSERVED; P6C ACTIVE**.

Validated/observed states:

- P1–P4: `PHYSICALLY_VALIDATED`
- P5A: `PHYSICALLY_VALIDATED`
- P5B: `CONTRACT_VALIDATED`
- P5C: `PHYSICALLY_VALIDATED`
- P5D: `PHYSICALLY_VALIDATED`
- P5E: `PHYSICALLY_VALIDATED`
- P6A: `PHYSICALLY_VALIDATED`
- P6B: `PHYSICALLY_OBSERVED`

Detailed perception/action contracts are in `docs/perception.md`; operational resume state is in `docs/handoff.md`.

## Fixed invariants

- Semantic-first: visual perception is not run merely because it exists.
- A successful semantic operation is never replaced by a coordinate click.
- Only explicit structured semantic observability/resolution gaps may be visually eligible.
- Planner output remains semantic and contains no screen coordinates, native IDs, provider identity or fabricated success criteria.
- Visual fallback requires deterministic caller/skill target + postcondition and explicit authorization.
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

`app/visual-fallback-contract-manager.js` adds a local registry for deterministic caller-owned visual execution knowledge. It is separate from competence skills and from perception-provider selection.

A contract is selected only when exactly one registry entry matches:

```text
application + OPEN + exact target
```

The selected execution contract carries exact target, exact postcondition, explicit visual-fallback authorization, the already validated primary-display left-click request and declarative provider requirements. It carries no concrete provider object, action coordinates or native identity.

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

Safari was used as the first real supported application surface. A loopback-only test-owned page rendered a deterministic target exclusively into an HTML canvas and replaced it with a deterministic postcondition only after a pointer click.

Authoritative session:

- session: `cu-perception-p6b-safari-canvas-discovery-public-s06`
- evidence: `e8a2899c58c5e6d3725d4457af18aefc25923580`
- Computer Use expected/observed: `3a3148cdf89735d2d46d208bbe69dc1d26722e3b`
- Computer Control expected/observed: `e3a3f13d66546cf8f0fca50075bd4607c2c3d003`
- frozen test source: `6d826092b93973905fa6f2c7f8ac1c1d68a92a31`
- tested PoC: `0ae7c087bf0072aac0c5f0d180b8d83933022a3c`
- result: 10 PASS / 0 FAIL / 0 BLOCKED

Physical evidence proved:

1. Safari actually requested and rendered the loopback page before perception (`requests=1`);
2. a fresh semantic snapshot yielded structured `NO_SEMANTIC_TARGET` for the canvas text;
3. the product-owned local macOS Vision provider resolved exactly one target using the existing exact-text-single-match policy;
4. the deterministic postcondition was absent before delivery;
5. real Computer Control returned `CLICK_POSTED` with no claimed semantic consequence;
6. only a fresh independent post-action visual observation produced `VERIFIED_SUCCESS`;
7. screenshots, OCR payloads and coordinates were not logged;
8. pointer, Safari, loopback server, runtime/cache and temporary resources were cleaned up and product trees remained clean.

Historical s01–s05 failures remain immutable. They progressively isolated PoC oracle and local-page bootstrap defects; no P1–P6A product contract was weakened to obtain the PASS.

See `docs/evidence/perception-p6b-safari-canvas-discovery-public-physical.md`.

P6B is observation, not product authorization. It does **not** enable generic Safari visual fallback and does not ship a built-in Safari contract.

## P6C — bounded evidence-backed caller integration

Status: `ACTIVE`.

The next checkpoint may add product caller knowledge only where the scope is explicitly bounded to an evidence-backed application/task contract. P6C must not infer generic Safari/web behavior from P6B.

Requirements:

- caller/registry knowledge remains outside the planner;
- selection remains exact and fail-closed;
- no coordinates or provider objects in the stored contract;
- the semantic path still runs first;
- perception-provider selection remains lazy and Computer Use-owned;
- only P5B-eligible semantic gaps may reach P5A;
- `CLICK_POSTED` remains delivery only;
- success still requires independent post-action evidence;
- the built-in contract scope must be no broader than the semantics physically demonstrated in P6B.

## Deferred hardening

Still separate evidence programs:

- provider packaging/cache/version hardening;
- additional local/remote providers and ranking;
- fuzzy/contextual text matching;
- icon/object/VLM observations;
- secondary/rotated displays;
- richer pointer/keyboard gestures;
- richer postconditions/recovery.

Immediate next checkpoint: **P6C bounded evidence-backed caller-contract integration**.
