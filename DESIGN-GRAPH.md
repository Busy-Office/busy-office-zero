owner: chief-architect
updated: 2026-07-05
decided-by: ADR-04

# DESIGN-GRAPH.md — Busy Office (founded from zero, 2026-07-04)

## CHARTER

Busy Office is an auditable operating system for hybrid AI+human software teams.
Two products, one pattern:

1. **The Engine**: project-agnostic governance machinery. Canonical text —
   VERBATIM, never edited per its own reuse rule:
   `.claude/skills/round-table/references/ENGINE.md`. Operational disciplines
   ship as composable AI skills in `.claude/skills/` (round-table ARB, graph
   memory, rule zero, design-before-ui, hardening gate, replan). Public
   skill-pack extraction is OQ-01.

   Project-side machinery configuration (engine Part F rule 1 applies as
   written; these refine it for this project): load the graph INDEX only at
   session start; hydrate `graph/` shards on demand (ADR-04); before any
   session closes, the conformance checks below must pass — a failing check
   blocks the GRAPH DELTA.
2. **The App**: a monitoring/live-ops platform for AI+human teams built on the
   engine — STATE-FEED telemetry, audited human gate inbox, decision log,
   replan view. The reference implementation; code grows from zero in `src/`.

Parked idea (not retired — never built here): an optional 2D "office" renderer.
If ever built, it attaches read-only via the STATE-FEED envelope (PRN-07).

Scale range: single sponsor + agent roster → multi-team installs. Every decision
states behavior at both ends.

Kernel: `src/contracts/` — domain model, EVENT_TO_STATE, gate contract, actor
roles, STATE-FEED envelope. A product with published contracts (KRN-01).

Conformance checks (run before any session closes or wave exits):
`node tools/graph-lint.mjs && node tools/nav-lint.mjs && node tools/ui-lint.mjs`

Execution agents (distinct from Part B board roles, which are design-time
personas): defined in `.claude/agents/`, hired only via ADR, each bound to a
gate with PRN bindings stated; no agent verifies or reviews its own output
(ADR-08). Platform policy: Mobile Web is the responsive face of the Web App —
web-tagged screens must pass at 380px and 1280px viewports (ADR-09).

Memory layout: index + shards per
`.claude/skills/design-graph/references/MEMORY-LAYOUT.md` (ADR-04).

Domain Expert rotation set: Orchestration (agent runtimes), Live-ops/Monitoring,
Design Systems. Roster: Part B default bench of ENGINE.md; named agents join as
hired (model tiering: Opus seniors, Sonnet builders, Haiku verification).

Doc Owner roster (ADR-12): Chief Architect, PM, Product Design Manager, UX/UI
Designer. Every governed doc carries `owner`/`updated` (+ optional
`decided-by`) front-matter; graph-lint enforces presence and staleness.

External skills: pulled per `docs/SKILLS.md`, pinned per PRN-08.

## NODES

