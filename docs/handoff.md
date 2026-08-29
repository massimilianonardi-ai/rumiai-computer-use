# RumiAI Computer Use — handoff

Date: 2026-08-29

This is the operational handoff for the Computer Use visual-perception / visual-fallback work. It is intended to let a new development session resume without reconstructing decisions from chat history.

## Authority and repository state

When chat history and repository contents disagree, the current Git repositories plus immutable physical-evidence commits are authoritative.

At handoff authoring time the remote repositories had already advanced beyond the last terminal transcript visible in the originating chat:

- `rumiai-computer-use/main` was a docs-only descendant at `13e515c9037697fa5265e7d3f650c73214bf7745`.
- The physically validated P4 Computer Use behavior/runtime is `5dc3607ff18b20ab806b9bf455b68f962a005e9f`.
- `rumiai-computer-control/main` is `e3a3f13d66546cf8f0fca50075bd4607c2c3d003` and Phase 10A–10E mechanics are closed/physically validated.
- Authoritative P4 PoC evidence is `cd86381d05bb7fcbda91ebe77ff8d8806ee827fa`.

Documentation commits after a validated runtime do not imply a behavior change. On resume, always fetch the current remote heads and verify ancestry instead of assuming the hashes above are still branch heads.

## Repository ownership

- `rumiai-computer-use`: owns intent, interpretation, provider-neutral perception contracts, target resolution, fallback policy, execution semantics, postcondition verification and orchestration.
- `rumiai-computer-control`: owns desktop observation/action mechanics and public delivery boundaries. Visual interpretation must not be moved into Computer Control.
- `rumiai-computer-use-PoCs`: owns physical discovery, immutable session evidence, fixtures, contract tests and product-SHA/test-source-SHA locking.

Reference Mac paths:

```text
Computer Use     /Volumes/RumiAI/rumiai-portable-runtime/app/computer-use
Computer Control /Volumes/RumiAI/rumiai-portable-runtime/lib/computer-control
PoC              /Volumes/RumiAI/rumiai-portable-runtime/test/computer-use-poc
Node             /Volumes/RumiAI/rumiai-portable-runtime/bin/nodejs/bin/node
agent-ctrl        /Volumes/RumiAI/rumiai-portable-runtime/bin/agent-ctrl
```

## Non-negotiable invariants

1. Semantic-first: structured Computer Control observation/action is preferred whenever it can solve the task.
2. Visual fallback is explicit and separate; never silently weaken semantic APIs.
3. `delivery != success`. `CLICK_POSTED` is delivery evidence only.
4. `IMPLEMENTED != PHYSICALLY_VALIDATED`.
5. Visual observation != semantic identity != action authorization != task success.
6. Native/AX/PID/display identities stay private unless a deliberately low-level public contract requires otherwise. Never guess native IDs.
7. Capture pixels and pointer coordinates are separate spaces. Mapping must be derived from observations, never inferred from coincident dimensions.
8. Screenshot bytes, OCR text and target/action coordinates are sensitive. Keep them ephemeral and out of ordinary logs/evidence.
9. Physical evidence is immutable. Preserve failed/interrupted sessions; fix forward only.
10. Git operations are forward-only. Never force/reset/destructively rewrite evidence history.
11. A visual provider belongs to Computer Use/perception, not Computer Control.
12. A planner/LLM must not invent coordinates or fabricate a semantic postcondition just to make a visual fallback executable.

## Current physically validated stack

The first end-to-end visual fallback path is complete on the reference Mac.

