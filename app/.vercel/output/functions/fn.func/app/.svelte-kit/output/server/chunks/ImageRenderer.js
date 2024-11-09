import { c as create_ssr_component, a as add_attribute, b as escape } from "./ssr.js";
import imageUrlBuilder from "@sanity/image-url";
import { c as client } from "./client.js";
const builder = imageUrlBuilder(client);
function urlFor(source) {
  return builder.image(source).auto("format").fit("max");
}
function sanitizeText(text) {
  return text ? text.replace(/[^\w\s]/gi, "").trim() : "";
}
function getAspectRatio() {
  if (typeof window !== "undefined") {
    const width = window.innerWidth;
    if (width < 640) return 4 / 3;
    if (width < 1024) return 16 / 9;
    return 16 / 9;
  }
  return 16 / 9;
}
const ImageRenderer = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let aspectRatio;
  let imageAsset;
  let { value } = $$props;
  if ($$props.value === void 0 && $$bindings.value && value !== void 0) $$bindings.value(value);
  aspectRatio = getAspectRatio();
  imageAsset = value?.asset?._ref;
  return ` ${value && imageAsset && urlFor ? `<figure><img class="w-full h-auto object-cover rounded-lg shadow-md mx-auto max-w-4xl"${add_attribute("src", urlFor(value).width(1200).height(Math.round(1200 / aspectRatio)).fit("crop").crop("focalpoint").focalPoint(value.hotspot?.x, value.hotspot?.y).auto("format").url(), 0)}${add_attribute("alt", sanitizeText(value.alt), 0)}> ${value.caption ? `<figcaption class="text-center text-sm mt-2 text-gray-600">${escape(value.caption)}</figcaption>` : ``}</figure>` : `<p class="error-message" data-svelte-h="svelte-gbyab">Bild nicht verfügbar</p>`}`;
});
export {
  ImageRenderer as I,
  urlFor as u
};
