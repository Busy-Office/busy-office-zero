owner: ux-ui-designer
updated: 2026-07-05
decided-by: ADR-02

# SCR-02 — gate-inbox (both platforms)
Status: accepted.
Purpose: list pending gates sorted by triage tier then age; decided gates collapse to history link.
In: SCR-01 (open-gates), SCR-03 (decide-return) | Out: SCR-03 (open-gate) — must agree with NAV-GRAPH.
States: loading, empty (all clear), list, feed-disconnected.
Components: CMP-gate-row, CMP-badge-tier.
Validations: rows update live on gate.decided (row leaves list, no reload).
Open items: none.
