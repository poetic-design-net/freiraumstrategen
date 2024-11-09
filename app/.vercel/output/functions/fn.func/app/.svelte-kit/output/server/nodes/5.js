import * as server from '../entries/pages/post/_slug_/_page.server.ts.js';

export const index = 5;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/post/_slug_/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/post/[slug]/+page.server.ts";
export const imports = ["_app/immutable/nodes/5.hz81qpeS.js","_app/immutable/chunks/scheduler.Hmp2l1Hb.js","_app/immutable/chunks/index.iYw6vxA5.js","_app/immutable/chunks/client.DH9XjiO8.js","_app/immutable/chunks/preload-helper.D6kgxu3v.js","_app/immutable/chunks/index.BHOFYTYL.js","_app/immutable/chunks/ContentImageRenderer.C54kgE8k.js","_app/immutable/chunks/ImageRenderer.B1dk_h09.js","_app/immutable/chunks/utils.CH31fCbD.js"];
export const stylesheets = [];
export const fonts = [];
