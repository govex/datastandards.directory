/** Repo used for GitHub Issue-Form contribution links. */
export const REPO = 'https://github.com/govex/datastandards.directory';

/** Deep links to the structured GitHub issue forms. */
export const issueForm = {
	add: `${REPO}/issues/new?template=add-standard.yml`,
	feedback: `${REPO}/issues/new?template=feedback.yml`,
	/** Prefills the `standard` field when arriving from a standard's page. */
	update: (standard?: string) =>
		`${REPO}/issues/new?template=update-standard.yml` +
		(standard ? `&standard=${encodeURIComponent(standard)}` : '')
};

export const NAV = [
	{ href: '/standards', label: 'Standards' },
	{ href: '/categories', label: 'Categories' },
	{ href: '/glossary', label: 'Glossary' },
	{ href: '/about', label: 'About' },
	{ href: '/contribute', label: 'Contribute' }
];
