<script lang="ts">
	import Icon from '$lib/components/Icon.svelte';
	import { issueForm, REPO } from '$lib/nav';
</script>

<svelte:head>
	<title>Contribute — Open Data Standards Directory</title>
	<meta
		name="description"
		content="Add a new open data standard, suggest an update, or send feedback. Contributions are handled as GitHub issues." />
</svelte:head>

<div class="container page">
	<h1>Contribute</h1>
	<p class="lead">
		The directory is community-maintained and its data lives as open files on GitHub. Use a form
		below to propose a change — each one opens a pre-structured GitHub issue that a maintainer
		reviews and turns into a data update. A free GitHub account is required.
	</p>

	<div class="cards">
		<a class="card" href={issueForm.add} target="_blank" rel="noopener">
			<h2>Add a standard</h2>
			<p>Propose a new open data standard to include in the directory.</p>
			<span class="go">Open the form <Icon name="arrow-right" size={16} /></span>
		</a>
		<a class="card" href={issueForm.update()} target="_blank" rel="noopener">
			<h2>Update a standard</h2>
			<p>Suggest a correction or update to a standard that's already listed.</p>
			<span class="go">Open the form <Icon name="arrow-right" size={16} /></span>
		</a>
		<a class="card" href={issueForm.feedback} target="_blank" rel="noopener">
			<h2>Feedback / contact</h2>
			<p>Ask a question or share general feedback about the directory.</p>
			<span class="go">Open the form <Icon name="arrow-right" size={16} /></span>
		</a>
	</div>

	<p class="fallback">
		Prefer not to use a form? You can
		<a href="{REPO}/issues" target="_blank" rel="noopener">browse or open an issue directly</a> on
		GitHub.
	</p>
</div>

<style>
	.page {
		padding: 1.5rem 0 2rem;
	}
	.lead {
		color: var(--text-muted);
		max-width: 68ch;
	}
	.cards {
		display: grid;
		gap: 1.25rem;
		grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
		margin-top: 1.5rem;
	}
	.card {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		background: var(--surface);
		border: 1px solid var(--border);
		border-top: 4px solid var(--brand-teal);
		border-radius: var(--radius);
		padding: 1.4rem;
		color: var(--text);
		box-shadow: var(--shadow-sm);
		transition: box-shadow 0.15s ease, transform 0.15s ease;
	}
	.card:hover {
		text-decoration: none;
		box-shadow: var(--shadow-md);
		transform: translateY(-2px);
	}
	.card h2 {
		margin: 0;
		font-size: 1.3rem;
	}
	.card p {
		margin: 0;
		color: var(--text-muted);
	}
	.go {
		margin-top: auto;
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
		font-weight: 700;
		color: var(--brand-teal-dark);
	}
	.fallback {
		margin-top: 2rem;
		color: var(--text-muted);
	}
</style>
