import { navigationQuery } from '$lib/sanity/queries';
import type { LayoutServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import { createCleanLoadQuery } from '$lib/sanity/cleanClient';

export const prerender = true;

export const load: LayoutServerLoad = async (event) => {
	const cleanLoadQuery = createCleanLoadQuery(event.locals.loadQuery);
	const navigationInitial = await cleanLoadQuery(navigationQuery);

	return {
		navigationQuery,
		navigationOptions: { 
			initial: navigationInitial
		}
	};
};
