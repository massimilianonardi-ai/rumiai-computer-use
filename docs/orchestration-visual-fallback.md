# Visual fallback orchestration

Status: **P5 COMPLETE for the initial narrow scope**.

- P1–P4: `PHYSICALLY_VALIDATED`
- P5A: `PHYSICALLY_VALIDATED`
- P5B: `CONTRACT_VALIDATED`
- P5C: `PHYSICALLY_VALIDATED`
- P5D: `PHYSICALLY_VALIDATED`
- P5E: `PHYSICALLY_VALIDATED`

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

## P5A — visual fallback coordinator

Status: `PHYSICALLY_VALIDATED`.

`app/perception-action-coordinator.js::runVisualTextFallback(...)` composes P1B → P2B → P3A → P3B → P4. It does not select providers, classify semantic eligibility, change planner semantics, guess targets or invent postconditions.

Authoritative validation:

- session: `cu-perception-p5a-visual-fallback-coordinator-public-s01`
- evidence: `8076ddeaa3ac061e5cc1fb745aa97e1f9badb0c3`
- runtime: `cc9e26e87aa83239378d466d64879229fe2302bc`
- Computer Control: `e3a3f13d66546cf8f0fca50075bd4607c2c3d003`
- test source: `aaa88a862cba2f42fcecc4b21619c5b10eceeb85`

## P5B — semantic-to-visual eligibility

Status: `CONTRACT_VALIDATED`.

`app/semantic-visual-fallback-eligibility.js` is a pure deterministic classifier. Initial eligible codes are exactly:

```text
NO_SEMANTIC_TARGET
SURFACE_NOT_OBSERVABLE
```

Readiness, permission/backend, semantic delivery, semantic verification, internal exception and invalid intent/precondition failures remain visually ineligible. Missing/unknown codes fail closed; free-form error text is never parsed for the decision.

Authoritative validation:

- session: `cu-perception-p5b-semantic-visual-eligibility-contract-s02`
- evidence: `cbc88158c4cefd7a32ee3acec6e0424eb1a8f1ec`
- runtime: `28c654d51c1014ee826dcf24f42b6758dc67a721`
- test source: `e5651329fa066ff41d07c98295102b3fa6bebcc1`

## P5C — OPEN semantic-first executor integration

Status: `PHYSICALLY_VALIDATED`.

`OPEN(target)` executes the existing semantic path first. Semantic success returns directly and visual perception is not run. Only a P5B-eligible gap may proceed to a deterministic, explicitly authorized visual context and P5A.

Semantic success is itself verified from fresh post-action evidence. Delivery/focus alone is insufficient; normalized semantic state from Computer Control `ui.describe` may provide the independent consequence evidence.

Authoritative validation:

- session: `cu-perception-p5c-open-semantic-first-public-s08`
- evidence: `9195ae930f87f9804052e5024cb406b1488a747b`
- runtime: `8f21dd520356fc30e147e17adfff2c7567f36b83`
- test source: `21c00a22c28d2ac30841eb0afcb56bba3f273aaf`
- tested PoC: `3de353c9b307c60d2a6d5736a9253c45c6137a64`

Historical P5C s01–s07 FAIL evidence remains immutable.

## P5D — concrete perception provider selection

Status: `PHYSICALLY_VALIDATED`.

`app/perception-provider-manager.js` is a Computer Use-owned boundary separate from application-provider management. It selects perception providers deterministically by capability, locality, explicit availability and provider id ordering. Selection does not call `observe()` and does not silently replace an unavailable local provider with a remote provider.

The first concrete provider is the optional local macOS Vision `text-region` adapter under `app/perception-providers/`. It declares no required network, account or cloud API.

Authoritative validation:

- session: `cu-perception-p5d-provider-selection-public-s01`
- evidence: `3d48e86a09f70d37fad9765d0694294cdc13f2ba`
- runtime: `2262237e92965d9e5171a9688694f13d2bc183aa`
- test source: `42305c85cbec46d7e43fcf429715b1d583f4018c`
- tested PoC: `4f04d6b0225d0a456d53e1206ff5bf319da605f8`

Physical selection proved the real local provider `AVAILABLE` and selected for `text-region/local` with `observeCalls = 0`.

## P5E — normal agent-loop end-to-end visual fallback

Status: `PHYSICALLY_VALIDATED`.

The normal `agent-loop.js::runTask()` path now accepts an optional deterministic caller/skill visual-fallback contract. The CLI path supplies none by default, so visual fallback does not become implicit.

The visual execution context is resolved lazily. The validated order is:

```text
semantic planner output
→ normal agent loop
→ semantic OPEN first
→ structured eligible gap
→ P5B classification
→ lazy P5D provider selection
→ deterministic visual execution context
→ P5A
→ Computer Control CLICK_POSTED
→ fresh independent post-action perception
→ deterministic postcondition
→ VERIFIED_SUCCESS
```

Authoritative validation:

- session: `cu-perception-p5e-agent-loop-visual-fallback-public-s01`
- evidence: `d18e82d06456438f289eb0bf6c6f630973b5a99f`
- Computer Use runtime: `3e52ebaebc20398787d904d6ed6e2d2111fe5710`
- Computer Control: `e3a3f13d66546cf8f0fca50075bd4607c2c3d003`
- frozen test source: `59094fe637d078eaa08436114e45d74308b45428`
- tested PoC: `fdb6a17ce2f0744533c123016bff5fce8f4e7704`
- result: 8 PASS / 0 FAIL / 0 BLOCKED

The physical plan contained only ordinary semantic intents `ACTIVATE_APP` and `OPEN`. It contained no visual-fallback fields, provider identity, postcondition or coordinates. After semantic `NO_SEMANTIC_TARGET`, Computer Use lazily selected `rumiai.local.macos-vision-text-region`, P5A performed real Computer Control delivery, and the agent loop reported success only after a new independent visual observation satisfied the exact postcondition.

`CLICK_POSTED` remained delivery evidence with `semanticConsequenceVerified = false`; only the independent post-action observation produced `VERIFIED_SUCCESS`.

See `docs/evidence/perception-p5e-agent-loop-visual-fallback-public-physical.md`.

## Initial P5 scope now closed

The following narrow capability is now validated as one coherent product path:

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

This is not a claim of general UI understanding or arbitrary computer use.

## Next program: post-P5 hardening / productization

Do not reopen validated P1–P5 contracts without new evidence. Candidate next checkpoints are:

1. **P6A — first real product skill/caller contract**: move the explicit visual target/postcondition from test-owned context into one narrow deterministic application skill/caller contract, while preserving semantic planner output and explicit authorization.
2. **P6B — provider packaging/runtime hardening**: avoid compile-on-first-observe where appropriate, define installation/cache/version behavior, and retain the no-mandatory-cloud rule.
3. **P6C — broader visual observation types**: fuzzy/contextual text, icons/objects/VLM only as separately evidenced contracts.
4. **P6D — display/action expansion**: secondary/rotated displays, additional pointer/keyboard gestures only through separate evidence programs.
5. **P6E — richer postconditions/recovery**: expand success verification without weakening `delivery != success` or turning visual fallback into generic retry.

Immediate next recommended checkpoint: **P6A first real product skill/caller contract**, because P5E has proven the orchestration mechanics and the remaining product gap is deterministic knowledge of when a real task has an authorized visual target and verifiable postcondition.
