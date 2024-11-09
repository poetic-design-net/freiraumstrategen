import { w, E } from "./index3.js";
import { a as assertEnvVar, c as client } from "./client.js";
const SANITY_API_READ_TOKEN = "sknH4OLPy4UgkZnfk86uK8vkt1o9RotyiU56HFyGNui6t64ZXyICRWHKHlNcTZNt2oO1KOPKF4UqQs7VNYIDJMfQqgKG8VLFnMyIOGedwcQUsC7YwrlbYzQsMYMIacS9tRZef7569qdSVVeIdLYb5bsytgparasQc4XWjopPA8BouKVet8bX";
const token = assertEnvVar(SANITY_API_READ_TOKEN, "SANITY_API_READ_TOKEN");
const serverClient = client.withConfig({
  token,
  useCdn: false,
  stega: true
});
w(serverClient);
const handler = E();
const handle = async ({ event, resolve }) => {
  const response = await handler({ event, resolve });
  event.locals.mutate = serverClient.mutate.bind(serverClient);
  return response;
};
export {
  handle
};
