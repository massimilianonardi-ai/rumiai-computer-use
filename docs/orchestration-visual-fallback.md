# Visual fallback orchestration plan

Status: P1–P4 physically validated; P5 not started.

This document fixes the next implementation sequence after completion of the first physically validated visual fallback path. The detailed perception/action contracts remain in `docs/perception.md`; operational resume state is in `docs/handoff.md`.

## Why P5 exists

The visual stack is already physically validated end to end:

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

However, this stack is still a set of isolated product modules. The normal Computer Use path in `agent-loop.js` / `executors.js` remains semantic-first and does not yet invoke the visual stack as an orchestrated fallback.

P5 integrates the validated capability without changing the architectural rule that semantic operations are preferred whenever available.

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

## P5A — visual fallback coordinator

Goal: compose the existing P1B/P2B/P3A/P3B/P4 modules into one explicit Computer Use operation while retaining their independent contracts.

Create a small coordinator module, conceptually:

```js
runVisualTextFallback({
  provider,
  targetQuery,
  actionRequest,
  policy,
  postcondition,
  observeAfterDelivery,
})
```

The exact API may be refined during implementation, but it must remain explicit and dependency-injectable.

Responsibilities:

1. acquire a P1B mapped primary frame;
2. invoke the P2B provider-neutral interpretation boundary;
3. resolve the requested exact-text target via P3A;
4. evaluate P3B policy;
5. invoke P4 only if P3B returned an authorized/ready plan;
6. return the P4 result without collapsing delivery and success states.

Non-responsibilities:

- provider selection;
- semantic fallback eligibility;
- planner intent generation;
- target guessing/ranking;
- postcondition inference;
- recovery policy outside the existing stage contracts.

Validation order:

- deterministic contract tests with injected provider/control;
- static boundary tests proving no backend bypass/persistence;
- physical test using the existing test-owned visual fixture and local Vision PoC provider;
- immutable PASS evidence before promotion.

## P5B — semantic-to-visual eligibility classification

Goal: define exactly when a semantic executor failure is a capability/observability gap that may be handed to P5A.

Today many executor failures are expressed as human-readable strings. P5 must not parse those strings to make safety-relevant fallback decisions.

Introduce structured failure/result codes at the semantic boundary. Initial visual eligibility should be intentionally small, equivalent to:

```text
NO_SEMANTIC_TARGET
SURFACE_NOT_OBSERVABLE
```

Examples that must remain ineligible by default:

```text
APPLICATION_NOT_READY
PERMISSION/BACKEND BLOCKED
SEMANTIC ACTION DELIVERY FAILED
SEMANTIC POSTCONDITION/VERIFICATION FAILED
INTERNAL EXCEPTION
INVALID INTENT/PRECONDITION
```

The eligibility classifier should be pure/deterministic and separately tested. A visual fallback must never be used as a generic retry mechanism for a failed semantic action.

## P5C — first executor integration: OPEN

Goal: integrate one existing intent only, keeping scope narrow enough to prove the orchestration rule.

Use `OPEN(target)` first because it already has a clear semantic target-resolution stage.

Required flow:

```text
OPEN(target)
  → existing semantic resolution/action
      → success: return semantic result; do not capture visually
      → eligible semantic observability gap:
          → require explicit visual fallback policy
          → require deterministic visual target query
          → require deterministic postcondition
          → P5A coordinator
      → all other failure classes: return failure; no visual fallback
```

The visual target query and postcondition must come from deterministic skill/context/caller data, not newly invented planner fields. The LLM continues to express semantic intent (`OPEN target`), not coordinates and not success criteria fabricated at execution time.

The initial physical executor test should use a test-owned fixture where:

- the semantic resolver is intentionally unable to observe the target;
- the visual exact-text target is uniquely observable;
- the expected postcondition is deterministic and absent before the click;
- the postcondition appears only after the real click;
- semantic-first behavior is separately proven with a case where the semantic target is available and visual capture/provider are not called.

Promotion requires immutable physical evidence for both paths.

## P5D — concrete perception-provider delivery and selection

Goal: make an actual local perception provider available to normal Computer Use without embedding provider-specific assumptions in P2/P3/P4.

Requirements:

- Computer Use owns provider discovery/selection;
- provider descriptor retains `id`, `locality`, capabilities and explicit availability;
- P2B remains provider-neutral;
- no mandatory network/account/cloud API;
- macOS Vision may become the first optional local provider, but through a provider adapter/manager boundary;
- the provider implementation must not migrate into Computer Control;
- provider selection must be testable independently of target resolution/action execution.

Do not broaden the P2 observation schema merely to make provider packaging convenient.

## P5E — first normal agent-loop end-to-end task

Goal: validate the visual fallback through the normal Computer Use orchestration rather than a dedicated P1–P4 harness.

Prerequisites: P5A–P5D physically validated as appropriate.

The first supported task must demonstrate:

1. planner emits the existing semantic intent, not a low-level visual instruction;
2. executor attempts semantic operation first;
3. eligible capability gap is classified structurally;
4. provider selection resolves a local visual provider;
5. P5A runs only after explicit fallback authorization;
6. real Computer Control delivery occurs;
7. independent post-action observation verifies the deterministic postcondition;
8. agent-loop reports success only from verified task outcome;
9. product trees and sensitive-data logging policy remain clean.

This is the milestone at which visual fallback becomes an orchestrated Computer Use capability.

## Deferred hardening after P5

These are separate evidence programs, not requirements for P5A:

- multi-display / rotated-display mapping;
- fuzzy/ranked or contextual text matching;
- object/icon/VLM observation types;
- richer action plans: right click, double click, drag, wheel, keyboard;
- richer postcondition types;
- multiple local/remote perception providers and ranking;
- provider/runtime performance policy;
- broader recovery policies and application skills.

## Immediate next action

Start **P5A**. Do not reopen P1–P4 unless a P5 test produces evidence that an existing boundary is wrong.
