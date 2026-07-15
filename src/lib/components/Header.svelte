<script lang="ts">
	import { page } from '$app/state';
	import Icon from './Icon.svelte';
	import { NAV, REPO } from '$lib/nav';

	let open = $state(false);

	function isActive(href: string): boolean {
		return page.url.pathname === href || page.url.pathname.startsWith(href + '/');
	}
</script>

<header class="site-header">
	<div class="bar container">
		<a class="brand" href="/">
			<span class="brand-mark">ODS</span>
			<span class="brand-name">Open Data Standards Directory</span>
		</a>

		<button
			class="nav-toggle"
			aria-expanded={open}
			aria-controls="site-nav"
			onclick={() => (open = !open)}>
			<Icon name={open ? 'x' : 'menu'} size={22} label={open ? 'Close menu' : 'Open menu'} />
		</button>

		<nav id="site-nav" class="nav" class:open aria-label="Primary">
			{#each NAV as item (item.href)}
				<a
					href={item.href}
					class:active={isActive(item.href)}
					aria-current={isActive(item.href) ? 'page' : undefined}
					onclick={() => (open = false)}>
					{item.label}
				</a>
			{/each}
			<a class="gh" href={REPO} target="_blank" rel="noopener">
				<Icon name="github" size={20} label="GitHub repository" />
			</a>
		</nav>
	</div>
</header>

<style>
	.site-header {
		background: var(--brand-plum);
		color: var(--bg);
		position: sticky;
		top: 0;
		z-index: 50;
	}
	.bar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		min-height: 60px;
	}
	.brand {
		display: inline-flex;
		align-items: center;
		gap: 0.6rem;
		color: var(--bg);
		font-family: var(--font-heading);
		font-weight: 700;
	}
	.brand:hover {
		text-decoration: none;
	}
	.brand-mark {
		background: var(--brand-gold);
		color: var(--brand-plum);
		border-radius: var(--radius-sm);
		padding: 0.1rem 0.45rem;
		letter-spacing: 0.05em;
	}
	.brand-name {
		font-size: 1.15rem;
		letter-spacing: 0.02em;
	}
	.nav {
		display: flex;
		align-items: center;
		gap: 0.25rem;
	}
	.nav a {
		color: var(--bg);
		padding: 0.5rem 0.7rem;
		border-radius: var(--radius-sm);
		font-weight: 700;
		font-family: var(--font-heading);
		letter-spacing: 0.02em;
	}
	.nav a:hover {
		text-decoration: none;
		background: rgba(255, 255, 255, 0.12);
	}
	.nav a.active {
		background: var(--brand-teal);
	}
	.nav .gh {
		display: inline-grid;
		place-items: center;
		padding: 0.4rem;
	}
	.nav-toggle {
		display: none;
		background: none;
		border: 0;
		color: var(--bg);
		cursor: pointer;
		padding: 0.4rem;
	}

	@media (max-width: 720px) {
		.brand-name {
			font-size: 1rem;
		}
		.nav-toggle {
			display: inline-grid;
			place-items: center;
		}
		.nav {
			display: none;
			position: absolute;
			left: 0;
			right: 0;
			top: 100%;
			flex-direction: column;
			align-items: stretch;
			background: var(--brand-plum);
			padding: 0.5rem 1rem 1rem;
			gap: 0.15rem;
		}
		.nav.open {
			display: flex;
		}
	}
</style>
