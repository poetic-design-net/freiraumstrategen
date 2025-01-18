<script lang="ts">
  import type { NavigationItem } from './types';
  import { headerStore } from './store';
  import { clickOutside } from '$lib/actions/clickOutside';
  import Icon from '$lib/components/icons/Icon.svelte';
  import { browser } from '$app/environment';
  import { onMount } from 'svelte';

  export let items: NavigationItem[] = [];

  let timeoutId: ReturnType<typeof setTimeout>;
  let ready = false;

  onMount(() => {
    if (browser) {
      setTimeout(() => {
        ready = true;
      }, 400);
    }
  });

  function handleMouseEnter(item: NavigationItem) {
    clearTimeout(timeoutId);
    
    if ($headerStore.activeMenu !== item._key) {
      if ($headerStore.activeMenu === null) {
        headerStore.setFirstOpen(true);
      } else {
        headerStore.setFirstOpen(false);
      }
      headerStore.setActiveMenu(item._key);
      headerStore.setMenuVisibility(true);
    }
  }

  function handleMouseLeave() {
    headerStore.setMenuVisibility(false);
    timeoutId = setTimeout(() => {
      headerStore.setActiveMenu(null);
      headerStore.setFirstOpen(true);
    }, 200);
  }

  function handleClickOutside() {
    headerStore.setActiveMenu(null);
    headerStore.setFirstOpen(true);
  }
</script>

<nav class="relative py-6 bg-white z-50" 
     use:clickOutside={handleClickOutside}
     on:mouseleave={handleMouseLeave}>
  <div class="container px-4 mx-auto">
    <div class="flex items-center relative">
      <slot name="logo" />

      <ul class="flex mx-auto space-x-12 opacity-0 transition-opacity duration-300" class:opacity-100={ready}>
        {#each items as item}
          <li class="group relative">
            <a
              href={item.path || `/${item.title.toLowerCase()}`}
              class="inline-block text-sm text-primary-800 hover:text-primary-600"
              on:mouseenter={() => handleMouseEnter(item)} 
              aria-expanded={$headerStore.activeMenu === item._key}>
              {item.title}
              {#if item.columns}
                <Icon 
                  name="chevron-down" 
                  size={16} 
                  className="inline-block ms-1 transition-transform duration-200 {$headerStore.activeMenu === item._key ? 'rotate-180' : ''}"
                />
              {/if}
            </a>
            
            {#if $headerStore.activeMenu === item._key && item.columns}
              <div class="fixed left-0 right-0 top-[72px] border border-gray-100 mx-auto w-screen max-w-7xl px-8 py-8 mt-6 bg-ultra-light shadow-lg rounded-xl h-62"
                   class:animate-slide-in={$headerStore.isFirstOpen}
                   class:animate-slide-out={!$headerStore.isMenuVisible}>
                <div class="grid grid-cols-4 gap-8 relative">
                  {#each item.columns as column, index}
                    <div>
                      <h3 class="text-lg font-medium text-gray-900 mb-4">{column.title}</h3>
                      <ul class="space-y-3">
                        {#each column.links as link}
                          <li>
                            <a class="text-gray-600 hover:text-primary-600 transition-colors duration-200"
                               href={link.href}>
                              {link.title}
                            </a>
                          </li>
                        {/each}
                      </ul>
                    </div>
                    {#if index < item.columns.length - 1}
                      <div class="absolute top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gray-200 to-transparent" style="left: {20 * (index + 1)}%"></div>
                    {/if}
                  {/each}
                  
                  {#if item.featured}
                    <div class="col-span-2 rounded-lg">
                      <div class="flex justify-start">
                        <div class="flex-shrink-0 relative">
                          <img class="h-32 w-32 object-cover rounded-lg"
                               src={item.featured.imageUrl}
                               alt={item.featured.title}>
                        </div>
                        <div class="ms-6">
                          <h4 class="text-lg font-medium text-gray-900">{item.featured.title}</h4>
                          <p class="mt-2 text-sm text-gray-600 mb-4">{item.featured.description}</p>
                          <a href={item.featured.link} class="
                            text-sm font-medium
                            text-primary-800 hover:text-primary-600
                            underline underline-offset-2
                            transition-colors duration-300
                          ">
                            Mehr erfahren
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

      <slot name="actions" />
    </div>
  </div>
</nav>

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
