id: ADR-11
status: accepted
title: UI design review

Context: design-before-ui blocks unspecified screens BEFORE code; nav-lint checks the
design's internal consistency; nothing checked the BUILT screen against the spec.
Decision — split per PRN-05:
- Mechanical: tools/ui-lint.mjs over src/ (stack-neutral, buildable now): rejects
  literal hex/rgb colors and font-family literals that bypass design/tokens.json.
  Joins the conformance-check set (graph-lint && nav-lint && ui-lint).
- Judgmental: Reviewer agent screenshot pass — the SCR spec's states list IS the
  screenshot matrix (loading/ready/error/...); reviewed against the spec's
  layout/states/components sections + DESIGN-SYSTEM a11y rules. Cite-the-spec rule:
  every finding or pass cites the spec section — bare "looks consistent" is the
  visual "sounds good" and is a protocol violation.
Known limits (Skeptic, recorded): ui-lint cannot catch wrong-but-tokenized usage
(color.reject on an approve button) — that is the judgmental half's job. Screenshot
baselines (diff against first approved state) are part of OQ-04 tooling.
Source: board decision session, 2026-07-04.
