import * as server from '../entries/pages/_slug_/_page.server.ts.js';

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_slug_/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/[slug]/+page.server.ts";
export const imports = ["_app/immutable/nodes/3.B8JJlb8k.js","_app/immutable/chunks/scheduler.BW_PoDdS.js","_app/immutable/chunks/index.BwpyxmsR.js","_app/immutable/chunks/client.DHnIaJ3r.js","_app/immutable/chunks/preload-helper.D6kgxu3v.js","_app/immutable/chunks/index.DSSdDI7u.js","_app/immutable/chunks/ContentImageRenderer.CiaMo0MB.js","_app/immutable/chunks/ImageRenderer.Bqq1SBUE.js","_app/immutable/chunks/utils.CH31fCbD.js"];
export const stylesheets = ["_app/immutable/assets/3.0RTB_NRo.css"];
export const fonts = [];
