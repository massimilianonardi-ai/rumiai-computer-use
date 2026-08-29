# RumiAI Computer Use — handoff

Date: 2026-08-29

Repository state plus immutable evidence commits are authoritative when chat history differs.

## Current authoritative state

P5 is **complete for the initial narrow scope**. P6A is **PHYSICALLY_VALIDATED**. P6B is **PHYSICALLY_OBSERVED**. P6C is the active checkpoint.

- Last physically observed P6B Computer Use SHA: `3a3148cdf89735d2d46d208bbe69dc1d26722e3b`.
- Computer Control dependency: `e3a3f13d66546cf8f0fca50075bd4607c2c3d003`.
- P6B session: `cu-perception-p6b-safari-canvas-discovery-public-s06`.
- P6B evidence: `e8a2899c58c5e6d3725d4457af18aefc25923580`.
- P6B frozen test source: `6d826092b93973905fa6f2c7f8ac1c1d68a92a31`.
- P6B tested PoC SHA: `0ae7c087bf0072aac0c5f0d180b8d83933022a3c`.
- P6B result: 10 PASS / 0 FAIL / 0 BLOCKED.
- Active checkpoint: **P6C bounded evidence-backed caller-contract integration**.

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

`app/visual-fallback-contract-manager.js` is a local deterministic registry for caller-owned execution knowledge, intentionally separate from competence skills and provider selection.

A registry entry matches fail-closed on:

```text
application + intent=OPEN + exact target
```

It may provide exact target, exact deterministic postcondition, explicit visual-fallback authorization, the validated primary-display left-click shape and declarative provider requirements. It may not provide coordinates, native identities, a concrete provider object, generic fallback authorization or task success.

Authoritative P6A evidence: `21ad01e93a5de4e5276b49c193269a26ad66b164`.

See `docs/evidence/perception-p6a-caller-contract-registry-public-physical.md`.

## P6B — real Safari canvas discovery

Status: `PHYSICALLY_OBSERVED`.

Authoritative evidence: `e8a2899c58c5e6d3725d4457af18aefc25923580`.

The real Safari application requested a loopback-only test-owned page before perception. The visible control existed only as text drawn into an HTML canvas.

The session physically proved:

1. Safari served/rendered the intended local page (`requests=1`, `eventLoopServed=true`).
2. A fresh semantic snapshot could not resolve the canvas target and yielded structured `NO_SEMANTIC_TARGET`.
3. P5D selected `rumiai.local.macos-vision-text-region`.
4. P2B/P3A resolved exactly one target under the unchanged exact-text-single-match policy.
5. The deterministic postcondition was absent before action.
6. Real Computer Control returned canonical `CLICK_POSTED` with `semanticConsequenceVerified=false`.
7. A fresh independent post-action visual observation produced the deterministic postcondition.
8. Only that observation produced `VERIFIED_SUCCESS`.
9. Screenshot bytes, OCR payloads and coordinates were not logged.
10. Pointer, Safari, loopback server, runtime/cache and temporary resources were cleaned up and product trees stayed clean.

Historical P6B s01–s05 failures remain immutable. They isolated PoC oracle and bootstrap/event-loop defects and were not rewritten.

See `docs/evidence/perception-p6b-safari-canvas-discovery-public-physical.md`.

### Important non-claim

P6B does **not** authorize generic Safari or arbitrary web visual fallback. No built-in Safari registry entry existed during the discovery.

## Active checkpoint: P6C bounded caller-contract integration

P6C may promote product caller knowledge only for an explicitly bounded application/task contract whose semantics are no broader than the P6B evidence.

Required properties:

- caller/registry knowledge remains separate from planner output;
- exact application + intent + target selection remains fail-closed;
- no coordinates or provider objects are stored;
- semantic execution still runs first;
- only P5B-eligible gaps may resolve the lazy visual execution context;
- P5D provider selection remains Computer Use-owned and lazy;
- P5A remains the visual coordinator;
- `CLICK_POSTED` never becomes success by itself;
- independent post-action evidence remains mandatory;
- absence of a matching bounded contract means no visual fallback.

Do not infer a generic contract from the Safari application name alone. The built-in scope must encode the actual evidence-backed task/surface identity or remain caller-supplied until that identity can be represented safely.

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

Immediate next checkpoint: **P6C bounded evidence-backed caller-contract integration**.
