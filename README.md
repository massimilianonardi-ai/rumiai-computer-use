# RumiAI Computer Use

Semantic Computer Use orchestration for RumiAI. This project owns task
planning, capability/provider/skill selection, context sessions, deterministic
intent execution, recovery policy, result-location logic, and interpretation
of observations needed to decide what to do.

It does not contain desktop-control backends, native helpers, runtime
installers, model installers, or service managers.

## Project boundaries

```text
rumiai-portable-runtime  installs and starts dependencies
rumiai-computer-use      interprets observations, decides what to do and verifies the goal
rumiai-computer-control  observes and acts on the desktop
```

Computer Control is required through the external adapter selected by
`RUMIAI_COMPUTER_CONTROL_HOME` or `RUMIAI_COMPUTER_CONTROL_ADAPTER`. There is
no bundled fallback.

Visual capture remains a Computer Control mechanic. Computer Use may consume
`display.capture` as an observation and pass the resulting ephemeral frame to
interpretation providers, but it does not implement a second screenshot
backend. See `docs/perception.md`.

## Layout

- `app/`: planner, orchestrator, executors, recovery, perception and external boundary.
- `contexts/`: dynamically selected planning context.
- `providers/`: application identities and capability declarations.
- `skills/`: provider competence declarations.
- `docs/`: architecture and internal contract boundaries.

The supported portable workflow is owned by `rumiai-portable-runtime`:

```sh
./cmd/computer-use-install
./cmd/computer-use-start
```

For direct development, provide Node.js, Ollama, the Ministral model, and the
external Computer Control environment, then run `npm start`.
