# NAV-GRAPH.md — Busy Office App navigation truth

Same discipline as DESIGN-GRAPH.md: nodes + edges, IDs permanent, supersede
never delete. This file is machine-checked by tools/nav-lint.mjs at every
hardening gate (PRN-06).

Contract enforced by nav-lint:
1. Every edge endpoint must be a declared SCR node.
2. Every SCR node must be reachable from an `entry` node on its platform.
3. Every SCR node must have a spec file design/screens/SCR-<id>-<slug>.md
   whose outbound links agree with this graph.
4. No literal colors/fonts in screen specs — tokens.json references only.

Node line:  SCR-<nn> | <slug> | <platform: web|mobile|both> | <entry|screen|modal> | <status> | summary
Edge line:  SCR-<from> --<action>--> SCR-<to> | <platform> | trigger (short)

## NODES

SCR-01 | dashboard | both | entry | accepted | Live feed overview: active agents, wave status, pending gates count
SCR-02 | gate-inbox | both | screen | accepted | Pending human gates list; approve/reject with audit trail
SCR-03 | gate-detail | both | screen | accepted | Single gate: context, diff/evidence, decision + reason field
SCR-04 | decision-log | web | screen | accepted | Append-only audit log of gate decisions, filterable
SCR-05 | replan-view | web | screen | proposed | Current plan, triage tier, replan history (ADR-05 replan discipline)
SCR-06 | design-graph-view | web | screen | proposed | Rendered DESIGN-GRAPH nodes/edges, impact walk
SCR-07 | settings | both | screen | proposed | Tokens, feed endpoint, auth

## EDGES

SCR-01 --open-gates--> SCR-02 | both | tap pending-gates badge
SCR-02 --open-gate--> SCR-03 | both | select gate row
SCR-03 --decide-return--> SCR-02 | both | after approve/reject submit
SCR-01 --open-log--> SCR-04 | web | nav: Decisions
SCR-01 --open-replan--> SCR-05 | web | nav: Plan
SCR-01 --open-graph--> SCR-06 | web | nav: Graph
SCR-01 --open-settings--> SCR-07 | both | nav: Settings
SCR-04 --open-gate--> SCR-03 | web | click decision row (read-only mode)
