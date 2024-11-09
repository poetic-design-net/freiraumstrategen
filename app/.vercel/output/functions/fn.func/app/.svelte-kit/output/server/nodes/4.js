import * as server from '../entries/pages/page/_slug_/_page.server.ts.js';

export const index = 4;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/page/_slug_/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/page/[slug]/+page.server.ts";
export const imports = ["_app/immutable/nodes/4.4V2LBlmd.js","_app/immutable/chunks/scheduler.Hmp2l1Hb.js","_app/immutable/chunks/index.iYw6vxA5.js","_app/immutable/chunks/utils.CH31fCbD.js"];
export const stylesheets = [];
export const fonts = [];
