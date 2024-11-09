import * as universal from '../entries/pages/_layout.ts.js';
import * as server from '../entries/pages/_layout.server.ts.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+layout.ts";
export { server };
export const server_id = "src/routes/+layout.server.ts";
export const imports = ["_app/immutable/nodes/0.ML9UhPvq.js","_app/immutable/chunks/index.BHOFYTYL.js","_app/immutable/chunks/scheduler.Hmp2l1Hb.js","_app/immutable/chunks/index.iYw6vxA5.js","_app/immutable/chunks/stores.Cxj9Ek1o.js","_app/immutable/chunks/entry.dzAJf9_n.js","_app/immutable/chunks/client.DH9XjiO8.js","_app/immutable/chunks/preload-helper.D6kgxu3v.js","_app/immutable/chunks/index.BRi1mU7R.js"];
export const stylesheets = ["_app/immutable/assets/0.DTX1Re-O.css"];
export const fonts = [];
