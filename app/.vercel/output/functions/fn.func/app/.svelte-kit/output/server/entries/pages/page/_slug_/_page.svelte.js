import { c as create_ssr_component, b as escape, v as validate_component } from "../../../../chunks/ssr.js";
import { s as sanitizeText } from "../../../../chunks/utils2.js";
const PageHero = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { heroData } = $$props;
  const { title, subtitle, backgroundImage } = heroData;
  if ($$props.heroData === void 0 && $$bindings.heroData && heroData !== void 0) $$bindings.heroData(heroData);
  return `<section class="hero" style="${"background-image: url(" + escape(backgroundImage.asset.url, true) + ");"}"><div class="hero__content"><h1>${escape(sanitizeText(title))}</h1> <p>${escape(sanitizeText(subtitle))}</p></div></section>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  let hero = null;
  let title = "";
  console.log("Hero-Daten:", hero);
  if ($$props.data === void 0 && $$bindings.data && data !== void 0) $$bindings.data(data);
  ({ hero, title } = data?.data?.data || {});
  title = sanitizeText(title);
  return `<section class="page"><h1 class="page__title">${escape(title)}</h1> ${hero ? `${validate_component(PageHero, "PageHero").$$render($$result, { heroData: hero }, {}, {})}` : `<p data-svelte-h="svelte-1pw0fe3">Hero-Daten fehlen</p>`}</section>`;
});
export {
  Page as default
};
