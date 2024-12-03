import { landingPageQuery } from '$lib/sanity/queries';
import type { ServerLoad } from '@sveltejs/kit';
import { error } from '@sveltejs/kit';
import type { LandingPageData } from '$lib/sanity/queries/pages';

// Configure prerendering
export const prerender = 'auto';
export const trailingSlash = 'never';

export const load: ServerLoad = async (event) => {
	const { loadQuery } = event.locals;
	const { landingPage } = event.params;

	try {
		// Add more detailed logging
		console.log('Debug - Server load start:', {
			slug: landingPage,
			timestamp: new Date().toISOString(),
			url: event.url.toString()
		});

		const result = await loadQuery<LandingPageData>(landingPageQuery, {
			slug: landingPage
		});

		// Detailed result logging
		console.log('Debug - Server load result:', {
			hasResult: !!result,
			resultType: result ? typeof result : 'null',
			timestamp: new Date().toISOString(),
			slug: landingPage,
			data: result
		});

		// More specific error handling
		if (!result?.data) {
			console.error('Debug - No result from query:', {
				slug: landingPage,
				timestamp: new Date().toISOString()
			});
			throw error(404, `Page not found: ${landingPage}`);
		}

		const pageData = result.data;

		return {
			query: landingPageQuery,
			params: { slug: landingPage },
			initial: result
		};
	} catch (err) {
		console.error('Debug - Error loading landing page:', {
			error: err,
			slug: landingPage,
			stack: err instanceof Error ? err.stack : undefined,
			timestamp: new Date().toISOString()
		});
		
		// Check if it's a SvelteKit error with a status property
		if (err && typeof err === 'object' && 'status' in err) {
			throw err;
		}
		
		// Otherwise throw a generic error
		throw error(500, 'Error loading page');
	}
};
