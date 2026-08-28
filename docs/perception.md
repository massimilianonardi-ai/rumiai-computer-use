# Computer Use perception boundary

Computer Use owns interpretation and task decisions. Computer Control owns desktop observation/action mechanics.

The visual perception path therefore begins by consuming an already-defined Computer Control observation rather than implementing screen capture itself:

```text
Computer Control display.capture
        ↓
Computer Use visual frame
        ↓
interpretation provider (OCR / VLM / detector)
        ↓
target candidate
        ↓
decision / policy
        ↓
Computer Control semantic operation when available
        ↓
explicit low-level fallback only when necessary
        ↓
postcondition / re-observation
```

## P1A — visual frame acquisition

Status: `PHYSICALLY_VALIDATED` on the reference Mac.

`app/perception.js` exposes:

```js
acquirePrimaryVisualFrame()
```

It calls the external Computer Control adapter only:

```js
captureDisplay({display:"primary"})
```

Computer Use does not include a native capture backend, ScreenCaptureKit helper, display identifier or alternate screenshot implementation.

A successful acquisition returns `VISUAL_FRAME_ACQUIRED` with:

- the exact canonical PNG bytes returned by Computer Control, held as base64 in memory;
- image width and height;
- `coordinateSpace.kind = "capture-pixel"` with top-left origin;
- provenance identifying `computer-control / display.capture / primary`;
- `interpretation.state = "NOT_RUN"` and no candidates;
- `actionCoordinateMapping.state = "UNRESOLVED"`;
- an explicit ephemeral/no-persistence policy.

Authoritative physical evidence is recorded in `docs/evidence/perception-p1a-visual-frame-acquisition-physical.md`.

## P1B — action-coordinate mapping

Discovery status: `PHYSICALLY_OBSERVED` on the reference Mac.

Product mapping status: `PHYSICALLY_VALIDATED` on the reference Mac.

Capture image dimensions are image-pixel dimensions. Computer Control pointer APIs use primary-display-local logical coordinates. P1A therefore continues to leave `actionCoordinateMapping.state = "UNRESOLVED"`.

The P1B discovery used two independently positioned, noninteractive AppKit marker windows and located both markers in a real captured PNG. It physically established for the tested stable, unrotated primary-display topology that:

- capture row zero and Computer Control logical coordinates both use a top-left origin for this mapping boundary;
- the transform is axis-aligned;
- `pixelToLogical.x = logicalWidth / pixelWidth`;
- `pixelToLogical.y = logicalHeight / pixelHeight`;
- the inverse uses `pixelWidth / logicalWidth` and `pixelHeight / logicalHeight`;
- the mapping must be derived from observations, not inferred from equal dimensions;
- display geometry must remain stable across the capture.

On the reference Mac both observed spaces were `1710 × 1107`, so the measured scale happened to be 1:1. Identity is not encoded as an assumption.

Authoritative discovery evidence is recorded in `docs/evidence/perception-p1b-coordinate-mapping-discovery-physical.md`.

### Mapped acquisition contract

`app/perception.js` additionally exposes:

```js
acquireMappedPrimaryVisualFrame()
mapCapturePointToPrimaryLogical(mapping, point)
```

`acquireMappedPrimaryVisualFrame()` performs:

1. `display.list` and exact selection of one active/online primary display;
2. rejection of rotated primary displays in the initial contract;
3. P1A `display.capture` acquisition;
4. a second `display.list` observation;
5. fail-closed rejection if primary geometry, scale or rotation changed;
6. derivation of both pixel→logical and logical→pixel scales from the observed dimensions.

A successful mapped acquisition returns `VISUAL_FRAME_MAPPED` and `actionCoordinateMapping.state = "RESOLVED"`. The mapping contains no native display identifier and does not perform an input action.

The public runtime path was independently validated in session `cu-perception-p1b-mapped-frame-public-s02` with evidence commit `09692cd9b16eb36a10bb0ee294162b901afcfd17`. The validated runtime SHA is `29c269864def0a26d3254e913d2a5a87f6125103`. Two test-owned marker centers were detected in capture pixels and converted by the product-owned mapper to independently known logical centers; no pointer or keyboard action was performed.

The initial validated scope is deliberately narrow: one stable, unrotated primary display. Secondary displays and rotated topologies require separate evidence.

## P2A — local OCR provider discovery

Status: `PHYSICALLY_OBSERVED` on the reference Mac.

