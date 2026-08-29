# P5C OPEN semantic-first integration — physical validation

Status: `PHYSICALLY_VALIDATED` on the reference Mac.

Authoritative session:

- session: `cu-perception-p5c-open-semantic-first-public-s08`
- evidence commit: `9195ae930f87f9804052e5024cb406b1488a747b`
- Computer Use runtime: `8f21dd520356fc30e147e17adfff2c7567f36b83`
- Computer Control dependency: `e3a3f13d66546cf8f0fca50075bd4607c2c3d003`
- frozen test source: `21c00a22c28d2ac30841eb0afcb56bba3f273aaf`
- tested PoC SHA: `3de353c9b307c60d2a6d5736a9253c45c6137a64`
- result: 6 PASS / 0 FAIL / 0 BLOCKED
- validation kind: physical

## Validated behavior

`OPEN(target)` is now semantic-first at the executor boundary.

The physical session proved both required paths:

1. **Semantic path** — the deterministic AppKit target was resolved and clicked through Computer Control. A fresh post-action observation re-resolved the target and Computer Control `ui.describe` independently reported the normalized selectable state. The semantic operation succeeded without invoking P5A, the visual perception provider or the visual post-action observer (`visualProviderCalls = 0`).
2. **Visual fallback path** — a different deterministic target was absent from the semantic accessibility representation and produced structured `NO_SEMANTIC_TARGET`. With explicit policy authorization, deterministic exact visual target, deterministic exact postcondition and an injected local provider, P5A performed the visual path. Computer Control reported `CLICK_POSTED` delivery with semantic consequence still unverified; only a fresh independent post-action visual observation satisfying the exact postcondition produced `VERIFIED_SUCCESS`.

The planner remains unchanged and emits semantic intent only. No provider, visual target query, postcondition or coordinates are added to planner output. Provider selection is not introduced by P5C; the provider remains injected through execution context pending P5D.

## Delivery is not success

The session explicitly preserved `delivery != success`:

- semantic click delivery is insufficient without a post-action semantic consequence observation;
- visual `CLICK_POSTED` is delivery only;
- visual task success requires the independent post-action observation and `taskOutcome.state = "VERIFIED_SUCCESS"`.

Focus alone is not accepted as semantic success. The final semantic verification uses fresh post-action target resolution plus normalized Computer Control description of the selectable control, rather than assuming raw snapshot markers expose backend state.

## Privacy and cleanup

Screenshot bytes, OCR payload text and action coordinates remained ephemeral and were not persisted in session evidence. Pointer restoration, fixture shutdown, application cleanup and Computer Control runtime cleanup all passed. Computer Use and Computer Control working trees were clean after the session.

## Immutable failed history

The following sessions remain immutable and are not superseded as historical evidence:

- s01 / `15976727c6b6a09b09b428c415c5daf74e6c0258`: unregistered standalone fixture was not a supported Provider.
- s02 / `86793f0077d0926554c71422e4394b3bf3c62b9a`: registered fixture still launched as an unsuitable direct executable and was unsnapshotable.
- s03 / `26be209cfcdb9fa5ab81a2a23d823344c598a6d8`: LaunchServices app still failed snapshot.
- s04 / `630ac6c68cc7c960c01455a85dadbfb9f51abca8`: System Settings surface produced no AX window for the targeted process name.
- s05 / `4c20c9bc2425829a26207f46a7c99fab54be1a9d`: test-owned AppKit Provider reached real OPEN execution but the title-only postcondition was fragile.
- s06 / `9b695a32383ae22b70dd1498d823ebb27ae0080b`: radio fixture reached delivery but Computer Use did not yet consume the normalized selectable state.
- s07 / `f2a2b81263f1ba052745e1dc9ef021a7533f1231`: first normalization fix targeted raw snapshot markers, while the actual checked/selected state was exposed by Computer Control `ui.describe`.

All fixes were forward-only.

## Non-claims

P5C does not select or package a concrete perception provider (P5D), wire visual fallback configuration into the normal agent loop (P5E), claim general OCR/VLM accuracy, or make semantic delivery/verification failures visually eligible. P1–P4 and P5A evidence are not rerun or rewritten by this checkpoint.
