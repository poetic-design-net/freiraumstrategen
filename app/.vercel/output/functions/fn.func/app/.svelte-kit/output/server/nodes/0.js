import * as universal from '../entries/pages/_layout.ts.js';
import * as server from '../entries/pages/_layout.server.ts.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+layout.ts";
export { server };
export const server_id = "src/routes/+layout.server.ts";
export const imports = ["_app/immutable/nodes/0.CJHoWVFK.js","_app/immutable/chunks/index.DSSdDI7u.js","_app/immutable/chunks/scheduler.BW_PoDdS.js","_app/immutable/chunks/index.BwpyxmsR.js","_app/immutable/chunks/stores.j_u9gIUz.js","_app/immutable/chunks/entry.D6oZpisd.js","_app/immutable/chunks/client.DHnIaJ3r.js","_app/immutable/chunks/preload-helper.D6kgxu3v.js"];
export const stylesheets = ["_app/immutable/assets/0.mbgCN2mN.css"];
export const fonts = [];