| Stage | Meaning | Authoritative session / evidence | Validated Computer Use runtime |
|---|---|---|---|
| P1A | real primary-display visual frame acquisition | `cu-perception-p1a-visual-frame-acquisition-s04` / `bdb4de64ea4471838e878a385e2f1f2b7f538ae7` | `322b5cdf3d7003a64910fcc46927225405150213` |
| P1B discovery | physical capture-pixel ↔ logical mapping discovery | `cu-perception-p1b-coordinate-mapping-discovery-s02` / `89ef1c1b0b2ddab7de2c8e35bd9dca2d88fb7a57` | discovery against the then-current product |
| P1B public | mapped-frame product path | `cu-perception-p1b-mapped-frame-public-s02` / `09692cd9b16eb36a10bb0ee294162b901afcfd17` | `29c269864def0a26d3254e913d2a5a87f6125103` |
| P2A | local OCR provider discovery using macOS Vision as a PoC oracle | `cu-perception-p2a-local-ocr-discovery-s02` / `9bf876dd35190776b9276d1e98db9e16733b5c50` | product boundary then at `a47ada40d6c01dc703c745dc22d046329fe34aea` |
| P2B | provider-neutral `text-region` interpretation contract | `cu-perception-p2b-provider-contract-public-s02` / `82ca0c0d1fb383a3102d19238cfe885cd0b8d8a4` | `839d53d100e31da2fec839351f94f197d377ab36` |
| P3A | exact-text single-match visual target resolution | `cu-perception-p3a-target-resolution-public-s01` / `c2a1e704f99b5cf528fb15287a785875c454a400` | `32a49d08bd235e906b992e093e2184144f76136c` |
| P3B | explicit visual-fallback authorization gate | `cu-perception-p3b-action-policy-public-s01` / `3ba45950619a9e3cf9249b830609e7ca9ccd9faf` | `a8f85143ae77ba79e4fb47a0931697714df908b6` |
| P4 | real left-click delivery plus independent visual postcondition verification | `cu-perception-p4-action-execution-public-s01` / `cd86381d05bb7fcbda91ebe77ff8d8806ee827fa` | `5dc3607ff18b20ab806b9bf455b68f962a005e9f` |

P4 used test-source `6c776dc0f811835850ccf3933b9b247364f8c1a3`, tested PoC SHA `9218a63b115a9cfb61bc7a091eb7e532aa8a7072`, and completed 12 PASS / 0 FAIL / 0 BLOCKED.

See `docs/perception.md` and `docs/evidence/` for the detailed contracts and physical claims.

## What P1–P4 actually establish

The validated narrow path is:

```text
Computer Control display.capture
    -> P1B stable primary-display coordinate mapping
    -> P2B provider-neutral text-region observations
    -> P3A exact-text single-match visual target
    -> P3B explicit left-click fallback authorization
    -> P4 Computer Control click delivery
    -> fresh independent post-action visual observation
    -> exact-text postcondition
    -> VERIFIED_SUCCESS only from that post-action observation
```

The P4 fixture demonstrated that the postcondition was absent before the action and present only after a real `CLICK_POSTED`. Computer Control still reported `semanticConsequenceVerified = false`; Computer Use alone promoted the task to `VERIFIED_SUCCESS` after the independent re-observation.

Initial validated scope is deliberately narrow:

- stable, unrotated primary display;
- provider-neutral `text-region` observations;
- macOS Vision used only as a PoC/local oracle, not a built-in Computer Use dependency;
- exact-text single-match target resolution;
- explicit visual-fallback consent;
- primary-display left click;
- exact-text independent postcondition verification.

No claim is made for general OCR accuracy, general semantic UI understanding, VLM/object/icon targeting, secondary/rotated displays, arbitrary gestures or arbitrary applications.

## Current product modules

The visual stack is intentionally decomposed:

```text
app/perception.js                  P1 frame + P1B mapping
app/perception-provider.js         P2B provider-neutral observation validation
app/perception-target.js           P3A target resolution
app/perception-action-policy.js    P3B authorization only
app/perception-action-execution.js P4 delivery + independent verification
```

The important remaining gap is orchestration integration: `agent-loop.js` and `executors.js` still operate through the pre-existing semantic path and do not compose/import the P1–P4 visual stack as a normal fallback route.

The local macOS Vision implementation also remains PoC-only. The product has a provider-neutral contract but no mandatory concrete OCR dependency, which is intentional.

## Important historical failures — do not rediscover them

These failures are preserved evidence, not reasons to reopen validated contracts:

- P1A s01: physical run failed with `BACKEND_UNAVAILABLE` because the new Computer Use runner did not pass the portable `AGENT_CTRL` path. Fixed in the PoC runner only.
- P1A s02: interrupted because the physical process retained the spawned Computer Control runtime child. Fixed forward with explicit `shutdownRuntime()` plus process-group watchdog.
- P1A s03: physical capture itself passed, but a stale/static PoC path guard caused the session result to fail. P1A s04 is authoritative.
- P1B discovery s01: marker detector was too RGB-rigid and a documentation guard was stale. Fixed with robust marker detection; s02 is authoritative.
- P2A s01: fixture Swift compilation failure before OCR. Fixed by normalizing the fixture/helper Swift code; s02 is authoritative.
- P2B s01: product and physical P2B passed but an old P1A documentation guard falsely failed after P2 was added. s02 is authoritative.

Do not delete or rewrite these historical sessions.

## Exact next phase: P5 — orchestration integration

