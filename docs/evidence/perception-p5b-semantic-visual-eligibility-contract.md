# P5B semantic-to-visual eligibility — contract validation

Status: `CONTRACT_VALIDATED`.

Authoritative session:

- session: `cu-perception-p5b-semantic-visual-eligibility-contract-s02`
- evidence commit: `cbc88158c4cefd7a32ee3acec6e0424eb1a8f1ec`
- Computer Use runtime: `28c654d51c1014ee826dcf24f42b6758dc67a721`
- Computer Control dependency: `e3a3f13d66546cf8f0fca50075bd4607c2c3d003`
- frozen test source: `e5651329fa066ff41d07c98295102b3fa6bebcc1`
- tested PoC SHA: `25330bad74ce0455410d5ed3d3c66aa53adc25e8`
- result: 4 PASS / 0 FAIL / 0 BLOCKED
- validation kind: contract-only

## Validated contract

`app/semantic-visual-fallback-eligibility.js` provides a pure deterministic classification boundary. The initial visually eligible structured semantic failure codes are exactly:

- `NO_SEMANTIC_TARGET`
- `SURFACE_NOT_OBSERVABLE`

Known readiness, permission/backend, semantic delivery, semantic verification, internal exception and invalid intent/precondition failures remain visually ineligible by default. Missing, malformed or unknown structured codes fail closed and are not visually eligible.

Eligibility is determined from the structured result code only. Human-readable `error` text is not parsed or matched for safety-relevant fallback decisions.

The semantic target resolver now emits structured `NO_SEMANTIC_TARGET` and `INVALID_INTENT` codes while preserving the existing successful semantic-resolution behavior.

P5B remains classification-only. It does not invoke P5A, run perception, select a provider, call Computer Control, alter planner semantics or persist evidence/payloads.

## Historical failed session

Session `cu-perception-p5b-semantic-visual-eligibility-contract-s01`, evidence commit `9a10ffba74128cd51b9e307634ff8a5a0068e8a0`, is preserved unchanged as an immutable FAIL. Its P5B test process stopped during module bootstrap because the first contract-only runner did not provide the configured external Computer Control path required by `semantic-ui.js`; the classifier assertions were not reached. The runner was fixed forward-only and s02 is authoritative.

## Non-claims

This checkpoint is not a physical UI validation. It does not wire visual fallback into `OPEN` or any executor (P5C), package/select a concrete perception provider (P5D), or validate an agent-loop visual fallback task (P5E). Defining `SURFACE_NOT_OBSERVABLE` as eligible does not claim that every current semantic executor already emits that code.
