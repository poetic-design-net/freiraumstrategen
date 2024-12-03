import { client } from '$lib/sanity/client';
import { token } from '$lib/server/sanity/api';

export const serverClient = client.withConfig({
	token,
	useCdn: true,
	perspective: 'published',
	resultSourceMap: false, // Disable source maps to simplify response
	stega: {
		enabled: false // Disable stega in production
	}
});
