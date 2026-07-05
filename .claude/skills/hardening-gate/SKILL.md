---
name: hardening-gate
description: Wave-exit quality gate. Use when the user types /hardening-gate, a wave or phase completes, or before merging substantial work.
owner: chief-architect
updated: 2026-07-05
decided-by: ADR-07
---

# Hardening Gate

Run in order; any Blocker fails the gate.

1. **Mechanical:** `node tools/graph-lint.mjs && node tools/nav-lint.mjs && node tools/ui-lint.mjs`
   plus `node --check` on changed .mjs/.js files. Run via the verifier agent when
   available (ADR-08: no self-verification).
2. **Review dimensions** (each finding: severity Blocker/Major/Minor · location
   · what · proposed fix):
   - **Design conformance** — code matches the graph and `graph/flows/` trees;
     drift is a finding even when the code works. Flow mismatch = Blocker.
   - **DRY / single source of logic** — a rule living in two places is a
     finding even if both copies are correct.
   - **No guessed dependencies** — every table/field/API traces to a confirmed
     fact (rule-zero); untraceable = Not Confirmed = Blocker.
   - **Regression safety** — stated invariants still hold.
3. **Triage:** must-fix (security/correctness) · evidence-gated (perf findings
   need a measured hotspot — premature optimization is itself a finding) ·
   advisory (idiom/refactor).
4. **UI design review** (ADR-11, when screens changed — reviewer agent): screenshot
   each changed screen in every state its SCR spec declares; review against the
   spec's layout/states/components + DESIGN-SYSTEM a11y rules. Cite the spec section
   per finding AND per pass — bare "looks consistent" is a protocol violation.
   Web screens: check at 380px and 1280px (ADR-09).
5. **Verdict:** Pass / Pass-with-fixes / Block. Fixes go through
   propose → confirm (human gate) → implement — the review proposes, it never
   silently rewrites. Advisory: keep a replaced old path runnable until
   variance vs the new path is explained or rejected.
