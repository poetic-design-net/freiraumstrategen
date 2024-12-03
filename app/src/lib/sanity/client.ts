import { createClient } from '@sanity/client';
import { apiVersion, projectId, dataset, studioUrl } from '$lib/sanity/api';

export const client = createClient({
	projectId,
	dataset,
	apiVersion,
	useCdn: true, // Enable CDN for better performance
	perspective: 'published', // Only fetch published content
	token: import.meta.env.SANITY_API_READ_TOKEN, // Match the server-side variable name
	apiHost: 'https://api.sanity.io',
	stega: {
		studioUrl,
		enabled: process.env.NODE_ENV === 'development'
	}
});
