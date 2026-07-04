---
name: design-before-ui
description: Blocks UI implementation without settled design. Use before writing or modifying any screen, component, navigation, styling, or front-end code.
---

# Design before UI

Before writing UI code, check `design/NAV-GRAPH.md`:

1. The target screen has an SCR node with status **accepted** and a spec file
   `design/screens/SCR-<id>-<slug>.md`. If not → stop; route the design through
   `/round-table` (or draft the spec and get it accepted) first.
2. Quote the spec's layout/states/components into the task context before coding.
3. Navigation you add must already exist as an edge in NAV-GRAPH.md — adding a
   link the graph doesn't have means the graph changes first, then the code.
4. Colors, fonts, spacing, radii, motion come ONLY from `design/tokens.json`
   references — never literals. Shared components come from design/COMPONENTS.md;
   new ones are added there first.

Done = `node tools/nav-lint.mjs` passes. It checks edge targets exist, screens
are reachable, accepted screens have specs, and no literal colors leaked.