Session `cu-perception-p2a-local-ocr-discovery-s02`, evidence commit `9bf876dd35190776b9276d1e98db9e16733b5c50`, established the first interpretation-provider evidence. A PoC-only macOS Vision provider recognized two fixed test-owned strings from the real P1B PNG and returned localized text observations. The bounding regions were converted to `capture-pixel` / top-left coordinates and their centers mapped through P1B into independently known fixture windows.

The provider was local, used no external account or network API, received image bytes in memory, and did not persist or log frame payloads, recognized text or coordinates. It performed no input action.

macOS Vision remains a PoC provider, not a built-in Computer Use dependency. Authoritative evidence is recorded in `docs/evidence/perception-p2a-local-ocr-discovery-physical.md`.

## P2B — provider-neutral text-region contract

Status: `PHYSICALLY_VALIDATED` on the reference Mac.

`app/perception-provider.js` exposes:

```js
interpretMappedVisualFrame(mappedFrame, provider)
```

The first provider-neutral capability is deliberately evidence-bounded to `text-region`. A provider declares an `id`, `locality`, `capabilities` containing `text-region`, and an `observe(frame)` function. The provider receives a mapped PNG frame in memory and returns observations in the frame's exact `capture-pixel` / top-left coordinate space.

Computer Use validates fail-closed that:

- the input is a P1B mapped frame whose mapping is `PHYSICALLY_VALIDATED`;
- provider identity, locality and capability declaration are explicit;
- provider frame geometry exactly matches the captured frame;
- each observation is `text-region`, has non-empty text and confidence in `[0,1]`;
- each region is finite, positive, in bounds, and explicitly `capture-pixel` / top-left.

Validated observations are normalized with `semanticIdentity = null` and `actionable = false`. A successful call returns `VISUAL_INTERPRETATION_OBSERVED`, `semanticTarget.state = "UNRESOLVED"`, and `actionPolicy.state = "NOT_EVALUATED"`.

The public runtime path was physically validated in session `cu-perception-p2b-provider-contract-public-s02`, evidence commit `82ca0c0d1fb383a3102d19238cfe885cd0b8d8a4`, against Computer Use runtime `839d53d100e31da2fec839351f94f197d377ab36`. The local macOS Vision PoC was used only as a real provider oracle; the product contract itself remains provider-neutral. Authoritative evidence is recorded in `docs/evidence/perception-p2b-provider-contract-public-physical.md`.

This contract does not make OCR output a semantic UI identity and does not authorize pointer or keyboard actions. VLM/object/icon observation types require their own evidence before being added to this provider boundary.

## P3A — deterministic visual text target resolution

Status: `PHYSICALLY_VALIDATED` on the reference Mac.

`app/perception-target.js` exposes:

```js
resolveExactTextTarget(interpretationResult, query)
```

P3A deliberately begins with a narrow deterministic policy supported by the P2 evidence: a query of `{kind:"text", match:"exact", text:"..."}` may resolve one normalized `text-region` observation only when exactly one observation has the same trimmed text.

The resolver is fail-closed:

- zero exact matches return `VISUAL_TARGET_UNRESOLVED` / `semanticTarget.state = "UNRESOLVED"`;
- multiple exact matches return `VISUAL_TARGET_AMBIGUOUS` / `semanticTarget.state = "AMBIGUOUS"`;
- exactly one match returns `VISUAL_TARGET_RESOLVED` / `semanticTarget.state = "RESOLVED"`;
- the selected region center is converted from `capture-pixel` to `primary-display-logical` only through the physically validated P1B mapping;
- the target remains `semanticIdentity = null` and `actionable = false`;
- `actionPolicy.state` remains `NOT_EVALUATED`.

The public runtime path was physically validated in session `cu-perception-p3a-target-resolution-public-s01`, evidence commit `c2a1e704f99b5cf528fb15287a785875c454a400`, against Computer Use runtime `32a49d08bd235e906b992e093e2184144f76136c`. The resolved logical point independently fell inside the expected test-owned fixture window. Authoritative evidence is recorded in `docs/evidence/perception-p3a-target-resolution-public-physical.md`.

A resolved P3A target is therefore a visual target location, not a semantic UI identity and not permission to click. Broader matching, ranking, fuzzy text selection and VLM target resolution require separate evidence.

## P3B — explicit visual fallback action-policy gate

Status: `PHYSICALLY_VALIDATED` on the reference Mac.

`app/perception-action-policy.js` exposes:

