#!/usr/bin/env node
/**
 * One-time (repeatable) conversion: standards-export.json -> per-standard YAML.
 *
 *   npm run data:convert
 *
 * Reads the DB export at the repo root and writes one normalized YAML file per
 * standard into src/lib/data/standards/<slug>.yaml. Safe to re-run (overwrites).
 *
 * Normalization:
 *  - "Yes"/"No" boolean-ish fields -> true/false; "No information"/blank -> null
 *  - text fields equal to the "No information" sentinel (or blank) -> key omitted
 *  - provider_list (pipe-delimited) -> providers: sorted, de-duped, trimmed array
 *  - tags (key:value|... ) -> grouped object keyed by the 5 known tag keys
 *  - metric value + its rationale/indicator grouped under `metrics`
 *  - dates and version kept as strings (js-yaml auto-quotes so they round-trip)
 */
import { readFileSync, writeFileSync, mkdirSync, rmSync, readdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import yaml from 'js-yaml';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const SRC = join(ROOT, 'standards-export.json');
const OUT_DIR = join(ROOT, 'src', 'lib', 'data', 'standards');

const MISSING = new Set(['', 'no information', 'unsure', 'null', 'n/a']);

/** Trimmed string, or null when blank / a "missing" sentinel. */
function text(v) {
	if (v == null) return null;
	const s = String(v).trim();
	return MISSING.has(s.toLowerCase()) ? null : s;
}

/** "Yes" -> true, "No" -> false, anything missing -> null. */
function bool(v) {
	const s = text(v);
	if (s == null) return null;
	const l = s.toLowerCase();
	if (l === 'yes') return true;
	if (l === 'no') return false;
	return null;
}

function slugify(name) {
	return String(name)
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-+|-+$/g, '');
}

/** pipe-delimited providers -> trimmed, de-duped, sorted array (or []). */
function providers(v) {
	const s = text(v);
	if (!s) return [];
	const seen = new Set();
	for (const part of s.split('|')) {
		const p = part.trim();
		if (p) seen.add(p);
	}
	return [...seen].sort((a, b) => a.localeCompare(b));
}

const TAG_KEYS = ['dataType', 'language', 'providerType', 'subject', 'keyword'];

/** "k:v|k:v" -> { k: [sorted unique v...] } over known keys; warns on unknowns. */
function tags(v) {
	const s = text(v);
	if (!s) return null;
	/** @type {Record<string, Set<string>>} */
	const groups = {};
	for (const pair of s.split('|')) {
		const idx = pair.indexOf(':');
		if (idx === -1) continue;
		const key = pair.slice(0, idx).trim();
		const val = pair.slice(idx + 1).trim();
		if (!key || !val) continue;
		if (!TAG_KEYS.includes(key)) {
			console.warn(`  ! unknown tag key "${key}" (value "${val}") — skipped`);
			continue;
		}
		(groups[key] ??= new Set()).add(val);
	}
	const out = {};
	for (const k of TAG_KEYS) {
		if (groups[k]?.size) out[k] = [...groups[k]].sort((a, b) => a.localeCompare(b));
	}
	return Object.keys(out).length ? out : null;
}

/** Drop null/undefined/empty-array/empty-object entries for tidy YAML. */
function compact(obj) {
	const out = {};
	for (const [k, val] of Object.entries(obj)) {
		if (val == null) continue;
		if (Array.isArray(val) && val.length === 0) continue;
		if (typeof val === 'object' && !Array.isArray(val) && Object.keys(val).length === 0) continue;
		out[k] = val;
	}
	return out;
}

// The 7 metrics that carry a paired *_rationale field.
const RATIONALE_METRICS = [
	'transferability',
	'stakeholder_participation',
	'consensus_government',
	'machine_readable',
	'human_readable',
	'requires_realtime',
	'metadata'
];

function buildMetrics(r) {
	const metrics = {};
	for (const key of RATIONALE_METRICS) {
		metrics[key] = compact({ value: bool(r[key]), rationale: text(r[`${key}_rationale`]) });
	}
	// `extensions` uses `indicators` instead of a rationale.
	metrics.extensions = compact({
		value: bool(r.extensions),
		indicators: text(r.extensions_indicators)
	});
	return metrics;
}

function normalize(r) {
	// Deliberate key order for readable, diff-friendly YAML.
	return compact({
		name: text(r.name),
		slug: slugify(r.name),
		category: text(r.category),
		subcategory: Array.isArray(r.subcategory) ? r.subcategory.map((s) => s.trim()).filter(Boolean) : [],
		description: text(r.description),
		stage_in_development: text(r.stage_in_development),
		license: text(r.license),
		version: text(r.version),
		updated: text(r.updated),
		recorded: text(r.recorded),
		verified: bool(r.verified),
		publisher: text(r.publisher),
		publisher_reputation: text(r.publisher_reputation),
		consumers: text(r.consumers),
		apps: text(r.apps),
		links: compact({
			website: text(r.website),
			documentation: text(r.documentation),
			example: text(r.example),
			contact: text(r.contact)
		}),
		open: bool(r.open),
		metrics: buildMetrics(r),
		providers: providers(r.provider_list),
		tags: tags(r.tags)
	});
}

function main() {
	const rows = JSON.parse(readFileSync(SRC, 'utf8'));
	console.log(`Read ${rows.length} records from standards-export.json`);

	// Fresh output dir so removed/renamed standards don't linger.
	rmSync(OUT_DIR, { recursive: true, force: true });
	mkdirSync(OUT_DIR, { recursive: true });

	const slugs = new Map();
	for (const row of rows) {
		const std = normalize(row);
		if (!std.name) throw new Error(`Record missing name: ${JSON.stringify(row).slice(0, 120)}`);
		if (!std.slug) throw new Error(`Empty slug for "${std.name}"`);
		if (slugs.has(std.slug)) {
			throw new Error(`Slug collision: "${std.slug}" from "${std.name}" and "${slugs.get(std.slug)}"`);
		}
		slugs.set(std.slug, std.name);

		const doc = yaml.dump(std, { lineWidth: -1, noRefs: true, sortKeys: false });
		writeFileSync(join(OUT_DIR, `${std.slug}.yaml`), doc, 'utf8');
	}

	const written = readdirSync(OUT_DIR).filter((f) => f.endsWith('.yaml'));
	console.log(`Wrote ${written.length} YAML files to src/lib/data/standards/`);
	if (written.length !== rows.length) {
		throw new Error(`Count mismatch: ${rows.length} records but ${written.length} files`);
	}
}

main();
