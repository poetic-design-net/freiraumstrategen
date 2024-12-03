import { createRequestHandler, setServerClient } from '@sanity/svelte-loader';
import { serverClient } from '$lib/server/sanity/client';
import { cleanObject } from '$lib/utils/textCleaner';
import type { LoadQuery } from '@sanity/svelte-loader';

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

    // Run Sanity handler
    const response = await handler({ event, resolve });
    
    // Add mutate to locals
    event.locals.mutate = serverClient.mutate.bind(serverClient);
    
    return response;
};
