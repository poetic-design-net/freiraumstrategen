import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ cookies }) => {
  return {
    preview: {
      secret: cookies.get('sanity-preview-secret'),
      perspective: cookies.get('sanity-preview-perspective')
    }
  };
};