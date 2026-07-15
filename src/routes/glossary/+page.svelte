<script lang="ts">
	import Icon from '$lib/components/Icon.svelte';
	import { METRICS } from '$lib/metrics';
</script>

<svelte:head>
	<title>Glossary — Open Data Standards Directory</title>
	<meta
		name="description"
		content="Definitions of open data standards, the assessment metrics, and how categories are organized." />
</svelte:head>

<div class="container page">
	<h1>Glossary</h1>

	<section id="definition">
		<h2>Open data standards</h2>
		<p>
			A data standard is an agreed specification for describing and structuring data so it can be
			shared and reused. An <strong>open</strong> data standard is published under a license that lets
			anyone use it freely. Standards generally fall into three overlapping kinds:
		</p>
		<dl class="kinds">
			<dt>Schematic</dt>
			<dd>Defines the structure of data — fields, types, and how records fit together (e.g. GTFS).</dd>
			<dt>Semantic</dt>
			<dd>Defines shared meaning and vocabularies so values are interpreted consistently (e.g. NIBRS).</dd>
			<dt>Atomic</dt>
			<dd>Defines the smallest agreed units of representation, such as codes for dates, currencies, or coordinates (e.g. ISO 8601, WGS84).</dd>
		</dl>
	</section>

	<section id="example">
		<h2>An example: GTFS</h2>
		<p>
			The General Transit Feed Specification defines how a transit agency publishes routes,
			stops, and schedules. Because agencies worldwide use the same format, one app can plan trips
			in hundreds of cities — a concrete illustration of what a shared, open standard makes
			possible.
		</p>
	</section>

	<section id="metrics">
		<h2>Assessment metrics</h2>
		<p>Each standard is assessed against nine metrics, shown as color-coded icons:</p>
		<ul class="legend">
			{#each METRICS as m (m.key)}
				<li>
					<span class="chip" aria-hidden="true"><Icon name={m.icon} size={18} /></span>
					<div>
						<p class="mlabel">{m.label}</p>
						<p class="mdesc">{m.glossary}</p>
					</div>
				</li>
			{/each}
		</ul>

		<h3>Color key</h3>
		<ul class="key">
			<li><span class="swatch swatch--yes"></span> Yes — the standard meets this criterion</li>
			<li><span class="swatch swatch--no"></span> No — it does not</li>
			<li><span class="swatch swatch--unknown"></span> No data — not assessed or unknown</li>
		</ul>
	</section>

	<section id="categories">
		<h2>Categories</h2>
		<p>
			Standards are organized into categories and subcategories describing the domain of municipal
			data they serve. Browse them on the <a href="/categories">categories page</a>. The category
			framework builds on foundational open-data research for the directory.
		</p>
	</section>
</div>

<style>
	.page {
		padding: 1.5rem 0 2rem;
		max-width: 820px;
	}
	section {
		margin-top: 2rem;
	}
	.kinds {
		display: grid;
		gap: 0.4rem 1rem;
		grid-template-columns: auto 1fr;
	}
	.kinds dt {
		font-weight: 700;
		color: var(--brand-teal-dark);
	}
	.kinds dd {
		margin: 0;
	}
	.legend {
		list-style: none;
		margin: 1rem 0;
		padding: 0;
		display: grid;
		gap: 0.9rem;
	}
	.legend li {
		display: grid;
		grid-template-columns: auto 1fr;
		gap: 0.75rem;
		align-items: start;
	}
	.chip {
		display: inline-grid;
		place-items: center;
		width: 2rem;
		height: 2rem;
		border-radius: var(--radius-sm);
		background: var(--interactive);
		color: #fff;
		margin-top: 0.1rem;
	}
	.mlabel {
		margin: 0;
		font-weight: 700;
	}
	.mdesc {
		margin: 0.1rem 0 0;
		color: var(--text-muted);
	}
	.key {
		list-style: none;
		padding: 0;
		display: grid;
		gap: 0.5rem;
	}
	.key li {
		display: flex;
		align-items: center;
		gap: 0.6rem;
	}
	.swatch {
		width: 1.1rem;
		height: 1.1rem;
		border-radius: 4px;
		display: inline-block;
	}
	.swatch--yes {
		background: var(--metric-yes);
	}
	.swatch--no {
		background: var(--metric-no);
	}
	.swatch--unknown {
		background: var(--metric-unknown);
	}
</style>
