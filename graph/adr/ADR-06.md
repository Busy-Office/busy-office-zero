id: ADR-06
status: accepted
title: Root contract v2
owner: chief-architect
updated: 2026-07-05

Decision: root holds exactly README.md (humans), CLAUDE.md (agents), DESIGN-GRAPH.md
(index), and .claude/ graph/ design/ docs/ src/ tools/ (+ Node/git residents allowlist).
DESIGN-GRAPH.md stays at root — the engine names it; discoverability is paramount.
CLAUDE.md at root follows Claude Code convention (auto-read repo rules).
Enforcement: graph-lint root-hygiene check. archive/ is allowlisted, created only when
something is first retired. Source: sponsor concern + board revision, 2026-07-04.
