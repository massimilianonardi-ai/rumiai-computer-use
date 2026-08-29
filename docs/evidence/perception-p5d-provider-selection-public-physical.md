# P5D perception-provider selection — physical validation

Status: `PHYSICALLY_VALIDATED` on the reference Mac.

Authoritative session:

- session: `cu-perception-p5d-provider-selection-public-s01`
- evidence commit: `3d48e86a09f70d37fad9765d0694294cdc13f2ba`
- Computer Use runtime: `2262237e92965d9e5171a9688694f13d2bc183aa`
- Computer Control dependency: `e3a3f13d66546cf8f0fca50075bd4607c2c3d003`
- frozen test source: `42305c85cbec46d7e43fcf429715b1d583f4018c`
- tested PoC SHA: `4f04d6b0225d0a456d53e1206ff5bf319da605f8`
- result: 7 PASS / 0 FAIL / 0 BLOCKED

## Validated boundary

P5D adds a Computer Use-owned perception-provider discovery/selection boundary that is deliberately separate from the existing application `provider-manager.js`.

`app/perception-provider-manager.js` selects providers from explicit descriptors using declared capability, locality and availability. Selection is deterministic and does not invoke the provider's `observe()` method. No unavailable local provider is silently replaced by a remote provider.

The first concrete adapter is the optional local macOS Vision `text-region` provider under `app/perception-providers/`. Its descriptor declares:

- stable provider id;
- `locality = local`;
- `text-region` capability;
- explicit availability probe;
- no required network;
- no required account;
- no required cloud API.

The existing P2B provider-neutral observation contract remains unchanged. Computer Control is not modified and remains provider-free.

## Physical claims

The physical session proved on the reference Mac that:

- the macOS Vision provider reports `AVAILABLE` because the local Vision toolchain is present;
- Computer Use selects it deterministically for required capability `text-region` and locality `local`;
- selection itself performs zero provider observations (`observeCalls = 0`);
- no remote fallback is enabled implicitly;
- frame capture, OCR execution, target resolution and action execution are not part of P5D selection validation;
- Computer Use and Computer Control working trees remain clean.

This deliberately separates provider availability/selection evidence from OCR correctness. OCR behavior remains governed by the P2 provider-neutral contract and its own physical evidence.

## Non-claims

P5D does not yet wire provider selection into the normal agent loop, does not make visual fallback automatic, does not broaden target-resolution semantics, and does not claim support for multiple-provider ranking beyond the deterministic initial selection policy. That integration belongs to P5E.
