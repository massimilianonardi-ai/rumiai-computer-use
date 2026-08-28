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

Status: `PENDING_PHYSICAL_DISCOVERY`.

Capture image dimensions are image-pixel dimensions. Computer Control pointer APIs use primary-display-local logical coordinates.

P1A **does not assume these coordinate spaces are identical**, even when they happen to have equal numeric dimensions on the current reference Mac.

Therefore an OCR/VLM/detector result expressed in capture pixels is not directly executable by `pointer.move`, `pointer.click`, `pointer.drag` or `pointer.wheel`.

P1B must first physically establish the mapping for the current primary-display topology. The discovery must compare a visual marker observed in the captured PNG with independently known logical display geometry; equality of capture and display dimensions alone is not sufficient evidence.

No public mapping contract is frozen until that discovery passes.

## Interpretation boundary

P1A/P1B perform no OCR, object detection, icon recognition, target ranking or semantic inference.

A future perception provider may return candidate observations, but a candidate is not a semantic element identity and is not proof that an action will succeed.

The preferred execution order remains:

1. use structured semantic Computer Control observation/action when available;
2. use visual perception to propose a target only when structured semantics are insufficient;
3. use an explicit low-level Computer Control fallback only after target/mapping policy accepts it;
4. re-observe an appropriate postcondition instead of treating event delivery as task success.

## Privacy and persistence

Screen pixels may contain sensitive information. P1A keeps the PNG payload in memory and does not itself write screenshots, derived images, OCR text or frame payloads to disk or logs.

Callers must not log `dataBase64` or decoded frame bytes as ordinary diagnostics.
