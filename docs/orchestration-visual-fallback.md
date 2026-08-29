# Visual fallback orchestration

Status: **P5 COMPLETE for the initial narrow scope; P6A PHYSICALLY_VALIDATED; P6B ACTIVE**.

Validated states:

- P1–P4: `PHYSICALLY_VALIDATED`
- P5A: `PHYSICALLY_VALIDATED`
- P5B: `CONTRACT_VALIDATED`
- P5C: `PHYSICALLY_VALIDATED`
- P5D: `PHYSICALLY_VALIDATED`
- P5E: `PHYSICALLY_VALIDATED`
- P6A: `PHYSICALLY_VALIDATED`

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

The physical run proved exact local JSON registry lookup, semantic planner output, semantic `NO_SEMANTIC_TARGET` before lazy provider selection, product macOS Vision selection, real `CLICK_POSTED` delivery and independent `VERIFIED_SUCCESS`.

See `docs/evidence/perception-p6a-caller-contract-registry-public-physical.md`.

## P6B — real-application contract discovery

Status: `ACTIVE`.

A built-in application contract must not be invented from UI intuition. Before adding one to product knowledge, discover and physically prove the application surface.

First candidate: **Safari**, already represented by the product application Provider. The discovery surface is a local test-owned page rendered by real Safari with an HTML canvas that draws one exact target and replaces it with one exact postcondition after a pointer click.

Why Safari/canvas:

- Safari is a real supported application rather than another custom desktop fixture;
- canvas is a natural semantic-observability gap: visible pixels may not expose the drawn text as an AX target;
- local content removes network variability;
- target and postcondition can be deterministic without hard-coded coordinates;
- the existing P1–P5 mechanics can be reused without changing product runtime.

P6B discovery must prove:

1. no interference with an existing Safari user session: if Safari is already running, block before launch;
2. real Safari launch/activation and current Computer Control observation;
3. exact canvas target is absent from semantic resolution (`NO_SEMANTIC_TARGET`);
4. product local macOS Vision provider is available/selected through P5D;
5. mapped capture + P2B/P3A resolve exactly one visual target;
6. P3B explicitly authorizes only the validated primary-display left click;
7. Computer Control returns canonical `CLICK_POSTED` with no claimed semantic consequence;
8. fresh independent post-action capture observes exactly the deterministic postcondition and no longer the original target;
9. no screenshot bytes, OCR payload or coordinates are persisted/logged;
10. pointer, Safari, local page and runtime are cleaned up and product trees remain clean.

P6B is discovery only. A PASS does not authorize generic Safari visual fallback and does not by itself create a shipped registry entry. Promotion to built-in product knowledge requires a subsequent bounded contract whose scope corresponds to demonstrated application/task semantics.

## Deferred hardening

Still separate evidence programs:

- provider packaging/cache/version hardening;
- additional local/remote providers and ranking;
- fuzzy/contextual text matching;
- icon/object/VLM observations;
- secondary/rotated displays;
- richer pointer/keyboard gestures;
- richer postconditions/recovery.

Immediate next checkpoint: **P6B Safari real-application visual contract discovery**.
