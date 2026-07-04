id: ADR-09
status: accepted
title: Platform policy (Mobile Web = responsive Web App)

Context: sponsor named three surfaces (Mobile App, Mobile Web, Web App); NAV-GRAPH
models two platform tags (web|mobile|both).
Decision: Mobile Web is the responsive face of the Web App — one codebase, same
`web` tag. Teeth (QA condition): generated flow tests run every web-tagged screen at
BOTH 1280px and 380px viewports; unusable-at-380px is a failing test, not a note.
The native/installed app remains the separate `mobile` platform tag (nav rail vs tab
bar divergence already modeled). Only a genuinely divergent flow would ever justify a
third tag — that would be a new ADR.
Consequences: closes OQ-02; test matrix stays 2 platforms x N screens; DESIGN-SYSTEM.md
gains the viewport rule. Source: board decision session, 2026-07-04.
