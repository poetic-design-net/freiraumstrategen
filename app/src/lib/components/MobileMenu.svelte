<script lang="ts">
  import Logo from '$lib/components/Logo.svelte';
  import Icon from '$lib/components/icons/Icon.svelte';
  import type { NavigationItem } from '$lib/sanity/queries';
  import { slide, fade, fly } from 'svelte/transition';
  import { cubicOut } from 'svelte/easing';
  import { headerStore } from '$lib/components/header/store';

  export let navigationItems: NavigationItem[] | undefined;

  let activeSubmenu: string | null = null;

  function toggleSubmenu(key: string) {
    activeSubmenu = activeSubmenu === key ? null : key;
  }

  function onClose() {
    headerStore.closeMobileNav();
  }

  $: isOpen = $headerStore.mobileNavOpen;
</script>

{#if isOpen}
<div 
  class="fixed inset-0 z-[1001] flex"
  transition:fade={{ duration: 200 }}
>
  <div 
    class="absolute inset-0 bg-gray-800/50 backdrop-blur-sm"
    on:click={onClose}
    transition:fade={{ duration: 300 }}
    aria-label="Mobiles Menü schließen"
  />
  
  <div 
    class="relative w-5/6 max-w-md h-[100dvh] bg-white shadow-2xl"
    transition:fly={{ x: -100, duration: 400, easing: cubicOut }}
  >
    <nav class="h-full flex flex-col">
      <!-- Header -->
      <div class="flex items-center justify-between px-4 py-6 border-b border-gray-100">
        <a class="text-2xl font-light leading-none" href="/">
          <Logo isMobile={true} />
        </a>
        <button 
          on:click={onClose} 
          class="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
        >
          <Icon name="close" size={24} className="text-gray-500 cursor-pointer hover:text-gray-700" />
        </button>
      </div>

      <!-- Scrollable Content -->
      <div class="flex-1 overflow-y-auto">
        <div class="px-6 py-4">
          {#if navigationItems}
            <ul class="mb-8 space-y-2">
              {#each navigationItems as item}
                <li>
                  {#if item.columns && item.columns.length > 0}
                    <button 
                      class="flex items-center justify-between w-full p-3 text-gray-900 hover:bg-primary-50 rounded-lg transition-colors duration-200"
                      on:click={() => toggleSubmenu(item._key)}
                    >
                      <span>{item.title}</span>
                      <Icon 
                        name="chevron-down"
                        size={16}
                        className="transform transition-transform duration-300 {activeSubmenu === item._key ? 'rotate-180' : ''}"
                      />
                    </button>
                    {#if activeSubmenu === item._key}
                      <div 
                        transition:slide={{ duration: 300, easing: cubicOut }} 
                        class="ps-4 py-2 space-y-4"
                      >
                        {#each item.columns as column}
                          <div class="mb-4">
                            <h3 class="text-sm font-semibold text-gray-900 mb-2">{column.title}</h3>
                            <ul class="space-y-2">
                              {#each column.links as link}
                                <li>
                                  <a 
                                    href={link.href} 
                                    class="block text-sm text-gray-600 hover:text-primary-800 p-2 hover:bg-primary-50/50 rounded-md transition-all duration-200"
                                  >
                                    {link.title}
                                  </a>
                                </li>
                              {/each}
                            </ul>
                          </div>
                        {/each}
                        {#if item.featured}
                          <div 
                            class="mt-4 p-4 bg-gradient-to-br from-primary-50 to-primary-100/50 rounded-lg"
                            transition:slide={{ duration: 300, delay: 100 }}
                          >
                            {#if item.featured.imageUrl}
                              <img 
                                src={item.featured.imageUrl} 
                                alt={item.featured.title} 
                                class="w-full h-32 object-cover rounded-lg mb-3 shadow-sm"
                              />
                            {/if}
                            <h4 class="text-sm font-semibold text-gray-900 mb-1">{item.featured.title}</h4>
                            <p class="text-sm text-gray-600 mb-2">{item.featured.description}</p>
                            <a 
                              href={item.featured.link} 
                              class="inline-flex items-center text-sm text-primary-800 hover:text-primary-600 font-medium group"
                            >
                              Mehr erfahren
                              <Icon 
                                name="arrow-right" 
                                size={16} 
                                className="ms-1 transform transition-transform group-hover:translate-x-1"
                              />
                            </a>
                          </div>
                        {/if}
                      </div>
                    {/if}
                  {:else}
                    <a 
                      class="block p-3 text-gray-900 hover:bg-primary-50 rounded-lg transition-colors duration-200" 
                      href={item.path}
                    >
                      {item.title}
                    </a>
                  {/if}
                </li>
              {/each}
            </ul>
          {/if}

          <!-- Bottom Section -->
          <div class="space-y-8">
            <div class="py-6 border-t border-b border-gray-200">
              <a 
                class="flex items-center text-sm font-medium text-primary-800 hover:text-primary-600 p-2 hover:bg-primary-50 rounded-lg transition-all duration-200" 
                href="/"
              >
                <Icon name="star" size={18} />
                <span class="ms-3">Freiraumstratege werden!</span>
              </a>
            </div>

            <div class="flex items-center space-x-4">
              <a 
                class="flex-1 py-3 px-4 text-sm font-medium text-primary-800 hover:text-white border border-gray-300 hover:border-primary-600 hover:bg-primary-800 rounded-lg transition-all duration-200 text-center" 
                href="/"
              >
                Sign In
              </a>
              <a 
                class="flex-1 py-3 px-4 text-sm font-medium text-white bg-primary-800 hover:bg-primary-700 rounded-lg transition-all duration-200 text-center" 
                href="/"
              >
                Account erstellen
              </a>
            </div>

            <div class="pb-8">
              <div class="flex w-20 h-20 mb-6 items-center justify-center bg-primary-50 rounded-full">
                <Icon name="mail" size={29} className="text-primary-800" />
              </div>
              <span class="block mb-3 text-sm text-gray-500">Kontakt aufnehmen</span>
              <a 
                class="font-medium text-black hover:text-primary-800 transition-colors duration-200" 
                href="/"
              >
                hi@freiraumstrategen.de
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </div>
</div>
{/if}
