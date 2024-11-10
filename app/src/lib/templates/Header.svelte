<script lang="ts">
  import { onMount } from 'svelte';
  import { fade, fly, slide } from 'svelte/transition';  
  import Logo from '$lib/components/Logo.svelte';	
  import { clickOutside } from '$lib/actions/clickOutside';
  import { useQuery } from '@sanity/svelte-loader';
  import { navigationQuery } from '$lib/sanity/queries';

  export let data;

  // WICHTIG: useQuery benötigt explizite Typisierung für Array-Zugriffe
  // Beispiel: useQuery<Navigation[]> statt useQuery
  // Sonst Fehler: "Property '0' does not exist on type '{}'"
  const navigation = useQuery(
    data.navigationQuery,
    {},
    data.navigationOptions
  );

  $: ({ data: navigationData } = $navigation);

  let visible = false;
  let mobileNavOpen = false;
  let isMobile = false;
  let activeMenu: string | null = null;
  let isKeyboardNav = false;
  let isFirstOpen = true;
  let isMenuVisible = false;
  let timeoutId: ReturnType<typeof setTimeout>;

  // Mobile Check
  function checkMobile() {
    isMobile = window.innerWidth < 1280;
  }

  function toggleMobileNav() {
    mobileNavOpen = !mobileNavOpen;
  }

  // Navigation Handlers
// Neue Version:
async function handleMouseEnter(item: navigationQuery) {
    clearTimeout(timeoutId);
    
    if (activeMenu !== item._key) {
      if (activeMenu === null) {
        isFirstOpen = true;
      } else {
        isFirstOpen = false;
      }
      activeMenu = item._key;
      isMenuVisible = true;
    }
  }

  function handleMouseLeave() {
    isMenuVisible = false;
    timeoutId = setTimeout(() => {
      activeMenu = null;
      isFirstOpen = true;
    }, 200);
  }

  function handleClickOutside() {
    activeMenu = null;
    isFirstOpen = true;
  }

  // Scroll Handler
  let lastScrollY = 0;
  let isHeaderVisible = true;
  let hasScrolled = false;

  function handleScroll() {
    const currentScrollY = window.scrollY;
    isHeaderVisible = lastScrollY > currentScrollY || currentScrollY < 150;
    hasScrolled = currentScrollY > 150;
    lastScrollY = currentScrollY;
  }

  onMount(() => {
    visible = true;
    checkMobile();
    window.addEventListener('resize', checkMobile);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('scroll', handleScroll);
    };
  });
</script>

