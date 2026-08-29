# RumiAI Computer Use — handoff

Date: 2026-08-29

Repository state plus immutable evidence commits are authoritative when chat history differs.

## Current authoritative state

P5 is **complete for the initial narrow scope** and P6A is now **PHYSICALLY_VALIDATED**.

- Current P6A Computer Use runtime: `5e4daf5ebf352535653bfb21a559026238966a20`.
- Computer Control dependency: `e3a3f13d66546cf8f0fca50075bd4607c2c3d003`.
- P6A session: `cu-perception-p6a-caller-contract-registry-public-s01`.
- P6A evidence: `21ad01e93a5de4e5276b49c193269a26ad66b164`.
- P6A frozen test source: `66455683f3088b6cfb7fa9e1a49274a9c08269f5`.
- P6A tested PoC SHA: `380c6f756dda2a2e798a7987e1d3aff2059060de`.
- P6A result: 9 PASS / 0 FAIL / 0 BLOCKED.
- Active checkpoint: **P6B real-application contract discovery**.

## Non-negotiable invariants

1. Semantic-first: structured semantic operation is preferred whenever it can solve the task.
2. Visual fallback is explicit and is never a generic retry mechanism.
3. `delivery != success`; `CLICK_POSTED` is delivery evidence only.
4. `IMPLEMENTED != PHYSICALLY_VALIDATED`.
5. Planner output remains semantic: no coordinates, provider identity or fabricated postconditions.
6. Only structured P5B-eligible semantic observability/resolution gaps may consider visual fallback.
7. Perception-provider selection belongs to Computer Use, never Computer Control.
8. No mandatory network/account/cloud API dependency.
9. Screenshot bytes, OCR text and coordinates remain ephemeral/out of ordinary logs.
10. Physical evidence is immutable and Git is forward-only.

## Validated path

P1–P4 remain physically validated and must not be physically rerun merely for regression. P5A, P5C, P5D and P5E are physically validated; P5B is contract-validated.

P5E authoritative evidence: `d18e82d06456438f289eb0bf6c6f630973b5a99f`.

The normal validated orchestration is:

```text
semantic planner output
→ normal agent loop
→ semantic OPEN first
→ structured eligible gap
→ P5B
→ lazy P5D provider selection
→ deterministic visual execution context
→ P5A
→ Computer Control CLICK_POSTED
→ independent post-action perception
→ exact postcondition
→ VERIFIED_SUCCESS
```

## P6A — caller-contract registry

`app/visual-fallback-contract-manager.js` is a local deterministic registry for caller-owned execution knowledge. It is intentionally separate from competence skills.

A registry entry is matched fail-closed on:

```text
application + intent=OPEN + exact target
```

It may provide:

- exact visual target;
- exact deterministic postcondition;
- explicit `allowVisualFallback=true`;
- the already validated primary-display left-click action shape;
- declarative perception-provider requirements.

It may not provide:

- action coordinates;
- native element identities;
- a concrete provider object;
- generic fallback authorization;
- task success.

P6A physical evidence proved that the selected local JSON contract entered normal `runTask`, the planner stayed semantic, semantic `NO_SEMANTIC_TARGET` occurred first, provider selection remained lazy, `CLICK_POSTED` remained delivery-only, and only independent post-action evidence produced `VERIFIED_SUCCESS`.

See `docs/evidence/perception-p6a-caller-contract-registry-public-physical.md`.

## Why P6A is not yet a built-in application skill

Existing competence skills under `skills/` currently validate application activation/document editing capabilities. There is no previously validated real application skill that realizes the P5 `OPEN` visual-fallback contract. Do not attach visual target/postcondition knowledge to TextEdit, Pulsar, Finder or System Settings without evidence.

System Settings is specifically not the first discovery target because historical P5C evidence showed its current semantic snapshot boundary can fail before OPEN execution.

## Active checkpoint: P6B real-application contract discovery

Use an actual supported application and a controlled application surface to discover a candidate contract before shipping it as built-in knowledge.

First candidate: Safari, which already has a product application Provider. Use a local test-owned page rendered in Safari with a canvas-drawn exact target whose click deterministically changes the canvas to an exact postcondition.

P6B discovery must prove, on the real Safari application:

1. Safari was not already running; otherwise the test blocks without disturbing user state.
2. Safari can be launched/activated and observed by the current external Computer Control boundary.
3. The canvas target is visible in the captured pixels but does not resolve as a semantic AX target (`NO_SEMANTIC_TARGET`).
4. P5D selects the real local macOS Vision provider.
5. P2B/P3A resolve exactly one visual target.
6. Explicit P3B authorization allows only the validated primary-display left click.
7. Real Computer Control delivery returns canonical `CLICK_POSTED` and does not claim semantic consequence.
8. A fresh post-action capture observes the exact new canvas postcondition and no longer observes the initial target.
9. No screenshot/OCR/coordinates are persisted in evidence.
10. Safari/test resources/runtime/pointer are cleaned up and product trees stay clean.

P6B discovery is **not** permission to ship a generic Safari visual fallback. Promotion to built-in product knowledge occurs only after this evidence and only for a contract whose scope is explicitly represented.

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
6. User runs the immutable physical session.
7. Inspect remote evidence, not only terminal summary.
8. Promote only the claims physically evidenced.

Immediate next checkpoint: **P6B Safari real-application visual contract discovery**.