PRN-01 PRN | Contract decoupling | accepted | Components talk only via published contracts in src/contracts; no shared internals
PRN-02 PRN | Audited human authority | accepted | Every human gate decision is token-authed, append-only logged, idempotent
PRN-03 PRN | Raw-vs-cooked honesty | accepted | Adapter heuristics fire only on raw events; cooked types pass through untouched
PRN-04 PRN | Graph as truth | accepted | This index settles conflicts; supersede, never delete; IDs permanent
PRN-05 PRN | Mechanical enforcement | accepted | Governance rules are enforced by gates+lints+skills, not exhortation
PRN-06 PRN | Design-before-build | accepted | No UI code without an accepted SCR node; nav-lint passes at wave exits
PRN-07 PRN | View-agnostic telemetry | accepted | STATE-FEED envelope is the only path to any renderer
PRN-08 PRN | Pinned references | accepted | External assets and skills consumed by tag/SHA, never HEAD; licenses recorded
PRN-09 PRN | No guessing | accepted | Verify → read → ask; Not Confirmed becomes an OQ node (enforced by rule-zero skill)
PRN-10 PRN | Fact provenance | accepted | Confirmed facts carry source+date in shards; changes via supersede
PRN-11 PRN | Think once, code once | accepted | No code lands in src/ for a component whose design isn't settled (accepted node); decision → graph → code; spikes are evidence, never merged
PRN-12 PRN | Design-derived verification | accepted | UI flow tests are GENERATED from design/NAV-GRAPH.md — never hand-written duplicates; one source, no drift
KRN-01 KRN | contracts | proposed | Domain model, EVENT_TO_STATE, gate contract, roles, STATE-FEED envelope
MOD-FEED MOD | Feed service | proposed | SSE live feed + adapter (raw→cooked) honoring PRN-03
MOD-GATE MOD | Human gate | proposed | POST /gate, audit log, idempotency, approve/reject surfaces
MOD-GOV MOD | Governance layer | proposed | Replan loop, L0/L1/L2 triage, round-table Gate 0 wiring
MOD-APP MOD | App shell | proposed | Web+mobile surfaces per design/NAV-GRAPH.md
MOD-ASSETS MOD | Public assets repo | proposed | Vendored+pinned icons/logos/palette per docs/ASSETS.md
ADR-01 ADR | Product charter | accepted | Engine+App; governance positioning (never "knowledge graph"); office renderer parked
ADR-02 ADR | Design contract set | accepted | design/ split: system+tokens+NAV-GRAPH+screens+components; nav-lint enforced
ADR-03 ADR | Assets repo policy | accepted | Public repo, vendored+pinned, per-asset licenses; brand logos ref-only
ADR-04 ADR | Memory layout | accepted | Index+shards; edges index-only; 200-line cap; graph-lint enforced
ADR-05 ADR | Governance disciplines | accepted | Rule zero, provenance, logicflow trees, review dimensions; confirm≡gate event
ADR-06 ADR | Root contract v2 | accepted | Root = README+CLAUDE+DESIGN-GRAPH + .claude/graph/design/docs/src/tools; lint-enforced
ADR-07 ADR | Engine as skills | accepted | Engine decomposed into 6 composable skills in .claude/skills; ENGINE.md canonical reference
ADR-08 ADR | Agent model | accepted | 3 execution agents (Builder/Verifier/Reviewer) in .claude/agents; hiring-is-an-ADR; PRN bindings stated; no self-review
ADR-09 ADR | Platform policy | accepted | Mobile Web = responsive Web App; one codebase; web screens tested at 380px + 1280px; app remains separate platform tag
ADR-10 ADR | Test strategy | accepted | Kernel contract tests first; flow tests generated from NAV-GRAPH (PRN-12); targeted unit tests; tooling parked to MOD-APP session
ADR-11 ADR | UI design review | accepted | Mechanical ui-lint over src/ + Reviewer screenshot pass per SCR state with cite-the-spec rule, at hardening gate
ADR-12 ADR | Documentation governance | accepted | Owner+updated front-matter on every governed doc; owner roster in CHARTER; graph-lint gains owners+staleness checks; DOC DELTA session-close ritual alongside GRAPH DELTA
OQ-01 OQ | Skill-pack extraction | open | owner: PM — when/how to publish skills as a public versioned repo (after they prove out here)
OQ-02 OQ | Web/mobile parity | superseded | closed by ADR-09 — responsive web; per-flow divergence stays modeled by NAV-GRAPH platform tags
OQ-03 OQ | Visual identity | open | owner: Product Design Manager — logo + real palette (tokens.json holds placeholders)
OQ-04 OQ | Test tooling + screenshot baselines | open | owner: QA/Test Architect — flow-test runner, viewport harness, baseline storage; decided inside the MOD-APP design session
OQ-05 OQ | Automated doc-date sourcing | open | owner: Platform/DevOps — replace manually-typed `updated:` front-matter with a git-hook-sourced date once a CI pipeline exists (ADR-10 parked CI generally)

## EDGES

MOD-FEED --depends-on--> KRN-01 | envelope + EVENT_TO_STATE
MOD-GATE --depends-on--> KRN-01 | gate contract + roles
MOD-APP --depends-on--> MOD-FEED | renders live feed
MOD-APP --depends-on--> MOD-GATE | gate inbox + decisions
MOD-GOV --constrains--> MOD-GATE | Gate 0 + triage shape gate flow
PRN-07 --constrains--> MOD-APP | any renderer attaches read-only via envelope
PRN-03 --constrains--> MOD-FEED | adapter honesty rule
MOD-APP --decided-by--> ADR-02 | UI truth lives in design/ contract set
MOD-ASSETS --decided-by--> ADR-03 | pinning + licensing policy
PRN-05 --validates--> ADR-04 | graph-lint at hardening gate
PRN-05 --validates--> ADR-06 | root hygiene is a lint check
PRN-05 --validates--> PRN-06 | nav-lint at hardening gate
PRN-08 --constrains--> MOD-ASSETS | no HEAD-tracking of external assets
PRN-08 --constrains--> ADR-07 | external skills pinned per docs/SKILLS.md
PRN-09 --constrains--> MOD-GOV | Gate 0 blocks build on Not Confirmed facts
PRN-10 --constrains--> ADR-04 | provenance lives in shards, never the index
PRN-11 --constrains--> KRN-01 | kernel code waits for its design session
PRN-05 --validates--> PRN-11 | Gate 0 + hardening-gate conformance check enforce the ordering
ADR-09 --supersedes--> OQ-02 | parity question settled: responsive web
ADR-08 --constrains--> MOD-GOV | gates are owned by named agents; no self-review
PRN-12 --validates--> ADR-10 | generated flow tests are the mechanism
ADR-10 --constrains--> KRN-01 | contract tests are the kernel's definition of done
ADR-10 --constrains--> MOD-APP | flow-test generator + tooling built in the MOD-APP wave
ADR-11 --constrains--> MOD-APP | screenshot matrix = SCR spec states
PRN-05 --validates--> ADR-11 | ui-lint is the mechanical half of design review
ADR-12 --validates--> PRN-05 | doc ownership/freshness enforced mechanically, not by convention
ADR-12 --constrains--> ADR-04 | staleness-lint reuses shard provenance dates (PRN-10) as the freshness source of truth
ADR-12 --constrains--> ADR-06 | docs/OWNERS.md is a new file under the already-permitted docs/ path, no root-contract change needed
