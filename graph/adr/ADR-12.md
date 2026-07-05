id: ADR-12
status: accepted
title: Documentation governance
owner: chief-architect
updated: 2026-07-05

Context: doc ownership existed only as convention (who "should" touch what),
and no doc but `DESIGN-GRAPH.md` had any mechanism forcing it to stay current
with a decision that changed. Round-table session, 2026-07-05, surfaced this
while assigning single owners per doc.

Decision: extend the index+shard front-matter contract (ADR-04) with two more
fields, `owner` and `updated`, plus an optional `decided-by` (a node ID) on
docs that trace to exactly one decision. Roster of owner roles lives in the
CHARTER, next to the Domain Expert rotation set: Chief Architect, PM, Product
Design Manager, UX/UI Designer.

Ownership table:
- Chief Architect: DESIGN-GRAPH.md + graph/adr|mod|flows/*, CLAUDE.md,
  .claude/agents/*.md, .claude/skills/*/SKILL.md, docs/SKILLS.md,
  docs/OWNERS.md
- Product Design Manager: design/tokens.json, design/DESIGN-SYSTEM.md,
  design/COMPONENTS.md, docs/ASSETS.md
- UX/UI Designer: design/NAV-GRAPH.md, design/screens/*.md
- PM: README.md

Enforcement: `tools/graph-lint.mjs` gains two checks — (1) owners-lint: every
governed doc has a well-formed `owner` (in the roster) and `updated` (valid
date); (2) staleness-lint: for docs with `decided-by`, the target node's
shard `updated` date must not be newer than the doc's own `updated` date.
Session close-out gets a **DOC DELTA** block (docs touched + bumped dates)
alongside the existing GRAPH DELTA — kept separate because GRAPH DELTA's
contract (ADR-04) is nodes/edges only.

Scoping limits, stated explicitly so they aren't mistaken for defects later:
- Staleness-lint only applies where `decided-by` points at a shard-bearing
  node (ADR/MOD) — PRN nodes carry no shard/date (PRN-10) and are out of
  scope.
- `updated` is manually maintained for v1 (no CI pipeline exists yet —
  ADR-10 parked that); automatic git-sourced dates are OQ-05.
- A doc whose content genuinely spans two owners' domains is split, not
  co-owned — same boundary test as any component decoupling check.

Rejected: git-hook-automated `updated` dates now (no pipeline to hook into —
would be code before the design is settled, PRN-11); joint ownership for
multi-domain docs (invites exactly the ambiguity this ADR removes).

Consequences: every existing governed doc gets a one-time front-matter
migration in this same session. `docs/OWNERS.md` is a new file (permitted
under the existing root contract, ADR-06 — no root change needed).

Source: round-table session, 2026-07-05 (documentation governance target,
following the AI-agents disambiguation session same date).
