<script lang="ts">
  import { slide, fade, fly } from 'svelte/transition';
  import { cubicOut } from 'svelte/easing';
  import type { NavigationItem } from './types';
  import { headerStore } from './store';
  import Icon from '$lib/components/icons/Icon.svelte';
  import Logo from '$lib/components/Logo.svelte';
  import Button from '$lib/components/Button.svelte';

  export let navigationItems: NavigationItem[] = [];
  let activeSubmenu: string | null = null;

  function handleClose() {
    headerStore.closeMobileNav();
  }

  function toggleSubmenu(key: string) {
    activeSubmenu = activeSubmenu === key ? null : key;
  }
</script>

{#if $headerStore.mobileNavOpen}
  <div 
    class="fixed inset-0 z-[1001] flex"
    transition:fade={{ duration: 200 }}
  >
    <div 
      class="absolute inset-0 bg-gray-800/50 backdrop-blur-sm"
      on:click={handleClose}
      transition:fade={{ duration: 300 }}
      aria-label="Close menu"
    />
    
    <nav 
      class="relative w-5/6 max-w-md h-[100dvh] bg-white shadow-2xl"
      transition:fly={{ x: -100, duration: 400, easing: cubicOut }}
    >
      <div class="h-full flex flex-col">
        <!-- Header -->
        <div class="flex items-center justify-between px-4 py-6 border-b border-gray-100">
          <a class="text-2xl font-light leading-none" href="/">
            <Logo isMobile={true} />
          </a>
          <button 
            on:click={handleClose} 
            class="px-4 transition-colors duration-200"
          >
            <Icon name="x" size={24} className="text-gray-500 hover:text-gray-700" />
          </button>
        </div>

        <!-- Main Content Area -->
        <div class="flex-1 overflow-y-auto">
          <div class="px-6 py-4">
            <ul class="space-y-2">
              {#each navigationItems as item}
                <li>
                  {#if item.columns}
                    <div class="flex items-center justify-between w-full">
                      <a 
                        href={item.path || `/${item.title.toLowerCase()}`}
                        class="flex-grow p-3 text-base font-medium text-gray-900 hover:bg-primary-50 rounded-lg transition-colors duration-200"
                        on:click={handleClose}
                      >
                        {item.title}
                      </a>
                      <button 
                        class="p-3 hover:bg-primary-50 rounded-lg transition-colors duration-200"
                        on:click={() => toggleSubmenu(item._key)}
                      >
                        <Icon 
                          name="chevron-down"
                          size={16}
                          className="transform transition-transform duration-300 {activeSubmenu === item._key ? 'rotate-180' : ''}"
                        />
                      </button>
                    </div>
                    {#if activeSubmenu === item._key}
                      <div 
                        transition:slide={{ duration: 300, easing: cubicOut }}
                        class="mt-2 ps-4 space-y-4"
                      >
                        {#each item.columns as column}
                          <div class="mb-2">
                            {#if column.title}
                              <h3 class="text-sm font-semibold text-gray-900 mb-2 ps-2">{column.title}</h3>
                            {/if}
                            <ul class="space-y-1">
                              {#each column.links as link}
                                <li>
                                  <a 
                                    href={link.href}
                                    class="block text-sm text-gray-600 hover:text-primary-800 p-2 hover:bg-primary-50/50 rounded-md transition-all duration-200"
                                    on:click={handleClose}
                                  >
                                    {link.title}
                                  </a>
                                </li>
                              {/each}
                            </ul>
                          </div>
                        {/each}
                      </div>
                    {/if}
                  {:else}
                    <a 
                      href={item.path}
                      class="block p-3 text-base font-medium text-gray-900 hover:bg-primary-50 rounded-lg transition-colors duration-200"
                      on:click={handleClose}
                    >
                      {item.title}
                    </a>
                  {/if}
                </li>
              {/each}
            </ul>
          </div>
        </div>

        <!-- Bottom Section (Always at bottom) -->
        <div class="mt-auto border-t border-gray-100">
          <div class="px-6 py-4 space-y-6">
            <!-- Call to Action -->
            <Button
              text="Strategiegespräch"
              href="/strategiegespraech"
              variant="orange"
              size="md"
              icon="arrow-right"
            />

            <!-- Become Member -->
            <a 
              class="flex items-center text-sm font-medium text-primary-800 hover:text-primary-600 p-2 hover:bg-primary-50 rounded-lg transition-all duration-200" 
              href="/"
            >
              <Icon name="star" size={18} />
              <span class="ms-3">Freiraumstratege werden!</span>
            </a>

            <!-- Sign In/Create Account -->
            <div class="grid grid-cols-2 gap-4">
              <Button
                text="Anmelden"
                href="/login"
                variant="outline"
                size="sm"
                icon="none"
              />
              <Button
                text="Account erstellen"
                href="#registrieren"
                variant="primary"
                size="sm"
                icon="none"
              />
            </div>

            <!-- Contact -->
            <div class="flex items-center gap-4">
              <div class="flex w-16 h-16 items-center justify-center bg-primary-50 rounded-full">
                <Icon name="mail" size={24} className="text-primary-800" />
              </div>
              <div>
                <span class="block mb-1 text-sm text-gray-500">Kontakt aufnehmen</span>
                <a 
                  class="font-medium text-black hover:text-primary-800 transition-colors duration-200" 
                  href="/"
                >
                  hi@freiraumstrategen.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </div>
{/if}
