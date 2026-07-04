# MEMORY-LAYOUT.md — index + shards standard (ADR-04)

Purpose: keep the per-session token cost of design memory flat as the project
grows. The always-loaded working set is the **index**; depth lives in **shards**
hydrated on demand.

## Layout

```
README.md + CLAUDE.md      # orientation (human / agent), root contract ADR-06
DESIGN-GRAPH.md            # INDEX: CHARTER + NODES (one-liners) + ALL EDGES. Hard cap: 200 lines.
graph/
  adr/ADR-<nn>.md          # shard — REQUIRED for every accepted ADR
  mod/MOD-<name>.md        # shard — REQUIRED for every accepted MOD
  flows/FLOW-<MOD>.md      # logicflow tree(s) for a module's processes (ADR-05)
design/
  NAV-GRAPH.md             # INDEX of screens + navigation edges
  screens/SCR-<nn>-*.md    # shards — required for accepted screens (nav-lint)
```

## Rules

1. **Edges live only in the index.** Impact walks ("what breaks if we change X?")
   must be answerable from the index alone — never require opening a shard.
2. **One node ⇒ at most one shard.** Path is computed from the ID
   (ADR-01 → graph/adr/ADR-01.md); no lookup tables that can drift.
3. **Index lines are one line.** The moment a node needs more, the depth is
   extracted to its shard — the index line stays a summary.
4. **Shard front-matter contract** (first three lines, exactly):
   ```
   id: ADR-01
   status: accepted
   title: Product charter
   ```
   `id` must match the filename; `status` must match the index.
5. **Loading protocol.** Session start = index only. Hydrate a shard when its
   node comes under discussion. Bulk-loading all shards is a protocol violation.
6. **Provenance in shards (PRN-10).** Confirmed facts carry source + date in
   the shard; the index never carries citations.
7. **Enforcement (PRN-05).** `tools/graph-lint.mjs` runs at every hardening
   gate: index↔shard existence both directions, front-matter agreement, edge
   endpoints valid, 200-line index cap.

## Logicflow shards (adopted from Governed Delivery §5)

`graph/flows/FLOW-<MOD>.md` holds ASCII resolution trees for a module's
processes. Every branch states its **condition** and its **fallback**. Code
must match the tree exactly; a mismatch is a hardening-gate Blocker
(design-conformance dimension, ADR-05). When logic changes: decision → tree →
code, in that order, same turn.

## Growth path

When a subdomain's node count crowds the index (e.g. entities), promote it to
its own index+shards pair (like design/NAV-GRAPH.md + screens/) and link it
from the CHARTER. The pattern is fractal; the 200-line cap is per index file.
