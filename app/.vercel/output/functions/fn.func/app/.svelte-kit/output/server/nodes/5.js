import * as server from '../entries/pages/page/_slug_/_page.server.ts.js';

export const index = 5;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/page/_slug_/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/page/[slug]/+page.server.ts";
export const imports = ["_app/immutable/nodes/5.CqgzChdh.js","_app/immutable/chunks/scheduler.BW_PoDdS.js","_app/immutable/chunks/index.BwpyxmsR.js","_app/immutable/chunks/utils.CH31fCbD.js"];
export const stylesheets = [];
export const fonts = [];
