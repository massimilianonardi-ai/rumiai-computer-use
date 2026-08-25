# RumiAI Computer Use

Semantic Computer Use orchestration for RumiAI. This project owns task
planning, capability/provider/skill selection, context sessions, deterministic
intent execution, recovery policy, and result-location logic.

It does not contain desktop-control backends, native helpers, runtime
installers, model installers, or service managers.

## Project boundaries

```text
rumiai-portable-runtime  installs and starts dependencies
rumiai-computer-use      decides what to do and verifies the goal
rumiai-computer-control  observes and acts on the desktop
```

Computer Control is required through the external adapter selected by
`RUMIAI_COMPUTER_CONTROL_HOME` or `RUMIAI_COMPUTER_CONTROL_ADAPTER`. There is
no bundled fallback.

## Layout

- `app/`: planner, orchestrator, executors, recovery and external boundary.
- `contexts/`: dynamically selected planning context.
- `providers/`: application identities and capability declarations.
- `skills/`: validated provider competence evidence.
- `tests/results/`: selected application-level PoC evidence.
- `docs/history/`: selected architectural decisions promoted from the PoCs.

The supported portable workflow is owned by `rumiai-portable-runtime`:

```sh
./cmd/computer-use-install
./cmd/computer-use-start
```

For direct development, provide Node.js, Ollama, the Ministral model, and the
external Computer Control environment, then run `npm start`.
