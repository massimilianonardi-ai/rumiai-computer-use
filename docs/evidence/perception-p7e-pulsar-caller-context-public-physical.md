# P7E — Pulsar caller-context physical validation

Status: `PHYSICALLY_VALIDATED`

Date: 2026-08-30

## Authoritative evidence

- session: `cu-perception-p7e-agent-loop-caller-context-physical-public-s01`
- evidence commit: `6af4a606eb71418cde61eddd3cdd1fade9b083d2`
- Computer Use expected/observed: `158cc475c209ade1c3260f0f2d6d4d4bc97f2f4a`
- Computer Control expected/observed: `e3a3f13d66546cf8f0fca50075bd4607c2c3d003`
- frozen physical test source: `540abac1a7f534f36a809b0f8bb1036ceb57eb3f`
- tested PoC: `5d10f4af586e1ec9e02e78ab90a8ae19eaa12823`
- result: **14 PASS / 0 FAIL / 0 BLOCKED**

P7E contract-only prerequisite:

- session: `cu-perception-p7e-agent-loop-caller-context-public-s01`
- evidence: `e1bb360188c3713653b09b0c2320fe45d4261f2d`
- result: 13 PASS / 0 FAIL / 0 BLOCKED

P7D caller-contract prerequisite:

- session: `cu-perception-p7d-pulsar-utf8-caller-contract-public-s01`
- evidence: `31f10c01244d98eee1c8f309e46b0578d2d60337`
- state: `CONTRACT_VALIDATED`

P7C real-use candidate prerequisite:

- session: `cu-perception-p7c-pulsar-utf8-postcondition-validation-public-s02`
- evidence: `77fd94bd6b765a56182822cf2a43297b6baa1537`
- state: `REAL_USE_CANDIDATE_PHYSICALLY_VALIDATED`

## Validated real-use path

The physical session used a real Pulsar instance and a temporary JavaScript document. `runTask` received no pre-materialized `visualFallbackContracts`. The only visual-fallback caller knowledge supplied to the agent loop was an explicit caller-owned context:

```text
kind = pulsar-document
documentPath = <absolute temporary document path>
```

The product then followed this bounded path:

```text
explicit caller-owned documentPath
→ P7E caller-context normalization
→ semantic planner output only
→ P7D materialization of the single Pulsar OPEN UTF-8 contract
→ semantic OPEN UTF-8 first
→ structured NO_SEMANTIC_TARGET
→ exact current-document window-title surface precondition
→ lazy local perception-provider selection
→ exact UTF-8 visual target
→ Computer Control CLICK_POSTED
→ independent post-action local Vision observation
→ exact UTF-16 LE postcondition
→ VERIFIED_SUCCESS
```

## Physical claims proved

The authoritative run proved all of the following simultaneously:

1. Pulsar was a real available application provider and the test document was temporary.
2. The caller context was explicit and carried the document path outside planner output.
3. No `visualFallbackContracts` were injected into `runTask`.
4. P7D materialized the visual contract from caller-owned document context.
5. The runtime surface guard used `window-title` + `exact` and verified the caller-derived current-document title.
6. The semantic OPEN path ran first and produced structured `NO_SEMANTIC_TARGET`.
7. Visual fallback became eligible only after that structured semantic gap.
8. Local `rumiai.local.macos-vision-text-region` was selected exactly once after the gap and after the surface guard.
9. The exact `UTF-8` target was delivered through Computer Control.
10. Computer Control returned `CLICK_POSTED`; delivery still reported `semanticConsequenceVerified=false`.
11. `CLICK_POSTED` did not become task success.
12. A fresh independent post-action Vision observation saw exact `UTF-16 LE` in the encoding selector.
13. Only that independent observation produced `VERIFIED_SUCCESS` with basis `post-action-independent-observation`.
14. The temporary document content hash remained unchanged and no encoding choice was confirmed.
15. No screenshot bytes, OCR payload, raw semantic snapshot or coordinates were persisted in evidence.
16. The test initiated no external network request.
17. Cleanup dismissed the selector, restored the pointer, terminated Pulsar and Computer Control, removed temporary files, and left product trees clean.

## Boundary preserved

P7E does not make visual fallback generic.

- planner output remains semantic and carries no document path, scope, provider, coordinates, surface precondition or success criteria;
- `agent-loop.js` consumes an abstract caller context and does not infer a document path from foreground UI state;
- only the supported `pulsar-document` caller-context kind is accepted;
- invalid or unsupported caller context fails closed;
- supplying both explicit contracts and caller context is ambiguous and fails closed;
- the promoted knowledge remains bounded to Pulsar + `OPEN` + exact `UTF-8` + the caller-owned current document;
- provider selection remains Computer Use-owned and lazy;
- Computer Control remains delivery-only;
- `delivery != success` remains mandatory.

## Lineage

P7 progressed forward-only:

- P7A evidence `65c7a674984638529ee8be603a6df09445f68deb`: real Pulsar discovery found `JavaScript` and `UTF-8` as `NO_SEMANTIC_TARGET` + Vision-exact candidates; filename semantic-text was not a usable surface identity.
- P7B evidence `5f5045693400f8957e98baea6ba76fc428011e7f`: two temporary documents proved a deterministic caller-derivable Pulsar current-window title template and exact wrong-document rejection.
- P7C s01 evidence `6d73c69ecac5e44d84bb12975c6020fa7fde0304`: immutable fixture FAIL before delivery because the fixture accepted the first non-empty transient Pulsar title.
- P7C s02 evidence `77fd94bd6b765a56182822cf2a43297b6baa1537`: authoritative real-use candidate PASS with injected bounded contract and independent `UTF-16 LE` postcondition.
- P7D evidence `31f10c01244d98eee1c8f309e46b0578d2d60337`: caller-owned document-path contract materializer contract-validated.
- P7E contract evidence `e1bb360188c3713653b09b0c2320fe45d4261f2d`: explicit caller-context wiring contract-validated.
- P7E physical evidence `6af4a606eb71418cde61eddd3cdd1fade9b083d2`: authoritative physical PASS through normal `runTask` with caller context only.

No failed evidence was rewritten and no matching policy was weakened to obtain the PASS.

## Non-claims

This validation does **not** authorize:

- generic Pulsar status-bar clicking;
- arbitrary `OPEN` targets in Pulsar;
- inference of `documentPath` from the current UI/window;
- arbitrary application caller contexts;
- fuzzy/prefix/contains surface matching;
- selection of an encoding value after opening the selector;
- treating `CLICK_POSTED` as success.

## Completion meaning

P7 has now produced one evidence-backed real-use visual fallback path that is shipped at the `runTask` API boundary and physically validated. A trusted caller that already owns the current Pulsar document path can invoke the bounded path without injecting a visual contract.

The remaining integration problem is caller-context provenance: the interactive/default product path must obtain trusted document context from an owning product workflow or competence, not by guessing it from the UI or planner output. That is the next program, P8.
