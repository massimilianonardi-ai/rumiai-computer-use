# RumiAI Computer Use — handoff

Date: 2026-08-29

This is the operational handoff for Computer Use visual perception / visual fallback. Repository state plus immutable evidence commits are authoritative when chat history differs.

## Current authoritative state

- Computer Use validated P5C runtime: `8f21dd520356fc30e147e17adfff2c7567f36b83`.
- Computer Control dependency: `e3a3f13d66546cf8f0fca50075bd4607c2c3d003`.
- P5C authoritative physical session: `cu-perception-p5c-open-semantic-first-public-s08`.
- P5C evidence commit: `9195ae930f87f9804052e5024cb406b1488a747b`.
- P5C frozen test source: `21c00a22c28d2ac30841eb0afcb56bba3f273aaf`.
- P5C tested PoC SHA: `3de353c9b307c60d2a6d5736a9253c45c6137a64`.
- P5C result: 6 PASS / 0 FAIL / 0 BLOCKED.
- P5A: `PHYSICALLY_VALIDATED`.
- P5B: `CONTRACT_VALIDATED`.
- P5C: `PHYSICALLY_VALIDATED`.
- Active checkpoint: **P5D concrete perception-provider delivery/selection boundary**.

Documentation commits after a validated runtime do not imply product behavior changes. On resume always verify current remote heads and ancestry.

## Repository ownership

- `rumiai-computer-use`: intent, interpretation, provider-neutral perception contracts, provider selection, target resolution, fallback policy, execution semantics, postcondition verification and orchestration.
- `rumiai-computer-control`: desktop observation/action mechanics and delivery boundaries only. Perception-provider implementation/selection does not belong here.
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

1. Semantic-first: structured Computer Control observation/action is preferred whenever it can solve the task.
2. Visual fallback is explicit; never silently weaken semantic APIs.
3. `delivery != success`; `CLICK_POSTED` is delivery evidence only.
4. `IMPLEMENTED != PHYSICALLY_VALIDATED`.
5. Visual observation != semantic identity != action authorization != task success.
6. Native/AX/PID/display identities remain private unless an intentionally low-level contract requires them.
7. Capture pixels and pointer coordinates are separate spaces; mapping is derived from observations.
8. Screenshot bytes, OCR text and target/action coordinates are sensitive and stay ephemeral.
9. Physical evidence is immutable; failed/interrupted sessions are preserved.
10. Git is forward-only.
11. Perception providers and provider selection belong to Computer Use, never Computer Control.
12. Planner/LLM output remains semantic: no coordinates and no fabricated postconditions.

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

P1–P4 are already physically validated. Do not rerun them physically. Contract regressions are allowed where needed by later checkpoints.

## Current product architecture

```text
app/perception.js                       P1/P1B mapped visual frame
app/perception-provider.js              P2B provider-neutral interpretation contract
app/perception-target.js                P3A deterministic visual target resolution
app/perception-action-policy.js         P3B fallback authorization
app/perception-action-execution.js      P4 delivery + independent verification
app/perception-action-coordinator.js    P5A composition
app/semantic-visual-fallback-eligibility.js P5B structured eligibility
app/open-semantic-first.js              P5C semantic-first visual handoff boundary
app/executors.js                         P5C OPEN integration
```

The existing `app/provider-manager.js` is an **application Provider manager**: it resolves application descriptors, aliases, bundle/process identity and application availability. Do not repurpose it for perception-provider selection merely because both use the word “provider”. P5D should use an explicit perception-provider boundary unless evidence establishes a genuine shared abstraction.

## What P5C physically proves

The P5C s08 session proves both executor paths:

```text
semantic OPEN
  -> semantic target exists
  -> Computer Control click delivery
  -> fresh post-action snapshot
  -> fresh target resolution
  -> normalized Computer Control ui.describe selected state
  -> semantic success
  -> visual provider/P5A not invoked
```

and:

```text
visual OPEN
  -> semantic target absent
  -> structured NO_SEMANTIC_TARGET
  -> explicit visual policy + deterministic target/postcondition
  -> P5A
  -> local injected provider
  -> real Computer Control CLICK_POSTED
  -> independent post-action visual observation
  -> exact postcondition satisfied
  -> VERIFIED_SUCCESS
```

The physical log explicitly showed `visualProviderCalls=0` on semantic success and `CLICK_POSTED deliveryIsNotSuccess=true` on the visual branch. Product cleanup and tree cleanliness passed.

The final semantic verification intentionally does not treat focus or event delivery as success. It obtains fresh post-action evidence and consumes the normalized state exposed through Computer Control `ui.describe`.

## P5C immutable failed history

Do not delete, amend or replace these sessions:

- s01 `15976727c6b6a09b09b428c415c5daf74e6c0258`: standalone fixture was not a supported Provider.
- s02 `86793f0077d0926554c71422e4394b3bf3c62b9a`: registered direct executable remained unsnapshotable.
- s03 `26be209cfcdb9fa5ab81a2a23d823344c598a6d8`: LaunchServices fixture snapshot failure.
- s04 `630ac6c68cc7c960c01455a85dadbfb9f51abca8`: System Settings `no AX window found` surface mismatch.
- s05 `4c20c9bc2425829a26207f46a7c99fab54be1a9d`: AppKit Provider reached OPEN but title-based verification failed.
- s06 `9b695a32383ae22b70dd1498d823ebb27ae0080b`: radio state was real but not consumed by Computer Use verification.
- s07 `f2a2b81263f1ba052745e1dc9ef021a7533f1231`: first fix targeted snapshot markers; normalized state actually lived in `ui.describe`.

s08 is authoritative. Every correction was forward-only.

## Exact next checkpoint: P5D

Goal: define concrete perception-provider delivery/discovery/selection inside Computer Use, independently of OCR correctness.

Required properties:

- separate perception-provider manager from application Provider management;
- descriptor includes `id`, `locality`, capabilities and explicit availability;
- deterministic capability/locality selection;
- local-first preference without making network providers mandatory;
- no account/API/cloud requirement;
- P2B provider-neutral contract remains unchanged;
- first optional concrete adapter may use macOS Vision;
- Computer Control remains provider-free;
- selection contract is independently testable;
- physical evidence proves real local provider availability/selection, not OCR accuracy;
- no agent-loop visual fallback wiring yet.

P5D should first land product contract + contract tests, then freeze runtime/test-source, then create an immutable physical selection session.

## P5E after P5D

Only after P5D is validated:

1. normal planner emits existing semantic intent;
2. normal executor attempts semantic path first;
3. structured eligible gap permits fallback consideration;
4. Computer Use selects the configured local provider;
5. explicit fallback policy and deterministic target/postcondition authorize P5A;
6. Computer Control performs delivery;
7. independent post-action observation verifies consequence;
8. agent-loop reports success only from verified task outcome.

## Development workflow

1. Verify current remote heads before editing.
2. Fetch current blob SHA immediately before every GitHub update.
3. Implement product forward-only.
4. Freeze exact product SHA.
5. Add/update contract and physical PoC tests.
6. Freeze exact test-source SHA.
7. Add only runner + manifest after test-source freeze.
8. User runs the exact physical session on the reference Mac.
9. Inspect remote immutable evidence, not only terminal summary.
10. Promote checkpoint only after all claims are evidenced.

Immediate next implementation checkpoint: **P5D concrete perception-provider delivery/selection boundary**.
