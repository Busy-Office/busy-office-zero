id: ADR-10
status: accepted
title: Test strategy

Decision (pyramid, in build order):
1. Kernel contract tests — KRN-01's definition of done. PRN-03 is literally a test:
   cooked event in, byte-identical out. Gate idempotency (PRN-02) likewise.
2. Generated flow tests (PRN-12) — a generator walks design/NAV-GRAPH.md and asserts
   against the running app: every accepted SCR has a live route; every edge's trigger
   navigates to its declared target; no undeclared navigation exists. Web screens run
   at 380px + 1280px (ADR-09). Structure and flow only — never pixels.
3. Targeted unit tests — where business logic lives (TDD via the pulled tdd skill);
   minimal for UI components.
Caveats (Skeptic, recorded): generated tests only assert what the graph knows — they
prove flow conformance, NOT visual correctness; that is ADR-11's job. Generator code
is NOT built yet — MOD-APP is undesigned (PRN-11); strategy now, tooling in the
MOD-APP session (OQ-04). All suites gate at /hardening-gate.
Source: board decision session, 2026-07-04.
