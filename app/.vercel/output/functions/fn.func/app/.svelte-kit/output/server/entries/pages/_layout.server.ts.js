import { n as navigationQuery } from "../../chunks/queries.js";
const load = async (event) => {
  const { loadQuery } = event.locals;
  const navigationInitial = await loadQuery(navigationQuery);
  return {
    navigationQuery,
    navigationOptions: {
      initial: navigationInitial
    }
  };
};
export {
  load
};
