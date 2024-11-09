import { p as postsQuery, t as testimonialsQuery } from "../../chunks/queries.js";
const load = async (event) => {
  const { loadQuery } = event.locals;
  const initial = await loadQuery(postsQuery);
  const testimonialsInitial = await loadQuery(testimonialsQuery);
  console.log("Server-side testimonials:", testimonialsInitial);
  return {
    query: postsQuery,
    options: { initial },
    testimonialsQuery,
    testimonialsOptions: {
      initial: testimonialsInitial,
      cache: false
      // Cache deaktivieren für Testzwecke
    }
  };
};
export {
  load
};
