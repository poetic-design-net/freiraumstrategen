import { s as subscribe } from "../../../chunks/utils.js";
import { c as create_ssr_component, a as add_attribute, v as validate_component, b as escape, e as each } from "../../../chunks/ssr.js";
import { y } from "../../../chunks/index3.js";
import { I as ImageRenderer, u as urlFor } from "../../../chunks/ImageRenderer.js";
import { f as formatDate, s as sanitizeText } from "../../../chunks/utils2.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let posts;
  let $q, $$unsubscribe_q;
  let { data } = $$props;
  const q = y(data);
  $$unsubscribe_q = subscribe(q, (value) => $q = value);
  if ($$props.data === void 0 && $$bindings.data && data !== void 0) $$bindings.data(data);
  ({ data: posts } = $q);
  {
    console.log("Ein Post:", posts?.[0]?.mainImage);
  }
  $$unsubscribe_q();
  return `<section class="relative py-20 overflow-hidden"><img class="absolute top-0 right-0 xl:mt-10 -mr-24 lg:-mr-0" src="saturn-assets/images/blog/star-circle-right.svg" alt=""> <img class="hidden sm:block absolute bottom-0 left-0 -mb-48 lg:mb-0" src="saturn-assets/images/blog/blue-light-left.png" alt=""> <div class="relative container px-4 mx-auto"><div class="max-w-xl lg:max-w-7xl mx-auto"><div class="max-w-2xl mx-auto mb-16 text-center" data-svelte-h="svelte-md07ov"><span class="inline-block py-1 px-3 mb-4 text-xs font-semibold text-primary-900 bg-primary-50 rounded-full">BLOG</span> <h1 class="font-heading text-5xl xs:text-6xl md:text-7xl font-bold text-dark"><span>News und</span> <span class="font-thin">Artikel</span></h1></div>  <div class="flex flex-wrap -mx-4 mb-18 ">${posts && posts[0] ? `<div class="w-full lg:w-1/2 px-4 mb-12 lg:mb-0"><a class="block group w-full"${add_attribute("href", `/post/${posts[0].slug.current}`, 0)}>${validate_component(ImageRenderer, "ImageRenderer").$$render($$result, { value: posts[0].mainImage }, {}, {})} <div class="flex my-4 items-center"><span class="inline-block py-1 px-3 text-xs font-medium text-primary-900 bg-primary-50 rounded-full s-iFvCgFMopxZa">${escape(posts[0].category.title)}</span> <span class="inline-block mx-4" data-svelte-h="svelte-17jnbxr"><svg width="1" height="24" viewBox="0 0 1 24" fill="none" xmlns="http://www.w3.org/2000/svg"><line x1="0.5" y1="2.18558e-08" x2="0.499999" y2="24" stroke="#3B5444"></line></svg></span> <span class="text-xs">${escape(formatDate(posts[0]._createdAt))}</span> <span class="mx-3" data-svelte-h="svelte-1li4ws5"><svg width="4" height="4" viewBox="0 0 4 4" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="2" cy="2" r="2" fill="#4B6354"></circle></svg></span></div> <h4 class="text-3xl font-medium group-hover:text-primary-800 mb-3">${escape(posts[0].title)}</h4> <p class="max-w-xl text-lg text-gray-700">${escape(posts[0].excerpt)}</p></a></div>` : ``} <div class="w-full lg:w-1/2 px-4 rounded-lg">${each(posts.slice(1, 4), (post) => {
    return `<a class="block md:flex group mb-12"${add_attribute("href", `/post/${post.slug.current}`, 0)}><div class="mt-8 md:mt-0"><div class="relative w-full md:w-48 aspect-[4/3] sm:aspect-[16/9] md:h-40 overflow-hidden rounded-lg flex-shrink-0"><div class="absolute inset-0"><div class="w-full h-full"><img${add_attribute("src", urlFor(post.mainImage).url(), 0)}${add_attribute("alt", sanitizeText(post.title ?? ""), 0)} class="w-full h-full object-cover"> </div></div> </div></div> <div class="mt-4 md:mt-0 md:ml-8"><div class="mb-4"><span class="inline-block py-1 px-3 text-xs font-medium text-primary-900 bg-primary-50 rounded-full s-iFvCgFMopxZa">${escape(post.category.title)}</span> <span class="text-xs mx-4">${escape(formatDate(post._createdAt))}</span></div> <h4 class="text-xl font-medium group-hover:text-primary-800 mb-3">${escape(post.title)}</h4> <p class="max-w-xl text-s text-gray-700">${escape(post.excerpt?.slice(0, 100))}...</p></div> </a>`;
  })}</div>  ${``}</div>   <div class="text-center">${`<button class="relative group inline-block py-4 px-7 font-semibold text-primary-900 hover:text-primary-50 rounded-full bg-primary-50 transition duration-300 overflow-hidden" data-svelte-h="svelte-216zg3"><div class="absolute top-0 right-full w-full h-full bg-gray-900 transform group-hover:translate-x-full group-hover:scale-102 transition duration-500"></div> <span class="relative">Weitere Artikel anzeigen</span></button>`}</div></div></div></section>`;
});
export {
  Page as default
};
