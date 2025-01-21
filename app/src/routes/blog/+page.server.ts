import { postsQuery as query, type Post } from '$lib/sanity/queries';
import type { PageServerLoad } from './$types';

export const prerender = false;

export const load: PageServerLoad = async (event) => {
    const { loadQuery } = event.locals;
    const initial = await loadQuery<Post[]>(query);

    return {
        query,
        options: { initial }
    };
};