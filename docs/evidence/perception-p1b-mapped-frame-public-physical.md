# P1B mapped frame public physical evidence

Authoritative session: `cu-perception-p1b-mapped-frame-public-s02`

Evidence commit: `09692cd9b16eb36a10bb0ee294162b901afcfd17`

Validated Computer Use runtime: `29c269864def0a26d3254e913d2a5a87f6125103`

Computer Control dependency: `e3a3f13d66546cf8f0fca50075bd4607c2c3d003`

Test source: `807747c79ea2a46dac618afb520990548b2b53fe`

PoC tested SHA: `87380831a0f35a76fe093f900ffe5b1855bbbf52`

Result: `PASS` — 8 pass, 0 fail, 0 blocked.

The physical oracle validated the product-owned P1B mapped-frame path on the reference Mac. The runtime returned a mapped frame with source and destination dimensions `1710 × 1107`, resolved a top-left axis-aligned transform derived from observations rather than assuming identity, and mapped two independently detected test-owned capture-pixel marker centers to their independently known primary-display-logical centers.

The validating runtime still reported mapping validation lifecycle `IMPLEMENTED`; promotion to `PHYSICALLY_VALIDATED` occurred only after this immutable evidence existed.

Safety and boundary observations:

- P1A remained available as an unmapped capture path.
- Interpretation remained `NOT_RUN`.
- No pointer, click, drag, wheel or keyboard action was performed.
- Marker coordinates and frame payload were not logged or persisted.
- The test-owned fixture and Computer Control runtime were cleaned up.
- Product worktrees remained clean after execution.

Validated scope is one stable, unrotated primary display. This evidence does not validate rotated or secondary-display mappings, OCR/VLM interpretation, visual semantic identity, action execution, or semantic task success.
