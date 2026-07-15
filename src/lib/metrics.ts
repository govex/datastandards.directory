import type { Standard } from './types';
import type { IconName } from './icons';

/** One of the 9 assessed metrics shown as color-coded icons. */
export interface MetricDef {
	/** Matches a top-level field (`open`) or a key under `metrics`. */
	key: string;
	label: string;
	icon: IconName;
	/** Longer explanation for the glossary legend. */
	glossary: string;
}

/** Order mirrors the legacy metric row / glossary legend. */
export const METRICS: MetricDef[] = [
	{
		key: 'open',
		label: 'Open License',
		icon: 'unlock',
		glossary: 'The standard is published under an open license that permits free reuse.'
	},
	{
		key: 'transferability',
		label: 'Transferable to Other Jurisdictions',
		icon: 'repeat',
		glossary: 'The standard can be adopted by jurisdictions beyond the one that created it.'
	},
	{
		key: 'stakeholder_participation',
		label: 'Stakeholder Participation',
		icon: 'users',
		glossary: 'Stakeholders and the public were able to participate in developing the standard.'
	},
	{
		key: 'consensus_government',
		label: 'Consensus-Based Governance',
		icon: 'thumbs-up',
		glossary: 'The standard is governed by consensus among its contributors.'
	},
	{
		key: 'extensions',
		label: 'Extensions',
		icon: 'external-link',
		glossary: 'The standard supports extensions or profiles for local needs.'
	},
	{
		key: 'human_readable',
		label: 'Human Readable',
		icon: 'eye',
		glossary: 'Data expressed in the standard is understandable by a person, not only a machine.'
	},
	{
		key: 'machine_readable',
		label: 'Machine Readable',
		icon: 'monitor',
		glossary: 'Data expressed in the standard is structured for automated processing.'
	},
	{
		key: 'requires_realtime',
		label: 'Requires Up-To-Date / Real-Time Data',
		icon: 'clock',
		glossary: 'The standard depends on frequently updated or real-time data.'
	},
	{
		key: 'metadata',
		label: 'Metadata',
		icon: 'file',
		glossary: 'The standard defines or requires metadata about the data it describes.'
	}
];

export type MetricState = 'yes' | 'no' | 'unknown';

/** Resolve a metric's boolean value from either the top level or `metrics`. */
export function metricValue(s: Standard, key: string): boolean | null {
	if (key === 'open') return s.open;
	const m = s.metrics[key as keyof Standard['metrics']];
	return m ? m.value : null;
}

/** The rationale/indicator text backing a metric, if any. */
export function metricNote(s: Standard, key: string): string | undefined {
	if (key === 'extensions') return s.metrics.extensions.indicators;
	if (key === 'open') return undefined;
	const m = s.metrics[key as keyof Standard['metrics']];
	return m && 'rationale' in m ? m.rationale : undefined;
}

export function metricState(value: boolean | null): MetricState {
	return value === true ? 'yes' : value === false ? 'no' : 'unknown';
}

export function stateLabel(state: MetricState): string {
	return state === 'yes' ? 'Yes' : state === 'no' ? 'No' : 'No data';
}
