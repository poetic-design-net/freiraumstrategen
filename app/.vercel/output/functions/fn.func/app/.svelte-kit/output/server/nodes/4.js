import * as server from '../entries/pages/blog/_page.server.ts.js';

export const index = 4;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/blog/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/blog/+page.server.ts";
export const imports = ["_app/immutable/nodes/4.DMAMwMTi.js","_app/immutable/chunks/scheduler.BW_PoDdS.js","_app/immutable/chunks/index.BwpyxmsR.js","_app/immutable/chunks/client.DHnIaJ3r.js","_app/immutable/chunks/preload-helper.D6kgxu3v.js","_app/immutable/chunks/index.DSSdDI7u.js","_app/immutable/chunks/ImageRenderer.Bqq1SBUE.js","_app/immutable/chunks/utils.CH31fCbD.js"];
export const stylesheets = [];
export const fonts = [];
