id: ADR-02
status: accepted
title: Design contract set

Decision: UI truth is split (not one DESIGN-UI.md): design/DESIGN-SYSTEM.md (prose),
design/tokens.json (single value source), design/NAV-GRAPH.md (screens+edges, graph
discipline, platform-tagged), design/screens/SCR-*.md (specs), design/COMPONENTS.md.
Contract (nav-lint): edge targets exist; screens reachable from an entry per platform;
accepted screens have specs; no literal colors/fonts outside tokens.json.
Rationale: a broken link is an edge to a nonexistent node — graph form makes it lintable;
values and flows change at different cadence. Source: board session 2026-07-04.
