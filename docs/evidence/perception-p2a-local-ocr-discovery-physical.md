# P2A local OCR discovery — physical evidence

Status: `PHYSICALLY_OBSERVED` on the reference Mac.

Authoritative PoC session:

- session: `cu-perception-p2a-local-ocr-discovery-s02`
- evidence commit: `9bf876dd35190776b9276d1e98db9e16733b5c50`
- Computer Use product SHA observed: `a47ada40d6c01dc703c745dc22d046329fe34aea`
- Computer Control dependency SHA observed: `e3a3f13d66546cf8f0fca50075bd4607c2c3d003`
- test-source SHA: `fc3b59a837c7858c78501d1e51c36b65ee5be661`
- result: `PASS` (8 pass, 0 fail, 0 blocked)

The physical test used a test-owned AppKit fixture containing two fixed strings and the real Computer Use P1B mapped-frame path. A local macOS Vision probe received the captured PNG through standard input and performed `VNRecognizeTextRequest` without a network provider or external account.

Observed claims:

- both expected test-owned strings were recognized;
- recognized observations included nonzero confidence and bounding regions;
- Vision normalized lower-left regions were converted into `capture-pixel` / top-left regions;
- each recognized region center was converted through the physically validated P1B mapping and landed in its independently known logical fixture window;
- OCR outputs remained observations and did not claim semantic UI identity;
- no pointer, click, drag, wheel or keyboard action was performed;
- frame payload, recognized text and coordinates were not persisted or logged;
- the test-owned fixture and Computer Control runtime were cleaned up;
- both product working trees remained clean.

This evidence does **not** make macOS Vision a built-in Computer Use provider. It proves one local OCR provider shape and supplies evidence for a provider-neutral text-region contract. It does not validate arbitrary-screen OCR accuracy, a VLM, object detection, semantic target identity or action success.
