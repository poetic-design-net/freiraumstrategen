import { faqQuery as query, type Faq } from '$lib/sanity/queries';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
    const { loadQuery } = event.locals;
    const initial = await loadQuery<Faq[]>(query);

    return {
        query,
        options: { initial }
    };
};