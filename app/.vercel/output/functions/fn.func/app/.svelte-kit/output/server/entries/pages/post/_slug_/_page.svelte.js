import { s as subscribe } from "../../../../chunks/utils.js";
import { c as create_ssr_component, e as each, v as validate_component, a as add_attribute, b as escape } from "../../../../chunks/ssr.js";
import { C as ContentImageRenderer, V as VideoRenderer, a as CustomListItem, P as PortableText } from "../../../../chunks/ContentImageRenderer.js";
import { y } from "../../../../chunks/index3.js";
import { s as sanitizeText, a as calculateReadingTime, f as formatDate } from "../../../../chunks/utils2.js";
import { I as ImageRenderer } from "../../../../chunks/ImageRenderer.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let post;
  let sanitizedBody;
  let $q, $$unsubscribe_q;
  let { data } = $$props;
  const q = y(data);
  $$unsubscribe_q = subscribe(q, (value) => $q = value);
  let toc = [];
  let activeHeadingId = null;
  let readingTime;
  function sanitizePortableText(blocks) {
    return blocks.map((block) => {
      if (block._type === "block") {
        return {
          ...block,
          children: block.children.map((child) => {
            if (child._type === "span") {
              return { ...child, text: sanitizeText(child.text) };
            }
            return child;
          })
        };
      }
      return block;
    });
  }
  const portableTextComponents = {
    types: {
      image: ContentImageRenderer,
      video: VideoRenderer
    },
    listItem: {
      bullet: CustomListItem,
      // Verwende die benutzerdefinierte Komponente für Listenelemente
      normal: CustomListItem
    }
  };
  let likeCount = 0;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0) $$bindings.data(data);
  ({ data: post } = $q);
  sanitizedBody = sanitizePortableText(post.body);
  {
    {
      const contentForReadingTime = [
        post?.title,
        post?.excerpt,
        ...post?.body?.map((block) => block.children?.map((child) => child.text).join(" ") || "") || []
      ].filter(Boolean).join(" ");
      const sanitizedContent = sanitizeText(contentForReadingTime);
      readingTime = calculateReadingTime(sanitizedContent);
    }
  }
  $$unsubscribe_q();
  return `<section class="relative py-12 md:py-24"><div class="container px-4 mx-auto"><div class="flex flex-wrap -mx-4 "><div class="w-full lg:w-1/3 lg:pt-24 px-4 lg:sticky lg:top-0 lg:h-[100dvh]"><h4 class="font-medium text-white text-lg mb-5" data-svelte-h="svelte-jpcq9i">INHALTSVERZEICHNIS</h4> <ul class="mb-12">${each(toc, (item) => {
    return `<li class="mb-5"><a class="${"inline-block px-6 text-lg font-light transition-colors duration-200 ease-in-out " + escape(
      activeHeadingId === item.id ? "text-primary-500" : "text-white hover:text-primary-500",
      true
    )}" href="${"#" + escape(item.id, true)}">${escape(item.text)}</a> </li>`;
  })}</ul></div> <div class="w-full lg:w-2/3 px-4"><a class="inline-flex mb-12 items-center font-medium text-sm text-white hover:text-primary-500" href="/" data-svelte-h="svelte-1kyrr4w"><svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15.4167 10H5M5 10L10 5M5 10L10 15" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg> <span class="ml-2">Zurück zum Blog</span></a> <div class="mb-12">${post.mainImage ? `${validate_component(ImageRenderer, "ImageRenderer").$$render($$result, { value: post.mainImage }, {}, {})}` : `<img class="block w-full rounded-lg mb-12" src="../assets/hero_home-old.jpg"${add_attribute("alt", `Cover image for ${post.title}`, 0)}>`}</div> <div class="flex mb-4 items-center"><span class="inline-block py-1 px-3 text-xs font-medium text-primary-900 bg-primary-50 rounded-full s-iFvCgFMopxZa">${escape(post.category.title)}</span> <span class="inline-block mx-4" data-svelte-h="svelte-1gn8g6i"><svg width="1" height="24" viewBox="0 0 1 24" fill="none" xmlns="http://www.w3.org/2000/svg"><line x1="0.5" y1="2.18558e-08" x2="0.499999" y2="24" stroke="#3B5444"></line></svg></span> <span class="text-xs text-white">${escape(formatDate(post._createdAt))}</span> <span class="mx-3" data-svelte-h="svelte-1dvglqa"><svg width="4" height="4" viewBox="0 0 4 4" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="2" cy="2" r="2" fill="#4B6354"></circle></svg></span> <span class="text-xs text-white">${escape(readingTime)} min Lesezeit</span></div> <h2 class="font-heading tracking-tight text-4xl sm:text-5xl font-medium text-white pt-1 mb-12">${escape(post.title)}</h2> <div class="mb-12 post-content">${sanitizedBody ? `<div class="text-lg text-gray-200 mb-6">${validate_component(PortableText, "PortableText").$$render(
    $$result,
    {
      components: portableTextComponents,
      value: sanitizedBody
    },
    {},
    {}
  )}</div>` : ``} <div class="py-4 px-6 border border-white border-opacity-20 bg-primary-800 rounded-lg" data-svelte-h="svelte-19ld5fy"><span class="inline-block mr-2 text-sm text-primary-100">Du hast Interesse an mehr Tipps wie diesem?</span> <a class="group inline-flex items-center text-sm font-medium text-primary-200 hover:text-white transition duration-100" href="/"><span class="mr-2">Erfahre mehr in unserem Blog</span> <span class="transform group-hover:translate-x-1 transition duration-100"><svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.99984 10H15.4165M15.4165 10L10.4165 5M15.4165 10L10.4165 15" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg></span></a></div></div> <div class="flex items-center justify-center"><a class="${[
    "group inline-flex mr-12 items-center text-white hover:text-primary-600",
    "  "
  ].join(" ").trim()}" href="/"><div class="flex items-center justify-center h-16 w-16 border border-white border-opacity-20 group-hover:border-primary-600 rounded-full"><svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16.9724 20H4.6C4.26863 20 4 19.7314 4 19.4V9.6C4 9.26863 4.26863 9 4.6 9H7.36762C8.07015 9 8.72116 8.6314 9.0826 8.02899L11.793 3.51161C12.3779 2.53688 13.7554 2.44422 14.4655 3.33186C14.8002 3.75025 14.9081 4.30635 14.7541 4.81956L13.7317 8.22759C13.6162 8.61256 13.9045 9 14.3064 9H18.8815C20.2002 9 21.158 10.254 20.811 11.5262L18.9019 18.5262C18.6646 19.3964 17.8743 20 16.9724 20Z" stroke="currentColor"${add_attribute("fill", "none", 0)} stroke-width="1.5" stroke-linecap="round"></path><path d="M7.5 20L7.5 9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg></div> <span class="ml-3">${escape(likeCount)}</span></a> <a class="group inline-flex items-center text-white hover:text-primary-600" href="/" data-svelte-h="svelte-r19fhf"><div class="flex items-center justify-center h-16 w-16 border border-white border-opacity-20 group-hover:border-primary-600 rounded-full"><svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.5 22C18.0228 22 22.5 17.5228 22.5 12C22.5 6.47715 18.0228 2 12.5 2C6.97715 2 2.5 6.47715 2.5 12C2.5 13.8214 2.98697 15.5291 3.83782 17L3 21.5L7.5 20.6622C8.97087 21.513 10.6786 22 12.5 22Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg></div> <span class="ml-3">10</span></a></div></div></div></div></section>`;
});
export {
  Page as default
};
