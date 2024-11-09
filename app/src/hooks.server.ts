import { createRequestHandler, setServerClient } from '@sanity/svelte-loader';
import { serverClient } from '$lib/server/sanity/client';

// Sets the client to be used by `loadQuery` when fetching data on the server.
// The loader will handle setting the correct fetch parameters, including
// perspective. This isn't a hook, but it's a good place to call this function
// as this file is executed once per app initialization.
setServerClient(serverClient);

// This convenience function sets up preview mode endpoints and attaches useful
// helpers to the `event.locals` Svelte object, such as a preconfigured
const handler = createRequestHandler();

export const handle = async ({ event, resolve }) => {
    // Erst Sanity-Handler ausführen
    const response = await handler({ event, resolve });
    
    // Dann mutate zu locals hinzufügen
    event.locals.mutate = serverClient.mutate.bind(serverClient);
    
    return response;
};