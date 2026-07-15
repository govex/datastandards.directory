# Deployment

This is a static SvelteKit site (`@sveltejs/adapter-static`, fully prerendered)
deployed to **GitHub Pages** via GitHub Actions.

## ⚠️ Production safety

`master` is wired to **Heroku auto-deploy (production)** — there is no staging.
- All migration work lives on **`svelte-migration`**.
- The Pages workflow triggers on **`svelte-migration` only**, never `master`.
- **Do not merge to `master`** until DNS has moved off Heroku and Heroku
  auto-deploy is disabled — merging the static site to `master` would push a
  non-Node app to the Heroku dyno and break the live site.

## How it deploys

`.github/workflows/deploy.yml` runs on every push to `svelte-migration`:
`npm ci` → `npm run build` → upload `build/` → `actions/deploy-pages`.

One-time repo setup: **Settings → Pages → Build and deployment → Source =
"GitHub Actions"**.

The data is committed as YAML (`src/lib/data/standards/`), so CI does **not**
run the converter. To regenerate data from a fresh DB export, run
`npm run data:convert` locally and commit the result.

## Cutover checklist (order matters)

1. **Preview.** Push `svelte-migration`; the workflow publishes to the
   `*.github.io` Pages URL. Review everything there. Do **not** add the CNAME
   yet — a custom domain would 301 the github.io URL to a domain still pointing
   at Heroku and break the preview.
2. **Verify** on github.io: deep links (`/standards/<slug>`), 404 page,
   search/filter, responsive layouts, issue-form links.
3. **Go live on the custom domain:**
   - `git mv deploy/CNAME static/CNAME` and push (adapter-static copies it into
     `build/`, so Pages keeps the domain across deploys).
   - Point DNS for `datastandards.directory` at GitHub Pages (apex `A`/`ALIAS`
     records + `www` `CNAME`), moving it off Heroku.
   - Settings → Pages → set the custom domain and enable **Enforce HTTPS**.
4. **Decommission Heroku:** disable auto-deploy (or delete the app) so a later
   `master` push can't resurrect/break production. Only then is it safe to
   fast-forward `master` to the migration branch, if desired.
