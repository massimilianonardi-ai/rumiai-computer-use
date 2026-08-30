# P7C — Pulsar UTF-8 real-use visual fallback physical validation

Status: `REAL_USE_CANDIDATE_PHYSICALLY_VALIDATED`

## Authoritative session

- session: `cu-perception-p7c-pulsar-utf8-postcondition-validation-public-s02`
- evidence commit: `77fd94bd6b765a56182822cf2a43297b6baa1537`
- Computer Use expected/observed: `99c058ad9c89e666b471b20aafe214dc5b339ce6`
- Computer Control expected/observed: `e3a3f13d66546cf8f0fca50075bd4607c2c3d003`
- frozen physical test source: `17e565405002e216f249c8b8a1886fd0e496296c`
- tested PoC: `2884f379deef4d69bc1183a5d352ff5a929a8e9c`
- result: **12 PASS / 0 FAIL / 0 BLOCKED**

P7C validates one bounded real-use candidate in the actual Pulsar application. The candidate opens Pulsar's encoding selector by targeting the visible `UTF-8` status item on a caller-owned temporary JavaScript document.

## Evidence-backed lineage

P7A discovery (`65c7a674984638529ee8be603a6df09445f68deb`) established that `UTF-8` is a real structured semantic action gap in Pulsar (`NO_SEMANTIC_TARGET`) while the local `rumiai.local.macos-vision-text-region` provider resolves exactly one visible `UTF-8` target.

P7B discovery (`5f5045693400f8957e98baea6ba76fc428011e7f`) established a deterministic current-document surface identity. Across two distinct temporary documents the Pulsar current-window title changed with the document and was reconstructible from caller-owned document information. Exact `window-title` verification accepted the current document and rejected the previous document.

The derived surface-title form used by P7C is:

```text
{FILE_NAME} — {CANONICAL_PRIVATE_PARENT_PATH}
```

On macOS temporary paths the bounded caller canonicalization maps `/var/...` to `/private/var/...`; already canonical absolute paths are left unchanged. No prefix/contains/fuzzy title matching is used.

## Authoritative P7C proof

The semantic planner remained coordinate-free and emitted only:

```text
ACTIVATE_APP Pulsar
OPEN UTF-8
```

Caller scope, surface precondition, postcondition and perception-provider requirements remained outside planner output.

The normal `agentLoop.runTask` path then demonstrated:

1. semantic `OPEN "UTF-8"` executed first;
2. semantic resolution produced structured `NO_SEMANTIC_TARGET`;
3. only that P5B-eligible gap allowed visual fallback resolution;
4. a fresh current-window observation verified the caller-derived exact Pulsar document title with exactly one match;
5. only after the surface precondition passed was the local `rumiai.local.macos-vision-text-region` provider selected;
6. local Vision resolved exactly one `UTF-8` target;
7. Computer Control returned `CLICK_POSTED` with `semanticConsequenceVerified=false`;
8. `CLICK_POSTED` remained delivery evidence only, not task success;
9. a fresh independent post-action local Vision observation resolved exact `UTF-16 LE` in the newly opened encoding-selector modal;
10. only that independent observation produced `VERIFIED_SUCCESS` with basis `post-action-independent-observation`.

The exact postcondition `UTF-16 LE` was fixed before physical delivery from Pulsar's upstream `encoding-selector` implementation, where the modal is populated from the declared encoding list and `UTF-16 LE` is a stable list label. The postcondition was not inferred from the observed result after the click.

## Integrity and safety proof

- temporary caller-owned document only;
- document SHA-256 unchanged before/after the action;
- no encoding selection was confirmed;
- selector dismissed during cleanup;
- original pointer position restored;
- Pulsar terminated;
- Computer Control runtime shut down;
- temporary files removed;
- no built-in visual contract was added by the physical session;
- no skill was promoted by the physical session;
- no planner change;
- no raw semantic snapshot persisted in evidence;
- no screenshot persisted in evidence;
- no OCR payload persisted in evidence;
- no coordinates persisted in evidence;
- no test-initiated external network request.

## Immutable s01 finding

The earlier session `cu-perception-p7c-pulsar-utf8-postcondition-validation-public-s01`, evidence `6d73c69ecac5e44d84bb12975c6020fa7fde0304`, remains immutable with **11 PASS / 1 FAIL / 0 BLOCKED**.

It failed before any visual click with `PULSAR_CALLER_DERIVED_WINDOW_TITLE_NOT_VERIFIED`. The fixture stopped at the first non-empty Pulsar window title instead of waiting for the exact document-bound title already established by P7B. That was a test-readiness defect, not negative evidence against the visual target, delivery path or postcondition. The s02 fixture corrected only that readiness behavior and cleanup gating; Computer Use and Computer Control product SHAs were unchanged.

## Promotion boundary

P7C validates a **single real-use candidate**, not generic Pulsar visual behavior.

The validated knowledge is bounded to:

```text
application = Pulsar
target = UTF-8
caller owns current document path
surface = exact caller-derived current-document window title
postcondition = exact UTF-16 LE in encoding-selector modal
action = explicit primary-display left click
provider requirement = local text-region
```

P7D may promote only the smallest caller-owned dynamic contract materialization needed for this case. It must not promote generic Pulsar status-bar clicking, arbitrary encoding selection, arbitrary current-window titles, provider identity into the planner, screen coordinates, or success-on-delivery semantics.
