import { redirect } from '@sveltejs/kit';

export const GET = async ({ cookies }) => {
  cookies.delete('preview', { path: '/' });
  throw redirect(302, '/');
};
