<script lang="ts">
	import CategoryGrid from '$lib/components/CategoryGrid.svelte';
	import Icon from '$lib/components/Icon.svelte';
	import { standards } from '$lib/data/standards';
</script>

<svelte:head>
	<title>Open Data Standards Directory</title>
	<meta
		name="description"
		content="An inventory of open data standards — browse {standards.length} standards by category, publisher, and assessment. A project of the Center for Government Excellence at Johns Hopkins University." />
</svelte:head>

<section class="hero">
	<div class="container">
		<h1>Open Data Standards Directory</h1>
		<p class="tagline">
			An inventory of {standards.length} open data standards — what they cover, who publishes them,
			and how they measure up.
		</p>

		<form class="search" action="/standards" role="search">
			<Icon name="search" size={20} />
			<input
				type="search"
				name="q"
				aria-label="Search open data standards"
				placeholder="Type a category or open data standard, then press enter" />
			<button type="submit">Search</button>
		</form>
		<p class="quick">
			or <a href="/standards">browse all standards</a> ·
			<a href="/categories">browse by category</a>
		</p>
	</div>
</section>

<section class="container block">
	<h2>Explore high-value categories</h2>
	<p class="lead">Pick a category to see the standards that apply to it.</p>
	<CategoryGrid />
</section>

<section class="explainers container">
	<article>
		<h2>What is an open data standard?</h2>
		<p>
			A data standard is an agreed way of describing and structuring data so it can be shared,
			compared, and reused across organizations. An <em>open</em> standard is published under a
			license that lets anyone adopt it freely. Standards can be schematic, semantic, or atomic —
			the glossary breaks down what that means.
		</p>
		<a class="cta" href="/glossary">Learn about open data standards <Icon name="arrow-right" size={16} /></a>
	</article>
	<article>
		<h2>Why it matters</h2>
		<p>
			When cities publish transit data in the same format (GTFS), a single trip-planning app can
			work in hundreds of places. Shared standards turn isolated datasets into an ecosystem — and
			this directory helps you find the right one and judge its maturity.
		</p>
		<a class="cta" href="/about">Learn about the project <Icon name="arrow-right" size={16} /></a>
	</article>
</section>

<style>
	.hero {
		background: var(--brand-plum);
		color: var(--bg);
		padding: 3rem 0 3.5rem;
	}
	.hero h1 {
		margin: 0 0 0.5rem;
		font-size: clamp(2rem, 1.2rem + 3vw, 3.2rem);
	}
	.tagline {
		font-size: 1.2rem;
		max-width: 60ch;
		color: rgba(255, 255, 255, 0.9);
	}
	.search {
		display: flex;
		align-items: center;
		gap: 0.6rem;
		background: var(--surface);
		color: var(--text-muted);
		border-radius: var(--radius);
		padding: 0.6rem 0.9rem;
		margin-top: 1.5rem;
		max-width: 640px;
		box-shadow: var(--shadow-md);
	}
	.search input {
		flex: 1;
		border: 0;
		outline: none;
		background: none;
		font: inherit;
		color: var(--text);
	}
	.search button {
		background: var(--interactive);
		color: #fff;
		border: 0;
		border-radius: var(--radius-sm);
		padding: 0.5rem 1.1rem;
		font: inherit;
		font-weight: 700;
		cursor: pointer;
	}
	.search button:hover {
		background: var(--interactive-hover);
	}
	.quick {
		margin-top: 0.9rem;
		color: rgba(255, 255, 255, 0.85);
	}
	.quick a {
		color: var(--brand-gold);
		font-weight: 700;
	}
	.block {
		margin-top: 3rem;
	}
	.lead {
		color: var(--text-muted);
		margin-top: -0.5rem;
		margin-bottom: 1.5rem;
	}
	.explainers {
		margin-top: 3rem;
		display: grid;
		gap: 2rem;
		grid-template-columns: 1fr;
	}
	@media (min-width: 760px) {
		.explainers {
			grid-template-columns: 1fr 1fr;
		}
	}
	.explainers article {
		background: var(--surface);
		border: 1px solid var(--border);
		border-left: 5px solid var(--brand-gold);
		border-radius: var(--radius);
		padding: 1.5rem;
	}
	.cta {
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
		font-weight: 700;
		margin-top: 0.5rem;
	}
</style>
