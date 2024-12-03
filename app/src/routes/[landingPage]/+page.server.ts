import { landingPageQuery } from '$lib/sanity/queries';
import type { ServerLoad } from '@sveltejs/kit';
import { error } from '@sveltejs/kit';
import type { LandingPageData } from '$lib/sanity/queries/pages';

// Set cache control headers
export const config = {
	isr: {
		expiration: 0 // Disable caching
	}
};

export const load: ServerLoad = async (event) => {
	const { loadQuery } = event.locals;
	const { landingPage } = event.params;

	try {
		console.log('Debug - Attempting to fetch landing page:', {
			slug: landingPage,
			query: landingPageQuery
		});
		
		// Set no-cache headers
		event.setHeaders({
			'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
			'Pragma': 'no-cache',
			'Expires': '0'
		});

		const initial = await loadQuery(landingPageQuery, {
			slug: landingPage
		});

		console.log('Debug - Raw query result:', JSON.stringify(initial, null, 2));
		console.log('Debug - Query data:', initial?.data);

		// Check if we got any data back
		if (!initial?.data) {
			console.error('Debug - No data found for slug:', landingPage);
			throw error(404, `Page not found: ${landingPage}`);
		}

		return {
			query: landingPageQuery,
			params: { slug: landingPage },
			options: { initial }
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
