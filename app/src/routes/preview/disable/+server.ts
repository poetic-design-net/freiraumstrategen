import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
  return json(
    { message: 'Preview mode disabled' },
    {
      headers: {
        'Set-Cookie': [
          'sanity-preview-secret=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0',
          'sanity-preview-perspective=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0',
        ].join(', '),
      },
    }
  );
};
