<script lang="ts">
	import { categoryTree } from '$lib/data/standards';
	import Icon from '$lib/components/Icon.svelte';
	const tree = categoryTree();
</script>

<svelte:head>
	<title>Categories — Open Data Standards Directory</title>
	<meta name="description" content="Browse open data standards by category and subcategory." />
</svelte:head>

<div class="container page">
	<h1>Categories</h1>
	<p class="lead">
		Browse standards by category. Expand a category to see its subcategories, or jump straight to
		the filtered list.
	</p>

	<ul class="cats">
		{#each tree as cat (cat.name)}
			<li>
				<details>
					<summary>
						<Icon name="chevron-down" size={18} />
						<span class="cat-name">{cat.name}</span>
						<span class="count">{cat.count}</span>
						<a
							class="view"
							href="/standards?category={encodeURIComponent(cat.name)}"
							onclick={(e) => e.stopPropagation()}>View all</a>
					</summary>
					{#if cat.subcategories.length}
						<ul class="subs">
							{#each cat.subcategories as sub (sub.name)}
								<li>
									<a href="/standards?q={encodeURIComponent(sub.name)}">
										{sub.name} <span class="count">{sub.count}</span>
									</a>
								</li>
							{/each}
						</ul>
					{:else}
						<p class="none">No subcategories.</p>
					{/if}
				</details>
			</li>
		{/each}
	</ul>
</div>

<style>
	.page {
		padding: 1.5rem 0 2rem;
	}
	.lead {
		color: var(--text-muted);
		max-width: 65ch;
	}
	.cats {
		list-style: none;
		margin: 1.5rem 0 0;
		padding: 0;
		display: grid;
		gap: 0.6rem;
	}
	details {
		background: var(--surface);
		border: 1px solid var(--border);
		border-radius: var(--radius);
		overflow: hidden;
	}
	summary {
		display: flex;
		align-items: center;
		gap: 0.6rem;
		padding: 0.9rem 1.1rem;
		cursor: pointer;
		font-family: var(--font-heading);
		font-weight: 700;
		font-size: 1.2rem;
		list-style: none;
	}
	summary::-webkit-details-marker {
		display: none;
	}
	summary :global(svg) {
		transition: transform 0.15s ease;
		color: var(--brand-teal-dark);
	}
	details[open] summary :global(svg) {
		transform: rotate(180deg);
	}
	.cat-name {
		flex: 0 0 auto;
	}
	.count {
		font-family: var(--font-body);
		font-size: 0.8rem;
		font-weight: 700;
		color: var(--text-muted);
		background: var(--surface-2);
		border-radius: 999px;
		padding: 0.05rem 0.5rem;
	}
	.view {
		margin-left: auto;
		font-family: var(--font-body);
		font-size: 0.9rem;
		font-weight: 700;
	}
	.subs {
		list-style: none;
		margin: 0;
		padding: 0 1.1rem 1rem 2.6rem;
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}
	.subs a {
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
		background: var(--surface-2);
		border-radius: 999px;
		padding: 0.25rem 0.75rem;
		color: var(--text);
	}
	.subs a:hover {
		text-decoration: none;
		background: var(--interactive);
		color: #fff;
	}
	.subs a:hover .count {
		background: rgba(255, 255, 255, 0.25);
		color: #fff;
	}
	.none {
		padding: 0 1.1rem 1rem;
		color: var(--text-muted);
	}
</style>
