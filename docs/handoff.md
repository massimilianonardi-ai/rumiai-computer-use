# RumiAI Computer Use — handoff

Date: 2026-08-30

Repository state plus immutable evidence commits are authoritative when chat history differs.

## Current authoritative state

P5 is **complete for the initial narrow scope**. P6A is **PHYSICALLY_VALIDATED**. P6B is **PHYSICALLY_OBSERVED**. P6C is **PHYSICALLY_VALIDATED**. P6D is **PHYSICALLY_VALIDATED**. The initial P6 visual-fallback safety architecture is **COMPLETE**. P7 is the active program.

Authoritative P6D validation:

- Computer Use runtime: `a90ab782d85e1283e76b4b64aa9bdbe54a7e4e0e`
- Computer Control dependency: `e3a3f13d66546cf8f0fca50075bd4607c2c3d003`
- session: `cu-perception-p6d-semantic-title-surface-precondition-public-s10`
- evidence: `ec7e9757dada06ca313e585c09a42fcf7202e90d`
- frozen physical test source: `d5b6d9561b98409d52a84f4c1a45aa59de489357`
- tested PoC SHA: `8eeaa3654b65cf15bf079240badb8aa3ccd47532`
- result: 12 PASS / 0 FAIL / 0 BLOCKED
- active program: **P7 evidence-backed real-use-case discovery**

See `docs/evidence/perception-p6d-surface-precondition-public-physical.md`.

## Non-negotiable invariants

1. Semantic-first: structured semantic operation is preferred whenever it can solve the task.
2. Visual fallback is explicit and is never a generic retry mechanism.
3. `delivery != success`; `CLICK_POSTED` is delivery evidence only.
4. `IMPLEMENTED != PHYSICALLY_VALIDATED`.
5. Planner output remains semantic: no coordinates, provider identity, scope identity, surface identity or fabricated postconditions.
6. Only structured P5B-eligible semantic observability/resolution gaps may consider visual fallback.
7. Perception-provider selection belongs to Computer Use, never Computer Control.
8. Runtime surface preconditions are checked before provider selection/action delivery.
9. No mandatory network/account/cloud API dependency.
10. Screenshot bytes, OCR text and coordinates remain ephemeral/out of ordinary logs.
11. Physical evidence is immutable and Git is forward-only.

## Validated orchestration

P1–P4 remain physically validated and must not be physically rerun merely for regression. P5A, P5C, P5D and P5E are physically validated; P5B is contract-validated. P6A, P6C and P6D are physically validated; P6B is physically observed.

The bounded orchestration is now:

```text
semantic planner output
→ normal agent loop
→ semantic OPEN first
→ structured eligible gap
→ P5B
→ caller-owned scoped visual contract
→ deterministic runtime surface precondition
→ fail closed if missing / ambiguous / mismatched
→ lazy Computer Use-owned perception-provider selection
→ deterministic visual execution context
→ P5A
→ Computer Control CLICK_POSTED
→ independent post-action perception
→ exact postcondition
→ VERIFIED_SUCCESS
```

`CLICK_POSTED` never implies success.

## P6A — caller-contract registry

Status: `PHYSICALLY_VALIDATED`.

`app/visual-fallback-contract-manager.js` is a local deterministic registry for caller-owned execution knowledge, intentionally separate from competence skills and provider selection.

Original bounded lookup:

```text
application + intent=OPEN + exact target
```

Authoritative evidence: `21ad01e93a5de4e5276b49c193269a26ad66b164`.

See `docs/evidence/perception-p6a-caller-contract-registry-public-physical.md`.

## P6B — real Safari canvas discovery

Status: `PHYSICALLY_OBSERVED`.

Authoritative evidence: `e8a2899c58c5e6d3725d4457af18aefc25923580`.

A real Safari instance loaded a loopback-only test page whose target existed only as canvas text. The session physically proved a semantic `NO_SEMANTIC_TARGET`, local macOS Vision exact target resolution, canonical `CLICK_POSTED`, and `VERIFIED_SUCCESS` only from fresh independent post-action observation.

P6B does **not** authorize generic Safari or arbitrary web visual fallback.

See `docs/evidence/perception-p6b-safari-canvas-discovery-public-physical.md`.

## P6C — scoped caller integration

Status: `PHYSICALLY_VALIDATED`.

P6C adds optional caller `scopeId` and a plan-aware selector. The bounded lookup is effectively:

```text
scopeId + application + OPEN + exact target
```

Scope remains outside planner output. Wrong scope fails closed. Provider selection does not happen during contract selection.

Authoritative evidence:

- session: `cu-perception-p6c-scoped-caller-integration-public-s01`
- evidence: `c66eb5ba69d9e0435cb894731b1d1cea832c31e1`
- Computer Use: `a1bdddc813a89a16552b08ccec6b3aec00eb3157`
- result: 11 PASS / 0 FAIL / 0 BLOCKED

