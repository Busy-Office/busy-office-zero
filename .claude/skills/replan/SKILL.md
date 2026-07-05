---
name: replan
description: Continuous re-planning with blast-radius triage. Use when the user types /replan, scope changes, a gate decision invalidates a plan, or new facts contradict the current plan.
owner: chief-architect
updated: 2026-07-05
decided-by: ADR-07
---

# Replan

1. Name the trigger (new fact, gate rejection, scope change, failed gate).
2. **Triage blast radius:**
   - **L0** — local: one task/file affected. Adjust the task; note it in the
     wave log. No board.
   - **L1** — plan-level: sequencing, wave contents, or module interfaces move.
     Re-issue the plan slice; record an ADR if a decision changed.
   - **L2** — charter-level: principles, kernel contracts, or product scope
     move. STOP → `/round-table`; only the board changes L2 items.
3. Walk graph EDGES from the changed node to list what is impacted — never
   replan from recollection (design-graph skill).
4. Output: trigger · tier · impacted node IDs · revised plan slice · GRAPH
   DELTA if any node changed. Rule-zero applies: unknowns become OQs, not
   assumptions baked into the new plan.
