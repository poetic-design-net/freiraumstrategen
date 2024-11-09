import * as server from '../entries/pages/_slug_/_page.server.ts.js';

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_slug_/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/[slug]/+page.server.ts";
export const imports = ["_app/immutable/nodes/3.L6Q0WaEl.js","_app/immutable/chunks/scheduler.Hmp2l1Hb.js","_app/immutable/chunks/index.iYw6vxA5.js","_app/immutable/chunks/client.DH9XjiO8.js","_app/immutable/chunks/preload-helper.D6kgxu3v.js","_app/immutable/chunks/index.BHOFYTYL.js","_app/immutable/chunks/ContentImageRenderer.C54kgE8k.js","_app/immutable/chunks/ImageRenderer.B1dk_h09.js","_app/immutable/chunks/utils.CH31fCbD.js"];
export const stylesheets = ["_app/immutable/assets/3.0RTB_NRo.css"];
export const fonts = [];
