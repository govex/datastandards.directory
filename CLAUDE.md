# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

The Open Data Standards Directory — an inventory of ~69 open data standards, operated by the Bloomberg Center for Government Excellence at Johns Hopkins University (with Geothink / McGill). This `main` branch is a **static SvelteKit site** (fully prerendered, deployed to GitHub Pages at `datastandards.directory`) that replaced the legacy Node/Express + PostgreSQL app. The retired Express app is preserved on the **`legacy-heroku`** branch (formerly `master`, once auto-deployed to Heroku) — it is no longer deployed.

## Commands

- `npm run dev` — dev server (Vite).
- `npm run build` — static build to `build/` (adapter-static, prerenders every route).
- `npm run preview` — serve the production build locally.
- `npm run check` — `svelte-kit sync` + `svelte-check` (TypeScript). Use this as the type gate.
- `npm run data:convert` — regenerate the per-standard YAML from `standards-export.json` (see Data).

Requires Node 20+.

## Architecture

**Data is the source of truth as YAML, loaded at build time — there is no runtime backend.**

- **Data pipeline:** `standards-export.json` (a one-time DB export, kept at repo root) → `scripts/json-to-yaml.mjs` normalizes it into one file per standard under `src/lib/data/standards/<slug>.yaml`. Normalization: `"Yes"/"No"` → booleans; the `"No information"` sentinel / blanks → omitted keys; `provider_list` (pipe-delimited) → `providers[]`; `tags` (`key:value|…`) → grouped object over 5 keys; metrics grouped with their `rationale`/`indicators`. Editing a standard = editing its YAML (or accepting a contribution issue and committing the change). The converter only runs locally; CI builds from the committed YAML.
- **Loader:** `src/lib/data/standards.ts` reads every YAML via `import.meta.glob(..., { query: '?raw', eager: true })` + `js-yaml`, coerces to the `Standard` type (`src/lib/types.ts`), and exports `standards`, `bySlug`, `searchText()`, and `categoryTree()`. Nothing ships to the client except data referenced by a rendered page (Vite inlines/tree-shakes).
- **Routes** (all prerendered; `prerender = true` in `src/routes/+layout.ts`): `/` (home), `/standards` (browse), `/standards/[slug]` (detail — `entries()` enumerates all 69 slugs), `/categories`, `/glossary`, `/about`, `/contribute`. `404.html` is the fallback.
- **Search/filter** (`/standards`): in-memory over the full dataset (no search library — 69 records). The **URL query is the source of truth** (`?q=&category=&stage=&m=`) via shallow `replaceState`, giving shareable links + back/forward. Reading `searchParams` is guarded behind `browser` because SvelteKit forbids it during prerender (the base page prerenders showing all standards).

## Symbology & styling

- **Metric system** is the core symbology. `src/lib/metrics.ts` defines the 9 metrics (order, label, icon, glossary text) + helpers; `src/lib/icons.ts` holds inline SVGs (Feather-style, replacing the Font Awesome webfont). Rendered by `MetricIcons.svelte` (compact row) and `MetricList.svelte` (full, with rationale). Semantic colors: yes `#619e81`, no `#990033`, unknown grey — tokens `--metric-*`.
- **Curated homepage grid** (`src/lib/curatedCategories.ts` + `CategoryGrid.svelte`) preserves the 10 legacy PNG category icons. It is **intentionally decoupled** from the 11 real data categories; each card deep-links to a `/standards?q=` search. Images live in `static/images/`.
- **Design tokens** are CSS custom properties in `src/app.css` (legacy palette as accents over a modern neutral base). Interactive fills that carry white text use `--interactive` (`#39787d`) for AA contrast — do not use the lighter `--brand-teal` for white-on-color text.

## Contributions

No backend: Add/Update/Contact are **GitHub Issue Forms** (`.github/ISSUE_TEMPLATE/*.yml`). Site buttons deep-link via `issueForm` helpers in `src/lib/nav.ts` (the detail-page "update" link prefills the standard name). Accepted issues become YAML edits.

## Deployment

Static build → GitHub Pages via `.github/workflows/deploy.yml` (triggers on `main` only). Custom domain served from the apex, so `paths.base` is empty. The `CNAME` is staged at `deploy/CNAME` and only moved into `static/` at cutover — see `DEPLOY.md` for the full ordered checklist.
