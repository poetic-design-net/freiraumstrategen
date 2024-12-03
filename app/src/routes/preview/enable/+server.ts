import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url }) => {
  const secret = url.searchParams.get('sanity-preview-secret');
  const perspective = url.searchParams.get('sanity-preview-perspective');
  const pathname = url.searchParams.get('sanity-preview-pathname');

  if (!secret || !perspective || !pathname) {
    return new Response('Missing required parameters', { status: 400 });
  }

  return json(
    { message: 'Preview mode enabled' },
    {
      headers: {
        'Set-Cookie': [
          `sanity-preview-secret=${secret}; Path=/; HttpOnly; SameSite=Lax`,
          `sanity-preview-perspective=${perspective}; Path=/; HttpOnly; SameSite=Lax`,
        ].join(', '),
      },
    }
  );
};
