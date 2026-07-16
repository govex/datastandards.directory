<script lang="ts">
	import { REPO } from '$lib/nav';
</script>

<svelte:head>
	<title>About — Open Data Standards Directory</title>
	<meta
		name="description"
		content="About the Open Data Standards Directory — a project of the Bloomberg Center for Government Excellence at Johns Hopkins University with Geothink / McGill University." />
</svelte:head>

<div class="container page">
	<h1>About</h1>

	<section>
		<h2>Acknowledgements</h2>
		<p>
			The Open Data Standards Directory is a project of the
			<a href="https://govex.jhu.edu" target="_blank" rel="noopener">Bloomberg Center for
				Government Excellence (GovEx)</a>
			at Johns Hopkins University, in partnership with
			<a href="https://geothink.ca" target="_blank" rel="noopener">Geothink</a> at McGill University
			and members of the open data community.
		</p>
		<p>
			It grew out of foundational research into open data standards and the contributions of many
			people across the open-government and civic-technology communities.
		</p>
	</section>

	<section>
		<h2>Development</h2>
		<p>
			The directory is an evolving, community-maintained resource. Its data now lives as open
			YAML files in the project's Git repository, and the site is a static build — anyone can
			propose additions or corrections.
		</p>
		<p>
			The source code and data are on
			<a href={REPO} target="_blank" rel="noopener">GitHub</a>. To suggest a new standard or an
			update, see the <a href="/contribute">contribute page</a>.
		</p>
		<p class="credits">
			Built with open tools and icons: typefaces from Google Fonts (PT Sans Narrow, Lato),
			category artwork from the Noun Project, and UI glyphs derived from the Feather icon set.
		</p>
	</section>

	<section class="comic">
		<h2>On the proliferation of standards</h2>
		<figure>
			<a href="https://xkcd.com/927/" target="_blank" rel="noopener">
				<img
					src="/images/xkcd-927-standards.png"
					width="500"
					height="283"
					loading="lazy"
					alt="xkcd comic #927 'Standards': faced with 14 competing standards, someone proposes a single universal standard to replace them all — resulting in 15 competing standards." />
			</a>
			<figcaption>
				“Standards” by Randall Munroe —
				<a href="https://xkcd.com/927/" target="_blank" rel="noopener">xkcd #927</a>, used under
				<a href="https://creativecommons.org/licenses/by-nc/2.5/" target="_blank" rel="noopener"
					>CC BY-NC 2.5</a>.
			</figcaption>
		</figure>
		<p>
			The comic captures the perennial hazard: faced with too many competing standards, someone
			sets out to unify them all — and merely adds one more to the pile. This directory takes the
			opposite tack: it helps you find and evaluate the standards that already exist, rather than
			inventing another.
		</p>
	</section>
</div>

<style>
	.page {
		padding: 1.5rem 0 2rem;
		max-width: 760px;
	}
	section {
		margin-top: 2rem;
	}
	.credits {
		color: var(--text-muted);
		font-size: 0.95rem;
	}
	.comic figure {
		margin: 0 0 1rem;
	}
	.comic img {
		max-width: 100%;
		height: auto;
		border: 1px solid var(--border);
		border-radius: var(--radius-sm);
		background: #fff;
		padding: 0.5rem;
	}
	.comic figcaption {
		margin-top: 0.5rem;
		font-size: 0.85rem;
		color: var(--text-muted);
	}
</style>
