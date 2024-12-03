<script lang="ts">
  import { slide } from 'svelte/transition'
  import type { SalesAdvantagesSection } from '$lib/types/salesAdvantagesSection'
  import Icon from '$lib/components/icons/Icon.svelte';
  import CleanText from '$lib/components/CleanText.svelte';
  import Button from '$lib/components/Button.svelte';
  import { cleanText } from '$lib/utils/textCleaner';
  export let data: SalesAdvantagesSection

  let expandedAdvantage: number | null = null

  function toggleAdvantage(index: number) {
    expandedAdvantage = expandedAdvantage === index ? null : index
  }
</script>

<div class="relative z-10 container px-4 mx-auto">
  <div class="text-center mb-20">
    {#if data.badge}
      <CleanText 
        text={data.badge}
        className="inline-block py-1 px-3 mb-4 text-xs font-medium text-primary-900 bg-primary-50 rounded-full shadow"
      />
    {/if}
    <CleanText 
      text={data.title}
      tag="h2"
      className="text-4xl lg:text-5xl font-bold mb-6"
    />
    {#if data.subtitle}
      <CleanText 
        text={data.subtitle}
        tag="p"
        className="text-xl text-gray-600 max-w-3xl mx-auto"
      />
    {/if}
  </div>

  <!-- Advantages Grid -->
  <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
    {#each data.advantages as advantage, index}
      <div class="h-full">
        <div class="h-full p-8 bg-white rounded-3xl shadow transition-all duration-300 hover:bg-gray-50/30">
          <!-- Content -->
          <div>
            <CleanText 
              text={advantage.title}
              tag="h3"
              className="text-xl font-medium mb-4 text-primary-800"
            />
            <div class="text-gray-700">
              {#if expandedAdvantage === index}
                <div transition:slide={{ duration: 300 }}>
                  {@html cleanText(advantage.fullText).replace(/\n/g, '<br>').replace(/•/g, '• ')}
                </div>
              {:else}
                <CleanText 
                  text={advantage.shortText}
                  tag="p"
                />
              {/if}
            </div>
            
            <!-- Read More Button -->
            <button 
              class="mt-4 text-primary-600 hover:text-primary-800 text-sm font-medium flex items-center gap-1 transition-colors"
              on:click={() => toggleAdvantage(index)}
            >
              <CleanText text={expandedAdvantage === index ? 'Weniger anzeigen' : 'Mehr erfahren'} />
              <svg 
                class="w-4 h-4 transform transition-transform duration-200 {expandedAdvantage === index ? 'rotate-180' : ''}" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    {/each}
  </div>

  <!-- Bottom CTA -->
  {#if data.ctaButton}
    <div class="mt-16 text-center">
      <Button 
        text={data.ctaButton.text}
        href={data.ctaButton.link}
        icon="arrow-right"
        size="md"
        variant="primary"
      />
    </div>
  {/if}
</div>

<style>
  button {
    -webkit-tap-highlight-color: transparent;
  }
</style>
