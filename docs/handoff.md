# RumiAI Computer Use — handoff

Date: 2026-08-29

Repository state plus immutable evidence commits are authoritative when chat history differs.

## Current authoritative state

P5 is **complete for the initial narrow scope**. P6A is **PHYSICALLY_VALIDATED**. P6B is **PHYSICALLY_OBSERVED**. P6C is **PHYSICALLY_VALIDATED**. P6D is the active checkpoint.

- Current validated P6C Computer Use runtime: `a1bdddc813a89a16552b08ccec6b3aec00eb3157`.
- Computer Control dependency: `e3a3f13d66546cf8f0fca50075bd4607c2c3d003`.
- P6C session: `cu-perception-p6c-scoped-caller-integration-public-s01`.
- P6C evidence: `c66eb5ba69d9e0435cb894731b1d1cea832c31e1`.
- P6C frozen test source: `740be2179de17dd9e790f3c92025bb8c01376b16`.
- P6C tested PoC SHA: `e2e246b335ebecf65e2e1445d7c9e18ac71d49d5`.
- P6C result: 11 PASS / 0 FAIL / 0 BLOCKED.
- Active checkpoint: **P6D runtime surface precondition**.

## Non-negotiable invariants

1. Semantic-first: structured semantic operation is preferred whenever it can solve the task.
2. Visual fallback is explicit and is never a generic retry mechanism.
3. `delivery != success`; `CLICK_POSTED` is delivery evidence only.
4. `IMPLEMENTED != PHYSICALLY_VALIDATED`.
5. Planner output remains semantic: no coordinates, provider identity, scope identity or fabricated postconditions.
6. Only structured P5B-eligible semantic observability/resolution gaps may consider visual fallback.
7. Perception-provider selection belongs to Computer Use, never Computer Control.
8. No mandatory network/account/cloud API dependency.
9. Screenshot bytes, OCR text and coordinates remain ephemeral/out of ordinary logs.
10. Physical evidence is immutable and Git is forward-only.

## Validated path

P1–P4 remain physically validated and must not be physically rerun merely for regression. P5A, P5C, P5D and P5E are physically validated; P5B is contract-validated.

P5E authoritative evidence: `d18e82d06456438f289eb0bf6c6f630973b5a99f`.

The validated orchestration is:

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

Original P6A lookup:

```text
application + intent=OPEN + exact target
```

A registry entry may provide exact target, exact deterministic postcondition, explicit visual-fallback authorization, the validated primary-display left-click shape and declarative provider requirements. It may not provide coordinates, native identities, a concrete provider object, generic fallback authorization or task success.

Authoritative P6A evidence: `21ad01e93a5de4e5276b49c193269a26ad66b164`.

See `docs/evidence/perception-p6a-caller-contract-registry-public-physical.md`.

## P6B — real Safari canvas discovery

Status: `PHYSICALLY_OBSERVED`.

Authoritative evidence: `e8a2899c58c5e6d3725d4457af18aefc25923580`.

The real Safari application requested a loopback-only test-owned page before perception. The visible control existed only as text drawn into an HTML canvas.

The session physically proved real page load, structured `NO_SEMANTIC_TARGET`, local macOS Vision exact target resolution, canonical `CLICK_POSTED`, and `VERIFIED_SUCCESS` only from fresh independent post-action observation. Payload/coordinate logging remained disabled and all test resources were cleaned up.

Historical P6B s01–s05 failures remain immutable and document PoC oracle/bootstrap defects.

See `docs/evidence/perception-p6b-safari-canvas-discovery-public-physical.md`.

P6B does **not** authorize generic Safari or arbitrary web visual fallback.

## P6C — scoped caller integration

Status: `PHYSICALLY_VALIDATED`.

P6C adds an optional `scopeId` to caller contracts and a plan-aware product helper:

```text
scopeId + application + OPEN + exact target
```

Scoped contracts require the explicit matching scope and cannot be selected accidentally by legacy unscoped lookup. The plan-aware selector follows semantic `ACTIVATE_APP` context, deduplicates repeated use of the same contract and fails closed if one planner target would map to different application contracts.

The materialized contract still contains no coordinates or concrete provider object. Scope remains outside planner output. Provider selection is not performed during contract selection.

Authoritative P6C evidence:

- session: `cu-perception-p6c-scoped-caller-integration-public-s01`
- evidence: `c66eb5ba69d9e0435cb894731b1d1cea832c31e1`
- Computer Use: `a1bdddc813a89a16552b08ccec6b3aec00eb3157`
- Computer Control: `e3a3f13d66546cf8f0fca50075bd4607c2c3d003`
- test source: `740be2179de17dd9e790f3c92025bb8c01376b16`
- PoC tested: `e2e246b335ebecf65e2e1445d7c9e18ac71d49d5`
- result: 11 PASS / 0 FAIL / 0 BLOCKED

Physical evidence proved:

1. explicit correct scope selected the bounded contract;
2. wrong scope failed closed;
3. planner remained semantic-only (`ACTIVATE_APP`, `OPEN`);
4. normal `runTask` attempted semantic OPEN first;
5. visual fallback became eligible only after `NO_SEMANTIC_TARGET`;
6. local macOS Vision was selected lazily after the gap;
7. Computer Control returned `CLICK_POSTED` without claiming success;
8. independent post-action observation alone produced `VERIFIED_SUCCESS`;
9. no screenshot/OCR/coordinates were logged;
10. pointer, Safari, runtime and loopback server were cleaned up and product trees remained clean.

See `docs/evidence/perception-p6c-scoped-caller-integration-public-physical.md`.

### Important non-claim

The P6C `PROCEED → FINISHED` contract and `p6b.safari.canvas.v1` scope are test-owned. They are evidence for the scoped mechanism, not shipped generic Safari knowledge.

## Active checkpoint: P6D runtime surface precondition

P6C establishes *which caller scope* owns a contract. It does not yet prove that the currently open application surface is the one that scope was designed for. A correct scope could otherwise be applied to the wrong Safari page if the same target text happened to appear there.

P6D must add a deterministic runtime surface precondition before reusable application knowledge is considered safe.

Required properties:

- surface identity/precondition stays outside planner output;
- application + scope + target alone are insufficient to authorize the click;
- the surface precondition is checked before perception-provider selection/action delivery;
- failed or ambiguous surface precondition fails closed with no click;
- semantic-first and P5B eligibility remain unchanged;
- P5D provider selection remains Computer Use-owned and lazy;
- `CLICK_POSTED` remains delivery only;
- independent post-action evidence remains mandatory;
- no generic Safari/page inference is introduced.

First physical design: reuse the controlled P6B Safari surface, prove one matching surface and one intentionally mismatched surface where the target text may still be present but action is suppressed before delivery.

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

Immediate next checkpoint: **P6D runtime surface precondition**.
