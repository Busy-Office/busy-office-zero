owner: ux-ui-designer
updated: 2026-07-05
decided-by: ADR-02

# SCR-03 — gate-detail (both platforms)

Status: accepted | Owner: UX/UI Designer | Nodes/edges must match NAV-GRAPH.md.

## Purpose
Present one pending human gate with full context so the sponsor can decide
in <30 seconds without leaving the screen. This is the app's core moment.

## Entry / exit (must agree with NAV-GRAPH)
- In:  SCR-02 (select gate row), SCR-04 (read-only, web)
- Out: SCR-02 via decide-return (after submit)

## Layout
- Header: gate title, requesting agent, triage tier badge (L0/L1/L2), age.
- Body: context summary (cooked event text), evidence block (diff / artifact
  link / plan excerpt), affected-nodes list (walked from DESIGN-GRAPH edges).
- Footer: reason field (required on reject, optional on approve),
  Approve (color.approve) / Reject (color.reject) actions.
- Mobile: footer is a fixed bottom sheet; decision requires confirm step.

## States
1. loading — skeleton of header+body
2. ready — decidable
3. submitting — actions disabled, spinner on chosen action
4. decided — immutable view: decision, actor, timestamp, reason (audit render)
5. conflict — gate already decided elsewhere (idempotency hit): show decided
   state with "decided while you were viewing" notice
6. error — feed/gate service unreachable; retry affordance

## Components (see COMPONENTS.md)
CMP-badge-tier, CMP-evidence-block, CMP-audit-row, CMP-confirm-sheet (mobile)

## Events
- consumes: gate.pending, gate.decided (live update → state 5 if raced)
- emits (via POST /gate): decision {gateId, verdict, reason, actor, token}

## Validations
- Reject requires non-empty reason.
- Double-submit guarded client-side + server idempotency (PRN-02).

## Open items
- none
