# Open Data Standards Directory — legacy application (archived)

This branch (`legacy-heroku`, formerly `master`) preserves the original
**Node.js / Express + PostgreSQL** application that powered
https://datastandards.directory until its 2026 migration. It rendered
Jade/Pug templates server-side and was deployed on **Heroku**.

> ⚠️ **Archived — no longer deployed.** The live site is now a static
> [SvelteKit](https://svelte.dev/docs/kit) build served from **GitHub Pages**
> on the [`main`](../../tree/main) branch. This branch is kept for historical
> reference only; do not deploy from it. The Heroku app and its database can be
> decommissioned.

## What lived here

- `app.js`, `bin/www`, `routes/`, `queries.js` — Express server + PostgreSQL access
- `views/*.jade` — server-rendered templates
- `public/` — client JavaScript (jQuery) and SASS styles

The catalog data was migrated to per-standard **YAML** files under
`src/lib/data/standards/` on `main`. See `DEPLOY.md` on `main` for the current
architecture and deployment.
