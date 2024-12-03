import { client } from '$lib/sanity/client';
import { faqQuery } from '$lib/sanity/queries';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  const faq = await client.fetch(faqQuery);
  
  return {
    faq
  };
};
