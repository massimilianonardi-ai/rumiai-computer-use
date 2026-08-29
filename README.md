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

The first bounded visual fallback path P1–P4 is physically validated on the
reference Mac, including real Computer Control click delivery followed by an
independent post-action visual postcondition. The current operational resume
point and immutable evidence references are in `docs/handoff.md`. The next
implementation phase, P5 orchestration integration, is fixed in
`docs/orchestration-visual-fallback.md`.

## Layout

- `app/`: planner, orchestrator, executors, recovery, perception and external boundary.
- `contexts/`: dynamically selected planning context.
- `providers/`: application identities and capability declarations.
- `skills/`: provider competence declarations.
- `docs/`: architecture, handoff, evidence and internal contract boundaries.

The supported portable workflow is owned by `rumiai-portable-runtime`:

```sh
./cmd/computer-use-install
./cmd/computer-use-start
```

For direct development, provide Node.js, Ollama, the Ministral model, and the
external Computer Control environment, then run `npm start`.
