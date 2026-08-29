# P4 visual fallback action execution — physical evidence

Status: `PHYSICALLY_VALIDATED` on the reference Mac.

Authoritative session: `cu-perception-p4-action-execution-public-s01`

- Evidence commit: `cd86381d05bb7fcbda91ebe77ff8d8806ee827fa`
- Computer Use runtime: `5dc3607ff18b20ab806b9bf455b68f962a005e9f`
- Computer Control runtime: `e3a3f13d66546cf8f0fca50075bd4607c2c3d003`
- Test-source SHA: `6c776dc0f811835850ccf3933b9b247364f8c1a3`
- PoC SHA tested: `9218a63b115a9cfb61bc7a091eb7e532aa8a7072`
- Session result: 12 PASS / 0 FAIL / 0 BLOCKED

## Physically established

The test exercised the real visual fallback chain on a test-owned macOS fixture:

1. P1B acquired a mapped visual frame.
2. The provider-neutral P2B boundary interpreted the frame using the local macOS Vision PoC provider as an oracle.
3. P3A resolved exactly one visual text target.
4. P3B explicitly authorized a primary-display left-click fallback plan.
5. P4 delivered the click through the public Computer Control `clickPointer()` boundary.
6. Computer Control returned `CLICK_POSTED` with pointer position verified, button delivery `POSTED`, and `semanticConsequenceVerified = false`.
7. P4 then performed a fresh post-action visual capture and interpretation.
8. The expected exact-text postcondition was absent before the action and present in the fresh post-action observation.
9. Only that independent post-action observation produced `taskOutcome.state = "VERIFIED_SUCCESS"` with basis `post-action-independent-observation`.

The session therefore physically demonstrated that event delivery is not treated as semantic task success.

## Boundaries preserved

- `CLICK_POSTED` is only delivery evidence.
- Semantic success is claimed only from a separate post-action observation.
- A missing postcondition does not become success.
- A failed/noncanonical click delivery does not trigger post-action verification.
- No screenshot payload, OCR text, target coordinate, action-plan coordinate or postcondition coordinate was persisted or logged by the test evidence.
- The pointer was restored after the test, the fixture was stopped, and the Computer Control runtime was shut down.
- Both product working trees were clean after execution.

## Scope

This evidence validates the initial P4 path only for the already bounded stack: stable unrotated primary display, provider-neutral `text-region` observations, exact-text single-match target resolution, explicit visual-fallback consent, primary-display left click, and exact-text independent postcondition verification on the reference Mac.

It does not establish general OCR accuracy, semantic identity of arbitrary UI elements, secondary/rotated display support, broader gesture/action vocabularies, VLM/object/icon targeting, or correctness for arbitrary applications.
