owner: product-design-manager
updated: 2026-07-05
decided-by: ADR-02

# COMPONENTS.md — shared component inventory
One line per component. Screen specs reference these IDs; new components are added here first.

CMP-badge-tier | triage tier badge L0/L1/L2 | colors: pending/approve/reject tokens by tier
CMP-gate-row | inbox row: title, agent, tier, age | tap → SCR-03
CMP-agent-row | dashboard row: agent, model tier, current activity (cooked text) | status never color-only
CMP-feed-line | single cooked event line: time (mono), actor, description
CMP-evidence-block | collapsible evidence: diff / artifact link / plan excerpt | mono font token
CMP-audit-row | immutable decision render: verdict, actor, timestamp, reason
CMP-confirm-sheet | mobile-only confirm step before gate decision
