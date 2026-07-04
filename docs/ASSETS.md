# ASSETS-REPO.md — spec for the public design assets repo (MOD-ASSETS)

Decision: ADR-03. Principle: PRN-08 (pinned references).

## Repo
Name suggestion: `busy-office-assets` (public). Generic enough to serve the
engine's other projects later (fits the framework-as-product direction).

## Structure
```
icons/          # vendored UI icon set (recommend Lucide, MIT) — copied in, not linked
logos/          # brand/tech logos for reference boards (e.g. from svgl.app)
palette/        # exported swatches matching tokens.json versions
inspiration/
  REFS.md       # annotated links: source, why it matters, date captured
LICENSES.md     # one entry per vendored asset: source, license, retrieved date
```

## Rules
1. **Vendor, don't hotlink.** Assets are copied into the repo so builds never
   depend on a third-party site being up or unchanged.
2. **Pin, never HEAD.** Consumers (tokens.json `assets.pin`, build scripts)
   reference a git tag or commit SHA. Updating is a deliberate sync commit,
   reviewed like any change.
3. **License per asset.** Nothing enters without a LICENSES.md entry.
   - UI icons: MIT/ISC sets only (Lucide, Heroicons) — shippable in product.
   - Brand logos (svgl.app etc.): trademarked — reference/inspiration only,
     never shipped inside Busy Office UI. LICENSES.md marks these `ref-only`.
4. **Inspiration is annotated.** A bare URL list rots; every REFS.md entry
   says what to look at and why, so agents can use it without re-research.

## Consumption
Agents resolve assets by raw.githubusercontent.com URL at the pinned SHA, or
via git submodule pinned to a tag — sponsor's choice; record it as an ADR when
the repo is created.
