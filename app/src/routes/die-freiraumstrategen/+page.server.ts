import { postsQuery as query, testimonialsQuery, teamSectionQuery, type Post, type TeamSectionResponse } from '$lib/sanity/queries';
import type { PageServerLoad } from './$types';

export const prerender = false;

export const load: PageServerLoad = async (event) => {
	const { loadQuery } = event.locals;
	const initial = await loadQuery<Post[]>(query);
	const testimonialsInitial = await loadQuery(testimonialsQuery);
	const teamSectionInitial = await loadQuery<TeamSectionResponse>(teamSectionQuery);

	console.log('Server-side testimonials:', testimonialsInitial); // Debug-Log
	console.log('Server-side team section:', teamSectionInitial); // Debug-Log

	return {
		query,
		options: { initial },
		testimonialsQuery,
		testimonialsOptions: { 
			initial: testimonialsInitial,
			cache: false // Cache deaktivieren für Testzwecke
		},
		teamSectionQuery,
		teamSectionOptions: {
			initial: teamSectionInitial
		}
	};
};
