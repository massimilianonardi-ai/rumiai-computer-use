# P6A caller contract registry — public physical evidence

Status: `PHYSICALLY_VALIDATED` on the reference Mac.

Authoritative session:

- session: `cu-perception-p6a-caller-contract-registry-public-s01`
- evidence commit: `21ad01e93a5de4e5276b49c193269a26ad66b164`
- Computer Use runtime: `5e4daf5ebf352535653bfb21a559026238966a20`
- Computer Control: `e3a3f13d66546cf8f0fca50075bd4607c2c3d003`
- frozen test source: `66455683f3088b6cfb7fa9e1a49274a9c08269f5`
- tested PoC SHA: `380c6f756dda2a2e798a7987e1d3aff2059060de`
- result: 9 PASS / 0 FAIL / 0 BLOCKED

## What was proven

`app/visual-fallback-contract-manager.js` loaded a deterministic caller-owned JSON contract from a local registry and selected it only for one exact `application + OPEN target` pair. Duplicate matches fail closed and absent/nonmatching contracts do not create a generic fallback.

The selected contract was converted into the P5E execution shape without carrying a concrete perception-provider object or action coordinates. It supplied only caller knowledge: exact visual target, exact postcondition, explicit visual-fallback consent, the already validated primary-display left-click action shape and perception-provider requirements.

The physical run then passed that selected contract through the normal `runTask` agent-loop path. The planner remained semantic (`ACTIVATE_APP`, `OPEN`), semantic execution produced structured `NO_SEMANTIC_TARGET`, and only after that eligible gap did Computer Use lazily select the local product macOS Vision provider. Real Computer Control delivery returned `CLICK_POSTED` with `semanticConsequenceVerified = false`; only the independent post-action observation produced `VERIFIED_SUCCESS`.

The session also proved cleanup and clean Computer Use / Computer Control working trees.

## Boundary established

P6A deliberately separates two concepts:

- competence skills describe what an application/provider is known to support;
- visual-fallback caller contracts provide deterministic execution knowledge for one bounded operation.

P6A does not mark a new application competence as validated, does not add coordinates or visual fields to planner output, does not select perception providers before P5B eligibility, and does not move perception-provider ownership into Computer Control.

## Next evidence requirement

Before shipping a built-in application contract, acquire deterministic evidence on the actual application surface that the target is semantically unavailable/unsupported, visually resolvable, safely actionable under the existing P3B policy, and has an independently observable deterministic postcondition.
