import yaml from 'js-yaml';
import type {
	ExtensionsMetric,
	Metrics,
	RationaleMetric,
	RationaleMetricKey,
	Standard
} from '$lib/types';

/**
 * Build-time data source. Every per-standard YAML file is read, parsed, and
 * coerced into a guaranteed `Standard` shape here, so components never deal
 * with missing/loosely-typed fields. Nothing ships to the client except the
 * data actually referenced by a page (Vite inlines and tree-shakes it).
 */
const raw = import.meta.glob('./standards/*.yaml', {
	query: '?raw',
	import: 'default',
	eager: true
}) as Record<string, string>;

const RATIONALE_KEYS: RationaleMetricKey[] = [
	'transferability',
	'stakeholder_participation',
	'consensus_government',
	'machine_readable',
	'human_readable',
	'requires_realtime',
	'metadata'
];

function str(v: unknown): string | undefined {
	return typeof v === 'string' && v.trim() ? v : undefined;
}

function strArray(v: unknown): string[] {
	return Array.isArray(v) ? v.filter((x): x is string => typeof x === 'string') : [];
}

function bool(v: unknown): boolean | null {
	return typeof v === 'boolean' ? v : null;
}

function rationaleMetric(v: unknown): RationaleMetric {
	const o = (v ?? {}) as Record<string, unknown>;
	return { value: bool(o.value), rationale: str(o.rationale) };
}

function extensionsMetric(v: unknown): ExtensionsMetric {
	const o = (v ?? {}) as Record<string, unknown>;
	return { value: bool(o.value), indicators: str(o.indicators) };
}

function coerce(doc: unknown): Standard {
	const o = (doc ?? {}) as Record<string, unknown>;
	const name = str(o.name);
	const slug = str(o.slug);
	if (!name || !slug) {
		throw new Error(`Standard missing name/slug: ${JSON.stringify(o).slice(0, 120)}`);
	}

	const m = (o.metrics ?? {}) as Record<string, unknown>;
	const metrics = {
		extensions: extensionsMetric(m.extensions)
	} as Metrics;
	for (const k of RATIONALE_KEYS) metrics[k] = rationaleMetric(m[k]);

	const t = (o.tags ?? null) as Record<string, unknown> | null;
	const tags = t
		? {
				dataType: strArray(t.dataType),
				language: strArray(t.language),
				providerType: strArray(t.providerType),
				subject: strArray(t.subject),
				keyword: strArray(t.keyword)
			}
		: null;

	const l = (o.links ?? {}) as Record<string, unknown>;

	return {
		name,
		slug,
		category: str(o.category) ?? 'Uncategorized',
		subcategory: strArray(o.subcategory),
		description: str(o.description),
		stage_in_development: str(o.stage_in_development),
		license: str(o.license),
		version: str(o.version),
		updated: str(o.updated),
		recorded: str(o.recorded),
		verified: bool(o.verified),
		publisher: str(o.publisher),
		publisher_reputation: str(o.publisher_reputation),
		consumers: str(o.consumers),
		apps: str(o.apps),
		links: {
			website: str(l.website),
			documentation: str(l.documentation),
			example: str(l.example),
			contact: str(l.contact)
		},
		open: bool(o.open),
		metrics,
		providers: strArray(o.providers),
		tags
	};
}

/** All standards, sorted alphabetically by name. */
export const standards: Standard[] = Object.values(raw)
	.map((text) => coerce(yaml.load(text)))
	.sort((a, b) => a.name.localeCompare(b.name));

/** Slug -> standard, for detail-page lookups. */
export const bySlug: Map<string, Standard> = new Map(standards.map((s) => [s.slug, s]));

export interface CategoryNode {
	name: string;
	count: number;
	subcategories: { name: string; count: number }[];
}

/** Categories with their subcategories and standard counts, most-populated first. */
export function categoryTree(): CategoryNode[] {
	const cats = new Map<string, { count: number; subs: Map<string, number> }>();
	for (const s of standards) {
		let cat = cats.get(s.category);
		if (!cat) {
			cat = { count: 0, subs: new Map() };
			cats.set(s.category, cat);
		}
		cat.count++;
		for (const sub of s.subcategory) cat.subs.set(sub, (cat.subs.get(sub) ?? 0) + 1);
	}
	return [...cats.entries()]
		.map(([name, { count, subs }]) => ({
			name,
			count,
			subcategories: [...subs.entries()]
				.map(([n, c]) => ({ name: n, count: c }))
				.sort((a, b) => a.name.localeCompare(b.name))
		}))
		.sort((a, b) => a.name.localeCompare(b.name));
}

/** Lower-cased haystack for substring search over the key fields. */
export function searchText(s: Standard): string {
	return [
		s.name,
		s.category,
		...s.subcategory,
		s.publisher ?? '',
		s.description ?? '',
		...(s.tags ? Object.values(s.tags).flat() : [])
	]
		.join(' ')
		.toLowerCase();
}
