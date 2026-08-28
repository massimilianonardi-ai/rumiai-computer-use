# P2B provider-neutral text-region contract — physical evidence

Status: `PHYSICALLY_VALIDATED` on the reference Mac.

Authoritative session: `cu-perception-p2b-provider-contract-public-s02`

Evidence commit: `82ca0c0d1fb383a3102d19238cfe885cd0b8d8a4`

Validated Computer Use runtime: `839d53d100e31da2fec839351f94f197d377ab36`

Computer Control dependency: `e3a3f13d66546cf8f0fca50075bd4607c2c3d003`

The session completed 9/9 checks with no failures or blocks. The real `app/perception-provider.js` runtime accepted an injected provider declaring the provider-neutral `text-region` capability and normalized observations produced by the already-observed local macOS Vision OCR oracle.

The physical run established that:

- the provider-neutral contract consumed the real P1B mapped frame;
- two test-owned OCR observations were normalized as `text-region` observations;
- normalized observations retained `semanticIdentity = null` and `actionable = false`;
- observation geometry remained `capture-pixel` with top-left origin and remained compatible with the physically validated P1B mapping;
- `semanticTarget.state` remained `UNRESOLVED`;
- `actionPolicy.state` remained `NOT_EVALUATED`;
- no pointer, click, drag, wheel or keyboard action was performed;
- frame payload, OCR text and coordinates were not persisted or logged;
- the fixture and Computer Control runtime were cleaned up;
- both product working trees remained clean.

This evidence validates the provider-neutral `text-region` boundary. It does not make macOS Vision a built-in Computer Use dependency, validate VLM/object/icon observation types, resolve a semantic UI identity, select an actionable target, or equate event delivery with task success.