<div class="h-[72px]"></div>
<header 
    class="header fixed w-full transition-all duration-300 bg-white"
    class:translate-y-0={isHeaderVisible}
    class:pointer-events-none={!isHeaderVisible && !mobileNavOpen}
    class:-translate-y-full={!isHeaderVisible && !mobileNavOpen}
    class:shadow={hasScrolled}
    style="top: 0; left: 0; right: 0; z-index: 50;">
    <nav class="relative py-6 bg-white z-50" 
         use:clickOutside={handleClickOutside}
         on:mouseleave={handleMouseLeave}>
        <div class="container px-4 mx-auto">
          <div class="flex items-center relative">
            <a class="inline-block text-lg font-bold" href="/">
              <Logo />
            </a>

            {#if isMobile}
              <button on:click={toggleMobileNav} class="ml-auto flex w-12 h-12 items-center justify-center hover:bg-gray-200 rounded-md">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 12H21" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                  <path d="M3 6H21" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                  <path d="M3 18H21" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                </svg>
              </button>
            {:else}
            {#if navigationData?.[0]?.items}
            <ul class="flex mx-auto space-x-12">
              {#each navigationData[0].items as item}
                <li class="group relative">
                  <a
                    href={item.path}
                    class="inline-block text-sm text-primary-800 hover:text-primary-600 "
                    on:mouseenter={() => handleMouseEnter(item)} 
                    aria-expanded={activeMenu === item._key}>
                    {item.title}
                        <svg class="inline-block ml-1 w-4 h-4 transition-transform duration-200" 
                             class:rotate-180={activeMenu === item._key}
                             viewBox="0 0 24 24"
                             fill="none"
                             stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                        </svg>
                      </a>
                      
                      {#if activeMenu === item._key && item.columns}
                      <div class="fixed left-0 right-0 top-[72px] mx-auto w-screen max-w-7xl px-8 py-6 mt-6 bg-ultra-light shadow-xl rounded-xl h-48"
                          class:animate-slide-in={isFirstOpen}
                          class:animate-slide-out={!isMenuVisible}>
                          <div class="grid grid-cols-4 gap-8">
                            {#each item.columns as column}
                              <div>
                                <h3 class="text-lg font-medium text-gray-900 mb-4">{column.title}</h3>
                                <ul class="space-y-3">
                                  {#each column.links as link}
                                    <li>
                                      <a class="text-gray-600 hover:text-primary-500 transition-colors duration-200"
                                         href={link.href}>
                                        {link.title}
                                      </a>
                                    </li>
                                  {/each}
                                </ul>
                              </div>
                            {/each}
                            
                            {#if item.featured}
                              <div class="col-span-2 bg-gray-50 rounded-lg p-6">
                                <div class="flex items-start">
                                  <div class="flex-shrink-0">
                                    <img class="h-32 w-32 object-cover rounded-lg"
                                         src={item.featured.imageUrl}
                                         alt={item.featured.title}>
                                  </div>
                                  <div class="ml-6">
                                    <h4 class="text-lg font-medium text-gray-900">{item.featured.title}</h4>
                                    <p class="mt-2 text-sm text-gray-600">{item.featured.description}</p>
                                    <a href={item.featured.link}
                                       class="mt-4 inline-flex items-center text-primary-600 hover:text-primary-800">
                                      Mehr erfahren
                                      <svg class="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                                      </svg>
                                    </a>
                                  </div>
                                </div>
                              </div>
                            {/if}
                          </div>
                        </div>
                      {/if}
                    </li>
                  {/each}
                </ul>
                <div class="flex items-center">
                  
                  <button class="group relative py-3 px-4 text-sm font-medium rounded-md">
                    <!-- Icon mit angepassten Hover-Farben -->
                    <svg xmlns="http://www.w3.org/2000/svg" 
                         fill="none" 
                         viewBox="0 0 24 24" 
                         stroke-width="1.5" 
                         class="size-6 stroke-primary-800 group-hover:stroke-primary-600 transition-colors duration-300">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    </svg>
                
                    <!-- Tooltip -->
                    <div class="hidden group-hover:block absolute -top-6 left-1/2 -translate-x-1/2 px-2 py-2 bg-gray-50 text-primary-800 rounded-lg text-xs whitespace-nowrap z-50">
                      Mein Account
                      <div class="absolute -bottom-1 left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-50"></div>
                    </div>
                  </button>

                  <a class="relative group inline-block py-3 px-4 text-sm font-medium text-primary-800 hover:text-primary-50 bg-primary-50 rounded-md overflow-hidden transition duration-300" href="/">
                    <div class="absolute top-0 right-full w-full h-full bg-primary-800 transform group-hover:translate-x-full group-hover:scale-102 transition duration-500"></div>
                    <span class="relative">Strategiegespräch</span>
                  </a>
                </div>
              {/if}
            {/if}
          </div>
        </div>
    </nav>

    <!-- Mobile Menu -->
    {#if mobileNavOpen}
    <button class="fixed inset-0 h-[100dvh] bg-gray-800 opacity-25 z-50" on:click={toggleMobileNav} aria-label="Mobiles Menü schließen"></button>
    <nav class="fixed top-0 left-0 h-[100dvh] w-5/6 max-w-md z-50 bg-white border-r overflow-y-auto">
      <div class="flex items-center justify-between px-4 py-6 mb-10">
        <a class="text-2xl font-light leading-none" href="/">
          <Logo />
        </a>
        <button on:click={toggleMobileNav} class="p-2">
          <svg class="h-6 w-6 text-gray-500 cursor-pointer hover:text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
      <div class="px-6">
        {#if navigationData?.[0]?.items}
          <ul class="mb-8">
            {#each navigationData[0].items as item}
              <li>
                <a class="block py-4 text-gray-900 hover:bg-primary-50 rounded-lg" 
                   href={item.path}>
                  {item.title}
                </a>
              </li>
            {/each}
          </ul>
        {/if}
        <div class="py-8 mb-6 border-t border-b border-gray-200">
          <a class="flex items-center text-sm font-medium text-primary-800 hover:text-primary-600" href="/">
            <svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.3337 6.05833C17.2811 5.9059 17.1854 5.77202 17.0582 5.67292C16.931 5.57381 16.7777 5.51374 16.617 5.5L11.8754 4.80833L9.75038 0.499999C9.68215 0.359106 9.5756 0.240284 9.44296 0.157143C9.31031 0.074003 9.15693 0.0299072 9.00039 0.0299072C8.84384 0.0299072 8.69046 0.074003 8.55781 0.157143C8.42517 0.240284 8.31862 0.359106 8.25039 0.499999L6.12539 4.8L1.38372 5.5C1.22949 5.52192 1.08449 5.58663 0.96518 5.6868C0.845868 5.78696 0.757021 5.91856 0.708721 6.06666C0.664509 6.21139 0.660541 6.36543 0.697245 6.51224C0.733948 6.65905 0.809936 6.7931 0.917055 6.9L4.35872 10.2333L3.52539 14.9667C3.49564 15.1229 3.51121 15.2844 3.57028 15.432C3.62935 15.5797 3.72943 15.7074 3.85872 15.8C3.98474 15.8901 4.13337 15.9433 4.28793 15.9536C4.44249 15.9639 4.59686 15.9309 4.73372 15.8583L9.00039 13.6333L13.2504 15.8667C13.3673 15.9326 13.4994 15.9671 13.6337 15.9667C13.8102 15.9673 13.9824 15.9118 14.1254 15.8083C14.2547 15.7157 14.3548 15.588 14.4138 15.4404C14.4729 15.2927 14.4885 15.1312 14.4587 14.975L13.6254 10.2417L17.067 6.90833C17.1874 6.8064 17.2763 6.67242 17.3235 6.52195C17.3707 6.37149 17.3742 6.21073 17.3337 6.05833ZM12.2087 9.39166C12.111 9.48619 12.0379 9.6032 11.9957 9.73247C11.9536 9.86175 11.9438 9.99937 11.9671 10.1333L12.5671 13.625L9.43372 11.9583C9.31315 11.8941 9.17865 11.8605 9.04205 11.8605C8.90546 11.8605 8.77095 11.8941 8.65039 11.9583L5.51705 13.625L6.11705 10.1333C6.14033 9.99937 6.13048 9.86175 6.08836 9.73247C6.04623 9.6032 5.97312 9.48619 5.87539 9.39166L3.37539 6.89166L6.88372 6.38333C7.01872 6.36455 7.14705 6.31295 7.25747 6.23304C7.36789 6.15313 7.45702 6.04736 7.51705 5.925L9.00039 2.75L10.5671 5.93333C10.6271 6.0557 10.7162 6.16147 10.8266 6.24137C10.9371 6.32128 11.0654 6.37289 11.2004 6.39166L14.7087 6.9L12.2087 9.39166Z" fill="currentColor"></path>
            </svg>
            <span class="ml-3">Freiraumstratege werden!</span>
          </a>
        </div>
        <div class="flex mb-8 items-center">
          <a class="inline-block mr-9 text-sm font-medium text-primary-800 hover:text-gray-900" href="/">Sign In</a>
          <a class="inline-block py-3 px-4 text-sm font-medium text-primary-800 hover:text-white border border-gray-300 hover:border-primary-600 hover:bg-primary-800 rounded-md transition duration-200" href="/">Create an account</a>
        </div>
        <div>
          <div class="flex w-20 h-20 mb-6 items-center justify-center bg-primary-50 rounded-full">
            <svg width="29" height="28" viewBox="0 0 29 28" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M25.3333 16.6667C24.9797 16.6667 24.6406 16.8072 24.3905 17.0572C24.1405 17.3073 24 17.6464 24 18V23.3334C24 23.687 23.8595 24.0261 23.6095 24.2762C23.3594 24.5262 23.0203 24.6667 22.6667 24.6667H4C3.64638 24.6667 3.30724 24.5262 3.05719 24.2762C2.80714 24.0261 2.66667 23.687 2.66667 23.3334V10.5467L10.5067 18.4C11.2567 19.1491 12.2733 19.5698 13.3333 19.5698C14.3933 19.5698 15.41 19.1491 16.16 18.4L18.3467 16.2134C18.5977 15.9623 18.7388 15.6218 18.7388 15.2667C18.7388 14.9116 18.5977 14.5711 18.3467 14.32C18.0956 14.069 17.7551 13.9279 17.4 13.9279C17.0449 13.9279 16.7044 14.069 16.4533 14.32L14.2667 16.5067C14.0174 16.751 13.6823 16.8878 13.3333 16.8878C12.9843 16.8878 12.6492 16.751 12.4 16.5067L4.54667 8.66669H13.3333C13.687 8.66669 14.0261 8.52622 14.2761 8.27617C14.5262 8.02612 14.6667 7.68698 14.6667 7.33336C14.6667 6.97974 14.5262 6.6406 14.2761 6.39055C14.0261 6.1405 13.687 6.00002 13.3333 6.00002H4C2.93913 6.00002 1.92172 6.42145 1.17157 7.1716C0.421427 7.92174 0 8.93916 0 10V23.3334C0 24.3942 0.421427 25.4116 1.17157 26.1618C1.92172 26.9119 2.93913 27.3334 4 27.3334H22.6667C23.7275 27.3334 24.7449 26.9119 25.4951 26.1618C26.2452 25.4116 26.6667 24.3942 26.6667 23.3334V18C26.6667 17.6464 26.5262 17.3073 26.2761 17.0572C26.0261 16.8072 25.687 16.6667 25.3333 16.6667ZM27.6133 5.05336L23.6133 1.05336C23.4865 0.93197 23.337 0.836817 23.1733 0.773358C22.8487 0.64 22.4846 0.64 22.16 0.773358C21.9963 0.836817 21.8468 0.93197 21.72 1.05336L17.72 5.05336C17.4689 5.30443 17.3279 5.64496 17.3279 6.00002C17.3279 6.35509 17.4689 6.69562 17.72 6.94669C17.9711 7.19776 18.3116 7.33881 18.6667 7.33881C19.0217 7.33881 19.3623 7.19776 19.6133 6.94669L21.3333 5.21336V12.6667C21.3333 13.0203 21.4738 13.3595 21.7239 13.6095C21.9739 13.8595 22.313 14 22.6667 14C23.0203 14 23.3594 13.8595 23.6095 13.6095C23.8595 13.3595 24 13.0203 24 12.6667V5.21336L25.72 6.94669C25.844 7.07166 25.9914 7.17086 26.1539 7.23855C26.3164 7.30624 26.4907 7.34109 26.6667 7.34109C26.8427 7.34109 27.017 7.30624 27.1794 7.23855C27.3419 7.17086 27.4894 7.07166 27.6133 6.94669C27.7383 6.82274 27.8375 6.67527 27.9052 6.51279C27.9729 6.35032 28.0077 6.17604 28.0077 6.00002C28.0077 5.82401 27.9729 5.64973 27.9052 5.48726C27.8375 5.32478 27.7383 5.17731 27.6133 5.05336Z" fill="black"></path>
            </svg>
          </div>
          <span class="block mb-3 text-sm text-gray-500">Kontakt aufnehmen</span>
          <a class="font-medium text-black" href="/">hi@freiraumstrategen.de</a>
        </div>
      </div>
    </nav>
    {/if}
</header>

<style>
  .animate-slide-in {
    animation: slideIn 200ms ease-out forwards;
  }

  .animate-slide-out {
    animation: slideOut 200ms ease-out forwards;
  }

  @keyframes slideIn {
    from { 
      opacity: 0;
      transform: translateY(-20px);
    }
    to { 
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes slideOut {
    from { 
      opacity: 1;
      transform: translateY(0);
    }
    to { 
      opacity: 0;
      transform: translateY(-20px);
    }
  }
</style>