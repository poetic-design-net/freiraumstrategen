import { navigationQuery } from '$lib/sanity/queries';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async (event) => {
	const { loadQuery } = event.locals;
	const navigationInitial = await loadQuery(navigationQuery);

	return {
		navigationQuery,
		navigationOptions: {
			initial: navigationInitial
		}
	};
};

