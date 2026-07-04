# CLAUDE.md — agent operating rules for this repo

## Load order (every session)
1. Read `DESIGN-GRAPH.md` — the INDEX ONLY (CHARTER + nodes + edges).
2. Hydrate `graph/` shards only for nodes under discussion. Bulk-loading all
   shards is a protocol violation (ADR-04).
3. Skills in `.claude/skills/` are auto-discovered; external skills per `docs/SKILLS.md`.

## Non-negotiables
- **No guessing** (PRN-09 / rule-zero skill): verify against a source, read it
  from the codebase, or stop and ask. Never invent names, fields, APIs, or rules.
- **Graph wins** (PRN-04): conflicts with conversation resolve to the graph
  unless explicitly superseded. IDs are permanent.
- **Design before UI** (PRN-06): no screen code without an accepted SCR node in
  `design/NAV-GRAPH.md`; colors/fonts only via `design/tokens.json`.
- **Think once, code once** (PRN-11): no code lands in `src/` for a component
  whose graph node isn't `accepted` — decision → graph → code, in that order.
  Spikes/prototypes are evidence for a design session, never merged.
- **Unsettled decision?** Invoke `/round-table` — never decide ad hoc.

## Before finishing ANY task
```
node tools/graph-lint.mjs && node tools/nav-lint.mjs && node tools/ui-lint.mjs
```
A failing check blocks completion. Sessions that changed decisions end with a
GRAPH DELTA merged into `DESIGN-GRAPH.md` + shards.

## Agents (ADR-08)
Execution agents live in `.claude/agents/` (builder / verifier / reviewer), each
owning a gate with PRN bindings stated. Hiring a new agent requires an ADR.
Separation of duties: no agent verifies or reviews its own output.

## Root contract (ADR-06 — graph-lint enforced)
Root holds exactly: README.md, CLAUDE.md, DESIGN-GRAPH.md, and
`.claude/ graph/ design/ docs/ src/ tools/` (plus Node/git residents).
Anything else fails lint with a pointer to its home.
