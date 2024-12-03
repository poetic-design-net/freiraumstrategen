import { landingPageQuery } from '$lib/sanity/queries';
import type { ServerLoad } from '@sveltejs/kit';
import { error } from '@sveltejs/kit';
import type { LandingPageData } from '$lib/sanity/queries/pages';
import { client } from '$lib/sanity/client';

// Configure prerendering
export const prerender = true;
export const trailingSlash = 'never';

// Get all possible landing page slugs for prerendering
export const entries = async () => {
    const slugs = await client.fetch(`*[_type == "landingPage" && !(_id in path("drafts.**"))].slug.current`);
    return slugs.map((slug: string) => ({ landingPage: slug }));
};

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
		if (!result) {
			console.error('Debug - No result from query:', {
				slug: landingPage,
				timestamp: new Date().toISOString()
			});
			throw error(404, `Page not found: ${landingPage}`);
		}

		// Basic validation without accessing potentially undefined properties
		const validationResult = validatePageData(result);
		if (!validationResult.valid) {
			console.error('Debug - Invalid page data:', {
				error: validationResult.error,
				timestamp: new Date().toISOString()
			});
			throw error(500, 'Invalid page data structure');
		}

		return {
			query: landingPageQuery,
			params: { slug: landingPage },
			options: { 
				initial: result,
				// Add cache control for better performance
				cache: {
					maxAge: 60, // Cache for 1 minute
					revalidate: true // Allow background revalidation
				}
			}
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

function validatePageData(data: unknown): { valid: boolean; error?: string } {
    try {
        if (!data || typeof data !== 'object') {
            return { valid: false, error: 'Data is not an object' };
        }

        // Use type assertion after basic check
        const record = data as Record<string, unknown>;

        // Check if required properties exist and have correct types
        if (!record.slug || typeof record.slug !== 'object') {
            return { valid: false, error: 'Missing or invalid slug object' };
        }

        const slug = record.slug as Record<string, unknown>;
        if (!slug.current || typeof slug.current !== 'string') {
            return { valid: false, error: 'Missing or invalid slug.current' };
        }

        return { valid: true };
    } catch (e) {
        return { valid: false, error: e instanceof Error ? e.message : 'Unknown validation error' };
    }
}
