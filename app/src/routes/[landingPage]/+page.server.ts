import { landingPageQuery } from '$lib/sanity/queries';
import type { ServerLoad } from '@sveltejs/kit';

export const load: ServerLoad = async (event) => {
	const { loadQuery } = event.locals;
	const { landingPage } = event.params;

	const initial = await loadQuery(landingPageQuery, {
		slug: landingPage
	});

	return {
		query: landingPageQuery,
		params: { slug: landingPage },
		options: { initial }
	};
};
