# Deployment

This is a static SvelteKit site (`@sveltejs/adapter-static`, fully prerendered)
deployed to **GitHub Pages** via GitHub Actions.

## Current state

The migration is live: `datastandards.directory` is served by GitHub Pages from
the **`main`** branch (apex DNS already points at the Pages IPs). The retired
legacy Node/Express + PostgreSQL app is preserved on the **`legacy-heroku`**
branch and is no longer deployed.

## How it deploys

`.github/workflows/deploy.yml` runs on every push to `main`:
`npm ci` → `npm run build` → upload `build/` → `actions/deploy-pages`.

One-time repo setup: **Settings → Pages → Build and deployment → Source =
"GitHub Actions"**.

The data is committed as YAML (`src/lib/data/standards/`), so CI does **not**
run the converter. To regenerate data from a fresh DB export, run
`npm run data:convert` locally and commit the result.

## Custom domain

`static/CNAME` contains `datastandards.directory`; adapter-static copies it into
`build/` so Pages keeps the apex domain across deploys. The domain is verified
for the `govex` org and attached to this repo's Pages site. Enable **Enforce
HTTPS** in Settings → Pages once the certificate has provisioned.

## Remaining cleanup

- **Decommission the Heroku app** (the `legacy-heroku` branch is no longer
  deployed anywhere; the old dyno/database can be shut down).
- The `legacy-heroku` branch is kept for historical reference only.
