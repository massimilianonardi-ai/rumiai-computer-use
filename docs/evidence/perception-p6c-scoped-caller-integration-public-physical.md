# P6C scoped caller integration — public physical evidence

Status: **PHYSICALLY_VALIDATED**

Authoritative session:

- session: `cu-perception-p6c-scoped-caller-integration-public-s01`
- evidence commit: `c66eb5ba69d9e0435cb894731b1d1cea832c31e1`
- Computer Use runtime: `a1bdddc813a89a16552b08ccec6b3aec00eb3157`
- Computer Control: `e3a3f13d66546cf8f0fca50075bd4607c2c3d003`
- frozen test source: `740be2179de17dd9e790f3c92025bb8c01376b16`
- tested PoC: `e2e246b335ebecf65e2e1445d7c9e18ac71d49d5`
- result: **11 PASS / 0 FAIL / 0 BLOCKED**

## Physically proven

The test reused the P6B evidence-backed real Safari canvas surface and exercised it through normal `runTask` using the P6C scoped caller-contract boundary.

The physical run proved:

1. the caller scope was explicit: `p6b.safari.canvas.v1`;
2. contract selection remained exact on scope + application + `OPEN` + exact target;
3. a wrong scope failed closed and did not enable visual fallback;
4. planner output remained semantic-only (`ACTIVATE_APP`, `OPEN`), with no coordinates, provider object, postcondition or scope embedded in planner output;
5. the normal agent loop attempted semantic execution first and reached structured `NO_SEMANTIC_TARGET` before visual perception was allowed;
6. the real local provider `rumiai.local.macos-vision-text-region` was selected lazily only after that eligible semantic gap;
7. Computer Control reported `CLICK_POSTED` with no claimed semantic consequence;
8. `CLICK_POSTED` remained delivery only;
9. task success became `VERIFIED_SUCCESS` only after independent post-action observation;
10. screenshot bytes, OCR payload and coordinates were not logged;
11. pointer, Safari, Computer Control runtime and local HTTP server were cleaned up; product trees remained clean.

Authoritative markers include:

```text
p6c-real-surface=PASS application=Safari localPageRequests=1 evidenceBackedBy=P6B
p6c-scoped-caller=PASS scopeId=p6b.safari.canvas.v1 exactApplication=true exactTarget=true wrongScopeFailClosed=true
p6c-planner-boundary=PASS semanticOnly=true coordinates=false providerObject=false postconditionOutsidePlanner=true scopeOutsidePlanner=true
p6c-normal-agent-loop=PASS intents=ACTIVATE_APP,OPEN executionPath=visual-fallback eligibleGap=NO_SEMANTIC_TARGET
p6c-lazy-provider=PASS provider=rumiai.local.macos-vision-text-region locality=local selectedAfterEligibleGap=true
p6c-delivery-success-separation=PASS controlState=CLICK_POSTED deliveryIsNotSuccess=true taskOutcome=VERIFIED_SUCCESS independentPostActionObservation=true
p6c-payload-policy=PASS screenshotLogged=false ocrPayloadLogged=false coordinatesLogged=false
p6c-test-cleanup=PASS pointerRestored=true safariCleanup=true runtimeCleanup=true serverCleanup=true
physical-computer-use-perception-p6c=PASS
```

## Nonclaims

This evidence does **not** promote `PROCEED → FINISHED` into generic Safari product knowledge. Those strings and the scope are test-owned representations of the P6B controlled surface.

P6C validates the mechanism for bounded caller-owned visual fallback knowledge, not arbitrary Safari UI competence, arbitrary canvas interaction, fuzzy matching, icon/object recognition or general browser automation.
