<footer class="site-footer">
	<div class="container inner">
		<div class="partners">
			<a href="https://govex.jhu.edu" target="_blank" rel="noopener">
				<img src="/images/govex.png" alt="GovEx — Bloomberg Center for Government Excellence" height="26" />
			</a>
			<a href="https://geothink.ca" target="_blank" rel="noopener">
				<img src="/images/geothink.png" alt="Geothink" height="26" />
			</a>
		</div>
		<p class="colophon">
			A project of the Bloomberg Center for Government Excellence at Johns Hopkins University, with
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
		gap: 1.1rem;
		align-items: center;
		background: var(--bg);
		padding: 0.45rem 0.8rem;
		border-radius: var(--radius);
	}
	.partners img {
		display: block;
		height: 26px;
		width: auto;
	}
	.colophon {
		margin: 0;
		max-width: 60ch;
		font-size: 0.9rem;
		color: rgba(255, 255, 255, 0.8);
	}
</style>
