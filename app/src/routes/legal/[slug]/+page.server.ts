import { error } from '@sveltejs/kit';
import type { RequestEvent } from './$types';
import type { LegalPage } from './types';

const query = `*[_type == "legal" && slug.current == $slug][0]{
  title,
  content
}`;

export const load = async (event: RequestEvent) => {
  const { loadQuery } = event.locals;
  const { slug } = event.params;

  // Only allow specific legal routes
  const validRoutes = ['datenschutz', 'agb', 'impressum'];
  if (!validRoutes.includes(slug)) {
    throw error(404, 'Page not found');
  }

  const queryParams = { slug };
  const initial = await loadQuery<LegalPage>(query, queryParams);

  if (!initial) {
    throw error(404, 'Legal page not found');
  }

  return {
    query,
    params: queryParams,
    options: { initial }
  };
};
