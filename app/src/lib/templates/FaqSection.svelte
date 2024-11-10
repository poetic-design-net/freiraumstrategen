<script lang="ts">
  import { fade } from 'svelte/transition';
  import { cubicOut } from 'svelte/easing';
  import { demoFaq } from '$lib/data/faq';

  export let faq = demoFaq;
  let expandedItem: string | null = null;

  const INITIAL_ITEMS = 6;
  let visibleItems = INITIAL_ITEMS;
  
  $: displayedFaq = faq.slice(0, visibleItems);
  $: hasMore = visibleItems < faq.length;
  
  function loadMore() {
    visibleItems += 6;
  }

  function toggleExpand(id: string) {
    expandedItem = expandedItem === id ? null : id;
  }
</script>

<div class="relative container px-4 mx-auto">
  <div class="max-w-7xl mx-auto">
    <div class="text-center mb-24">
      <span class="inline-block py-1 px-3 mb-4 text-xs font-semibold text-primary-900 bg-primary-50 rounded-full">FREQUENTLY ASK QUESTION</span>
      <h1 class="font-heading text-5xl xs:text-6xl md:text-7xl font-bold">
        <span>Du hast Fragen?</span>
        <span class="font-thin block">Wir haben die Antworten</span>
      </h1>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 [grid-auto-flow:dense]">
      {#each displayedFaq as item, index (item._id)}
        {#if index === 3}
          <!-- USP Kachel -->
          <div class="aspect-[16/9] relative group">
            <div class="h-full rounded-3xl shadow overflow-hidden relative">
              <!-- Hintergrundbild mit Overlay -->
              <div class="absolute inset-0 bg-gradient-to-br from-primary-950/90 to-primary-600/85 z-10"></div>
              <img 
                src="/assets/hero_home-old.jpg" 
                alt="" 
                class="absolute inset-0 w-full h-full object-cover"
              />
              
              <!-- Content -->
              <div class="relative z-20 h-full p-6 flex flex-col justify-between">
                <div>
                  <span class="text-primary-100 text-sm font-semibold">EXPERTENWISSEN</span>
                  <h3 class="text-white text-2xl font-bold mt-2">Noch Fragen offen?</h3>
                  <p class="text-primary-50 mt-3">Lassen Sie uns in einem persönlichen Gespräch Ihre spezifischen Herausforderungen besprechen.</p>
                </div>
                
                <a 
                  href="/kontakt" 
                  class="mt-4 inline-flex items-center justify-center px-6 py-3 bg-white text-primary-900 rounded-xl font-semibold hover:bg-primary-50 transition-colors duration-300"
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
        
        <!-- Normale FAQ Kachel -->
        <div 
          class="transition-all duration-300 ease-out transform-gpu {
            expandedItem === item._id 
              ? 'lg:col-span-2 lg:row-span-2 aspect-[16/9] z-10' 
              : 'aspect-[16/9]'
          }"
        >
          <div 
            class="h-full rounded-3xl shadow p-6 overflow-hidden {
              expandedItem === item._id 
                ? 'bg-gray-100' 
                : 'bg-white hover:shadow-md hover:scale-[1.01] transition-transform duration-300'
            }"
          >
            <div class="flex flex-col h-full">
              <h4 class="text-xl font-semibold mb-4 {
                expandedItem === item._id 
                  ? 'text-primary-800' 
                  : ''
              }">{item.title}</h4>
              
              {#if expandedItem === item._id}
                <div class="flex flex-col flex-1" 
                  transition:fade|local={{ duration: 200, delay: 100 }}
                >
                  <div class="flex-1">
                    <p class="text-gray-600 font-regular">{item.answer}</p>
                  </div>
                  
                  <div class="mt-4">
                    <div class="bg-white p-4 rounded-lg mb-4">
                      <h5 class="font-medium mb-2 text-dark">Weitere Informationen</h5>
                      <p class="text-sm text-gray-800">{item.additionalInfo}</p>
                    </div>
                    
                    <button 
                      class="text-xs font-semibold text-gray-600 hover:text-gray-800 hover:underline"
                      on:click={() => toggleExpand(item._id)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor" class="size-5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M9 9V4.5M9 9H4.5M9 9 3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5 5.25 5.25" />
                      </svg>
                    </button>
                  </div>
                </div>
              {:else}
                <div class="flex flex-col flex-1 overflow-hidden opacity-0 animate-fadeIn"
                  transition:fade|local={{ duration: 100 }}
                >
                  <p class="text-gray-500 mb-4 flex-1 overflow-hidden">{item.question}</p>
                  <button 
                    class="text-left text-xs font-semibold text-primary-900 hover:underline"
                    on:click={() => toggleExpand(item._id)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor" class="size-6">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
                    </svg>
                  </button>
                </div>
              {/if}
            </div>
          </div>
        </div>
      {/each}
    </div>
  </div>
</div>

{#if hasMore}
  <div class="text-center mt-12">
    <button 
      class="px-8 py-3 bg-primary-900 text-white rounded-xl hover:bg-primary-800 transition-colors"
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




