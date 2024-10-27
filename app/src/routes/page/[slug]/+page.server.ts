import { pageQuery } from '$lib/sanity/queries';
import type { PageData } from './$types';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, locals }) => {
  const { slug } = params;

  try {
    const data: PageData = await locals.loadQuery(pageQuery, { slug });

    return {
      data,
    };
  } catch (error) {
    console.error('Fehler beim Laden der Seite:', error);
    return {
      status: 500,
      error: new Error('Fehler beim Laden der Seite'),
    };
  }
};
