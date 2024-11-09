import { s as subscribe } from "../../chunks/utils.js";
import { c as create_ssr_component, v as validate_component, e as each, a as add_attribute, b as escape } from "../../chunks/ssr.js";
import { p as page } from "../../chunks/stores.js";
import "../../chunks/client.js";
import { i as isPreviewing } from "../../chunks/previewStore.js";
const VisualEditing = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { zIndex = void 0 } = $$props;
  let { refresh = void 0 } = $$props;
  if ($$props.zIndex === void 0 && $$bindings.zIndex && zIndex !== void 0) $$bindings.zIndex(zIndex);
  if ($$props.refresh === void 0 && $$bindings.refresh && refresh !== void 0) $$bindings.refresh(refresh);
  return ``;
});
const LiveMode = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return ``;
});
const Logo = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="154.1px" height="52px" viewBox="0 0 154.1 52"><g class="Logo-bird"><polygon fill="#024358" points="47.2,16.8 47.2,9.9 54.9,16.8 	"></polygon><linearGradient id="SVGID_1_" gradientUnits="userSpaceOnUse" x1="44.085" y1="10.8044" x2="42.2298" y2="20.3787"><stop offset="0" style="stop-color:#02657C"></stop><stop offset="5.420738e-02" style="stop-color:#036078"></stop><stop offset="0.2989" style="stop-color:#045066"></stop><stop offset="0.524" style="stop-color:#03465C"></stop><stop offset="0.7097" style="stop-color:#024358"></stop></linearGradient><polygon fill="url(#SVGID_1_)" points="38.5,13.7 47.2,9.9 47.2,21 	"></polygon><linearGradient id="SVGID_00000019679129389979751630000014149395801671474584_" gradientUnits="userSpaceOnUse" x1="24.9946" y1="4.1511" x2="37.6263" y2="26.0299"><stop offset="0" style="stop-color:#067D87"></stop><stop offset="1" style="stop-color:#024358"></stop></linearGradient><polygon fill="url(#SVGID_00000019679129389979751630000014149395801671474584_)" points="47.2,21 21.9,0 24.4,24.8 	"></polygon><linearGradient id="SVGID_00000123426982763593254760000017979235071603104684_" gradientUnits="userSpaceOnUse" x1="0.2677" y1="-1.2822" x2="27.9824" y2="15.2649"><stop offset="0" style="stop-color:#067D87"></stop><stop offset="1" style="stop-color:#024358"></stop></linearGradient><polygon fill="url(#SVGID_00000123426982763593254760000017979235071603104684_)" points="0,0 21.9,0 24.4,24.8 	"></polygon><linearGradient id="SVGID_00000146478473025375996870000017387574293739566005_" gradientUnits="userSpaceOnUse" x1="36.4552" y1="35.5908" x2="35.8385" y2="23.6102"><stop offset="0" style="stop-color:#02657C"></stop><stop offset="0.2864" style="stop-color:#04586F"></stop><stop offset="0.7254" style="stop-color:#03485E"></stop><stop offset="1" style="stop-color:#024358"></stop></linearGradient><polygon fill="url(#SVGID_00000146478473025375996870000017387574293739566005_)" points="24.4,24.8 47.2,21 28.6,37.6 	"></polygon><polygon fill="#024358" points="24.4,24.8 24.3,52 31,44.8 	"></polygon></g><polygon fill="#02657C" points="49,33.4 51.2,33.4 51.2,27.1 56.4,27.1 56.4,25.1 51.2,25.1 51.2,20.6 57.7,20.6 57.7,18.6 49,18.6
        "></polygon><path fill="#02657C" d="M70.8,23.3c0-2.4-1.3-4.7-4.6-4.7h-5.6v14.8h2.2v-5.5h1.7l3.8,5.5h2.6L67,27.9
        C69.7,27.5,70.8,25.4,70.8,23.3z M62.8,26v-5.4h3.4c1.4,0,2.4,1.1,2.4,2.7c0,1.6-0.8,2.7-2.9,2.7H62.8z"></path><polygon fill="#02657C" points="76.8,27.2 82.6,27.2 82.6,25.1 76.8,25.1 76.8,20.6 83.5,20.6 83.5,18.6 74.6,18.6 74.6,33.4
        83.7,33.4 83.7,31.4 76.8,31.4 "></polygon><rect x="87.2" y="18.6" fill="#02657C" width="2.2" height="14.8"></rect><path fill="#02657C" d="M104.1,23.3c0-2.4-1.3-4.7-4.6-4.7h-5.6v14.8h2.2v-5.5h1.7l3.8,5.5h2.6l-3.9-5.6
        C103,27.5,104.1,25.4,104.1,23.3z M96.1,26v-5.4h3.4c1.4,0,2.4,1.1,2.4,2.7c0,1.6-0.8,2.7-2.9,2.7H96.1z"></path><path fill="#02657C" d="M112,18.6l-5.6,14.8h2.3l1.4-3.8h6.2l1.4,3.8h2.3l-5.6-14.8H112z M110.8,27.7l2.4-6.4l2.4,6.4H110.8z"></path><path fill="#02657C" d="M130.7,28.3c0,2.2-1.5,3.2-3.3,3.2c-1.8,0-3.2-1-3.2-3.2v-9.6H122v9.7c0,3.4,2.5,5.4,5.5,5.4s5.5-2,5.5-5.4
        v-9.7h-2.2L130.7,28.3L130.7,28.3z"></path><polygon fill="#02657C" points="150.3,18.6 145.2,29.3 140.1,18.6 138.1,18.6 136.3,33.4 138.5,33.4 139.8,22.7 144.3,31.8
        146.1,31.8 150.6,22.7 151.9,33.4 154.1,33.4 152.3,18.6 "></polygon><path fill="#02657C" d="M54.8,43.1l-2.1-0.5C50.3,42,50,40.7,50,39.9c0-1.8,1.8-3,3.6-3c1.9,0,3.4,1.1,3.6,2.9h1
        C58,37.4,56.1,36,53.6,36c-2.4,0-4.6,1.6-4.6,3.9c0,1.2,0.4,2.9,3.4,3.6l2.1,0.5c1.6,0.4,3.2,1.3,3.2,3c0,1.5-1.2,3.2-4,3.2
        c-2.2,0-3.6-1.5-3.8-3H49c0.2,2,2,4,4.8,4c3.4,0,5-2.3,5-4.2C58.7,44.8,57,43.6,54.8,43.1z"></path><polygon fill="#02657C" points="58.3,37.1 63.2,37.1 63.2,51 64.2,51 64.2,37.1 69,37.1 69,36.2 58.3,36.2 "></polygon><path fill="#02657C" d="M80,40.6c0-2.2-1.1-4.4-4.1-4.4h-5.5V51h1v-6h3l4.2,6h1.2l-4.2-6h0.3C78.9,45,80,42.9,80,40.6z M71.3,44.1
        v-7h4.5c2.2,0,3.1,1.7,3.1,3.5c0,1.8-0.9,3.5-3.4,3.5H71.3z"></path><path fill="#02657C" d="M87,36.2L81.4,51h1l1.6-4h7.2l1.6,4h1l-5.6-14.8H87z M84.3,46.1l3.3-8.6l3.3,8.6H84.3z"></path><polygon fill="#02657C" points="92.7,37.1 97.5,37.1 97.5,51 98.5,51 98.5,37.1 103.4,37.1 103.4,36.2 92.7,36.2 "></polygon><polygon fill="#02657C" points="106.2,44.2 112.6,44.2 112.6,43.3 106.2,43.3 106.2,37.1 113.5,37.1 113.5,36.2 105.3,36.2
        105.3,51 113.7,51 113.7,50.1 106.2,50.1 "></polygon><path fill="#02657C" d="M123.7,44.9h4.6l0,0.3c-0.4,3.4-2.8,5.1-5.8,5.1c-3.6,0-6.5-3-6.5-6.7s2.8-6.7,6.5-6.7
        c1.5,0,2.8,0.5,3.9,1.3l0.6-0.7c-1.2-1-2.8-1.6-4.5-1.6c-4.2,0-7.5,3.4-7.5,7.6c0,4.2,3.3,7.6,7.5,7.6c3.9,0,6.8-2.4,6.9-7.2h-5.6
        V44.9L123.7,44.9z"></path><polygon fill="#02657C" points="132.7,44.2 139.1,44.2 139.1,43.3 132.7,43.3 132.7,37.1 139.9,37.1 139.9,36.2 131.7,36.2
        131.7,51 140.2,51 140.2,50.1 132.7,50.1 "></polygon><polygon fill="#02657C" points="152.9,36.2 152.9,49.4 144.7,36.2 143.6,36.2 143.6,51 144.6,51 144.6,37.8 152.8,51 153.9,51
        153.9,36.2 "></polygon></svg>`;
});
const css$1 = {
  code: ".lazy.svelte-lwz1be{opacity:0;transition:opacity 0.3s ease-in-out}@keyframes svelte-lwz1be-fadeIn{from{opacity:0;transform:translateY(-10px)}to{opacity:1;transform:translateY(0)}}@keyframes svelte-lwz1be-fadeOut{from{opacity:1;transform:translateY(0)}to{opacity:0;transform:translateY(-10px)}}.animate-slide-in.svelte-lwz1be{animation:svelte-lwz1be-slideIn 200ms ease-out forwards}.animate-slide-out.svelte-lwz1be{animation:svelte-lwz1be-slideOut 200ms ease-out forwards}@keyframes svelte-lwz1be-slideIn{from{opacity:0;transform:translateY(-20px)}to{opacity:1;transform:translateY(0)}}@keyframes svelte-lwz1be-slideOut{from{opacity:1;transform:translateY(0)}to{opacity:0;transform:translateY(-20px)}}",
  map: `{"version":3,"file":"Header.svelte","sources":["Header.svelte"],"sourcesContent":["<script lang=\\"ts\\">import { onMount } from \\"svelte\\";\\nimport { fade, fly, slide } from \\"svelte/transition\\";\\nimport Logo from \\"$lib/components/Logo.svelte\\";\\nimport { clickOutside } from \\"$lib/actions/clickOutside\\";\\nlet visible = false;\\nonMount(() => {\\n  visible = true;\\n});\\nlet mobileNavOpen = false;\\nlet isMobile = false;\\nfunction toggleMobileNav() {\\n  mobileNavOpen = !mobileNavOpen;\\n}\\nfunction checkMobile() {\\n  isMobile = window.innerWidth < 1280;\\n}\\nonMount(() => {\\n  checkMobile();\\n  window.addEventListener(\\"resize\\", checkMobile);\\n  return () => window.removeEventListener(\\"resize\\", checkMobile);\\n});\\nlet activeMenu = null;\\nlet isKeyboardNav = false;\\nconst menuItems = {\\n  trading: {\\n    title: \\"Tradingstrategie\\",\\n    columns: [\\n      {\\n        title: \\"Trading Basics\\",\\n        links: [\\n          { title: \\"Einf\\\\xFChrung ins Trading\\", href: \\"/trading/basics\\" },\\n          { title: \\"Technische Analyse\\", href: \\"/trading/technical\\" },\\n          { title: \\"Fundamentalanalyse\\", href: \\"/trading/fundamental\\" }\\n        ]\\n      },\\n      {\\n        title: \\"Strategien\\",\\n        links: [\\n          { title: \\"Swing Trading\\", href: \\"/trading/swing\\" },\\n          { title: \\"Day Trading\\", href: \\"/trading/day\\" },\\n          { title: \\"Position Trading\\", href: \\"/trading/position\\" }\\n        ]\\n      }\\n    ],\\n    featured: {\\n      image: \\"/images/trading-masterclass.jpg\\",\\n      title: \\"Neue Trading Masterclass\\",\\n      description: \\"Lernen Sie die bew\\\\xE4hrten Strategien der Profis kennen.\\",\\n      link: \\"/masterclass\\"\\n    }\\n  },\\n  schulung: {\\n    title: \\"Schulung\\",\\n    columns: [\\n      {\\n        title: \\"Kursangebote\\",\\n        links: [\\n          { title: \\"Grundlagenkurs\\", href: \\"/schulung/basics\\" },\\n          { title: \\"Fortgeschrittene\\", href: \\"/schulung/advanced\\" },\\n          { title: \\"Expertenlevel\\", href: \\"/schulung/expert\\" }\\n        ]\\n      },\\n      {\\n        title: \\"Formate\\",\\n        links: [\\n          { title: \\"Online Kurse\\", href: \\"/schulung/online\\" },\\n          { title: \\"Live Workshops\\", href: \\"/schulung/workshops\\" },\\n          { title: \\"1:1 Coaching\\", href: \\"/schulung/coaching\\" }\\n        ]\\n      }\\n    ],\\n    featured: {\\n      image: \\"/images/workshop.jpg\\",\\n      title: \\"Live Workshop\\",\\n      description: \\"Intensives Trading-Training vor Ort.\\",\\n      link: \\"/workshops\\"\\n    }\\n  },\\n  blog: {\\n    title: \\"Blog\\",\\n    columns: [\\n      {\\n        title: \\"Kategorien\\",\\n        links: [\\n          { title: \\"Trading News\\", href: \\"/blog/news\\" },\\n          { title: \\"Marktanalysen\\", href: \\"/blog/analysen\\" },\\n          { title: \\"Trading Tipps\\", href: \\"/blog/tipps\\" }\\n        ]\\n      },\\n      {\\n        title: \\"Beliebte Themen\\",\\n        links: [\\n          { title: \\"Anf\\\\xE4nger Guides\\", href: \\"/blog/guides\\" },\\n          { title: \\"Experteninterviews\\", href: \\"/blog/interviews\\" },\\n          { title: \\"Erfolgsgeschichten\\", href: \\"/blog/success-stories\\" }\\n        ]\\n      }\\n    ],\\n    featured: {\\n      image: \\"/images/blog-featured.jpg\\",\\n      title: \\"Trading Journal\\",\\n      description: \\"Lernen Sie aus den Erfahrungen erfolgreicher Trader.\\",\\n      link: \\"/blog/trading-journal\\"\\n    }\\n  },\\n  about: {\\n    title: \\"\\\\xDCber uns\\",\\n    columns: [\\n      {\\n        title: \\"Unternehmen\\",\\n        links: [\\n          { title: \\"Unsere Geschichte\\", href: \\"/about/story\\" },\\n          { title: \\"Team\\", href: \\"/about/team\\" },\\n          { title: \\"Karriere\\", href: \\"/about/careers\\" }\\n        ]\\n      },\\n      {\\n        title: \\"Kontakt\\",\\n        links: [\\n          { title: \\"Standorte\\", href: \\"/about/locations\\" },\\n          { title: \\"Support\\", href: \\"/about/support\\" },\\n          { title: \\"Partner werden\\", href: \\"/about/partner\\" }\\n        ]\\n      }\\n    ],\\n    featured: {\\n      image: \\"/images/about-team.jpg\\",\\n      title: \\"Unser Team\\",\\n      description: \\"Lernen Sie die Experten hinter Freiraumstrategen kennen.\\",\\n      link: \\"/about/team\\"\\n    }\\n  }\\n};\\nfunction handleKeydown(event) {\\n  if (!isKeyboardNav) isKeyboardNav = true;\\n  switch (event.key) {\\n    case \\"Escape\\":\\n      activeMenu = null;\\n      break;\\n    case \\"ArrowDown\\":\\n      if (!activeMenu) {\\n        activeMenu = Object.keys(menuItems)[0];\\n      }\\n      event.preventDefault();\\n      break;\\n  }\\n}\\nonMount(() => {\\n  Object.values(menuItems).forEach((item) => {\\n    if (item.featured?.image) {\\n      const img = new Image();\\n      img.src = item.featured.image;\\n    }\\n  });\\n});\\nlet isFirstOpen = true;\\nlet isMenuVisible = false;\\nlet timeoutId;\\nasync function handleMouseEnter(key) {\\n  const typedKey = key;\\n  clearTimeout(timeoutId);\\n  if (activeMenu === typedKey) return;\\n  if (activeMenu === null) isFirstOpen = true;\\n  else isFirstOpen = false;\\n  activeMenu = typedKey;\\n  isMenuVisible = true;\\n}\\nfunction handleMouseLeave() {\\n  isMenuVisible = false;\\n  timeoutId = setTimeout(() => {\\n    activeMenu = null;\\n    isFirstOpen = true;\\n  }, 200);\\n}\\nfunction handleClickOutside() {\\n  activeMenu = null;\\n  isFirstOpen = true;\\n}\\n<\/script>\\n\\n\\n\\n<header class=\\"header\\">\\n    <nav class=\\"relative py-6 bg-white z-50\\" \\n         use:clickOutside={handleClickOutside}\\n         on:keydown={handleKeydown}\\n         on:mouseleave={handleMouseLeave}>\\n        <div class=\\"container px-4 mx-auto\\">\\n          <div class=\\"flex items-center relative\\">\\n            <a class=\\"inline-block text-lg font-bold\\" href=\\"/\\">\\n              <Logo />\\n            </a>\\n            {#if isMobile}\\n              <div class=\\"ml-auto\\">\\n                <button on:click={toggleMobileNav} class=\\"flex w-12 h-12 items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-md transition duration-200\\">\\n                  <svg width=\\"24\\" height=\\"24\\" viewBox=\\"0 0 24 24\\" fill=\\"none\\" xmlns=\\"http://www.w3.org/2000/svg\\">\\n                    <path d=\\"M3 12H21\\" stroke=\\"black\\" stroke-width=\\"2\\" stroke-linecap=\\"round\\" stroke-linejoin=\\"round\\"></path>\\n                    <path d=\\"M3 6H21\\" stroke=\\"black\\" stroke-width=\\"2\\" stroke-linecap=\\"round\\" stroke-linejoin=\\"round\\"></path>\\n                    <path d=\\"M3 18H21\\" stroke=\\"black\\" stroke-width=\\"2\\" stroke-linecap=\\"round\\" stroke-linejoin=\\"round\\"></path>\\n                  </svg>\\n                </button>\\n              </div>\\n            {:else}\\n              <ul class=\\"flex mx-auto space-x-12\\">\\n                {#each Object.entries(menuItems) as [key, item]}\\n                  <li class=\\"group relative\\">\\n                    <button\\n                      class=\\"inline-block text-sm text-gray-900 hover:text-primary-500 font-light focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-md\\"\\n                      on:mouseenter={() => handleMouseEnter(key)}\\n                      aria-expanded={activeMenu === key}\\n                      aria-controls=\\"mega-menu-{key}\\">\\n                      {item.title}\\n                      <svg class=\\"inline-block ml-1 w-4 h-4 transition-transform duration-200 {activeMenu === key ? 'rotate-180' : ''}\\" \\n                           fill=\\"none\\" stroke=\\"currentColor\\" viewBox=\\"0 0 24 24\\">\\n                        <path stroke-linecap=\\"round\\" stroke-linejoin=\\"round\\" stroke-width=\\"2\\" d=\\"M19 9l-7 7-7-7\\" />\\n                      </svg>\\n                    </button>\\n                    \\n                    {#if activeMenu === key}\\n                      <div class=\\"fixed left-0 right-0 top-[72px] mx-auto w-screen max-w-7xl px-8 py-6 mt-6 bg-ultra-light shadow-xl rounded-xl\\"\\n                           class:animate-slide-in={isFirstOpen}\\n                           class:animate-slide-out={!isMenuVisible}>\\n                        {#key activeMenu}\\n                          <div class=\\"grid grid-cols-4 gap-8\\" \\n                               in:fly={{ y: 10, duration: 200, delay: 100 }}\\n                               out:fade={{ duration: 150 }}>\\n                            {#each menuItems[activeMenu].columns as column}\\n                              <div>\\n                                <h3 class=\\"text-lg font-medium text-gray-900 mb-4\\">{column.title}</h3>\\n                                <ul class=\\"space-y-3\\">\\n                                  {#each column.links as link}\\n                                    <li>\\n                                      <a class=\\"text-gray-600 hover:text-primary-500 transition-colors duration-200\\"\\n                                         href={link.href}>\\n                                        {link.title}\\n                                      </a>\\n                                    </li>\\n                                  {/each}\\n                                </ul>\\n                              </div>\\n                            {/each}\\n                            \\n                            <!-- Featured Content -->\\n                            <div class=\\"col-span-2 bg-gray-50 rounded-lg p-6\\">\\n                              <div class=\\"flex items-start\\">\\n                                {#if menuItems[activeMenu].featured}\\n                                  <div class=\\"flex-shrink-0\\">\\n                                    <img class=\\"h-32 w-32 object-cover rounded-lg lazy\\"\\n                                         data-src={menuItems[activeMenu].featured.image}\\n                                         alt={menuItems[activeMenu].featured.title}>\\n                                  </div>\\n                                  <div class=\\"ml-6\\">\\n                                    <h4 class=\\"text-lg font-medium text-gray-900\\">{menuItems[activeMenu].featured.title}</h4>\\n                                    <p class=\\"mt-2 text-sm text-gray-600\\">{menuItems[activeMenu].featured.description}</p>\\n                                    <a href={menuItems[activeMenu].featured.link}\\n                                       class=\\"mt-4 inline-flex items-center text-primary-600 hover:text-primary-800\\">\\n                                      Mehr erfahren\\n                                      <svg class=\\"ml-2 w-4 h-4\\" fill=\\"none\\" stroke=\\"currentColor\\" viewBox=\\"0 0 24 24\\">\\n                                        <path stroke-linecap=\\"round\\" stroke-linejoin=\\"round\\" stroke-width=\\"2\\" d=\\"M9 5l7 7-7 7\\" />\\n                                      </svg>\\n                                    </a>\\n                                  </div>\\n                                {/if}\\n                              </div>\\n                            </div>\\n                          </div>\\n                        {/key}\\n                      </div>\\n                    {/if}\\n                  </li>\\n                {/each}\\n              </ul>\\n              <div class=\\"flex items-center\\">\\n                <a class=\\"inline-block mr-9 text-sm font-medium text-primary-800 hover:text-gray-900\\" href=\\"/\\">Sign In</a>\\n                <a class=\\"relative group inline-block py-3 px-4 text-sm font-medium text-primary-800 hover:text-primary-50 bg-primary-50 rounded-md overflow-hidden transition duration-300\\" href=\\"/\\">\\n                  <div class=\\"absolute top-0 right-full w-full h-full bg-primary-800 transform group-hover:translate-x-full group-hover:scale-102 transition duration-500\\"></div>\\n                  <span class=\\"relative\\">Create an account</span>\\n                </a>\\n              </div>\\n            {/if}\\n          </div>\\n        </div>\\n      </nav>\\n      {#if mobileNavOpen}\\n      <button class=\\"fixed inset-0 bg-gray-800 opacity-25 z-50\\" on:click={toggleMobileNav} aria-label=\\"Mobiles Menü schließen\\"></button>\\n      <nav class=\\"fixed top-0 left-0 bottom-0 w-5/6 max-w-md z-50 bg-white border-r overflow-y-auto\\">\\n        <div class=\\"flex items-center justify-between px-4 py-6 mb-10\\">\\n          <a class=\\"text-2xl font-light leading-none\\" href=\\"/\\">\\n            <Logo />\\n          </a>\\n          <button on:click={toggleMobileNav} class=\\"p-2\\">\\n            <svg class=\\"h-6 w-6 text-gray-500 cursor-pointer hover:text-gray-500\\" xmlns=\\"http://www.w3.org/2000/svg\\" fill=\\"none\\" viewBox=\\"0 0 24 24\\" stroke=\\"currentColor\\">\\n              <path stroke-linecap=\\"round\\" stroke-linejoin=\\"round\\" stroke-width=\\"2\\" d=\\"M6 18L18 6M6 6l12 12\\"></path>\\n            </svg>\\n          </button>\\n        </div>\\n        <div class=\\"px-6\\">\\n          <ul class=\\"mb-8\\">\\n            <li><a class=\\"block py-4 text-gray-900 hover:bg-primary-50 rounded-lg\\" href=\\"/\\">Tradingstrategie</a></li>\\n            <li><a class=\\"block py-4 text-gray-900 hover:bg-primary-50 rounded-lg\\" href=\\"/\\">Schulung</a></li>\\n            <li><a class=\\"block py-4 text-gray-900 hover:bg-primary-50 rounded-lg\\" href=\\"/\\">Experten</a></li>\\n            <li><a class=\\"block py-4 text-gray-900 hover:bg-primary-50 rounded-lg\\" href=\\"/\\">Blog</a></li>\\n          </ul>\\n          <div class=\\"py-8 px-6 mb-6 border-t border-b border-gray-200\\">\\n            <a class=\\"flex items-center text-sm font-medium text-primary-800 hover:text-primary-600\\" href=\\"/\\">\\n              <svg width=\\"18\\" height=\\"16\\" viewBox=\\"0 0 18 16\\" fill=\\"none\\" xmlns=\\"http://www.w3.org/2000/svg\\">\\n                <path d=\\"M17.3337 6.05833C17.2811 5.9059 17.1854 5.77202 17.0582 5.67292C16.931 5.57381 16.7777 5.51374 16.617 5.5L11.8754 4.80833L9.75038 0.499999C9.68215 0.359106 9.5756 0.240284 9.44296 0.157143C9.31031 0.074003 9.15693 0.0299072 9.00039 0.0299072C8.84384 0.0299072 8.69046 0.074003 8.55781 0.157143C8.42517 0.240284 8.31862 0.359106 8.25039 0.499999L6.12539 4.8L1.38372 5.5C1.22949 5.52192 1.08449 5.58663 0.96518 5.6868C0.845868 5.78696 0.757021 5.91856 0.708721 6.06666C0.664509 6.21139 0.660541 6.36543 0.697245 6.51224C0.733948 6.65905 0.809936 6.7931 0.917055 6.9L4.35872 10.2333L3.52539 14.9667C3.49564 15.1229 3.51121 15.2844 3.57028 15.432C3.62935 15.5797 3.72943 15.7074 3.85872 15.8C3.98474 15.8901 4.13337 15.9433 4.28793 15.9536C4.44249 15.9639 4.59686 15.9309 4.73372 15.8583L9.00039 13.6333L13.2504 15.8667C13.3673 15.9326 13.4994 15.9671 13.6337 15.9667C13.8102 15.9673 13.9824 15.9118 14.1254 15.8083C14.2547 15.7157 14.3548 15.588 14.4138 15.4404C14.4729 15.2927 14.4885 15.1312 14.4587 14.975L13.6254 10.2417L17.067 6.90833C17.1874 6.8064 17.2763 6.67242 17.3235 6.52195C17.3707 6.37149 17.3742 6.21073 17.3337 6.05833ZM12.2087 9.39166C12.111 9.48619 12.0379 9.6032 11.9957 9.73247C11.9536 9.86175 11.9438 9.99937 11.9671 10.1333L12.5671 13.625L9.43372 11.9583C9.31315 11.8941 9.17865 11.8605 9.04205 11.8605C8.90546 11.8605 8.77095 11.8941 8.65039 11.9583L5.51705 13.625L6.11705 10.1333C6.14033 9.99937 6.13048 9.86175 6.08836 9.73247C6.04623 9.6032 5.97312 9.48619 5.87539 9.39166L3.37539 6.89166L6.88372 6.38333C7.01872 6.36455 7.14705 6.31295 7.25747 6.23304C7.36789 6.15313 7.45702 6.04736 7.51705 5.925L9.00039 2.75L10.5671 5.93333C10.6271 6.0557 10.7162 6.16147 10.8266 6.24137C10.9371 6.32128 11.0654 6.37289 11.2004 6.39166L14.7087 6.9L12.2087 9.39166Z\\" fill=\\"currentColor\\"></path>\\n              </svg>\\n              <span class=\\"ml-3\\">Freiraumstratege werden!</span>\\n            </a>\\n          </div>\\n          <div class=\\"flex mb-8 items-center\\">\\n            <a class=\\"inline-block mr-9 text-sm font-medium text-primary-800 hover:text-gray-900\\" href=\\"/\\">Sign In</a>\\n            <a class=\\"inline-block py-3 px-4 text-sm font-medium text-primary-800 hover:text-white border border-gray-300 hover:border-primary-600 hover:bg-primary-800 rounded-md transition duration-200\\" href=\\"/\\">Create an account</a>\\n          </div>\\n          <div>\\n            <div class=\\"flex w-20 h-20 mb-6 items-center justify-center bg-primary-50 rounded-full\\">\\n              <svg width=\\"29\\" height=\\"28\\" viewBox=\\"0 0 29 28\\" fill=\\"none\\" xmlns=\\"http://www.w3.org/2000/svg\\">\\n                <path d=\\"M25.3333 16.6667C24.9797 16.6667 24.6406 16.8072 24.3905 17.0572C24.1405 17.3073 24 17.6464 24 18V23.3334C24 23.687 23.8595 24.0261 23.6095 24.2762C23.3594 24.5262 23.0203 24.6667 22.6667 24.6667H4C3.64638 24.6667 3.30724 24.5262 3.05719 24.2762C2.80714 24.0261 2.66667 23.687 2.66667 23.3334V10.5467L10.5067 18.4C11.2567 19.1491 12.2733 19.5698 13.3333 19.5698C14.3933 19.5698 15.41 19.1491 16.16 18.4L18.3467 16.2134C18.5977 15.9623 18.7388 15.6218 18.7388 15.2667C18.7388 14.9116 18.5977 14.5711 18.3467 14.32C18.0956 14.069 17.7551 13.9279 17.4 13.9279C17.0449 13.9279 16.7044 14.069 16.4533 14.32L14.2667 16.5067C14.0174 16.751 13.6823 16.8878 13.3333 16.8878C12.9843 16.8878 12.6492 16.751 12.4 16.5067L4.54667 8.66669H13.3333C13.687 8.66669 14.0261 8.52622 14.2761 8.27617C14.5262 8.02612 14.6667 7.68698 14.6667 7.33336C14.6667 6.97974 14.5262 6.6406 14.2761 6.39055C14.0261 6.1405 13.687 6.00002 13.3333 6.00002H4C2.93913 6.00002 1.92172 6.42145 1.17157 7.1716C0.421427 7.92174 0 8.93916 0 10V23.3334C0 24.3942 0.421427 25.4116 1.17157 26.1618C1.92172 26.9119 2.93913 27.3334 4 27.3334H22.6667C23.7275 27.3334 24.7449 26.9119 25.4951 26.1618C26.2452 25.4116 26.6667 24.3942 26.6667 23.3334V18C26.6667 17.6464 26.5262 17.3073 26.2761 17.0572C26.0261 16.8072 25.687 16.6667 25.3333 16.6667ZM27.6133 5.05336L23.6133 1.05336C23.4865 0.93197 23.337 0.836817 23.1733 0.773358C22.8487 0.64 22.4846 0.64 22.16 0.773358C21.9963 0.836817 21.8468 0.93197 21.72 1.05336L17.72 5.05336C17.4689 5.30443 17.3279 5.64496 17.3279 6.00002C17.3279 6.35509 17.4689 6.69562 17.72 6.94669C17.9711 7.19776 18.3116 7.33881 18.6667 7.33881C19.0217 7.33881 19.3623 7.19776 19.6133 6.94669L21.3333 5.21336V12.6667C21.3333 13.0203 21.4738 13.3595 21.7239 13.6095C21.9739 13.8595 22.313 14 22.6667 14C23.0203 14 23.3594 13.8595 23.6095 13.6095C23.8595 13.3595 24 13.0203 24 12.6667V5.21336L25.72 6.94669C25.844 7.07166 25.9914 7.17086 26.1539 7.23855C26.3164 7.30624 26.4907 7.34109 26.6667 7.34109C26.8427 7.34109 27.017 7.30624 27.1794 7.23855C27.3419 7.17086 27.4894 7.07166 27.6133 6.94669C27.7383 6.82274 27.8375 6.67527 27.9052 6.51279C27.9729 6.35032 28.0077 6.17604 28.0077 6.00002C28.0077 5.82401 27.9729 5.64973 27.9052 5.48726C27.8375 5.32478 27.7383 5.17731 27.6133 5.05336Z\\" fill=\\"black\\"></path>\\n              </svg>\\n            </div>\\n            <span class=\\"block mb-3 text-sm text-gray-500\\">Kontakt aufnehmen</span>\\n            <a class=\\"font-medium text-black\\" href=\\"/\\">hi@freiraumstrategen.de</a>\\n          </div>\\n        </div>\\n      </nav>\\n    {/if}\\n</header>\\n\\n<style>\\n  /* Animations und Transitions */\\n  .mega-menu-enter {\\n    opacity: 0;\\n    transform: translateY(-10px);\\n  }\\n  \\n  .mega-menu-enter-active {\\n    opacity: 1;\\n    transform: translateY(0);\\n    transition: opacity 200ms ease-out, transform 200ms ease-out;\\n  }\\n  \\n  /* Keyboard Focus Styles */\\n  .focus-visible:focus {\\n    outline: 2px solid var(--primary-500);\\n    outline-offset: 2px;\\n  }\\n  \\n  /* Lazy Loading Blur-up */\\n  .lazy {\\n    opacity: 0;\\n    transition: opacity 0.3s ease-in-out;\\n  }\\n  \\n  .lazy.loaded {\\n    opacity: 1;\\n  }\\n\\n  .animate-fade-in {\\n    animation: fadeIn 200ms ease-out;\\n  }\\n\\n  .animate-fade-out {\\n    animation: fadeOut 200ms ease-out;\\n  }\\n\\n  @keyframes fadeIn {\\n    from { opacity: 0; transform: translateY(-10px); }\\n    to { opacity: 1; transform: translateY(0); }\\n  }\\n\\n  @keyframes fadeOut {\\n    from { opacity: 1; transform: translateY(0); }\\n    to { opacity: 0; transform: translateY(-10px); }\\n  }\\n\\n  .animate-slide-in {\\n    animation: slideIn 200ms ease-out forwards;\\n  }\\n\\n  .animate-slide-out {\\n    animation: slideOut 200ms ease-out forwards;\\n  }\\n\\n  @keyframes slideIn {\\n    from { \\n      opacity: 0;\\n      transform: translateY(-20px);\\n    }\\n    to { \\n      opacity: 1;\\n      transform: translateY(0);\\n    }\\n  }\\n\\n  @keyframes slideOut {\\n    from { \\n      opacity: 1;\\n      transform: translateY(0);\\n    }\\n    to { \\n      opacity: 0;\\n      transform: translateY(-20px);\\n    }\\n  }\\n</style>"],"names":[],"mappings":"AA6VE,mBAAM,CACJ,OAAO,CAAE,CAAC,CACV,UAAU,CAAE,OAAO,CAAC,IAAI,CAAC,WAC3B,CAcA,WAAW,oBAAO,CAChB,IAAK,CAAE,OAAO,CAAE,CAAC,CAAE,SAAS,CAAE,WAAW,KAAK,CAAG,CACjD,EAAG,CAAE,OAAO,CAAE,CAAC,CAAE,SAAS,CAAE,WAAW,CAAC,CAAG,CAC7C,CAEA,WAAW,qBAAQ,CACjB,IAAK,CAAE,OAAO,CAAE,CAAC,CAAE,SAAS,CAAE,WAAW,CAAC,CAAG,CAC7C,EAAG,CAAE,OAAO,CAAE,CAAC,CAAE,SAAS,CAAE,WAAW,KAAK,CAAG,CACjD,CAEA,+BAAkB,CAChB,SAAS,CAAE,qBAAO,CAAC,KAAK,CAAC,QAAQ,CAAC,QACpC,CAEA,gCAAmB,CACjB,SAAS,CAAE,sBAAQ,CAAC,KAAK,CAAC,QAAQ,CAAC,QACrC,CAEA,WAAW,qBAAQ,CACjB,IAAK,CACH,OAAO,CAAE,CAAC,CACV,SAAS,CAAE,WAAW,KAAK,CAC7B,CACA,EAAG,CACD,OAAO,CAAE,CAAC,CACV,SAAS,CAAE,WAAW,CAAC,CACzB,CACF,CAEA,WAAW,sBAAS,CAClB,IAAK,CACH,OAAO,CAAE,CAAC,CACV,SAAS,CAAE,WAAW,CAAC,CACzB,CACA,EAAG,CACD,OAAO,CAAE,CAAC,CACV,SAAS,CAAE,WAAW,KAAK,CAC7B,CACF"}`
};
const Header = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let activeMenu = null;
  const menuItems = {
    trading: {
      title: "Tradingstrategie",
      columns: [
        {
          title: "Trading Basics",
          links: [
            {
              title: "Einführung ins Trading",
              href: "/trading/basics"
            },
            {
              title: "Technische Analyse",
              href: "/trading/technical"
            },
            {
              title: "Fundamentalanalyse",
              href: "/trading/fundamental"
            }
          ]
        },
        {
          title: "Strategien",
          links: [
            {
              title: "Swing Trading",
              href: "/trading/swing"
            },
            {
              title: "Day Trading",
              href: "/trading/day"
            },
            {
              title: "Position Trading",
              href: "/trading/position"
            }
          ]
        }
      ],
      featured: {
        image: "/images/trading-masterclass.jpg",
        title: "Neue Trading Masterclass",
        description: "Lernen Sie die bewährten Strategien der Profis kennen.",
        link: "/masterclass"
      }
    },
    schulung: {
      title: "Schulung",
      columns: [
        {
          title: "Kursangebote",
          links: [
            {
              title: "Grundlagenkurs",
              href: "/schulung/basics"
            },
            {
              title: "Fortgeschrittene",
              href: "/schulung/advanced"
            },
            {
              title: "Expertenlevel",
              href: "/schulung/expert"
            }
          ]
        },
        {
          title: "Formate",
          links: [
            {
              title: "Online Kurse",
              href: "/schulung/online"
            },
            {
              title: "Live Workshops",
              href: "/schulung/workshops"
            },
            {
              title: "1:1 Coaching",
              href: "/schulung/coaching"
            }
          ]
        }
      ],
      featured: {
        image: "/images/workshop.jpg",
        title: "Live Workshop",
        description: "Intensives Trading-Training vor Ort.",
        link: "/workshops"
      }
    },
    blog: {
      title: "Blog",
      columns: [
        {
          title: "Kategorien",
          links: [
            {
              title: "Trading News",
              href: "/blog/news"
            },
            {
              title: "Marktanalysen",
              href: "/blog/analysen"
            },
            {
              title: "Trading Tipps",
              href: "/blog/tipps"
            }
          ]
        },
        {
          title: "Beliebte Themen",
          links: [
            {
              title: "Anfänger Guides",
              href: "/blog/guides"
            },
            {
              title: "Experteninterviews",
              href: "/blog/interviews"
            },
            {
              title: "Erfolgsgeschichten",
              href: "/blog/success-stories"
            }
          ]
        }
      ],
      featured: {
        image: "/images/blog-featured.jpg",
        title: "Trading Journal",
        description: "Lernen Sie aus den Erfahrungen erfolgreicher Trader.",
        link: "/blog/trading-journal"
      }
    },
    about: {
      title: "Über uns",
      columns: [
        {
          title: "Unternehmen",
          links: [
            {
              title: "Unsere Geschichte",
              href: "/about/story"
            },
            { title: "Team", href: "/about/team" },
            {
              title: "Karriere",
              href: "/about/careers"
            }
          ]
        },
        {
          title: "Kontakt",
          links: [
            {
              title: "Standorte",
              href: "/about/locations"
            },
            { title: "Support", href: "/about/support" },
            {
              title: "Partner werden",
              href: "/about/partner"
            }
          ]
        }
      ],
      featured: {
        image: "/images/about-team.jpg",
        title: "Unser Team",
        description: "Lernen Sie die Experten hinter Freiraumstrategen kennen.",
        link: "/about/team"
      }
    }
  };
  $$result.css.add(css$1);
  return `<header class="header"><nav class="relative py-6 bg-white z-50"><div class="container px-4 mx-auto"><div class="flex items-center relative"><a class="inline-block text-lg font-bold" href="/">${validate_component(Logo, "Logo").$$render($$result, {}, {}, {})}</a> ${`<ul class="flex mx-auto space-x-12">${each(Object.entries(menuItems), ([key, item]) => {
    return `<li class="group relative"><button class="inline-block text-sm text-gray-900 hover:text-primary-500 font-light focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-md"${add_attribute("aria-expanded", activeMenu === key, 0)} aria-controls="${"mega-menu-" + escape(key, true)}">${escape(item.title)} <svg class="${"inline-block ml-1 w-4 h-4 transition-transform duration-200 " + escape(activeMenu === key ? "rotate-180" : "", true)}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></button> ${activeMenu === key ? `<div class="${[
      "fixed left-0 right-0 top-[72px] mx-auto w-screen max-w-7xl px-8 py-6 mt-6 bg-ultra-light shadow-xl rounded-xl svelte-lwz1be",
      "animate-slide-in animate-slide-out"
    ].join(" ").trim()}"><div class="grid grid-cols-4 gap-8">${each(menuItems[activeMenu].columns, (column) => {
      return `<div><h3 class="text-lg font-medium text-gray-900 mb-4">${escape(column.title)}</h3> <ul class="space-y-3">${each(column.links, (link) => {
        return `<li><a class="text-gray-600 hover:text-primary-500 transition-colors duration-200"${add_attribute("href", link.href, 0)}>${escape(link.title)}</a> </li>`;
      })}</ul> </div>`;
    })}  <div class="col-span-2 bg-gray-50 rounded-lg p-6"><div class="flex items-start">${menuItems[activeMenu].featured ? `<div class="flex-shrink-0"><img class="h-32 w-32 object-cover rounded-lg lazy svelte-lwz1be"${add_attribute("data-src", menuItems[activeMenu].featured.image, 0)}${add_attribute("alt", menuItems[activeMenu].featured.title, 0)}></div> <div class="ml-6"><h4 class="text-lg font-medium text-gray-900">${escape(menuItems[activeMenu].featured.title)}</h4> <p class="mt-2 text-sm text-gray-600">${escape(menuItems[activeMenu].featured.description)}</p> <a${add_attribute("href", menuItems[activeMenu].featured.link, 0)} class="mt-4 inline-flex items-center text-primary-600 hover:text-primary-800">Mehr erfahren
                                      <svg class="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg></a> </div>` : ``} </div></div> </div> </div>` : ``} </li>`;
  })}</ul> <div class="flex items-center" data-svelte-h="svelte-uep0xv"><a class="inline-block mr-9 text-sm font-medium text-primary-800 hover:text-gray-900" href="/">Sign In</a> <a class="relative group inline-block py-3 px-4 text-sm font-medium text-primary-800 hover:text-primary-50 bg-primary-50 rounded-md overflow-hidden transition duration-300" href="/"><div class="absolute top-0 right-full w-full h-full bg-primary-800 transform group-hover:translate-x-full group-hover:scale-102 transition duration-500"></div> <span class="relative">Create an account</span></a></div>`}</div></div></nav> ${``} </header>`;
});
const Footer = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<section class="py-20 bg-gray-100" data-svelte-h="svelte-46ge6i"><div class="container px-4 mx-auto"><div class="max-w-7xl mx-auto"><div class="flex flex-wrap -mx-4 pb-20 md:pb-28"><div class="w-full lg:w-1/2 px-4 mb-12 lg:mb-0"><div class="max-w-md mx-auto lg:mx-0"><h3 class="max-w-sm font-heading text-5xl md:text-6xl font-medium text-gray-900 mb-6"><span>Bist du</span> <span class="font-thin">bereit?</span></h3> <p class="max-w-sm text-gray-500 mb-16">If there are questions you want to ask, we will answer all your question</p> <div class="sm:flex mb-2 items-center"><input class="w-full mb-3 sm:mb-0 sm:mr-4 pb-4 bg-transparent border-b border-gray-200 text-sm text-gray-900 placeholder-gray-400 outline-none" type="email" placeholder="Enter your email"> <button class="relative group inline-block flex-shrink-0 w-full sm:w-auto py-3 px-5 text-sm font-semibold text-primary-50 bg-primary-900 rounded-full overflow-hidden" type="submit"><div class="absolute top-0 right-full w-full h-full bg-gray-900 transform group-hover:translate-x-full group-hover:scale-102 transition duration-500"></div> <span class="relative">Subscribe</span></button></div></div></div> <div class="w-full lg:w-1/2 px-4"><div class="max-w-md mx-auto lg:mr-0"><p class="text-2xl font-semibold text-gray-900 mb-16">Maybe your question is have been answered, check this out.</p> <div class="pb-5 mb-5 border-b border-gray-200"><a class="group flex items-center justify-between" href="#"><span class="text-lg text-gray-500 group-hover:text-primary-900">Was genau ist ein Freiraumstratege?</span> <span><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14 5L21 12M21 12L14 19M21 12L3 12" stroke="#FF460C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg></span></a></div> <div class="pb-5 mb-5 border-b border-gray-200"><a class="group flex items-center justify-between" href="#"><span class="text-lg text-gray-500 group-hover:text-primary-900">Wie läuft eine Zusammenarbeit mit einem Freiraumstrategen ab?</span> <span><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14 5L21 12M21 12L14 19M21 12L3 12" stroke="#FF460C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg></span></a></div> <div><a class="group flex items-center justify-between" href="#"><span class="text-lg text-gray-500 group-hover:text-primary-900">Für wen eignet sich eine Freiraumstrategie-Beratung?</span> <span><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14 5L21 12M21 12L14 19M21 12L3 12" stroke="#FF460C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg></span></a></div></div></div></div> <div class="pt-10 border-t border-gray-200"><div class="lg:flex items-center"><div class="flex mb-6 lg:mb-0 lg:mr-18 items-center"><a class="inline-block mr-5 hover:bg-gray-200 rounded-md p-1" href="#"><img src="saturn-assets/images/footers/icon-facebook.svg" alt=""></a> <a class="inline-block mr-5 hover:bg-gray-200 rounded-md p-1" href="#"><img src="saturn-assets/images/footers/icon-instagram.svg" alt=""></a> <a class="inline-block mr-5 hover:bg-gray-200 rounded-md p-1" href="#"><img src="saturn-assets/images/footers/icon-youtube.svg" alt=""></a> <a class="inline-block hover:bg-gray-200 rounded-md p-1" href="#"><img src="saturn-assets/images/footers/icon-linkedin.svg" alt=""></a></div> <div class="flex mb-6 lg:mb-0 items-center"><a class="inline-block mr-4 sm:mr-10 text-sm font-semibold text-gray-500 hover:text-gray-600" href="#">Privacy Policy</a><a class="inline-block mr-4 sm:mr-10 text-sm font-semibold text-gray-500 hover:text-gray-600" href="#">Terms &amp; Conditions</a><a class="inline-block text-sm font-semibold text-gray-500 hover:text-gray-600" href="#">Support</a></div> <span class="inline-block ml-auto text-sm text-gray-500">© All Rights Reserved</span></div></div></div></div></section>`;
});
const css = {
  code: "body.article-page{background-image:radial-gradient(446.50% 301.92% at 50.09% 3.49%, #002c33 13.21%, #0b8695 27.92%, #000 34.17%);backface-visibility:hidden}@media(min-width: 575px){main.svelte-xi41y2.svelte-xi41y2{margin-top:unset}}.preview-toggle.svelte-xi41y2.svelte-xi41y2{-webkit-backdrop-filter:blur(12px);backdrop-filter:blur(12px);border-radius:0.25rem;bottom:1rem;box-shadow:0 10px 15px -3px rgba(0, 0, 0, 0.1),\n			0 4px 6px -2px rgba(0, 0, 0, 0.05);color:#1f2937;display:block;font-size:0.75rem;font-weight:500;line-height:1rem;padding-bottom:0.5rem;padding-left:0.75rem;padding-right:0.75rem;padding-top:0.5rem;position:fixed;right:1rem;text-align:center;text-decoration:none;z-index:50}.preview-toggle.svelte-xi41y2.svelte-xi41y2:hover{background-color:#ef4444;color:#ffffff}.preview-toggle.svelte-xi41y2 span.svelte-xi41y2:first-child{display:block}.preview-toggle.svelte-xi41y2:hover span.svelte-xi41y2:first-child{display:none}.preview-toggle.svelte-xi41y2 span.svelte-xi41y2:last-child{display:none}.preview-toggle.svelte-xi41y2:hover span.svelte-xi41y2:last-child{display:block}",
  map: '{"version":3,"file":"+layout.svelte","sources":["+layout.svelte"],"sourcesContent":["<script lang=\\"ts\\">import { isPreviewing, VisualEditing } from \\"@sanity/visual-editing/svelte\\";\\nimport { page } from \\"$app/stores\\";\\nimport LiveMode from \\"$lib/components/LiveMode.svelte\\";\\nimport \\"../app.pcss\\";\\nimport Header from \\"$lib/templates/Header.svelte\\";\\nimport Footer from \\"$lib/templates/Footer.svelte\\";\\nimport { afterNavigate } from \\"$app/navigation\\";\\nlet isArticlePage = false;\\nafterNavigate(() => {\\n  isArticlePage = $page.url.pathname.startsWith(\\"/post\\");\\n  if (typeof document !== \\"undefined\\") {\\n    document.body.classList.toggle(\\"article-page\\", isArticlePage);\\n  }\\n});\\n<\/script>\\n\\n{#if $isPreviewing}\\n\\t<a href={`/preview/disable?redirect=${$page.url.pathname}`} class=\\"preview-toggle\\">\\n\\t\\t<span>Preview Enabled</span>\\n\\t\\t<span>Disable Preview</span>\\n\\t</a>\\n{/if}\\n\\n<Header />\\n\\t\\n\\t<main>\\n\\t\\t<slot />\\n\\t</main>\\n\\t<Footer />\\n\\t\\t\\t\\n\\n{#if $isPreviewing}\\n\\t<VisualEditing />\\n\\t<LiveMode />\\n{/if}\\n\\n<style lang=\\"postcss\\">\\n\\n\\n\\t:global(body.article-page) {\\n    background-image: radial-gradient(446.50% 301.92% at 50.09% 3.49%, #002c33 13.21%, #0b8695 27.92%, #000 34.17%);\\n    backface-visibility: hidden;\\n}\\n\\t\\n\\n\\t.footer {\\n\\t\\tdisplay: flex;\\n\\t\\tjustify-content: flex-end;\\n\\t\\tpadding: 0 var(--space-3);\\n\\t}\\n\\n\\t.footer .footer__text {\\n\\t\\tfont-size: var(--font-size-1);\\n\\t\\tline-height: var(--line-height-1);\\n\\t\\tdisplay: flex;\\n\\t\\talign-items: center;\\n\\t\\tgap: 2px;\\n\\t}\\n\\n\\t@media (min-width: 575px) {\\n\\t\\n\\n\\t\\tmain {\\n\\t\\t\\tmargin-top: unset;\\n\\t\\t}\\n\\t}\\n\\n\\t.preview-toggle {\\n\\t\\t-webkit-backdrop-filter: blur(12px);\\n\\t\\t        backdrop-filter: blur(12px);\\n\\t\\tborder-radius: 0.25rem;\\n\\t\\tbottom: 1rem;\\n\\t\\tbox-shadow:\\n\\t\\t\\t0 10px 15px -3px rgba(0, 0, 0, 0.1),\\n\\t\\t\\t0 4px 6px -2px rgba(0, 0, 0, 0.05);\\n\\t\\tcolor: #1f2937;\\n\\t\\tdisplay: block;\\n\\t\\tfont-size: 0.75rem;\\n\\t\\tfont-weight: 500;\\n\\t\\tline-height: 1rem;\\n\\t\\tpadding-bottom: 0.5rem;\\n\\t\\tpadding-left: 0.75rem;\\n\\t\\tpadding-right: 0.75rem;\\n\\t\\tpadding-top: 0.5rem;\\n\\t\\tposition: fixed;\\n\\t\\tright: 1rem;\\n\\t\\ttext-align: center;\\n\\t\\ttext-decoration: none;\\n\\t\\tz-index: 50;\\n\\t}\\n\\n\\t.preview-toggle:hover {\\n\\t\\tbackground-color: #ef4444;\\n\\t\\tcolor: #ffffff;\\n\\t}\\n\\n\\t.preview-toggle span:first-child {\\n\\t\\tdisplay: block;\\n\\t}\\n\\t.preview-toggle:hover span:first-child {\\n\\t\\tdisplay: none;\\n\\t}\\n\\n\\t.preview-toggle span:last-child {\\n\\t\\tdisplay: none;\\n\\t}\\n\\t.preview-toggle:hover span:last-child {\\n\\t\\tdisplay: block;\\n\\t}\\n</style>\\n\\n\\n\\n"],"names":[],"mappings":"AAuCS,iBAAmB,CACxB,gBAAgB,CAAE,gBAAgB,OAAO,CAAC,OAAO,CAAC,EAAE,CAAC,MAAM,CAAC,KAAK,CAAC,CAAC,OAAO,CAAC,MAAM,CAAC,CAAC,OAAO,CAAC,MAAM,CAAC,CAAC,IAAI,CAAC,MAAM,CAAC,CAC/G,mBAAmB,CAAE,MACzB,CAiBC,MAAO,YAAY,KAAK,CAAE,CAGzB,gCAAK,CACJ,UAAU,CAAE,KACb,CACD,CAEA,2CAAgB,CACf,uBAAuB,CAAE,KAAK,IAAI,CAAC,CAC3B,eAAe,CAAE,KAAK,IAAI,CAAC,CACnC,aAAa,CAAE,OAAO,CACtB,MAAM,CAAE,IAAI,CACZ,UAAU,CACT,CAAC,CAAC,IAAI,CAAC,IAAI,CAAC,IAAI,CAAC,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,GAAG,CAAC,CAAC;AACvC,GAAG,CAAC,CAAC,GAAG,CAAC,GAAG,CAAC,IAAI,CAAC,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,IAAI,CAAC,CACnC,KAAK,CAAE,OAAO,CACd,OAAO,CAAE,KAAK,CACd,SAAS,CAAE,OAAO,CAClB,WAAW,CAAE,GAAG,CAChB,WAAW,CAAE,IAAI,CACjB,cAAc,CAAE,MAAM,CACtB,YAAY,CAAE,OAAO,CACrB,aAAa,CAAE,OAAO,CACtB,WAAW,CAAE,MAAM,CACnB,QAAQ,CAAE,KAAK,CACf,KAAK,CAAE,IAAI,CACX,UAAU,CAAE,MAAM,CAClB,eAAe,CAAE,IAAI,CACrB,OAAO,CAAE,EACV,CAEA,2CAAe,MAAO,CACrB,gBAAgB,CAAE,OAAO,CACzB,KAAK,CAAE,OACR,CAEA,6BAAe,CAAC,kBAAI,YAAa,CAChC,OAAO,CAAE,KACV,CACA,6BAAe,MAAM,CAAC,kBAAI,YAAa,CACtC,OAAO,CAAE,IACV,CAEA,6BAAe,CAAC,kBAAI,WAAY,CAC/B,OAAO,CAAE,IACV,CACA,6BAAe,MAAM,CAAC,kBAAI,WAAY,CACrC,OAAO,CAAE,KACV"}'
};
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  let $isPreviewing, $$unsubscribe_isPreviewing;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  $$unsubscribe_isPreviewing = subscribe(isPreviewing, (value) => $isPreviewing = value);
  $$result.css.add(css);
  $$unsubscribe_page();
  $$unsubscribe_isPreviewing();
  return `${$isPreviewing ? `<a${add_attribute("href", `/preview/disable?redirect=${$page.url.pathname}`, 0)} class="preview-toggle svelte-xi41y2"><span class="svelte-xi41y2" data-svelte-h="svelte-uqaqdh">Preview Enabled</span> <span class="svelte-xi41y2" data-svelte-h="svelte-17t8c3a">Disable Preview</span></a>` : ``} ${validate_component(Header, "Header").$$render($$result, {}, {}, {})} <main class="svelte-xi41y2">${slots.default ? slots.default({}) : ``}</main> ${validate_component(Footer, "Footer").$$render($$result, {}, {}, {})} ${$isPreviewing ? `${validate_component(VisualEditing, "VisualEditing").$$render($$result, {}, {}, {})} ${validate_component(LiveMode, "LiveMode").$$render($$result, {}, {}, {})}` : ``}`;
});
export {
  Layout as default
};
