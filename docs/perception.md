# Computer Use perception boundary

Computer Use owns interpretation and task decisions. Computer Control owns desktop observation/action mechanics.

The visual perception path therefore begins by consuming an already-defined Computer Control observation rather than implementing screen capture itself:

```text
Computer Control display.capture
        ↓
Computer Use visual frame
        ↓
interpretation provider (future OCR / VLM / detector)
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

Authoritative physical evidence is recorded in `docs/evidence/perception-p1a-visual-frame-acquisition-physical.md`. The validating session acquired a real primary-display PNG through Computer Use and the external Computer Control boundary, kept interpretation disabled, kept action-coordinate mapping unresolved, did not persist the frame payload, and explicitly shut down the test-owned Computer Control runtime.

## P1B — action-coordinate mapping

Discovery status: `PHYSICALLY_OBSERVED` on the reference Mac.

Product mapping status: `IMPLEMENTED` pending separate physical runtime validation.

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

The initial validated scope is deliberately narrow: one stable, unrotated primary display. Secondary displays and rotated topologies require separate evidence.

## Interpretation boundary

P1A/P1B perform no OCR, object detection, icon recognition, target ranking or semantic inference.

A future perception provider may return candidate observations, but a candidate is not a semantic element identity and is not proof that an action will succeed.

The preferred execution order remains:

1. use structured semantic Computer Control observation/action when available;
2. use visual perception to propose a target only when structured semantics are insufficient;
3. use an explicit low-level Computer Control fallback only after target/mapping policy accepts it;
4. re-observe an appropriate postcondition instead of treating event delivery as task success.

## Privacy and persistence

Screen pixels may contain sensitive information. P1A/P1B keep the PNG payload in memory and do not themselves write screenshots, derived images, OCR text or frame payloads to disk or logs.

Callers must not log `dataBase64` or decoded frame bytes as ordinary diagnostics.
