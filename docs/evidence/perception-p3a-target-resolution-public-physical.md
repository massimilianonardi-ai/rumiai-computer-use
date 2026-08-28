# P3A target resolution — physical evidence

Status: `PHYSICALLY_VALIDATED` on the reference Mac.

Authoritative session:

- session: `cu-perception-p3a-target-resolution-public-s01`
- evidence commit: `c2a1e704f99b5cf528fb15287a785875c454a400`
- validated Computer Use runtime: `32a49d08bd235e906b992e093e2184144f76136c`
- Computer Control dependency: `e3a3f13d66546cf8f0fca50075bd4607c2c3d003`
- test source: `1fce015120f6bee490c50141c7f38d4dd0070e27`
- PoC tested: `bb5956650c3c0155e4a702dba3646c7e6dec2dc2`
- result: `10 PASS / 0 FAIL / 0 BLOCKED`

The physical test exercised the complete real chain:

`display.capture → P1B mapping → local Vision PoC provider → P2B provider-neutral normalization → P3A exact-text target resolution`.

Observed claims:

- one exact text query resolved exactly one normalized `text-region` observation;
- the product resolver mapped the selected region center through the physically validated P1B transform;
- the mapped logical target point independently fell inside the expected test-owned fixture window;
- the resolved target retained `semanticIdentity = null`;
- the resolved target retained `actionable = false`;
- `actionPolicy.state` remained `NOT_EVALUATED`;
- no pointer or keyboard action was executed;
- frame payload, OCR text and coordinates were not persisted or logged;
- fixture and Computer Control runtime cleanup passed;
- both product working trees remained clean.

The contract tests also established fail-closed behavior for zero exact matches (`UNRESOLVED`) and multiple exact matches (`AMBIGUOUS`).

This evidence does not authorize a click and does not establish semantic UI identity or task success. Action authorization and execution remain separate phases.
