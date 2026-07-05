id: ADR-08
status: accepted
title: Agent model
owner: chief-architect
updated: 2026-07-05

Context: board roles (Part B of ENGINE.md) are design-time personas — free, instant,
in-session. Execution needs real Claude Code subagents with model tiers and tools.
Conflating them = roster theater.
Decision: agents live in .claude/agents/<name>.md. Starting roster of three, each
mapped to a GATE, not a job title:
- builder (Sonnet) — implements accepted designs; bound by PRN-11, PRN-09, PRN-06.
- verifier (Haiku) — purely mechanical checks: lints, node --check, trigger tests.
- reviewer (Sonnet) — hardening gate + UI design review (ADR-11).
Rules: (1) hiring is an ADR — no agent joins without a recorded decision naming the
gate it owns; (2) every agent file states its PRN bindings; (3) separation of duties —
no agent verifies or reviews its own output; (4) two-layer memory: shared truth in the
graph, private notes per agent (never authoritative).
Rejected: an Architect agent — design authority stays with the board where the
challenge gate runs. Source: board decision session, 2026-07-04.
