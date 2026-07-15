<script lang="ts">
	import Icon from '$lib/components/Icon.svelte';
	import MetricList from '$lib/components/MetricList.svelte';
	import { REPO } from '$lib/nav';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
	const s = $derived(data.standard);

	const actionLinks = $derived(
		[
			{ label: 'Website', href: s.links.website },
			{ label: 'Documentation', href: s.links.documentation },
			{ label: 'Example', href: s.links.example },
			{ label: 'Contact', href: s.links.contact }
		].filter((l): l is { label: string; href: string } => Boolean(l.href))
	);

	const updateUrl = $derived(
		`${REPO}/issues/new?labels=update-standard&title=${encodeURIComponent(
			`Update: ${s.name}`
		)}&body=${encodeURIComponent(`Standard: ${s.name} (${s.slug})\n\nSuggested change:\n`)}`
	);

	function fmtDate(iso?: string): string {
		if (!iso) return '';
		const d = new Date(iso + 'T00:00:00');
		return Number.isNaN(d.getTime())
			? iso
			: d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
	}
</script>

<svelte:head>
	<title>{s.name} — Open Data Standards Directory</title>
	{#if s.description}<meta name="description" content={s.description} />{/if}
</svelte:head>

<article class="container detail">
	<a class="back" href="/standards"><Icon name="arrow-left" size={16} /> All standards</a>

	<header class="head">
		<p class="eyebrow">
			<a href="/standards?category={encodeURIComponent(s.category)}">{s.category}</a>
			{#each s.subcategory as sub (sub)}
				<span class="sub">{sub}</span>
			{/each}
		</p>
		<h1>{s.name}</h1>
		{#if s.publisher}<p class="publisher">by {s.publisher}</p>{/if}
		{#if s.description}<p class="lede">{s.description}</p>{/if}

		{#if actionLinks.length}
			<div class="actions">
				{#each actionLinks as link (link.label)}
					<a class="btn" href={link.href} target="_blank" rel="noopener">
						{link.label} <Icon name="external-link" size={15} />
					</a>
				{/each}
			</div>
		{/if}
	</header>

	<div class="grid">
		<section class="main">
			<h2>Assessment</h2>
			<MetricList standard={s} />
		</section>

		<aside class="meta">
			<h2>Details</h2>
			<dl>
				{#if s.stage_in_development}
					<dt>Development stage</dt>
					<dd>{s.stage_in_development}</dd>
				{/if}
				{#if s.version}<dt>Version</dt><dd>{s.version}</dd>{/if}
				{#if s.license}<dt>License</dt><dd>{s.license}</dd>{/if}
				{#if s.consumers}<dt>Level of use</dt><dd>{s.consumers}</dd>{/if}
				{#if s.apps}<dt>Applications</dt><dd>{s.apps}</dd>{/if}
				{#if s.publisher_reputation}
					<dt>About the publisher</dt>
					<dd>{s.publisher_reputation}</dd>
				{/if}
				{#if s.updated}<dt>Updated by publisher</dt><dd>{fmtDate(s.updated)}</dd>{/if}
				{#if s.recorded}<dt>Added to directory</dt><dd>{fmtDate(s.recorded)}</dd>{/if}
			</dl>
		</aside>
	</div>

	{#if s.tags}
		<section class="tags">
			<h2>Tags</h2>
			{#each Object.entries(s.tags) as [group, values] (group)}
				{#if values && values.length}
					<div class="tag-group">
						<span class="tag-key">{group}</span>
						<ul>
							{#each values as v (v)}<li>{v}</li>{/each}
						</ul>
					</div>
				{/if}
			{/each}
		</section>
	{/if}

	{#if s.providers.length}
		<section class="providers">
			<h2>Data Providers <span class="count">({s.providers.length})</span></h2>
			<ul class="provider-list">
				{#each s.providers as p (p)}<li>{p}</li>{/each}
			</ul>
			<p class="hint">
				Don't see your organization? <a href={updateUrl} target="_blank" rel="noopener">Let us know</a
				>.
			</p>
		</section>
	{/if}

	<footer class="foot">
		<a class="btn btn--ghost" href={updateUrl} target="_blank" rel="noopener">
			Suggest an update to this standard
		</a>
	</footer>
</article>

<style>
	.detail {
		padding: 1.5rem 0 2rem;
	}
	.back {
		display: inline-flex;
		align-items: center;
		gap: 0.35rem;
		font-weight: 700;
		margin-bottom: 1rem;
	}
	.eyebrow {
		display: flex;
		flex-wrap: wrap;
		gap: 0.4rem;
		align-items: center;
		margin: 0 0 0.25rem;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		font-size: 0.8rem;
		font-weight: 700;
	}
	.eyebrow a {
		color: var(--brand-teal-dark);
	}
	.sub {
		background: var(--surface-2);
		color: var(--text-muted);
		border-radius: 999px;
		padding: 0.05rem 0.55rem;
	}
	h1 {
		margin: 0 0 0.25rem;
	}
	.publisher {
		margin: 0 0 1rem;
		color: var(--text-muted);
	}
	.lede {
		font-size: 1.15rem;
		max-width: 70ch;
	}
	.actions {
		display: flex;
		flex-wrap: wrap;
		gap: 0.6rem;
		margin-top: 1.25rem;
	}
	.btn {
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
		background: var(--brand-teal);
		color: #fff;
		padding: 0.55rem 1rem;
		border-radius: var(--radius-sm);
		font-weight: 700;
	}
	.btn:hover {
		text-decoration: none;
		background: var(--brand-teal-dark);
	}
	.btn--ghost {
		background: transparent;
		color: var(--brand-teal-dark);
		border: 2px solid var(--brand-teal);
	}
	.btn--ghost:hover {
		background: var(--brand-teal);
		color: #fff;
	}
	.grid {
		display: grid;
		gap: 2rem;
		margin-top: 2rem;
		grid-template-columns: 1fr;
	}
	@media (min-width: 860px) {
		.grid {
			grid-template-columns: 1.3fr 1fr;
		}
	}
	section,
	aside {
		background: var(--surface);
		border: 1px solid var(--border);
		border-radius: var(--radius);
		padding: 1.25rem 1.5rem;
	}
	h2 {
		margin-top: 0;
		font-size: 1.35rem;
	}
	dl {
		margin: 0;
		display: grid;
		gap: 0.75rem;
	}
	dt {
		font-weight: 700;
		font-size: 0.8rem;
		text-transform: uppercase;
		letter-spacing: 0.03em;
		color: var(--text-muted);
	}
	dd {
		margin: 0.15rem 0 0;
	}
	.tags,
	.providers {
		margin-top: 2rem;
	}
	.tag-group {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		align-items: baseline;
		margin-bottom: 0.6rem;
	}
	.tag-key {
		font-weight: 700;
		font-size: 0.8rem;
		text-transform: uppercase;
		color: var(--text-muted);
		min-width: 7rem;
	}
	.tag-group ul {
		display: flex;
		flex-wrap: wrap;
		gap: 0.4rem;
		margin: 0;
		padding: 0;
		list-style: none;
	}
	.tag-group li {
		background: var(--surface-2);
		border-radius: 999px;
		padding: 0.1rem 0.6rem;
		font-size: 0.9rem;
	}
	.provider-list {
		columns: 2;
		gap: 1.5rem;
		margin: 0;
		padding-left: 1.1rem;
	}
	@media (min-width: 640px) {
		.provider-list {
			columns: 3;
		}
	}
	.count {
		color: var(--text-muted);
		font-weight: 400;
	}
	.hint {
		margin-top: 1rem;
		color: var(--text-muted);
	}
	.foot {
		margin-top: 2rem;
	}
</style>
