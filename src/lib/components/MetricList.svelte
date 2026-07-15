<script lang="ts">
	import Icon from './Icon.svelte';
	import { METRICS, metricValue, metricNote, metricState, stateLabel } from '$lib/metrics';
	import type { Standard } from '$lib/types';

	interface Props {
		standard: Standard;
	}
	let { standard }: Props = $props();
</script>

<ul class="metric-list">
	{#each METRICS as metric (metric.key)}
		{@const state = metricState(metricValue(standard, metric.key))}
		{@const note = metricNote(standard, metric.key)}
		<li>
			<span class="badge badge--{state}" aria-hidden="true">
				<Icon name={metric.icon} size={18} />
			</span>
			<div class="body">
				<p class="label">
					{metric.label}
					<span class="value value--{state}">{stateLabel(state)}</span>
				</p>
				{#if note}<p class="note">{note}</p>{/if}
			</div>
		</li>
	{/each}
</ul>

<style>
	.metric-list {
		list-style: none;
		margin: 0;
		padding: 0;
		display: grid;
		gap: 0.75rem;
	}
	li {
		display: grid;
		grid-template-columns: auto 1fr;
		gap: 0.75rem;
		align-items: start;
	}
	.badge {
		display: inline-grid;
		place-items: center;
		width: 2rem;
		height: 2rem;
		border-radius: var(--radius-sm);
		color: #fff;
		margin-top: 0.1rem;
	}
	.badge--yes {
		background: var(--metric-yes);
	}
	.badge--no {
		background: var(--metric-no);
	}
	.badge--unknown {
		background: var(--metric-unknown);
	}
	.label {
		margin: 0;
		font-weight: 700;
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		align-items: baseline;
	}
	.value {
		font-size: 0.8rem;
		font-weight: 700;
		padding: 0.05rem 0.5rem;
		border-radius: 999px;
		text-transform: uppercase;
		letter-spacing: 0.03em;
	}
	.value--yes {
		background: color-mix(in srgb, var(--metric-yes) 18%, transparent);
		color: var(--metric-yes);
	}
	.value--no {
		background: color-mix(in srgb, var(--metric-no) 15%, transparent);
		color: var(--metric-no);
	}
	.value--unknown {
		background: var(--surface-2);
		color: var(--text-muted);
	}
	.note {
		margin: 0.15rem 0 0;
		color: var(--text-muted);
	}
</style>
