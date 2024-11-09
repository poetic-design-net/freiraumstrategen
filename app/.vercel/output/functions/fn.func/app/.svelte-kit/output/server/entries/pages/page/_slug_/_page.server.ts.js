import { b as pageQuery } from "../../../../chunks/queries.js";
const load = async ({ params, locals }) => {
  const { slug } = params;
  try {
    const data = await locals.loadQuery(pageQuery, { slug });
    return {
      data
    };
  } catch (error) {
    console.error("Fehler beim Laden der Seite:", error);
    return {
      status: 500,
      error: new Error("Fehler beim Laden der Seite")
    };
  }
};
export {
  load
};
