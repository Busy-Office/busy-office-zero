owner: chief-architect
updated: 2026-07-05
decided-by: ADR-12

# OWNERS.md — doc ownership table (ADR-12)

Summary view of the `owner`/`updated`/`decided-by` front-matter carried by
every governed doc. Hand-maintained for v1 (no CI to auto-generate it yet —
OQ-05); if this table and a doc's own front-matter ever disagree, the doc's
front-matter wins — update this file to match, not the other way round.

Doc Owner roster (declared in CHARTER): Chief Architect, PM, Product Design
Manager, UX/UI Designer.

| Doc / doc set | Owner | Decided-by |
|---|---|---|
| `DESIGN-GRAPH.md` + `graph/adr\|mod\|flows/*` | Chief Architect | ADR-04 |
| `CLAUDE.md` | Chief Architect | ADR-06 |
| `.claude/agents/*.md` | Chief Architect | ADR-08 |
| `.claude/skills/*/SKILL.md` | Chief Architect | ADR-07 |
| `docs/SKILLS.md` | Chief Architect | ADR-07 |
| `docs/OWNERS.md` (this file) | Chief Architect | ADR-12 |
| `design/tokens.json` | Product Design Manager | ADR-02 |
| `design/DESIGN-SYSTEM.md` | Product Design Manager | ADR-02 |
| `design/COMPONENTS.md` | Product Design Manager | ADR-02 |
| `docs/ASSETS.md` | Product Design Manager | ADR-03 |
| `design/NAV-GRAPH.md` | UX/UI Designer | ADR-02 |
| `design/screens/SCR-*.md` | UX/UI Designer | ADR-02 |
| `README.md` | PM | ADR-01 |

Enforcement: `tools/graph-lint.mjs` checks every doc above has well-formed
`owner`/`updated` front-matter (owners-lint) and flags a doc whose
`decided-by` node's shard changed more recently than the doc itself
(staleness-lint). Scope limit: staleness-lint only covers `decided-by`
targets that are shard-bearing nodes (ADR/MOD) — PRN nodes have no shard
date (PRN-10) and are excluded.
