<script lang="ts">
	import Icon from './Icon.svelte';
	import { METRICS, metricValue, metricState, stateLabel } from '$lib/metrics';
	import type { Standard } from '$lib/types';

	interface Props {
		standard: Standard;
		size?: number;
	}
	let { standard, size = 20 }: Props = $props();
</script>

<ul class="metrics" aria-label="Standard assessment">
	{#each METRICS as metric (metric.key)}
		{@const state = metricState(metricValue(standard, metric.key))}
		<li class="metric metric--{state}" title="{metric.label}: {stateLabel(state)}">
			<Icon name={metric.icon} {size} />
			<span class="visually-hidden">{metric.label}: {stateLabel(state)}</span>
		</li>
	{/each}
</ul>

<style>
	.metrics {
		display: flex;
		flex-wrap: wrap;
		gap: 0.4rem;
		margin: 0;
		padding: 0;
		list-style: none;
	}
	.metric {
		display: inline-grid;
		place-items: center;
		width: 2rem;
		height: 2rem;
		border-radius: var(--radius-sm);
		color: #fff;
	}
	.metric--yes {
		background: var(--metric-yes);
	}
	.metric--no {
		background: var(--metric-no);
	}
	.metric--unknown {
		background: var(--metric-unknown);
	}
</style>
