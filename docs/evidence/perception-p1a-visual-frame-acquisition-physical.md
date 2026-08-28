# Perception P1A — visual frame acquisition physical evidence

Status: `PHYSICALLY_VALIDATED`

Authoritative session:

- session: `cu-perception-p1a-visual-frame-acquisition-s04`
- evidence commit: `bdb4de64ea4471838e878a385e2f1f2b7f538ae7`
- Computer Use SHA: `322b5cdf3d7003a64910fcc46927225405150213`
- Computer Control SHA: `e3a3f13d66546cf8f0fca50075bd4607c2c3d003`
- test-source SHA: `e020b2e225fee04c2ab6d6e04af23184da2d5da9`
- PoC tested SHA: `05206249bf9685ab52c9be0ddb658f944fb987f7`
- result: `PASS`

The physical session passed all six checks. Computer Use acquired a real primary-display PNG through the external Computer Control `display.capture` boundary. On the reference Mac the observed frame dimensions were 1710 × 1107. The exact PNG byte count is intentionally not treated as stable because it depends on screen contents.

Validated boundaries:

- frame state is `VISUAL_FRAME_ACQUIRED`;
- source is Computer Control `display.capture` on `primary`;
- payload is canonical PNG and is kept ephemeral;
- `coordinateSpace.kind` remains `capture-pixel` with top-left origin;
- `interpretation.state` remains `NOT_RUN` with zero candidates;
- `actionCoordinateMapping.state` remains `UNRESOLVED`;
- frame payload/base64 is not written to session evidence;
- test-owned Computer Control runtime is explicitly shut down;
- Computer Use and Computer Control worktrees remain clean.

Historical provenance is preserved in the PoC repository:

- s01 overall FAIL: missing `AGENT_CTRL` propagation in the new Computer Use session runner;
- s02 interrupted manually: the physical harness retained a test-owned Computer Control runtime child;
- s03 overall FAIL while the physical P1A itself passed: a static lifecycle guard used an incorrect file path;
- s04 authoritative PASS after forward-only PoC fixes.

P1A does **not** prove that capture-pixel coordinates equal Computer Control logical pointer coordinates. That relationship is the subject of P1B physical discovery.
