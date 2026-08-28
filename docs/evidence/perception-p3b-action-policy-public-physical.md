# P3B visual fallback action-policy physical evidence

Status: `PHYSICALLY_VALIDATED` on the reference Mac.

Authoritative session: `cu-perception-p3b-action-policy-public-s01`

Evidence commit: `3ba45950619a9e3cf9249b830609e7ca9ccd9faf`

Validated Computer Use runtime: `a8f85143ae77ba79e4fb47a0931697714df908b6`

Computer Control dependency: `e3a3f13d66546cf8f0fca50075bd4607c2c3d003`

The session completed 11/11 checks with PASS. The real perception chain acquired a mapped frame, used the provider-neutral P2B text-region contract, resolved one exact-text target through P3A, and evaluated the P3B visual-fallback policy.

The physical run established that:

- explicit visual-fallback consent produces `actionPolicy.state = "AUTHORIZED"` and `actionPlan.state = "READY"` for the initial primary-display left-click policy;
- the planned logical point falls inside the independently known test-owned target window;
- absence of explicit consent produces `actionPolicy.state = "REJECTED"` and `actionPlan.state = "NOT_CREATED"`;
- the target remains intrinsically `actionable = false` and `semanticIdentity = null`;
- authorization creates a plan only: `delivery.state = "NOT_ATTEMPTED"` and `semanticConsequence.state = "NOT_OBSERVED"`;
- no pointer or keyboard input was executed by P3B;
- frame payloads, recognized text, and coordinates were not persisted or logged;
- fixture and Computer Control runtime cleanup completed successfully.

P3B therefore validates authorization as a separate boundary. It does not validate action delivery and does not claim semantic task success.
