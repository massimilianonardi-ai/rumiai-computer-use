# Visual fallback orchestration plan

Status: P1–P4, P5A, P5C and P5D are physically validated; P5B is contract-validated; P5E is the active checkpoint.

This document fixes the implementation sequence for integrating visual fallback without weakening semantic-first behavior. Detailed perception/action contracts remain in `docs/perception.md`; operational resume state is in `docs/handoff.md`.

## Why P5 exists

The visual stack is physically validated end to end:

```text
capture
→ coordinate mapping
→ provider-neutral text observation
→ deterministic target resolution
→ explicit fallback authorization
→ real Computer Control click delivery
→ independent post-action observation
→ verified success
```

P5 turns that validated capability into an orchestrated Computer Use capability while preserving semantic-first execution.

## Invariants for all P5 work

- Never run visual perception merely because it exists.
- Never replace a successful semantic operation with a coordinate click.
- Never treat an arbitrary semantic/action failure as permission to fall back visually.
- Never put screen coordinates or native IDs into planner output.
- Never let an LLM invent a postcondition solely to justify a fallback.
- Visual fallback requires explicit policy authorization.
- Computer Control owns delivery mechanics; Computer Use owns interpretation, policy and success verification.
- `CLICK_POSTED` remains delivery only.
- `VERIFIED_SUCCESS` requires independent post-action evidence.
- Concrete perception-provider implementation/selection stays outside Computer Control.
- Evidence is immutable and Git history advances forward-only.

## P5A — visual fallback coordinator

Status: `PHYSICALLY_VALIDATED` on the reference Mac.

`app/perception-action-coordinator.js` exposes `runVisualTextFallback(...)`. It accepts an injected perception provider plus deterministic target/action/policy/postcondition inputs and composes P1B → P2B → P3A → P3B → P4 without selecting a provider, deciding semantic fallback eligibility, altering planner semantics, guessing targets or inferring postconditions.

Authoritative validation:

- session: `cu-perception-p5a-visual-fallback-coordinator-public-s01`
- evidence: `8076ddeaa3ac061e5cc1fb745aa97e1f9badb0c3`
- Computer Use runtime: `cc9e26e87aa83239378d466d64879229fe2302bc`
- Computer Control: `e3a3f13d66546cf8f0fca50075bd4607c2c3d003`
- frozen test source: `aaa88a862cba2f42fcecc4b21619c5b10eceeb85`
- result: 13 PASS / 0 FAIL / 0 BLOCKED

The physical run proved one real authorized visual click plus fresh independent post-action observation through the coordinator. `CLICK_POSTED` remained delivery only with `semanticConsequenceVerified = false`; only the independently observed deterministic postcondition produced `VERIFIED_SUCCESS`.

See `docs/evidence/perception-p5a-visual-fallback-coordinator-public-physical.md`.

## P5B — semantic-to-visual eligibility classification

Status: `CONTRACT_VALIDATED`.

`app/semantic-visual-fallback-eligibility.js` provides a pure deterministic classifier. Initial visually eligible structured semantic failure codes are exactly:

```text
NO_SEMANTIC_TARGET
SURFACE_NOT_OBSERVABLE
```

The following remain visually ineligible by default:

```text
APPLICATION_NOT_READY
PERMISSION_OR_BACKEND_BLOCKED
SEMANTIC_ACTION_DELIVERY_FAILED
SEMANTIC_POSTCONDITION_VERIFICATION_FAILED
INTERNAL_EXCEPTION
INVALID_INTENT
INVALID_PRECONDITION
```

Missing, malformed and unknown codes fail closed. Free-form `error` text is not parsed for fallback eligibility.

Authoritative validation:

- session: `cu-perception-p5b-semantic-visual-eligibility-contract-s02`
- evidence: `cbc88158c4cefd7a32ee3acec6e0424eb1a8f1ec`
- Computer Use runtime: `28c654d51c1014ee826dcf24f42b6758dc67a721`
- Computer Control: `e3a3f13d66546cf8f0fca50075bd4607c2c3d003`
- frozen test source: `e5651329fa066ff41d07c98295102b3fa6bebcc1`
- result: 4 PASS / 0 FAIL / 0 BLOCKED

See `docs/evidence/perception-p5b-semantic-visual-eligibility-contract.md`.

## P5C — first executor integration: OPEN

Status: `PHYSICALLY_VALIDATED` on the reference Mac.

`OPEN(target)` now follows the bounded semantic-first flow:

```text
OPEN(target)
  → semantic resolution/action first
      → semantic success:
          → fresh semantic post-action verification
          → return semantic result
          → do not run visual perception
      → eligible semantic observability gap:
          → require explicit visual fallback policy
          → require deterministic exact visual target
          → require deterministic exact postcondition
          → invoke P5A
      → every other semantic failure:
          → return failure
          → no visual fallback
```

