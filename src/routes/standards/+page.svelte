<script lang="ts">
	import { page } from '$app/state';
	import { browser } from '$app/environment';
	import { replaceState } from '$app/navigation';
	import { standards, searchText } from '$lib/data/standards';
	import { METRICS, metricValue } from '$lib/metrics';
	import StandardCard from '$lib/components/StandardCard.svelte';
	import Icon from '$lib/components/Icon.svelte';
	import { REPO } from '$lib/nav';

	// Precompute the search haystack once.
	const haystacks = new Map(standards.map((s) => [s.slug, searchText(s)]));

	const categories = [...new Set(standards.map((s) => s.category))].sort();
	const stages = [...new Set(standards.map((s) => s.stage_in_development).filter(Boolean))] as string[];

	// URL is the source of truth (gives back/forward + shareable links for free).
	// Guarded to the browser: SvelteKit forbids reading searchParams during
	// prerender, where the query is unknown — default to empty (show all).
	const params = $derived(browser ? page.url.searchParams : new URLSearchParams());
	const q = $derived(params.get('q') ?? '');
	const category = $derived(params.get('category') ?? '');
	const stage = $derived(params.get('stage') ?? '');
	const activeMetrics = $derived((params.get('m') ?? '').split(',').filter(Boolean));

	function setParam(key: string, value: string) {
		const sp = new URLSearchParams(page.url.searchParams);
		if (value) sp.set(key, value);
		else sp.delete(key);
		const qs = sp.toString();
		replaceState(qs ? `?${qs}` : page.url.pathname, {});
	}

	function toggleMetric(key: string) {
		const set = new Set(activeMetrics);
		if (set.has(key)) set.delete(key);
		else set.add(key);
		setParam('m', [...set].join(','));
	}

	function clearAll() {
		replaceState(page.url.pathname, {});
	}

	const results = $derived.by(() => {
		const needle = q.trim().toLowerCase();
		return standards.filter((s) => {
			if (needle && !haystacks.get(s.slug)!.includes(needle)) return false;
			if (category && s.category !== category) return false;
			if (stage && s.stage_in_development !== stage) return false;
			for (const key of activeMetrics) {
				if (metricValue(s, key) !== true) return false;
			}
			return true;
		});
	});

	const hasFilters = $derived(Boolean(q || category || stage || activeMetrics.length));
</script>

<svelte:head>
	<title>Standards — Open Data Standards Directory</title>
	<meta
		name="description"
		content="Browse, search, and filter open data standards by category, development stage, and assessment." />
</svelte:head>

<div class="container page">
	<h1>Standards</h1>

	<div class="controls">
		<div class="search">
			<Icon name="search" size={18} />
			<input
				type="search"
				placeholder="Search standards, publishers, tags…"
				value={q}
				oninput={(e) => setParam('q', e.currentTarget.value)}
				aria-label="Search standards" />
		</div>

		<div class="selects">
			<label>
				<span>Category</span>
				<select value={category} onchange={(e) => setParam('category', e.currentTarget.value)}>
					<option value="">All categories</option>
					{#each categories as c (c)}<option value={c}>{c}</option>{/each}
				</select>
			</label>
			<label>
				<span>Stage</span>
				<select value={stage} onchange={(e) => setParam('stage', e.currentTarget.value)}>
					<option value="">Any stage</option>
					{#each stages as st (st)}<option value={st}>{st}</option>{/each}
				</select>
			</label>
		</div>
	</div>

	<fieldset class="metric-filters">
		<legend>Assessed “Yes” for:</legend>
		{#each METRICS as m (m.key)}
			<label class="chip" class:on={activeMetrics.includes(m.key)}>
				<input
					type="checkbox"
					checked={activeMetrics.includes(m.key)}
					onchange={() => toggleMetric(m.key)} />
				<Icon name={m.icon} size={15} />
				<span>{m.label}</span>
			</label>
		{/each}
	</fieldset>

	<div class="status">
		<p>{results.length} of {standards.length} standards</p>
		{#if hasFilters}
			<button class="clear" onclick={clearAll}>Clear filters</button>
		{/if}
	</div>

	{#if results.length}
		<ul class="grid">
			{#each results as s (s.slug)}
				<li><StandardCard standard={s} /></li>
			{/each}
		</ul>
	{:else}
		<div class="empty">
			<p>No standards match your search.</p>
			<div class="empty-actions">
				<button class="btn" onclick={clearAll}>Clear filters</button>
				<a class="btn btn--ghost" href="{REPO}/issues/new?labels=add-standard" target="_blank" rel="noopener">
					Suggest a standard
				</a>
			</div>
		</div>
	{/if}
</div>

<style>
	.page {
		padding: 1.5rem 0 2rem;
	}
	.controls {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
		align-items: flex-end;
	}
	.search {
		flex: 1 1 320px;
		display: flex;
		align-items: center;
		gap: 0.5rem;
		background: var(--surface);
		border: 1px solid var(--border);
		border-radius: var(--radius-sm);
		padding: 0.55rem 0.8rem;
		color: var(--text-muted);
	}
	.search input {
		border: 0;
		outline: none;
		background: none;
		font: inherit;
		color: var(--text);
		width: 100%;
	}
	.selects {
		display: flex;
		gap: 1rem;
		flex-wrap: wrap;
	}
	label span {
		display: block;
		font-size: 0.75rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.04em;
		color: var(--text-muted);
		margin-bottom: 0.2rem;
	}
	select {
		font: inherit;
		padding: 0.5rem 0.7rem;
		border: 1px solid var(--border);
		border-radius: var(--radius-sm);
		background: var(--surface);
		color: var(--text);
	}
	.metric-filters {
		border: 0;
		margin: 1.25rem 0 0;
		padding: 0;
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		align-items: center;
	}
	.metric-filters legend {
		font-size: 0.8rem;
		font-weight: 700;
		color: var(--text-muted);
		padding: 0;
		margin-right: 0.25rem;
	}
	.chip {
		display: inline-flex;
		align-items: center;
		gap: 0.35rem;
		border: 1px solid var(--border);
		background: var(--surface);
		border-radius: 999px;
		padding: 0.25rem 0.7rem;
		font-size: 0.85rem;
		cursor: pointer;
		color: var(--text-muted);
	}
	.chip:hover {
		border-color: var(--brand-teal);
	}
	.chip.on {
		background: var(--brand-teal);
		border-color: var(--brand-teal);
		color: #fff;
	}
	.chip input {
		position: absolute;
		opacity: 0;
		width: 0;
		height: 0;
	}
	.status {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		margin: 1.5rem 0 1rem;
	}
	.status p {
		margin: 0;
		font-weight: 700;
	}
	.clear {
		background: none;
		border: 0;
		color: var(--brand-teal-dark);
		font: inherit;
		font-weight: 700;
		cursor: pointer;
		text-decoration: underline;
	}
	.grid {
		list-style: none;
		margin: 0;
		padding: 0;
		display: grid;
		gap: 1.25rem;
		grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
	}
	.empty {
		text-align: center;
		padding: 3rem 1rem;
		background: var(--surface);
		border: 1px dashed var(--border);
		border-radius: var(--radius);
	}
	.empty-actions {
		display: flex;
		gap: 0.75rem;
		justify-content: center;
		flex-wrap: wrap;
		margin-top: 1rem;
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
		border: 0;
		font: inherit;
		cursor: pointer;
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
</style>
