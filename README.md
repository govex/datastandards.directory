# Open Data Standards Directory

An inventory of open data standards — what they cover, who publishes them, and how
they measure up. A project of the [Center for Government Excellence (GovEx)](https://govex.jhu.edu)
at Johns Hopkins University, with [Geothink](https://geothink.ca) / McGill University
and the open data community.

This is a **static [SvelteKit](https://svelte.dev/docs/kit) site** — fully prerendered,
no backend — with each standard stored as a YAML file.

## Develop

```bash
npm install
npm run dev        # dev server
npm run build      # static build → build/
npm run preview    # serve the production build
npm run check      # svelte-check (TypeScript)
```

Requires Node 20+.

## Data

The catalog lives as one YAML file per standard in `src/lib/data/standards/`. That
is the source of truth — edit a file to change a standard.

To regenerate from a fresh database export (`standards-export.json` at the repo root):

```bash
npm run data:convert
```

## Contributing

Use the [issue forms](https://github.com/govex/datastandards.directory/issues/new/choose)
to add a standard, suggest an update, or send feedback. Accepted contributions become
YAML edits.

## Deployment

Static build deployed to GitHub Pages via GitHub Actions on every push to `main`.
See [`DEPLOY.md`](./DEPLOY.md). The retired legacy Express app is preserved on the
`legacy-heroku` branch and is no longer deployed.
