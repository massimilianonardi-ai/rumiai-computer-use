# P6D runtime surface precondition — public physical evidence

Status: `PHYSICALLY_VALIDATED`.

P6D proves that a caller-owned scoped visual fallback contract is not sufficient by itself to authorize perception/action. The currently active application surface must satisfy a deterministic runtime precondition before perception-provider selection can occur.

## Authoritative validation

- session: `cu-perception-p6d-semantic-title-surface-precondition-public-s10`
- evidence commit: `ec7e9757dada06ca313e585c09a42fcf7202e90d`
- Computer Use runtime: `a90ab782d85e1283e76b4b64aa9bdbe54a7e4e0e`
- Computer Control: `e3a3f13d66546cf8f0fca50075bd4607c2c3d003`
- frozen physical test source: `d5b6d9561b98409d52a84f4c1a45aa59de489357`
- tested PoC: `8eeaa3654b65cf15bf079240badb8aa3ccd47532`
- result: 12 PASS / 0 FAIL / 0 BLOCKED

The authoritative surface identity for this Safari proof is the controlled document title exposed by Safari in the semantic snapshot and matched through the existing `semantic-text` + `exact` P6D precondition.

## What was physically proved

The session used one real Safari application instance, one loopback-only test-owned page, one tab and the same canvas visual target across both surface states.

Negative surface:

1. the page was loaded with semantic document-title identity `P6D SURFACE BETA`;
2. a fresh Safari semantic snapshot produced exactly one exact match for BETA;
3. the scoped contract required `P6D SURFACE ALPHA`;
4. normal `agentLoop.runTask` attempted semantic OPEN first and reached structured `NO_SEMANTIC_TARGET`;
5. P6D evaluated the runtime surface precondition before provider selection;
6. the precondition returned `SURFACE_PRECONDITION_NOT_MET`;
7. perception-provider selection count remained zero;
8. no visual-fallback click was delivered.

Positive surface:

1. the same Safari tab reloaded the same local document after the test-owned surface changed from BETA to ALPHA;
2. a fresh semantic snapshot observed exactly one exact ALPHA match and no BETA match;
3. normal `agentLoop.runTask` again attempted semantic OPEN first;
4. visual fallback became eligible only after structured `NO_SEMANTIC_TARGET`;
5. P6D returned `SURFACE_PRECONDITION_VERIFIED`;
6. only then was the local `rumiai.local.macos-vision-text-region` provider selected;
7. the visual target was resolved and Computer Control returned canonical `CLICK_POSTED`;
8. `CLICK_POSTED` remained delivery evidence only (`semanticConsequenceVerified=false`);
9. a fresh independent post-action local Vision observation verified the exact postcondition;
10. only that independent observation produced `VERIFIED_SUCCESS`.

The physical markers also confirmed:

- planner output remained semantic-only;
- scope and surface identity remained outside the planner;
- no coordinates or provider object entered planner output;
- no screenshot bytes, OCR payload or coordinates were persisted in ordinary evidence;
- no external network was used;
- pointer position, Safari, Computer Control runtime and loopback server were cleaned up;
- Computer Use and Computer Control product trees remained clean.

## Diagnostic lineage and immutable failures

P6D deliberately preserved every failed physical session. No evidence was rewritten and no contract was weakened to obtain the final PASS.

- s01 — evidence `40dafd8277ba6c015eeba24eb84cdc6c1458d1c7`: negative fail-closed behavior worked, but opening a second Safari URL did not prove that the intended second tab/window became the active AX surface.
- s02 — evidence `68f19a7911d369986d41e2d7ea5bc200b53098fd`: same-document DOM mutation did not reliably update the semantic snapshot used for the intended heading marker.
- s03 — evidence `aff7a1771a8b159f0b74289e6cdf6280cfb5f4ab`: same-tab reload still showed that arbitrary page heading text was not a reliable compact semantic surface identity.
- s04 — evidence `dbc816c746737304d90dd4d45e3672951fa95148`: first `window-title` proof exposed a Computer Use adaptation bug in the documented Computer Control window descriptor shape.
- s05 — evidence `59c0e1c5b5b530fe9fdf3147a34caba3a16bcb5a`: descriptor adaptation was fixed, but Safari's current-window title was not byte-for-byte the HTML title.
- s06 — evidence `e8edb4b40ea9015e2a8fe5a43e510acd2232f049`: diagnostic evidence showed the HTML title was an exact prefix of a longer browser-owned current-window title.
- s07 — evidence `091592162f2c6bab12596764326be7cde09cfb99`: diagnostic fixture failed before identity characterization because Safari foreground state had not been explicitly established.
- s08 — evidence `ce1ee1873174cdf63b9994dd9b832c9ad7f36058`: diagnostic PASS established that the compact Safari semantic snapshot contains the document title plus host/path information, while the current-window title contains a browser-owned suffix not derivable from the tested URL data.
- s09 — evidence `7ee7ec5c9b86c02fdb7a1eec625b7777e8b0cca3`: diagnostic PASS established that the Safari document title is a single `semantic-text` exact match and that the wrong title is rejected with zero matches.

The final s10 proof therefore uses the representation that Safari actually exposes deterministically rather than introducing prefix/contains/fuzzy title matching.

## Product boundary

P6D product support includes declarative runtime surface preconditions outside the planner. The validated Safari proof uses:

```json
{
  "kind": "semantic-text",
  "match": "exact",
  "text": "<caller-owned deterministic surface identity>"
}
```

`window-title` exact support also exists in the product, but the P6D Safari validation does not claim that arbitrary Safari document identity should be modeled through the browser-owned window title.

Surface-precondition evaluation occurs after a P5B-eligible semantic gap and before perception-provider selection. Failure or ambiguity therefore prevents perception/action rather than triggering a weaker fallback.

## Non-claims

This evidence does **not** promote `P6D SURFACE ALPHA`, `PROCEED`, `FINISHED`, the local scope ID, or the controlled page as shipped Safari knowledge.

It does not authorize arbitrary Safari pages, generic web content, fuzzy text matching, arbitrary visual fallback, remote perception, secondary displays or richer gestures.

The evidence validates the bounded mechanism: caller scope + deterministic runtime surface identity + semantic-first eligibility + lazy provider selection + delivery/success separation.

## Result

P6D: `PHYSICALLY_VALIDATED`.

Initial P6 visual-fallback safety architecture: `COMPLETE`.

Next program: P7 evidence-backed real-use-case discovery and promotion, with no test-owned Safari knowledge shipped as a generic capability.
