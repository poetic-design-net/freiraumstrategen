<script lang="ts">
  import Button from '$lib/components/Button.svelte';
  import Icon from '$lib/components/icons/Icon.svelte';
  import { browser } from '$app/environment';
  import { onMount } from 'svelte';

  let ready = false;

  onMount(() => {
    if (browser) {
      // Small delay to ensure it transitions after the page content
      setTimeout(() => {
        ready = true;
      }, 400); // Slightly after the page transition (300ms + 100ms buffer)
    }
  });
</script>

<div class="flex items-center opacity-0 transition-opacity duration-300" class:opacity-100={ready}>
  <button 
    class="group relative py-3 px-4 text-sm font-medium rounded-md "
  >
    <!-- Account Icon with hover colors -->
    <Icon 
      name="user" 
      size={24} 
      className="text-white stroke-primary-800 group-hover:stroke-primary-600 transition-colors duration-300"
    />

    <!-- Tooltip -->
    <div class="hidden group-hover:block absolute -top-6 left-1/2 -translate-x-1/2 px-2 py-2 bg-gray-50 text-primary-800 rounded-lg text-xs whitespace-nowrap z-50">
      Mein Account
      <div class="absolute -bottom-1 left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-50"></div>
    </div>
  </button>

  <a 
    class="relative shadow group inline-block py-3 px-4 text-sm font-medium text-primary-800 hover:text-primary-50 bg-primary-50 rounded-md overflow-hidden transition duration-300" 
    href="/strategiegespraech"
  >
    <div class="absolute top-0 right-full w-full h-full bg-primary-800 transform group-hover:translate-x-full group-hover:scale-102 transition duration-500"></div>
    <span class="relative">Strategiegespräch</span>
  </a>
</div>
