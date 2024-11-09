import * as server from '../entries/pages/post/_slug_/_page.server.ts.js';

export const index = 6;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/post/_slug_/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/post/[slug]/+page.server.ts";
export const imports = ["_app/immutable/nodes/6.D6yualMD.js","_app/immutable/chunks/scheduler.BW_PoDdS.js","_app/immutable/chunks/index.BwpyxmsR.js","_app/immutable/chunks/client.DHnIaJ3r.js","_app/immutable/chunks/preload-helper.D6kgxu3v.js","_app/immutable/chunks/index.DSSdDI7u.js","_app/immutable/chunks/ContentImageRenderer.CiaMo0MB.js","_app/immutable/chunks/ImageRenderer.Bqq1SBUE.js","_app/immutable/chunks/utils.CH31fCbD.js"];
export const stylesheets = [];
export const fonts = [];
