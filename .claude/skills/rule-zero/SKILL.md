---
name: rule-zero
description: No-guessing discipline. Use whenever stating a table, field, API, file path, config, version, or business rule that has not been verified in this session.
owner: chief-architect
updated: 2026-07-05
decided-by: ADR-07
---

# Rule Zero — no guessing

If anything is unknown, unclear, or unconfirmed, do NOT guess. In order:

1. **Verify** against a trustworthy source (official docs, the graph, uploaded
   ground truth). State the source.
2. **Read it** from the codebase if the artifact exists. Never invent a name,
   field, signature, or rule that can be read.
3. **Neither possible → STOP and ASK.** Label it `Not Confirmed`, explain why
   it matters, add it as an OQ node with an owner. Do not pass the current gate.

"I'll assume X and fix later" is a guess — instead, park X as an OQ and work
what is confirmed. A confident wrong object name is the most expensive failure
possible. Confirmed facts are written to the graph (with source + date in the
shard) so they are never re-litigated; changed facts go through supersede,
never silent rework. Sibling rule PRN-11 (think once, code once): confirmed
facts and a settled design come BEFORE code in src/ — spikes are evidence, not merges.
