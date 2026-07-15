# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

The Open Data Standards Directory — an inventory of open data standards, operated by the Center for Government Excellence at Johns Hopkins University (with Geothink/McGill). This `master` branch is the **legacy Node.js/Express + PostgreSQL app** that renders Jade templates server-side. A separate effort to migrate to a static Jekyll site lives on the `origin/jekyll-migration` branch (see "Jekyll migration" below).

## Commands

- **Run the app:** `npm start` → serves on `http://localhost:3000` (`bin/www`, port from `$PORT` or 3000).
- **Live-reload during development:** the README's convention is to temporarily change the `start` script in `package.json` from `node` to `supervisor`, then run `npm start`. Revert it back to `node` before committing/pushing.
- No test, lint, or build step is configured (`npm test` is unset).

Requires Node `19.9.0` (see `engines`) and a reachable PostgreSQL database (see Database below).

## Architecture

Request flow: **`bin/www` → `app.js` (Express setup) → `routes/*.js` → `queries.js` (pg-promise) → PostgreSQL → Jade view in `views/`**.

- `app.js` is the real app module: registers the Jade view engine, serves `public/` as static assets, and mounts one router per top-level route (`/`, `/contribute`, `/contact`, `/glossary`, `/about`, `/categories`, `/api`, and the catch-all `get-data` on `/`). `server.js` is a broken/unused stub — ignore it; the entry point is `bin/www`.
- **`queries.js` is the entire data layer.** Every route delegates here. All read queries hardcode a `verified = 'Yes'` (or `lower(verified) = 'yes'`) filter — unverified rows are never served publicly. During row processing, any empty / `null` / `unsure` / `n/a` value is normalized to the string `"No information"`, and comma-separated `subcategory` strings are split into arrays. Replicate both behaviors when touching data output.
- Two parallel read paths exist for the same search input `:id`: `GET /data/:id` (via `get-data.js`) renders the `directory` view as HTML, while `GET /api/get/:id` returns JSON. `:id === 'all'` returns every standard; otherwise it's matched against `lower(name)||lower(category)||lower(subcategory)||lower(publisher) LIKE '%<input>%'`. `GET /keywords` feeds client-side autocomplete.
- Writes: `POST /api/add` (`createStandard`) inserts into the `standards` table; `POST /api/update` (`post`) inserts a contributor comment into the `posts` table. The full `standards` column set is enumerated in `createStandard` — it is the authoritative field list for a standard.
- Client-side behavior lives in `public/javascripts/` (search, autocomplete, sort, contribution posting). Styles are **SASS** under `public/stylesheets/` (including a vendored `bourbon` mixin library) — edit the `.sass` sources, not compiled CSS.

## Database

- Connection is built in both `queries.js` and (on the migration branch) the export script from either `DATABASE_URL` or the `DD_DB_USER` / `DD_DB_PASSWORD` / `DD_DB_HOST` / `DD_DB_PORT` / `DD_DB_NAME` env vars. `.env` (git-ignored, holds `DATABASE_URL`) is loaded via `dotenv` on the migration branch; the legacy app expects these vars already present in the environment.
- SSL is explicitly disabled (`pgp.pg.defaults.ssl = false`).
- `latest.dump` is a PostgreSQL dump of the data — use it to seed a local `standards`/`posts` database for development.
- Two tables: `standards` (the directory content) and `posts` (contributor submissions/comments).

## Jekyll migration (context, on `origin/jekyll-migration`)

The data is effectively static, so there's an in-progress migration to a Jekyll static site to drop the database and server. On `master`, `jekyll-site/` contains only build output (`_site/`) and vendored gems (`vendor/`) — the Jekyll *sources* live on the migration branch. That branch adds `export-to-jekyll.js`, which reads the Postgres `standards` table (verified only) and writes one YAML file per standard plus JSON search indexes, replacing server-side search with client-side JS. If asked to work on the static site, check out `origin/jekyll-migration` rather than working from `master`.
