import { frontpageQuery, testimonialsQuery, postsQuery } from '$lib/sanity/queries';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	const { loadQuery } = event.locals;
	const frontpageInitial = await loadQuery(frontpageQuery);
	const testimonialsInitial = await loadQuery(testimonialsQuery);
	const postsInitial = await loadQuery(postsQuery);

	return {
		frontpageQuery,
		frontpageOptions: { 
			initial: frontpageInitial
		},
		testimonialsQuery,
		testimonialsOptions: { 
			initial: testimonialsInitial,
			cache: false
		},
		postsQuery,
		postsOptions: {
			initial: postsInitial
		}
	};
};
