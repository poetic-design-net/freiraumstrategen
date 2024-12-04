<script lang="ts">
  import { fade, scale } from 'svelte/transition';
  import type { Faq } from '$lib/sanity/queries';

  export let faq: Faq[] = [];
  let expandedItem: string | null = null;

  const INITIAL_ITEMS = 5;
  let visibleItems = INITIAL_ITEMS;
  
  $: displayedFaq = faq.slice(0, visibleItems);
  $: hasMore = visibleItems < faq.length;
  
  function loadMore() {
    visibleItems += 6;
  }

  function toggleExpand(id: string) {
    expandedItem = expandedItem === id ? null : id;
  }

  let selectedFaq: Faq | null = null;
</script>

<div class="relative container px-4 mx-auto">
  <div class="max-w-7xl mx-auto">
    <div class="text-center mb-24">
      <span class="inline-block py-1 px-3 mb-4 text-xs font-medium text-primary-900 bg-primary-50 shadow rounded-full">FREQUENTLY ASK QUESTION</span>
      <h1 class="font-heading text-5xl xs:text-6xl md:text-7xl font-bold">
        <span>Du hast Fragen?</span>
        <span class="font-thin block">Wir haben die Antworten</span>
      </h1>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {#each displayedFaq as item, index}
        {#if index === 3}
          <!-- USP Kachel -->
          <div class="lg:aspect-[16/9] relative group">
            <div class="h-full rounded-3xl shadow overflow-hidden relative">
              <div class="absolute inset-0 bg-gradient-to-br from-primary-950/90 to-primary-600/85 z-10"></div>
              <img 
                src="/assets/hero_home-old.jpg" 
                alt="" 
                class="absolute inset-0 w-full h-full object-cover"
              />
              
              <div class="relative z-20 h-full p-6 flex flex-col justify-between">
                <div>
                  <span class="text-primary-100 text-sm font-regular">EXPERTENWISSEN</span>
                  <h3 class="text-white text-2xl font-medium mt-2">Noch Fragen offen?</h3>
                  <p class="text-primary-50 mt-3">Lassen Sie uns in einem persönlichen Gespräch Ihre spezifischen Herausforderungen besprechen.</p>
                </div>
                
                <a 
                  href="/kontakt" 
                  class="mt-4 inline-flex items-center justify-center px-6 py-3 bg-white text-primary-900 rounded-xl font-medium hover:bg-primary-50 transition-colors"
                >
                  Termin vereinbaren
                  <svg class="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        {/if}

        <!-- FAQ Kachel -->
        <button 
          class="text-left lg:aspect-[16/9] rounded-3xl shadow p-6 bg-white hover:shadow-lg transition-shadow duration-300 flex flex-col items-start"
          on:click={() => selectedFaq = item}
        >
          <h4 class="text-xl font-medium mb-4">{item.title}</h4>
          <p class="text-gray-500 line-clamp-3">{item.question}</p>
        </button>
      {/each}
    </div>
  </div>
</div>

<!-- Modal -->
{#if selectedFaq}
  <div 
    class="fixed inset-0 bg-gray-900/50 z-50 flex items-center justify-center p-4"
    on:click|self={() => selectedFaq = null}
    transition:fade={{ duration: 200 }}
  >
    <div 
      class="bg-white rounded-3xl shadow-xl max-w-2xl w-full relative"
      transition:scale={{ duration: 200, start: 0.95 }}
    >
      <!-- Close Button -->
      <button 
        class="absolute top-4 right-4 text-sm font-medium text-gray-600 hover:text-gray-800 z-50"
        on:click={() => selectedFaq = null}
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
        </svg>
      </button>

      <!-- Scrollbarer Content -->
      <div class="p-8 max-h-[80vh] overflow-y-auto">
        <h3 class="text-2xl font-semibold text-primary-800 mb-6 pr-8">{selectedFaq.title}</h3>
        <p class="text-gray-600 mb-6">{selectedFaq.answer}</p>
        
        {#if selectedFaq.additionalInfo}
          <div class="bg-gray-100 rounded-xl p-6">
            <h4 class="font-medium mb-2">Weitere Informationen</h4>
            <p class="text-sm text-gray-800">{selectedFaq.additionalInfo}</p>
          </div>
        {/if}
      </div>
    </div>
  </div>
{/if}

{#if hasMore}
  <div class="text-center mt-12">
    <button 
      class="px-8 py-3 bg-gray-200 text-primary-800 rounded-xl hover:bg-primary-800 hover:text-white transition-colors"
      on:click={loadMore}
    >
      Weitere Fragen anzeigen
    </button>
  </div>
{/if}

<style>
  .grid {
    grid-auto-flow: dense;
  }
  
  /* Optimierte Animationen */
  .grid > div {
    backface-visibility: hidden;
    perspective: 1000px;
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  .animate-fadeIn {
    animation: fadeIn 0.3s ease-out forwards;
  }
</style>
