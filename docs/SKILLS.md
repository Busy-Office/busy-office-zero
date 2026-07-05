owner: chief-architect
updated: 2026-07-05
decided-by: ADR-07

# SKILLS.md — AI skills for this project

Two sources of skills: **project-local** (this repo, `.claude/skills/`,
auto-discovered by Claude Code) and **external** (pulled from public repos
below). External skills follow PRN-08: pin to a tag or commit SHA, never HEAD;
record the pin here when you install.

## Project-local skills (the engine)

| Skill | Invoke | Purpose |
|---|---|---|
| round-table | `/round-table <topic>` | Convene the ARB for any unsettled design choice (full engine: `references/ENGINE.md`) |
| design-graph | model-invoked | Index+shards memory discipline, challenge gate, GRAPH DELTA |
| rule-zero | model-invoked | No guessing: verify → read → ask |
| design-before-ui | model-invoked | Blocks UI code without accepted SCR + token-only styling |
| hardening-gate | `/hardening-gate` | Wave-exit review: lints + conformance/DRY/no-guess dimensions + triage |
| replan | `/replan` | Continuous re-planning with L0/L1/L2 blast-radius triage |

## External skill sources (pull as needed)

### 1. mattpocock/skills — workflow discipline
https://github.com/mattpocock/skills/tree/main
Small, composable engineering-workflow skills (user-invoked vs model-invoked
taxonomy). Relevant pulls for this project: `tdd` (red-green feedback loops for
src/), `code-review` (two-axis diff review — complements /hardening-gate),
`grill-with-docs` (domain-language building — feeds the graph Glossary),
`handoff` (cross-session continuity). Install per-skill; pin the repo tag.

### 2. iliaal/ai-skills — curated collection + skill-writing standards
https://github.com/iliaal/ai-skills
Curated agent skills for coding assistants. Also the style guide our local
skills follow: <1K tokens per SKILL.md (2K hard cap), references/ sidecar for
depth, front-loaded rules, every "don't" paired with a "do", keyword-rich
descriptions under 80 tokens.

### 3. Graphify-Labs/graphify — code-truth knowledge graph
https://github.com/Graphify-Labs/graphify
Turns a codebase into a queryable knowledge graph. **Complementary, not
competing**: Graphify answers "what does the code do" (extracted, mechanical);
our DESIGN-GRAPH answers "what did we decide, under which principles, approved
by whom" (curated, governed). Optional pull once src/ has substance — useful
for impact analysis at the code level feeding the ARB's step-2 boundary checks.

## Installed pins (update on every install)

| Skill / repo | Pin (tag or SHA) | Date | Installed by |
|---|---|---|---|
| — none yet — | | | |
