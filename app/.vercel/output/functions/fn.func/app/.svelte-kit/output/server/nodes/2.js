import * as server from '../entries/pages/_page.server.ts.js';

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/+page.server.ts";
export const imports = ["_app/immutable/nodes/2.BU4l6Jbr.js","_app/immutable/chunks/scheduler.Hmp2l1Hb.js","_app/immutable/chunks/index.iYw6vxA5.js","_app/immutable/chunks/client.DH9XjiO8.js","_app/immutable/chunks/preload-helper.D6kgxu3v.js","_app/immutable/chunks/index.BHOFYTYL.js","_app/immutable/chunks/ImageRenderer.B1dk_h09.js","_app/immutable/chunks/utils.CH31fCbD.js","_app/immutable/chunks/index.BRi1mU7R.js"];
export const stylesheets = ["_app/immutable/assets/2.CsfmSRoo.css"];
export const fonts = [];