P1–P4 are complete. The next work is not another perception primitive; it is to make the validated path usable by Computer Use orchestration without weakening semantic-first behavior.

### P5A — visual fallback coordinator

Add one product-owned coordinator that composes the already validated P1B → P2B → P3A → P3B → P4 stages behind a single explicit call. It must accept an injected perception provider and explicit target/action/postcondition inputs; it must not choose a provider, invent a target, invent a postcondition or alter planner semantics.

Expected conceptual input:

```text
provider
targetQuery = exact text
actionRequest = primary-display left click
policy = explicit allowVisualFallback boolean
postcondition = exact text
post-action observer
```

The coordinator must preserve every existing fail-closed boundary and `delivery != success`. First validate it with unit/contract tests and a physical test-owned fixture before wiring it into an executor.

### P5B — semantic-to-visual eligibility classification

Introduce structured executor/result reasons for when a semantic path may hand off to visual fallback. Do not parse free-form error strings.

Initial eligibility should be limited to genuine semantic observability/resolution gaps, e.g. explicit result codes equivalent to:

```text
NO_SEMANTIC_TARGET
SURFACE_NOT_OBSERVABLE
```

A generic action failure, click-delivery failure, verification failure, app-readiness failure, permission failure or internal exception must NOT automatically become visual fallback eligibility.

The eligibility decision must be deterministic and independently testable.

### P5C — first executor integration: OPEN, semantic-first

Use `OPEN(target)` as the first bounded integration only after P5A/P5B are validated.

Required behavior:

1. execute the existing semantic resolver/action first;
2. if it succeeds, visual perception is not run;
3. if it fails with an explicitly eligible semantic-observability reason, visual fallback may be considered;
4. fallback requires explicit policy consent;
5. fallback requires a deterministic exact visual target and a deterministic exact postcondition supplied by a skill/context/caller contract — not guessed by the LLM;
6. no coordinates enter the planner or intent schema;
7. invoke the P5A coordinator;
8. return success only if P4 independently verifies the postcondition.

Do not make every `OPEN` visually executable merely because OCR can see its label. If a deterministic postcondition is unavailable, fail/return unresolved instead of claiming success.

First prove this at executor level with a test-owned fixture and immutable physical evidence.

### P5D — concrete perception-provider delivery/selection boundary

After executor wiring works with an injected provider, define how Computer Use obtains a concrete perception provider at runtime.

Requirements:

- provider selection remains Computer Use responsibility;
- no provider becomes a Computer Control dependency;
- no mandatory network/account/API dependency;
- preserve the provider-neutral P2B contract;
- macOS Vision is a reasonable first optional local implementation, but package/select it through an explicit provider adapter/manager boundary rather than embedding Vision assumptions into P2/P3/P4;
- provider capability/locality must remain declared and inspectable.

Physically validate provider selection separately from OCR correctness.

### P5E — first agent-loop end-to-end task

Only after P5A–P5D:

- wire one narrowly supported task through `agent-loop.js` / normal executor dispatch;
- demonstrate semantic-first behavior when the semantic target exists;
- demonstrate the classified visual fallback when it does not;
- use the real configured local provider;
- execute through Computer Control;
- independently re-observe the deterministic postcondition;
- preserve recovery and evidence rules;
- promote only after immutable physical PASS.

P5E is the checkpoint that turns the already validated visual stack from an isolated product capability into an orchestrated Computer Use capability.

## After P5 — hardening, not prerequisites for first orchestration integration

Do not mix these into P5 unless evidence forces it:

- secondary/multi-display and rotated-display mapping;
- fuzzy/ranked text target selection;
- VLM/object/icon observation types;
- richer pointer/keyboard/drag/wheel visual action plans;
- multiple concrete perception providers and provider ranking;
- richer postconditions and recovery;
- broader application-specific skills.

## Development/test workflow on resume

1. Read this file, `docs/perception.md`, and the latest relevant evidence doc.
2. Verify current GitHub `main` heads for Computer Use, Computer Control and PoCs.
3. Pull local Mac repositories with `--ff-only`; never reset/clean evidence blindly.
4. For each checkpoint: implement product forward-only, freeze exact product SHA, add PoC contract/physical test, freeze test-source SHA, then add only session runner + manifest.
5. User executes the exact physical session command on the reference Mac.
6. Inspect the immutable evidence commit before promotion.
7. Preserve every FAIL/INTERRUPTED session and fix forward.

Immediate next implementation checkpoint: **P5A visual fallback coordinator**.
