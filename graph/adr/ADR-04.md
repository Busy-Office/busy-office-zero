id: ADR-04
status: accepted
title: Memory layout (index + shards)

Decision: DESIGN-GRAPH.md is an index (CHARTER + one-line nodes + ALL edges; 200-line
cap). Depth lives in graph/adr|mod|flows shards with 3-line front-matter (id/status/
title). Edges never leave the index (impact walks stay index-only). Shard path computed
from ID. Load protocol: index at session start; shards hydrated on demand; bulk-load
forbidden. Enforcement: tools/graph-lint.mjs at every hardening gate.
Rationale: flat session token cost as decisions accumulate — same progressive-disclosure
principle skills use (description loaded, body on demand).
Detail: .claude/skills/design-graph/references/MEMORY-LAYOUT.md. Source: 2026-07-04.
