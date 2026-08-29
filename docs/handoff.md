# RumiAI Computer Use — handoff

Date: 2026-08-29

This is the operational handoff for Computer Use visual perception / visual fallback. Repository state plus immutable evidence commits are authoritative when chat history differs.

## Current authoritative state

P5 is **complete for the initial narrow scope**.

- Current validated Computer Use P5E runtime: `3e52ebaebc20398787d904d6ed6e2d2111fe5710`.
- Computer Control dependency: `e3a3f13d66546cf8f0fca50075bd4607c2c3d003`.
- P5E authoritative session: `cu-perception-p5e-agent-loop-visual-fallback-public-s01`.
- P5E evidence: `d18e82d06456438f289eb0bf6c6f630973b5a99f`.
- P5E frozen test source: `59094fe637d078eaa08436114e45d74308b45428`.
- P5E tested PoC SHA: `fdb6a17ce2f0744533c123016bff5fce8f4e7704`.
- P5E result: 8 PASS / 0 FAIL / 0 BLOCKED.
- P5A: `PHYSICALLY_VALIDATED`.
- P5B: `CONTRACT_VALIDATED`.
- P5C: `PHYSICALLY_VALIDATED`.
- P5D: `PHYSICALLY_VALIDATED`.
- P5E: `PHYSICALLY_VALIDATED`.
- Next recommended checkpoint: **P6A first real product skill/caller visual-fallback contract**.

Documentation commits after a validated runtime do not imply product behavior changes. On resume always verify current remote heads and ancestry.

## Repository ownership

- `rumiai-computer-use`: semantic intent/execution, interpretation, perception providers, target resolution, fallback policy, success verification, skills/caller contracts and orchestration.
- `rumiai-computer-control`: desktop observation/action mechanics and delivery boundaries only. It remains perception-provider-free.
- `rumiai-computer-use-PoCs`: discovery, immutable physical evidence, fixtures, contract tests and SHA locking.

Reference Mac paths:

```text
Computer Use     /Volumes/RumiAI/rumiai-portable-runtime/app/computer-use
Computer Control /Volumes/RumiAI/rumiai-portable-runtime/lib/computer-control
PoC              /Volumes/RumiAI/rumiai-portable-runtime/test/computer-use-poc
Node             /Volumes/RumiAI/rumiai-portable-runtime/bin/nodejs/bin/node
agent-ctrl        /Volumes/RumiAI/rumiai-portable-runtime/bin/agent-ctrl
```

For every fresh manual terminal session, the first command must be `cd` into the relevant repository. Use `git pull --ff-only`; never reset or rewrite evidence history.

## Non-negotiable invariants

1. Semantic-first: structured semantic observation/action is preferred whenever it can solve the task.
2. Visual fallback is explicit; it is never a generic retry mechanism.
3. `delivery != success`; `CLICK_POSTED` is delivery evidence only.
4. `IMPLEMENTED != PHYSICALLY_VALIDATED`.
5. Visual observation != semantic identity != action authorization != task success.
6. Planner output remains semantic: no coordinates, provider identity or fabricated postconditions.
7. Only structured P5B-eligible semantic observability/resolution gaps may consider visual fallback.
8. Perception provider selection belongs to Computer Use, never Computer Control.
9. No mandatory network/account/cloud API dependency is introduced by perception.
10. Screenshot bytes, OCR text and target/action coordinates are sensitive and remain ephemeral/out of ordinary logs.
11. Physical evidence is immutable; failed/interrupted sessions are preserved.
12. Git is forward-only.

## Validated checkpoints

| Stage | State | Authoritative session / evidence | Validated Computer Use runtime |
|---|---|---|---|
| P1A | PHYSICALLY_VALIDATED | `cu-perception-p1a-visual-frame-acquisition-s04` / `bdb4de64ea4471838e878a385e2f1f2b7f538ae7` | `322b5cdf3d7003a64910fcc46927225405150213` |
| P1B public | PHYSICALLY_VALIDATED | `cu-perception-p1b-mapped-frame-public-s02` / `09692cd9b16eb36a10bb0ee294162b901afcfd17` | `29c269864def0a26d3254e913d2a5a87f6125103` |
| P2A | PHYSICALLY_OBSERVED | `cu-perception-p2a-local-ocr-discovery-s02` / `9bf876dd35190776b9276d1e98db9e16733b5c50` | discovery |
| P2B | PHYSICALLY_VALIDATED | `cu-perception-p2b-provider-contract-public-s02` / `82ca0c0d1fb383a3102d19238cfe885cd0b8d8a4` | `839d53d100e31da2fec839351f94f197d377ab36` |
| P3A | PHYSICALLY_VALIDATED | `cu-perception-p3a-target-resolution-public-s01` / `c2a1e704f99b5cf528fb15287a785875c454a400` | `32a49d08bd235e906b992e093e2184144f76136c` |
| P3B | PHYSICALLY_VALIDATED | `cu-perception-p3b-action-policy-public-s01` / `3ba45950619a9e3cf9249b830609e7ca9ccd9faf` | `a8f85143ae77ba79e4fb47a0931697714df908b6` |
| P4 | PHYSICALLY_VALIDATED | `cu-perception-p4-action-execution-public-s01` / `cd86381d05bb7fcbda91ebe77ff8d8806ee827fa` | `5dc3607ff18b20ab806b9bf455b68f962a005e9f` |
| P5A | PHYSICALLY_VALIDATED | `cu-perception-p5a-visual-fallback-coordinator-public-s01` / `8076ddeaa3ac061e5cc1fb745aa97e1f9badb0c3` | `cc9e26e87aa83239378d466d64879229fe2302bc` |
| P5B | CONTRACT_VALIDATED | `cu-perception-p5b-semantic-visual-eligibility-contract-s02` / `cbc88158c4cefd7a32ee3acec6e0424eb1a8f1ec` | `28c654d51c1014ee826dcf24f42b6758dc67a721` |
| P5C | PHYSICALLY_VALIDATED | `cu-perception-p5c-open-semantic-first-public-s08` / `9195ae930f87f9804052e5024cb406b1488a747b` | `8f21dd520356fc30e147e17adfff2c7567f36b83` |
| P5D | PHYSICALLY_VALIDATED | `cu-perception-p5d-provider-selection-public-s01` / `3d48e86a09f70d37fad9765d0694294cdc13f2ba` | `2262237e92965d9e5171a9688694f13d2bc183aa` |
| P5E | PHYSICALLY_VALIDATED | `cu-perception-p5e-agent-loop-visual-fallback-public-s01` / `d18e82d06456438f289eb0bf6c6f630973b5a99f` | `3e52ebaebc20398787d904d6ed6e2d2111fe5710` |

