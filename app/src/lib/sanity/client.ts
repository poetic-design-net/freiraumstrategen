import { createClient } from '@sanity/client';
import { apiVersion, projectId, dataset, studioUrl } from '$lib/sanity/api';

export const client = createClient({
	projectId,
	dataset,
	apiVersion,
	useCdn: true,
	perspective: 'published',
	token: import.meta.env.SANITY_API_READ_TOKEN,
	apiHost: 'https://api.sanity.io',
	resultSourceMap: false, // Disable source maps to simplify response
	stega: {
		studioUrl,
		enabled: false // Disable stega in production
	}
});
