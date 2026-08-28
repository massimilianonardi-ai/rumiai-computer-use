# Perception P1B coordinate mapping discovery — physical evidence

Status: `PHYSICALLY_OBSERVED` discovery evidence. This document does not by itself promote the product mapping implementation to `PHYSICALLY_VALIDATED`.

## Authoritative session

- session: `cu-perception-p1b-coordinate-mapping-discovery-s02`
- evidence commit: `89ef1c1b0b2ddab7de2c8e35bd9dca2d88fb7a57`
- Computer Use product: `98435ba98791f29a58fb2b5f55e27d7688d4e8b9`
- Computer Control dependency: `e3a3f13d66546cf8f0fca50075bd4607c2c3d003`
- test source: `4674011c42453ecb078e9ab0c38d0b936f4a7bc3`
- PoC tested: `1af745c67805a385a8d28b23b50f2e1a212eeb8a`
- result: `PASS`
- summary: 7 PASS / 0 FAIL / 0 BLOCKED

## Physical observations

On the reference Mac the discovery observed one stable active/online primary display before and after capture. Its logical dimensions were `1710 × 1107`. The real ScreenCaptureKit-backed P1A frame dimensions were also `1710 × 1107`.

Two noninteractive test-owned AppKit marker windows were positioned at independently known primary-display-local logical locations. Both were independently detected in the captured PNG without logging marker coordinates or screenshot payload bytes.

The discovery established:

- marker A observed: yes;
- marker B observed: yes;
- capture coordinate origin: top-left;
- logical→capture transform: axis-aligned scaling derived from observed dimensions;
- capture→logical inverse: axis-aligned scaling derived from observed dimensions;
- both marker rectangles matched the derived projection within bounded tolerance;
- both observed marker centers mapped back to their independently known logical centers;
- primary-display geometry, scale and rotation remained stable across the capture;
- the product still reported `actionCoordinateMapping.state = UNRESOLVED` during discovery;
- `interpretation.state = NOT_RUN` throughout;
- no pointer, click, drag, wheel or keyboard action was performed;
- screenshot payload was neither persisted nor logged;
- the test-owned fixture and Computer Control runtime were cleaned up.

The reference topology happened to yield a numeric 1:1 scale because logical and capture dimensions were equal. The discovery explicitly derived the transform from observations and did not treat equality as proof of identity.

## Scope

This evidence supports the initial mapping model only for a stable, unrotated primary-display topology. It does not validate rotated displays, secondary-display mappings, arbitrary multi-display capture transforms, OCR/VLM interpretation, semantic target identity, or successful execution of an action derived from a visual candidate.

A separate public/runtime validation is required for the product implementation of mapped acquisition and point conversion.
