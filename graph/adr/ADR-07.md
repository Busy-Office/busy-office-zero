id: ADR-07
status: accepted
title: Engine as skills
owner: chief-architect
updated: 2026-07-05

Context: shipped only as one master prompt, the engine is the "process-owning
framework" pattern the reference repos warn against; skills are the native load
mechanism for coding agents.
Decision: the engine text stays VERBATIM and UNMODIFIED at
.claude/skills/round-table/references/ENGINE.md — per its own reuse rule ("no
edits to this file"; project machinery-configuration belongs in the graph).
Operational disciplines are decomposed into 6 composable skills in .claude/skills:
round-table (user-invoked, wraps the engine), design-graph, rule-zero,
design-before-ui (model-invoked), hardening-gate, replan (user-invoked).
Project-side amendments the engine doesn't contain live in the CHARTER + skills:
hydration discipline (index at load, shards on demand — ADR-04), conformance
checks before session close (CHARTER names graph-lint + nav-lint), sharded memory
layout. Skill style per iliaal standards: <1K tokens, references/ sidecar,
front-loaded rules, keyword-rich descriptions. External skills pulled + pinned
per docs/SKILLS.md (mattpocock/skills, iliaal/ai-skills, Graphify-Labs/graphify).
Each skill must work standalone (composability test). Public skill-pack
extraction: OQ-01.
Sources: github.com/mattpocock/skills, github.com/iliaal/ai-skills,
github.com/Graphify-Labs/graphify — reviewed 2026-07-04.
