import { createRequestHandler, setServerClient } from '@sanity/svelte-loader';
import { serverClient } from '$lib/server/sanity/client';
import { cleanObject } from '$lib/utils/textCleaner';
import type { LoadQuery } from '@sanity/svelte-loader';
import { redirect } from '@sveltejs/kit';

// Sets the client to be used by `loadQuery` when fetching data on the server.
setServerClient(serverClient);

const handler = createRequestHandler();

function wrapLoadQuery(loadQuery: LoadQuery): LoadQuery {
    return function wrappedLoadQuery(query: string, params?: Record<string, unknown>) {
        return loadQuery(query, params).then(cleanObject);
    } as LoadQuery;
}

export const handle = async ({ event, resolve }) => {
    // Wrap loadQuery with cleaning functionality
    if (event.locals.loadQuery) {
        event.locals.loadQuery = wrapLoadQuery(event.locals.loadQuery);
    }

    const path = event.url.pathname;
    const isAsset = path.startsWith('/assets/') || path.startsWith('/saturn-assets/');
    const isApi = path.startsWith('/api/');
    const isDev = process.env.NODE_ENV === 'development';

    // Erlaube Assets und API-Zugriffe
    if (isAsset || isApi) {
        const response = await handler({ event, resolve });
        event.locals.mutate = serverClient.mutate.bind(serverClient);
        return response;
    }

    // Im Produktionsmodus: Alle Pfade außer /summer-academy zur Summer-Academy weiterleiten
    if (!isDev && path !== '/summer-academy' && !isAsset && !isApi) {
        throw redirect(307, '/summer-academy');
    }

    // Run Sanity handler
    const response = await handler({ event, resolve });
    
    // Add mutate to locals
    event.locals.mutate = serverClient.mutate.bind(serverClient);
    
    return response;
};
