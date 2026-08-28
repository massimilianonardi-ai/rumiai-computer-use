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

Status: `IMPLEMENTED`, pending physical runtime validation.

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

A resolved P3A target is therefore a visual target location, not a semantic UI identity and not permission to click. Broader matching, ranking, fuzzy text selection, VLM target resolution and action authorization require separate evidence.

## Interpretation and target boundary

A visual observation is not a semantic element identity and is not proof that an action will succeed. P2 adds perception observations. P3 begins explicit target resolution while deliberately keeping action authorization and execution separate.

The preferred execution order remains:

1. use structured semantic Computer Control observation/action when available;
2. use visual perception to propose observations only when structured semantics are insufficient;
3. resolve an observation to a target through an explicit policy boundary;
4. use an explicit low-level Computer Control fallback only after target/mapping policy accepts it;
5. re-observe an appropriate postcondition instead of treating event delivery as task success.

## Privacy and persistence

Screen pixels and recognized text may contain sensitive information. P1/P2/P3 keep frame payloads, provider observations and target-resolution data in memory and do not themselves write screenshots, derived images, OCR text or frame payloads to disk or logs.

Callers must not log `dataBase64`, decoded frame bytes, recognized text, or target coordinates as ordinary diagnostics.
