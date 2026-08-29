# P5A visual fallback coordinator — public physical validation

Status: `PHYSICALLY_VALIDATED`

Date: 2026-08-29

Authoritative PoC session: `cu-perception-p5a-visual-fallback-coordinator-public-s01`

Authoritative evidence commit: `8076ddeaa3ac061e5cc1fb745aa97e1f9badb0c3`

Validated Computer Use runtime: `cc9e26e87aa83239378d466d64879229fe2302bc`

Validated Computer Control dependency: `e3a3f13d66546cf8f0fca50075bd4607c2c3d003`

Frozen P5A test source: `aaa88a862cba2f42fcecc4b21619c5b10eceeb85`

PoC SHA executed by the immutable session: `f3f3f70b8eabe9cc2c7348a7a27920f0d69a5710`

Session result: 13 PASS / 0 FAIL / 0 BLOCKED.

## Validated claim

`app/perception-action-coordinator.js` composes the already validated P1B → P2B → P3A → P3B → P4 boundaries into one explicit Computer Use operation while preserving each stage's fail-closed contract.

The physical session validated that the coordinator:

1. acquires a mapped primary visual frame through P1B;
2. invokes the provider-neutral P2B interpretation contract using the local macOS Vision PoC provider only as a test oracle;
3. resolves one deterministic exact-text target through P3A;
4. requires explicit P3B visual-fallback authorization;
5. performs exactly one real Computer Control left-click delivery only after authorization;
6. performs one fresh post-action visual observation;
7. returns `VERIFIED_SUCCESS` only when that independent observation satisfies the deterministic exact-text postcondition;
8. preserves Computer Control `CLICK_POSTED` as delivery evidence with `semanticConsequenceVerified = false` rather than treating delivery as task success;
9. leaves the Computer Use and Computer Control product trees clean after the session.

The contract suite also validated rejection paths for missing consent, unresolved/ambiguous targets, failed delivery and posted delivery without a satisfied postcondition. No rejected path dispatched an unauthorized click.

## Boundary claims

P5A is composition-only. It does not:

- select a perception provider;
- decide whether a semantic failure is eligible for visual fallback;
- alter planner intents;
- invent or rank visual targets;
- infer a postcondition;
- bypass Computer Control;
- persist screenshots, OCR text or target/action coordinates.

Those responsibilities remain outside P5A. Semantic-to-visual eligibility is P5B; first executor integration is P5C; concrete provider delivery/selection is P5D; normal agent-loop integration is P5E.

## Evidence policy

The PoC evidence commit above is immutable. Any later regression or broadened claim requires a new forward-only session/evidence commit; this session must not be rewritten.