P1–P5 physical evidence is authoritative. Do not rerun already validated physical checkpoints merely for regression; contract regressions are allowed.

## Current product architecture

```text
app/perception.js                           P1/P1B mapped visual frame
app/perception-provider.js                  P2B provider-neutral interpretation
app/perception-target.js                    P3A exact-text target resolution
app/perception-action-policy.js             P3B explicit fallback authorization
app/perception-action-execution.js          P4 delivery + independent verification
app/perception-action-coordinator.js        P5A composition
app/semantic-visual-fallback-eligibility.js P5B structured eligibility
app/open-semantic-first.js                  P5C semantic-first handoff
app/executors.js                            P5C OPEN integration
app/perception-provider-manager.js          P5D perception-provider selection
app/perception-providers/macos-vision.js    P5D optional local concrete provider
app/visual-fallback-execution-context.js    P5E lazy deterministic context construction
app/agent-loop.js                           P5E normal orchestration wiring
```

The existing `app/provider-manager.js` remains application-provider management and is deliberately separate from perception-provider selection.

## What P5E physically proves

The authoritative s01 run exercised the product-owned normal `runTask()` path with a deterministic test planner whose complete semantic plan was:

```text
ACTIVATE_APP(RumiAI P5C Semantic Fixture)
OPEN(RUMIAI CLICK 517)
```

No visual-fallback fields, provider identity, postcondition or coordinates were present in planner output.

The OPEN path then physically executed:

```text
semantic OPEN first
→ NO_SEMANTIC_TARGET
→ P5B eligible
→ lazy visual context resolution
→ P5D selects rumiai.local.macos-vision-text-region
→ P5A
→ real Computer Control CLICK_POSTED
→ semanticConsequenceVerified=false
→ fresh post-action mapped capture
→ local Vision interpretation
→ exact deterministic postcondition
→ VERIFIED_SUCCESS
→ normal agent loop reports PASS
```

This proves orchestration mechanics, not general LLM planning accuracy. Ordinary CLI calls that provide no explicit caller/skill visual contract do not automatically gain visual fallback.

## Important P5 history

P5C s01–s07 are immutable FAIL evidence. They document fixture/provider problems and the eventual discovery that normalized selectable state belonged in Computer Control `ui.describe`, not only textual snapshot markers. s08 is authoritative.

P5D s01 established provider selection independently from OCR correctness. P5E s01 then used the actual product macOS Vision provider in the normal agent loop.

## Exact next checkpoint: P6A

Goal: replace the **test-owned visual-fallback contract** used by P5E with one first narrow **real product skill/caller contract**, without changing the validated semantic planner schema or weakening any P5 boundary.

Required properties:

- one narrowly scoped, deterministic real application/task contract;
- the planner still emits ordinary semantic intent only;
- the skill/caller determines whether visual fallback is authorized for that intent;
- exact visual target is deterministic and must match the semantic OPEN target;
- exact postcondition is deterministic and application/task-specific;
- provider requirements are declarative (`text-region`, local by default), not a hard-coded provider object;
- provider selection remains lazy and happens only after a P5B-eligible semantic gap;
- no coordinates enter skill/planner data;
- no fallback on semantic delivery/verification/readiness/permission/internal failures;
- success still requires independent post-action evidence;
- first validate contract behavior, then one physical real-skill flow.

Before implementing P6A, inspect existing `skills/`, `skill-manager.js`, context/provider conventions and choose the narrowest real skill whose visual target and postcondition can be deterministic. Do not invent a generic visual skill framework prematurely.

## Later hardening, not P6A prerequisites

- provider packaging/cache/version hardening;
- additional local/remote providers and ranking;
- fuzzy/contextual text matching;
- icon/object/VLM observations;
- secondary/rotated displays;
- richer pointer/keyboard gestures;
- richer postconditions/recovery.

## Development workflow

1. Verify current remote heads before editing.
2. Fetch current blob SHA immediately before every GitHub update.
3. Implement product forward-only.
4. Freeze exact product SHA.
5. Add/update contract and physical PoC tests.
6. Freeze exact test-source SHA.
7. Add only runner + manifest after test-source freeze.
8. User executes the exact physical session on the reference Mac.
9. Inspect remote immutable evidence, not only terminal summary.
10. Promote only after all claims are evidenced.

Immediate next implementation checkpoint: **P6A first real product skill/caller visual-fallback contract**.
