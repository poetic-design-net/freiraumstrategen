import { client } from '$lib/sanity/client';
import { token } from '$lib/server/sanity/api';

export const serverClient = client.withConfig({
	token,
	useCdn: true, // Enable CDN for better performance
	perspective: 'published', // Only fetch published content
	stega: {
		enabled: process.env.NODE_ENV === 'development'
	}
});