```js
evaluateVisualFallbackPolicy(targetResult, request, policy)
```

The initial policy is intentionally narrow. It can authorize only a left pointer click on the primary display, and only as a plan, when all of the following hold:

- P3A produced one `VISUAL_TARGET_RESOLVED` target through `exact-text-single-match`;
- the target still has `semanticIdentity = null` and is not intrinsically actionable;
- the target logical point is in `primary-display-logical` / top-left coordinates;
- the P1B mapping remains `PHYSICALLY_VALIDATED`;
- the caller explicitly requests `{kind:"pointer-click", button:"left", display:"primary"}`;
- policy explicitly sets `allowVisualFallback = true`.

If any precondition is not met, P3B returns `VISUAL_FALLBACK_REJECTED` with `actionPolicy.state = "REJECTED"` and no action plan. A successful policy evaluation returns `VISUAL_FALLBACK_AUTHORIZED`, `actionPolicy.state = "AUTHORIZED"`, and an `actionPlan.state = "READY"` containing the already mapped logical point.

The public policy path was physically validated in session `cu-perception-p3b-action-policy-public-s01`, evidence commit `3ba45950619a9e3cf9249b830609e7ca9ccd9faf`, against Computer Use runtime `a8f85143ae77ba79e4fb47a0931697714df908b6`. The same physical run validated both the explicit-consent authorization path and the no-consent rejection path while performing no input action. Authoritative evidence is recorded in `docs/evidence/perception-p3b-action-policy-public-physical.md`.

P3B does not import Computer Control and performs no input action. Even an authorized plan reports `delivery.state = "NOT_ATTEMPTED"` and `semanticConsequence.state = "NOT_OBSERVED"`. Authorization is therefore neither event delivery nor task success.

## P4 — visual fallback execution with independent postcondition

Status: `IMPLEMENTED`, pending physical runtime validation.

`app/perception-action-execution.js` exposes:

```js
executeAuthorizedVisualClickAndVerify(policyResult, {
  clickPointer,
  observeAfterDelivery,
  postcondition
})
```

The default click executor is the external Computer Control `clickPointer()` public API. The initial P4 contract accepts only the exact P3B `AUTHORIZED / READY` primary-display left-click plan and requires an exact-text postcondition plus a post-action observation callback.

P4 preserves the delivery/success distinction explicitly:

- Computer Control must return the validated low-level `CLICK_POSTED` boundary with `positionVerified = true`, `buttonDelivery = "POSTED"`, and `semanticConsequenceVerified = false`;
- a failed or noncanonical click delivery never triggers post-action observation;
- after posted delivery, and only then, `observeAfterDelivery()` is invoked;
- the post-action interpretation is resolved independently through the same P3A exact-text-single-match boundary;
- posted delivery without the postcondition returns `NOT_VERIFIED_SUCCESS`;
- `VERIFIED_SUCCESS` is possible only when the new post-action observation independently satisfies the exact postcondition.

The executor does not treat `CLICK_POSTED` as semantic success, does not persist screen data, and does not broaden the action vocabulary beyond the physically validated P3B plan. P4 physical validation uses a test-owned nonactivating AppKit fixture whose visual text changes only after receiving the click; verification is performed through a new capture and OCR observation rather than a fixture-internal success flag.

## Interpretation, target, policy, execution and verification boundary

A visual observation is not a semantic element identity and is not proof that an action will succeed. P2 adds perception observations. P3 resolves a target and evaluates whether an explicit low-level fallback may be planned. P4 is the first stage allowed to execute that plan, but success remains contingent on a separate post-action observation.

The preferred execution order remains:

1. use structured semantic Computer Control observation/action when available;
2. use visual perception to propose observations only when structured semantics are insufficient;
3. resolve an observation to a target through an explicit policy boundary;
4. authorize an explicit low-level fallback only after target/mapping policy accepts it;
5. execute through Computer Control in a separate stage;
6. re-observe an appropriate postcondition;
7. claim verified success only from that independent post-action observation, never from event delivery alone.

## Privacy and persistence

Screen pixels and recognized text may contain sensitive information. P1/P2/P3/P4 keep frame payloads, provider observations, target-resolution data, action-policy plans and postcondition evaluation in memory and do not themselves write screenshots, derived images, OCR text or frame payloads to disk or logs.

Callers must not log `dataBase64`, decoded frame bytes, recognized text, target coordinates, action-plan coordinates, or postcondition coordinates as ordinary diagnostics.