See `docs/evidence/perception-p6c-scoped-caller-integration-public-physical.md`.

## P6D — runtime surface precondition

Status: `PHYSICALLY_VALIDATED`.

P6D closes the safety gap left by caller scope: a contract cannot run merely because application, scope and target match. The currently active application surface must satisfy a deterministic runtime precondition after a P5B-eligible semantic gap and before perception-provider selection.

The product supports declarative surface preconditions outside planner output. The authoritative Safari proof uses the existing `semantic-text` + `exact` precondition against the document title that Safari exposes deterministically in its semantic snapshot.

Physical s10 proved:

1. the negative BETA surface had exactly one BETA semantic match;
2. the ALPHA contract precondition failed with `SURFACE_PRECONDITION_NOT_MET`;
3. provider selection remained zero and no click was delivered on the wrong surface;
4. the same Safari tab reloaded the same controlled document as ALPHA;
5. a fresh semantic snapshot produced exactly one ALPHA match and no BETA match;
6. normal `runTask` attempted semantic OPEN first and visual fallback became eligible only after `NO_SEMANTIC_TARGET`;
7. the runtime surface precondition verified before provider selection;
8. local macOS Vision was selected exactly once;
9. Computer Control returned `CLICK_POSTED` without claiming success;
10. independent post-action observation alone produced `VERIFIED_SUCCESS`;
11. no screenshot/OCR/coordinates were logged and no external network was used;
12. pointer, Safari, runtime and loopback server were cleaned up and product trees remained clean.

### P6D diagnostic lineage

All failures remain immutable:

- s01 `40dafd8277ba6c015eeba24eb84cdc6c1458d1c7`: multi-tab/current-surface ambiguity in the physical fixture.
- s02 `68f19a7911d369986d41e2d7ea5bc200b53098fd`: dynamic DOM marker not reliably represented in Safari semantic snapshot.
- s03 `aff7a1771a8b159f0b74289e6cdf6280cfb5f4ab`: arbitrary page heading still unsuitable after same-tab reload.
- s04 `dbc816c746737304d90dd4d45e3672951fa95148`: Computer Use current-window descriptor adaptation bug exposed.
- s05 `59c0e1c5b5b530fe9fdf3147a34caba3a16bcb5a`: descriptor fixed; Safari current-window title still not exact HTML title.
- s06 `e8edb4b40ea9015e2a8fe5a43e510acd2232f049`: Safari window title shown to contain a browser-owned suffix.
- s07 `091592162f2c6bab12596764326be7cde09cfb99`: diagnostic foreground fixture defect.
- s08 `ce1ee1873174cdf63b9994dd9b832c9ad7f36058`: diagnostic PASS; semantic snapshot contains document title and URL components while window-title suffix is not derivable from tested URL data.
- s09 `7ee7ec5c9b86c02fdb7a1eec625b7777e8b0cca3`: diagnostic PASS; document title is one exact semantic match and wrong title is zero matches.
- s10 `ec7e9757dada06ca313e585c09a42fcf7202e90d`: authoritative full physical PASS.

No prefix/contains/fuzzy surface matching was introduced to obtain the PASS.

### Important non-claim

`P6D SURFACE BETA`, `P6D SURFACE ALPHA`, `PROCEED → FINISHED`, their scope and the controlled loopback page are test-owned. They are evidence for the mechanism, not shipped generic Safari knowledge.

## P6 completion boundary

The initial P6 visual-fallback safety architecture is complete:

1. P6A — deterministic caller-owned registry;
2. P6B — real-application visual-gap discovery;
3. P6C — explicit caller scope and plan-aware bounded selection;
4. P6D — deterministic runtime surface precondition before provider/action.

This validates the mechanism required for safe future promotion. It does not authorize arbitrary applications, browser pages or visual actions.

## Active program: P7 evidence-backed real-use-case discovery

P7 must identify a genuinely useful deterministic application task before any built-in caller contract/skill knowledge is promoted.

Requirements:

- inspect existing application providers and competence/skill architecture first;
- choose a real supported application/surface and useful outcome;
- require stable, physically observable surface identity;
- keep scope and surface identity outside planner output;
- planner remains semantic-only;
- semantic OPEN first, then P5B-eligible gap before visual perception;
- provider selection remains lazy and Computer Use-owned;
- first promoted case should keep exact target + independently verifiable postcondition;
- physically validate before shipping registry/skill knowledge;
- do not generalize controlled Safari evidence into generic web behavior.

Avoid System Settings as the first P7 candidate because prior physical work exposed AX fragility. Safari may be used only for a genuinely bounded real task with evidence-backed surface identity.

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

Immediate next checkpoint: **P7 evidence-backed real-use-case discovery**.
