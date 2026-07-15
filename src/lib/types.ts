/** Canonical shape of a standard, mirroring the per-standard YAML files. */

export interface RationaleMetric {
	value: boolean | null;
	rationale?: string;
}

export interface ExtensionsMetric {
	value: boolean | null;
	indicators?: string;
}

export interface Metrics {
	transferability: RationaleMetric;
	stakeholder_participation: RationaleMetric;
	consensus_government: RationaleMetric;
	machine_readable: RationaleMetric;
	human_readable: RationaleMetric;
	requires_realtime: RationaleMetric;
	metadata: RationaleMetric;
	/** Uses `indicators` rather than `rationale`. */
	extensions: ExtensionsMetric;
}

/** The 7 metrics that share the value+rationale shape (extensions is separate). */
export type RationaleMetricKey = Exclude<keyof Metrics, 'extensions'>;

export interface Links {
	website?: string;
	documentation?: string;
	example?: string;
	contact?: string;
}

export interface Tags {
	dataType?: string[];
	language?: string[];
	providerType?: string[];
	subject?: string[];
	keyword?: string[];
}

export interface Standard {
	name: string;
	slug: string;
	category: string;
	subcategory: string[];
	description?: string;
	stage_in_development?: string;
	license?: string;
	version?: string;
	updated?: string;
	recorded?: string;
	verified: boolean | null;
	publisher?: string;
	publisher_reputation?: string;
	consumers?: string;
	apps?: string;
	links: Links;
	open: boolean | null;
	metrics: Metrics;
	providers: string[];
	tags: Tags | null;
}
