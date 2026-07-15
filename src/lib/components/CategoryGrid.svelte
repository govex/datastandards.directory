<script lang="ts">
	import { CURATED_CATEGORIES } from '$lib/curatedCategories';
</script>

<ul class="grid">
	{#each CURATED_CATEGORIES as cat (cat.label)}
		<li>
			<a class="card" href="/standards?q={encodeURIComponent(cat.query)}">
				<img src={cat.image} alt="" loading="lazy" />
				<span class="label">{cat.label}</span>
				<span class="def">{cat.definition}</span>
			</a>
		</li>
	{/each}
</ul>

<style>
	.grid {
		list-style: none;
		margin: 0;
		padding: 0;
		display: grid;
		gap: 1rem;
		grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
	}
	.card {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		gap: 0.5rem;
		height: 100%;
		padding: 1.1rem 0.9rem;
		background: var(--surface);
		border: 1px solid var(--border);
		border-radius: var(--radius);
		color: var(--text);
		box-shadow: var(--shadow-sm);
		transition: box-shadow 0.15s ease, transform 0.15s ease, border-color 0.15s ease;
	}
	.card:hover {
		text-decoration: none;
		box-shadow: var(--shadow-md);
		transform: translateY(-2px);
		border-color: var(--brand-gold);
	}
	img {
		width: 64px;
		height: 64px;
		object-fit: contain;
	}
	.label {
		font-family: var(--font-heading);
		font-weight: 700;
		font-size: 1.05rem;
	}
	.def {
		font-size: 0.82rem;
		color: var(--text-muted);
		line-height: 1.35;
	}
</style>
