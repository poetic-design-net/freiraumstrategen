import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { client } from '$lib/sanity/client';

export const POST: RequestHandler = async ({ params }) => {
    try {
        await client
            .patch(params.id)
            .setIfMissing({ likes: 0 })
            .inc({ likes: 1 })
            .commit();

        return json({ success: true });
    } catch (error) {
        console.error('Server error:', error);
        return new Response('Internal Server Error', { status: 500 });
    }
}; 