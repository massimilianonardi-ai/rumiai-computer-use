# RumiAI Computer Use — handoff

Date: 2026-08-30

Repository state plus immutable evidence commits are authoritative when chat history differs.

## Current authoritative state

- P1–P4: `PHYSICALLY_VALIDATED`
- P5 initial narrow semantic-first visual fallback: `COMPLETE`
- P6A: `PHYSICALLY_VALIDATED`
- P6B: `PHYSICALLY_OBSERVED`
- P6C: `PHYSICALLY_VALIDATED`
- P6D: `PHYSICALLY_VALIDATED`
- initial P6 safety architecture: `COMPLETE`
- P7A: `DIAGNOSTIC_OBSERVED`
- P7B: `DIAGNOSTIC_OBSERVED`
- P7C: `REAL_USE_CANDIDATE_PHYSICALLY_VALIDATED`
- P7D: `CONTRACT_VALIDATED`
- P7E: `PHYSICALLY_VALIDATED`
- P7 first real-use promotion: `COMPLETE` at explicit `runTask` caller-context boundary
- P8A: `PROVENANCE_GAP_CONFIRMED`
- P8B: `CONTRACT_VALIDATED`
- P8C: `CONTRACT_VALIDATED`
- P8D: `PHYSICALLY_VALIDATED`
- P8E: `PHYSICALLY_VALIDATED`
- P8 trusted resource provenance: `COMPLETE` at product task-invocation owner boundary
- active program: **P9 external invocation / higher-level integration**

## Latest authoritative physical validation — P8E

- product boundary: `app/task-invocation.js`
- Computer Use validated runtime: `e045791532c981e844df8e7b1bb21dd723b6f72c`
- Computer Control: `e3a3f13d66546cf8f0fca50075bd4607c2c3d003`
- session: `cu-perception-p8e-task-invocation-owner-physical-public-s01`
- evidence: `48474a6c7ae94905c68eee69afa453bd52aea7e0`
- frozen physical source: `6caa5ac44ef05604310c4e792b085309db44c472`
- tested PoC: `64cddcdb0184c8585e22a1891976e546dc5e268f`
- result: **18 PASS / 0 FAIL / 0 BLOCKED**

Contract prerequisite:

- session: `cu-perception-p8e-task-invocation-owner-public-s01`
- evidence: `9ee985d84bd8aaf0f187783afdb20bdaf9c255da`
- result: 17 PASS / 0 FAIL / 0 BLOCKED

Product evidence doc:

`docs/evidence/perception-p8e-task-invocation-owner-public-physical.md`

Evidence-doc commit: `e33830d164c28ca36ebc569e02afdc2c8dafc3ec`.

Orchestration close/open commit: `cd7308291c7aa56b2d820bc9bdaac0b7aa7ef2c5`.

## P8E proven path

The physical fixture crossed the product task-invocation owner rather than directly supplying `taskResourceContext` to `runTask`.

```text
explicit invocation JSON
→ app/task-invocation.js
→ versioned taskResourceContext
→ derived pulsar-document caller context
→ bounded P7D contract
→ semantic OPEN UTF-8
→ structured NO_SEMANTIC_TARGET
→ exact current-document window-title guard
→ lazy Computer Use-owned local Vision
→ exact UTF-8
→ Computer Control CLICK_POSTED
→ independent exact UTF-16 LE observation
→ VERIFIED_SUCCESS
```

Physical facts:

- invocation version 1: PASS
- explicit resources: PASS
- task preserved: PASS
- `runTask` calls: exactly 1
- only forwarded provenance/visual option: `taskResourceContext`
- alternate explicit visual sources: absent
- owner: `task-invocation`
- derived caller context: `pulsar-document`
- planner semantic-only: PASS
- semantic code: `NO_SEMANTIC_TARGET`
- exact surface guard: PASS
- provider: `rumiai.local.macos-vision-text-region`
- provider selection calls: 1
- window observation calls: 1
- surface verification calls: 1
- delivery: `CLICK_POSTED`
- delivery semantic consequence verified: false
- independent postcondition: exact `UTF-16 LE`
- task outcome: `VERIFIED_SUCCESS`
- temporary document hash unchanged
- no encoding selection confirmed
- no screenshot/OCR/coordinates persisted
- no test-initiated external network
- cleanup: selector dismissed, pointer restored, Pulsar terminated, runtime shut down, temp removed
- product trees clean

## P8 completion boundary

P8 now proves a real product owner for explicit resource provenance before planner execution:

```text
caller explicitly owns file resource
→ versioned invocation
→ product validates resource ownership
→ taskResourceContext
→ normal runTask
```

Do **not** extend this claim to the default interactive CLI. The default CLI still has no legitimate current-document resource provenance and must not infer it from window title, foreground state, semantic snapshot, OCR, Vision, coordinates or planner output.

Do not generalize P8 into:

- generic Pulsar status-bar clicking;
- arbitrary Pulsar targets;
- automatic file-path inference;
- persistent/global resource state;
- generic application resource synthesis;
- prefix/contains/fuzzy surface matching.

## Non-negotiable invariants

1. Semantic-first.
2. Visual fallback is explicit, never a generic retry.
3. `delivery != success`; `CLICK_POSTED` is delivery only.
4. `IMPLEMENTED != PHYSICALLY_VALIDATED`.
5. Planner output remains semantic: no coordinates, provider identity, caller context, resource identity/path, scope, surface identity or fabricated postconditions.
6. Only structured P5B-eligible semantic observability/resolution gaps may become visually eligible.
7. Perception-provider selection belongs to Computer Use.
8. Runtime surface preconditions are checked before provider selection/action delivery.
9. Resource/caller-owned identity must not be guessed from UI state.
10. No mandatory network/account/cloud API dependency.
11. Screenshot bytes, OCR text and coordinates remain ephemeral/out of ordinary logs.
12. Physical evidence is immutable; Git advances forward-only.
13. No force/reset/rewrite to make tests pass.

## Closed evidence lineage

### P6

- P6A: `21ad01e93a5de4e5276b49c193269a26ad66b164`
- P6B: `e8a2899c58c5e6d3725d4457af18aefc25923580`
- P6C: `c66eb5ba69d9e0435cb894731b1d1cea832c31e1`
- P6D: `ec7e9757dada06ca313e585c09a42fcf7202e90d`

### P7

- P7A: `65c7a674984638529ee8be603a6df09445f68deb`
- P7B: `5f5045693400f8957e98baea6ba76fc428011e7f`
- P7C authoritative: `77fd94bd6b765a56182822cf2a43297b6baa1537`
- P7D: `31f10c01244d98eee1c8f309e46b0578d2d60337`
- P7E contract: `e1bb360188c3713653b09b0c2320fe45d4261f2d`
- P7E physical: `6af4a606eb71418cde61eddd3cdd1fade9b083d2`

### P8

- P8A: `fde64d9aab6cc14f8583864222b7581f177b86f7`
- P8B: `d08f48dee5fd7c14e3000821bb516dcafeca9da7`
- P8C: `aabe4a69a4a4b4c0ef86ebb3cfd659300aa103d8`
- P8D: `56439d05268b67427b901d686bac94ede4c12eb9`
- P8E contract: `9ee985d84bd8aaf0f187783afdb20bdaf9c255da`
- P8E physical: `48474a6c7ae94905c68eee69afa453bd52aea7e0`

## Active program — P9 external invocation / higher-level integration

P9 moves one boundary outward from the already-validated product owner.

Goal: prove how an external/higher-level RumiAI caller hands a versioned invocation to Computer Use while preserving explicit resource provenance and all P5–P8 safety properties.

### P9 invariants

- `app/task-invocation.js` remains the authoritative inner invocation boundary.
- External transport must not introduce `documentPath`, visual contracts, visual caller context, provider identity, coordinates or hidden execution dependencies into the invocation envelope.
- Resource paths are caller-owned facts, never UI-derived guesses.
- Resource provenance remains versioned, explicit, task/run bounded and inspectable.
- Planner remains semantic-only.
- Provider selection stays lazy after structured semantic gap and exact surface guard.
- `CLICK_POSTED` remains delivery only.
- `VERIFIED_SUCCESS` still requires independent post-action evidence.
- Default interactive CLI provenance remains a separate future program unless explicitly designed and validated.

### Immediate P9A checkpoint

Inspect the executable/stdin path already present in `app/task-invocation.js` and any higher-level integration surface available in the current product/runtime. Choose the smallest external transport that can be contract-tested without changing P8 resource semantics.

Do not add test-only product backdoors merely to make a subprocess physical test deterministic.

## Reference paths

```text
Computer Use     /Volumes/RumiAI/rumiai-portable-runtime/app/computer-use
Computer Control /Volumes/RumiAI/rumiai-portable-runtime/lib/computer-control
PoC              /Volumes/RumiAI/rumiai-portable-runtime/test/computer-use-poc
Node             /Volumes/RumiAI/rumiai-portable-runtime/bin/nodejs/bin/node
agent-ctrl        /Volumes/RumiAI/rumiai-portable-runtime/bin/agent-ctrl
```

For every fresh manual terminal session, the first command must be `cd` into the relevant repository. Use `git pull --ff-only`; never reset or rewrite evidence history.

## Development workflow

1. Verify current remote heads before editing.
2. Fetch current blob SHA before every GitHub update.
3. Implement/discover forward-only.
4. Freeze exact product/test-source SHAs.
5. Add only runner + manifest after source freeze.
6. User runs the immutable session.
7. Inspect remote evidence, not only terminal summary.
8. Promote only the claims evidenced.

Immediate next checkpoint: **P9A external invocation transport discovery and contract validation**.
