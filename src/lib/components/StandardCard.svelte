<script lang="ts">
	import MetricIcons from './MetricIcons.svelte';
	import type { Standard } from '$lib/types';

	interface Props {
		standard: Standard;
	}
	let { standard }: Props = $props();
</script>

<article class="card">
	<div class="top">
		<span class="cat">{standard.category}</span>
		{#if standard.stage_in_development}
			<span class="stage">{standard.stage_in_development}</span>
		{/if}
	</div>

	<h3 class="name">
		<a href="/standards/{standard.slug}">{standard.name}</a>
	</h3>

	{#if standard.publisher}<p class="publisher">{standard.publisher}</p>{/if}

	{#if standard.description}
		<p class="desc">{standard.description}</p>
	{/if}

	{#if standard.subcategory.length}
		<ul class="subs">
			{#each standard.subcategory as sub (sub)}<li>{sub}</li>{/each}
		</ul>
	{/if}

	<div class="metrics">
		<MetricIcons {standard} size={18} />
	</div>
</article>

<style>
	.card {
		display: flex;
		flex-direction: column;
		gap: 0.6rem;
		background: var(--surface);
		border: 1px solid var(--border);
		border-radius: var(--radius);
		padding: 1.1rem 1.2rem;
		box-shadow: var(--shadow-sm);
		height: 100%;
		transition: box-shadow 0.15s ease, transform 0.15s ease;
	}
	.card:hover {
		box-shadow: var(--shadow-md);
		transform: translateY(-2px);
	}
	.top {
		display: flex;
		justify-content: space-between;
		gap: 0.5rem;
		align-items: center;
	}
	.cat {
		font-size: 0.72rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.06em;
		color: var(--brand-teal-dark);
	}
	.stage {
		font-size: 0.72rem;
		font-weight: 700;
		color: var(--text-muted);
		background: var(--surface-2);
		border-radius: 999px;
		padding: 0.1rem 0.55rem;
	}
	.name {
		margin: 0;
		font-size: 1.3rem;
	}
	.name a {
		color: var(--text);
	}
	.name a:hover {
		color: var(--brand-teal-dark);
	}
	.publisher {
		margin: -0.3rem 0 0;
		color: var(--text-muted);
		font-size: 0.9rem;
	}
	.desc {
		margin: 0;
		display: -webkit-box;
		-webkit-line-clamp: 3;
		line-clamp: 3;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}
	.subs {
		display: flex;
		flex-wrap: wrap;
		gap: 0.35rem;
		margin: 0;
		padding: 0;
		list-style: none;
	}
	.subs li {
		font-size: 0.78rem;
		background: var(--surface-2);
		color: var(--text-muted);
		border-radius: 999px;
		padding: 0.1rem 0.55rem;
	}
	.metrics {
		margin-top: auto;
		padding-top: 0.3rem;
	}
</style>
