# SCR-04 — decision-log (web)
Status: accepted.
Purpose: append-only audit trail of gate decisions; filter by agent, tier, verdict, date.
In: SCR-01 (open-log) | Out: SCR-03 read-only (open-gate) — must agree with NAV-GRAPH.
States: loading, list, empty, feed-disconnected.
Components: CMP-audit-row, CMP-badge-tier.
Validations: rows are immutable; no edit/delete affordances exist (PRN-02).
Open items: export format (CSV?) — raise as OQ if needed.
