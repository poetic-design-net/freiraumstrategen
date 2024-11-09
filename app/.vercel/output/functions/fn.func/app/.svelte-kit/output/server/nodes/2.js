import * as server from '../entries/pages/_page.server.ts.js';

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/+page.server.ts";
export const imports = ["_app/immutable/nodes/2.tOFmQ4tx.js","_app/immutable/chunks/scheduler.BW_PoDdS.js","_app/immutable/chunks/index.BwpyxmsR.js","_app/immutable/chunks/client.DHnIaJ3r.js","_app/immutable/chunks/preload-helper.D6kgxu3v.js","_app/immutable/chunks/index.DSSdDI7u.js","_app/immutable/chunks/ImageRenderer.Bqq1SBUE.js","_app/immutable/chunks/utils.CH31fCbD.js"];
export const stylesheets = ["_app/immutable/assets/2.CsfmSRoo.css"];
export const fonts = [];
