---
name: design-graph
description: Memory discipline for DESIGN-GRAPH.md. Use whenever reading project decisions, answering impact questions, recording decisions, or at session start and close.
owner: chief-architect
updated: 2026-07-05
decided-by: ADR-07
---

# Design-Graph memory

**Load:** at session start read `DESIGN-GRAPH.md` — the INDEX ONLY. Hydrate a
shard (`graph/adr|mod|flows/<ID>.md`) only when that node is under discussion.
Never bulk-load shards. Layout + rules: `references/MEMORY-LAYOUT.md`.

**Truth:** if conversation conflicts with the graph, the graph wins unless
explicitly superseded (new node + `supersedes` edge — never delete). IDs are
permanent, never reused.

**Impact questions** ("what breaks if we change X?") are answered by walking
EDGES in the index and listing the path — never from recollection. Edges live
only in the index, so no shard is needed for impact walks.

**Write:** every accepted decision becomes an ADR node + shard (3-line
front-matter: id/status/title; provenance source+date in the body). Sessions
end with a GRAPH DELTA (+NODE / +EDGE / ~NODE lines, no deletes) merged into
the index, then `node tools/graph-lint.mjs` must pass.

Keep the index under 200 lines: node summaries stay one line; depth goes to
the shard, not the index.
