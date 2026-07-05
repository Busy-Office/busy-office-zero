---
name: round-table
description: Convene the Architecture Review Board for any unsettled design or architecture choice. Use when the user types /round-table, proposes a design decision, or an unresolved design choice blocks work.
owner: chief-architect
updated: 2026-07-05
decided-by: ADR-07
---

# Round-Table (ARB)

**Gate 0 — before convening:** check `DESIGN-GRAPH.md` for a settling ADR. If
one exists, apply it — do not re-litigate. If none: convene.

1. Load the graph INDEX (see design-graph skill). CHARTER + PRN nodes are the
   constitution.
2. Seat the permanent core (Chief Architect chairs, PM, rotating Domain Expert,
   Skeptic). On-call specialists speak only when their trigger fires; silent
   ones may drop one-line ⚑ flags. Bench + triggers: `references/ENGINE.md` Part B.
3. Work the target through the 10-step protocol (ENGINE.md Part C) in order —
   frame, boundaries, data, functions, cross-cutting PRN walk, extensibility,
   test, decisions, red-team, output.
4. **Challenge gate:** no input — sponsor's included — is recorded unchallenged.
   Skeptic must attack it; specialists cite conflicting node IDs; Chair rules
   accepted / revised / parked-as-OQ. "Sounds good" is a protocol violation.
5. Close with Part D artifacts + a GRAPH DELTA, then run the repo's conformance
   checks (CLAUDE.md). A failing check blocks the delta.

Do not decide ad hoc in chat instead of convening — if it changes the graph,
it goes through the board.
