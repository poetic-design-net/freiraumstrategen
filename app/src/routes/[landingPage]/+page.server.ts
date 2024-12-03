import { landingPageQuery } from '$lib/sanity/queries';
import type { ServerLoad } from '@sveltejs/kit';
import { error } from '@sveltejs/kit';
import type { LandingPageData } from '$lib/sanity/queries/pages';

export const load: ServerLoad = async (event) => {
	const { loadQuery } = event.locals;
	const { landingPage } = event.params;

	try {
		console.log('Debug - Attempting to fetch landing page:', {
			slug: landingPage,
			query: landingPageQuery
		});

		const result = await loadQuery(landingPageQuery, {
			slug: landingPage
		});

		console.log('Debug - Server load result:', {
			hasResult: !!result,
			resultData: result,
			slug: landingPage
		});

		// Check if we got any data back
		if (!result) {
			console.error('Debug - No result from query for slug:', landingPage);
			throw error(404, `Page not found: ${landingPage}`);
		}

		// Pass the raw result directly to the client
		return {
			query: landingPageQuery,
			params: { slug: landingPage },
			options: { initial: result }
		};
	} catch (err) {
		console.error('Debug - Error loading landing page:', {
			error: err,
			slug: landingPage,
			stack: err instanceof Error ? err.stack : undefined
		});
		
		// Check if it's a SvelteKit error with a status property
		if (err && typeof err === 'object' && 'status' in err) {
			throw err;
		}
		
		// Otherwise throw a generic error
		throw error(500, 'Error loading page');
	}
};
