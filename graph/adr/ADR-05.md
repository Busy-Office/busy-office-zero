id: ADR-05
status: accepted
title: Governance disciplines (merged from sponsor's Governed Delivery prompt)

Adopted, and where each lives:
- Rule Zero no-guessing -> PRN-09 + rule-zero skill (verify -> read -> ask; Not
  Confirmed becomes an OQ).
- Think Once, Code Once -> PRN-11 + CLAUDE.md non-negotiable: no code lands in src/
  for a component whose node isn't accepted; decision -> graph -> code; spikes are
  session evidence, never merged.
- Fact provenance -> PRN-10: confirmed facts carry source+date in shards; changes
  via supersede, never silent rework.
- Logicflow trees -> graph/flows/FLOW-<MOD>.md: every branch states condition +
  fallback; code must match the tree; mismatch = hardening-gate Blocker.
- Code-review dimensions -> hardening-gate skill: design-conformance drift, DRY
  single-source-of-logic, no guessed dependencies, regression safety; verdict
  Pass / Pass-with-fixes / Block; review proposes, never silently rewrites.
- Propose->Confirm->Implement -> recorded as equivalent to the human-gate flow
  (confirm IS a gate event through MOD-GATE), not a new loop.
- Final-say escalation -> conflicts route to the specialist with authority for
  that domain; Chair records the resolution.
- Advisory: keep a replaced old path runnable until variance is explained or
  rejected (reversible refactor over big-bang).

Skipped: process-only Orchestrator seat (Chair + Gate 0 suffice at one-sponsor
scale; revisit if roster grows); SAP-flavored phase table (waves + hardening-gate
exits cover the lifecycle).
Source: sponsor-provided Governed Delivery master prompt, 2026-07-04.
