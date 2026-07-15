<script lang="ts">
	import { REPO } from '$lib/nav';
</script>

<footer class="site-footer">
	<div class="container inner">
		<div class="partners">
			<a href="https://govex.jhu.edu" target="_blank" rel="noopener">
				<img src="/images/govex.png" alt="GovEx — Center for Government Excellence" height="42" />
			</a>
			<a href="https://geothink.ca" target="_blank" rel="noopener">
				<img src="/images/geothink.png" alt="Geothink" height="42" />
			</a>
		</div>
		<nav class="links" aria-label="Footer">
			<a href="/about">About</a>
			<a href="/glossary">Glossary</a>
			<a href={REPO} target="_blank" rel="noopener">GitHub</a>
		</nav>
		<p class="colophon">
			A project of the Center for Government Excellence at Johns Hopkins University, with
			Geothink / McGill University and the open data community.
		</p>
	</div>
</footer>

<style>
	.site-footer {
		background: var(--brand-plum);
		color: var(--bg);
		margin-top: 4rem;
		padding: 2rem 0;
	}
	.inner {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		align-items: center;
		text-align: center;
	}
	.partners {
		display: flex;
		gap: 1.5rem;
		align-items: center;
		background: var(--bg);
		padding: 0.6rem 1rem;
		border-radius: var(--radius);
	}
	.links {
		display: flex;
		gap: 1.25rem;
		flex-wrap: wrap;
		justify-content: center;
	}
	.links a {
		color: var(--brand-gold);
		font-family: var(--font-heading);
		font-weight: 700;
		letter-spacing: 0.02em;
	}
	.colophon {
		margin: 0;
		max-width: 60ch;
		font-size: 0.9rem;
		color: rgba(255, 255, 255, 0.8);
	}
</style>
