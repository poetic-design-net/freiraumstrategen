import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request, locals }) => {
    try {
        const { postId } = await request.json();
        
        if (!postId) {
            return json({ error: 'Post ID ist erforderlich' }, { status: 400 });
        }

        const mutation = await locals.mutate([{
            patch: {
                id: postId,
                inc: { likes: 1 }
            }
        }]);

        return json({
            success: true,
            likes: mutation.likes
        });
    } catch (error) {
        console.error('Like-Update fehlgeschlagen:', error);
        return json(
            { error: 'Interner Server-Fehler' }, 
            { status: 500 }
        );
    }
};