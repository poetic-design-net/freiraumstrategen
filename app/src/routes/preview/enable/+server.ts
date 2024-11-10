import { redirect } from '@sveltejs/kit';

export const GET = async ({ cookies, url }) => {
  cookies.set('preview', 'true', { path: '/' });
  throw redirect(302, url.searchParams.get('redirect') || '/');
};
