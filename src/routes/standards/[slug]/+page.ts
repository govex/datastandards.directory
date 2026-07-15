import { error } from '@sveltejs/kit';
import { standards, bySlug } from '$lib/data/standards';
import type { EntryGenerator, PageLoad } from './$types';

export const prerender = true;

// Enumerate every standard so adapter-static prerenders one page per slug.
export const entries: EntryGenerator = () => standards.map((s) => ({ slug: s.slug }));

export const load: PageLoad = ({ params }) => {
	const standard = bySlug.get(params.slug);
	if (!standard) throw error(404, `No standard found for "${params.slug}"`);
	return { standard };
};
