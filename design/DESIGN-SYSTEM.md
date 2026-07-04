# DESIGN-SYSTEM.md — Busy Office App

Slow-changing design truth. Values live in tokens.json (single source);
this file explains intent. Screen flows live in NAV-GRAPH.md; per-screen
detail in screens/. Never restate token values here in prose.

## Concept

Calm control room. The app is where a human supervises AI work and makes
audited decisions — clarity and trust over decoration. Dense but legible;
every element on screen maps to a real event or decision (PRN-07 applies
to pixels too).

## Voice & principles

- Legible to non-engineers: no raw JSON on primary surfaces; plain-language
  event descriptions from the adapter's cooked types.
- Decision-first: pending gates are always one interaction away.
- Evidence beside every ask: a gate never appears without its context.
- Audit visible: decided things show who/when/why, immutably.

## Layout rules

- Web: left nav rail (Dashboard / Gates / Decisions / Plan / Graph / Settings),
  content pane, right inspector card (the Wave-2 inspector pattern carries over).
- Mobile: bottom tab bar (Dashboard / Gates / Settings); gate detail is a
  full-screen push; decision requires an explicit confirm step.
- All spacing/typography/color from tokens.json — nav-lint + ui-lint reject literals.
- Mobile Web is the responsive Web App (ADR-09): every web-tagged screen must be
  usable at 380px and 1280px — enforced by the generated flow tests, not aspiration.

## Accessibility

- WCAG AA contrast minimum for all token pairs (checked when tokens change).
- Gate decisions operable by keyboard alone on web.
- Status never conveyed by color alone (icon + label).

## Platform deltas

Record intentional web/mobile differences here as they are decided (OQ-03
owns the parity policy). Anything not listed is assumed identical.
