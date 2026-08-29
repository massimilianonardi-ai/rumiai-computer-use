# P6B Safari Canvas Discovery — Public Physical Evidence

Status: **PHYSICALLY_OBSERVED**

## Authoritative session

- Session: `cu-perception-p6b-safari-canvas-discovery-public-s06`
- Evidence commit: `e8a2899c58c5e6d3725d4457af18aefc25923580`
- Computer Use expected/observed: `3a3148cdf89735d2d46d208bbe69dc1d26722e3b`
- Computer Control expected/observed: `e3a3f13d66546cf8f0fca50075bd4607c2c3d003`
- Test source: `6d826092b93973905fa6f2c7f8ac1c1d68a92a31`
- PoC tested: `0ae7c087bf0072aac0c5f0d180b8d83933022a3c`
- Result: **10 PASS / 0 FAIL / 0 BLOCKED**

## What was physically observed

The session used the existing real Safari application Provider and the real Safari process. A loopback-only test-owned page was served and Safari requested it before any semantic or visual observation (`requests=1`, `eventLoopServed=true`). The visible control text existed only in an HTML canvas.

The fresh semantic Safari snapshot could not resolve the canvas target and produced structured `NO_SEMANTIC_TARGET`.

The Computer Use-owned local macOS Vision provider `rumiai.local.macos-vision-text-region` resolved exactly one visual target using the existing exact-text-single-match policy while confirming the postcondition was absent before delivery.

Real Computer Control click delivery returned `CLICK_POSTED` with `semanticConsequenceVerified=false`. Delivery was not treated as task success.

A fresh independent post-action visual observation verified the test-owned postcondition, and only then did the coordinator return `VERIFIED_SUCCESS` with independent post-action evidence.

The session also proved that screenshot bytes, OCR payload text and coordinates were not logged, and that pointer state, Safari, the loopback server, runtime/cache and temporary resources were cleaned up. Computer Use and Computer Control trees remained clean.

## Historical failed sessions preserved

The following attempts remain immutable evidence and are not rewritten:

- s01 `af5497f239a587a32551dcb38ac1fdb84db0e1da` — PoC postcondition oracle bug.
- s02 `23d486abcd053d837d0e9a39c7082f93f10786f7` — reached visual boundary before the later local-page-loading defect was understood.
- s03 `08ebc0f508ca80e000880183b615eded1de01b4e` — Vision observed Safari chrome/start-page content, not yet the intended canvas.
- s04 `4e7dca8124b0ca792a0b82bf66ba7e3f06411a2f` — same hidden page-loading boundary with simplified OCR labels.
- s05 `f8021d654252a9cd10512f1c38250ea58309d461` — isolated `SAFARI_LOCAL_PAGE_NOT_REQUESTED`; the in-process HTTP server had been starved by synchronous waits.

The forward-only PoC fix replaced the bootstrap waits with event-loop-friendly asynchronous waits; no product runtime change was required.

## Scope and non-claims

P6B proves one bounded real-application discovery case: Safari displaying a loopback test-owned canvas with deterministic target and deterministic postcondition.

P6B does **not** ship a Safari visual-fallback contract, does not enable generic Safari or arbitrary web automation, does not broaden exact matching, does not change provider-selection policy, and does not alter P1–P5, P6A or Computer Control contracts.

The next checkpoint may integrate a bounded caller contract only for an evidence-backed case while preserving semantic-first execution, explicit authorization, lazy provider selection, planner coordinate-freedom and `delivery != success`.