The visual target and postcondition are supplied through execution context by deterministic skill/context/caller data. The planner remains unchanged and emits semantic intent only. Provider selection is intentionally not part of P5C.

The final semantic verification does not equate click delivery or focus with success. After the click, Computer Use takes a fresh snapshot, re-resolves the semantic target and consumes the normalized control state exposed by Computer Control `ui.describe`; alternatively an independently observed window-title consequence may satisfy the postcondition. If neither proves the consequence, OPEN fails.

Authoritative validation:

- session: `cu-perception-p5c-open-semantic-first-public-s08`
- evidence: `9195ae930f87f9804052e5024cb406b1488a747b`
- Computer Use runtime: `8f21dd520356fc30e147e17adfff2c7567f36b83`
- Computer Control: `e3a3f13d66546cf8f0fca50075bd4607c2c3d003`
- frozen test source: `21c00a22c28d2ac30841eb0afcb56bba3f273aaf`
- tested PoC SHA: `3de353c9b307c60d2a6d5736a9253c45c6137a64`
- result: 6 PASS / 0 FAIL / 0 BLOCKED

The physical session proved both paths. The semantic branch completed with `visualProviderCalls = 0`. The visual branch began from structured `NO_SEMANTIC_TARGET`, performed real Computer Control delivery, preserved `CLICK_POSTED != success`, and returned `VERIFIED_SUCCESS` only after a fresh independent visual postcondition observation. Product trees and cleanup were clean.

Historical P5C failed sessions s01–s07 remain immutable. See `docs/evidence/perception-p5c-open-semantic-first-public-physical.md`.

## P5D — concrete perception-provider delivery and selection

Status: `PHYSICALLY_VALIDATED` on the reference Mac.

Computer Use now owns a perception-provider discovery/selection boundary that is separate from application provider discovery. `app/perception-provider-manager.js` selects providers deterministically from explicit descriptors using capability, locality and availability. Selection never invokes `observe()` and does not silently substitute a remote provider for an unavailable local provider.

The first concrete provider is the optional local macOS Vision `text-region` adapter under `app/perception-providers/`. Its descriptor declares explicit availability and no required network, account or cloud API. P2B remains provider-neutral and Computer Control remains provider-free.

Authoritative validation:

- session: `cu-perception-p5d-provider-selection-public-s01`
- evidence: `3d48e86a09f70d37fad9765d0694294cdc13f2ba`
- Computer Use runtime: `2262237e92965d9e5171a9688694f13d2bc183aa`
- Computer Control: `e3a3f13d66546cf8f0fca50075bd4607c2c3d003`
- frozen test source: `42305c85cbec46d7e43fcf429715b1d583f4018c`
- tested PoC SHA: `4f04d6b0225d0a456d53e1206ff5bf319da605f8`
- result: 7 PASS / 0 FAIL / 0 BLOCKED

The physical session proved real local availability and deterministic selection for `text-region/local` with `observeCalls = 0`. It also proved that selection itself performs no frame capture, OCR, target resolution or action execution and that no implicit remote fallback or mandatory network/account/cloud dependency is introduced.

See `docs/evidence/perception-p5d-provider-selection-public-physical.md`.

## P5E — first normal agent-loop end-to-end task

Status: `ACTIVE`.

Goal: validate visual fallback through the normal Computer Use orchestration rather than a dedicated executor harness.

P5E must demonstrate:

1. planner output remains the existing semantic intent; no coordinates, provider id or fabricated postcondition enter planner output;
2. the normal agent-loop/executor path attempts semantic execution first;
3. only a structured P5B-eligible semantic observability gap may continue toward visual fallback;
4. Computer Use selects an available local provider through P5D;
5. P5A runs only with explicit fallback authorization and deterministic caller/skill target + postcondition;
6. real Computer Control delivery occurs;
7. `CLICK_POSTED` remains delivery only;
8. a fresh independent post-action observation must verify the deterministic postcondition before task success;
9. the normal agent-loop reports success only from that verified result;
10. product trees and sensitive-data logging policy remain clean.

P5E should keep the first normal task narrow and test-owned. The integration must not turn visual fallback into a generic retry mechanism or add mandatory perception dependencies for ordinary semantic tasks.

## Deferred hardening after P5

These remain separate evidence programs:

- multi-display / rotated-display mapping;
- fuzzy/ranked or contextual text matching;
- object/icon/VLM observation types;
- richer action plans: right click, double click, drag, wheel, keyboard;
- richer postcondition types;
- multiple local/remote perception providers and ranking;
- provider/runtime performance policy;
- broader recovery policies and application skills.

## Immediate next action

Implement **P5E first normal agent-loop end-to-end task**. Wire only the minimum deterministic execution context needed for the bounded OPEN scenario; keep the planner semantic, select the provider in Computer Use, preserve explicit authorization, and promote only after an immutable physical PASS.
