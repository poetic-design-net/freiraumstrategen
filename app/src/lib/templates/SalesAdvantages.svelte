<script lang="ts">
  import { slide } from 'svelte/transition'
  import type { SalesAdvantagesSection } from '$lib/types/salesAdvantagesSection'
  import type { PortableTextComponents } from '@portabletext/svelte'
  import Icon from '$lib/components/icons/Icon.svelte';
  import CleanText from '$lib/components/CleanText.svelte';
  import Button from '$lib/components/Button.svelte';
  import PortableTextContent from '$lib/components/PortableTextContent.svelte';
  import CustomListItem from '$lib/components/CustomListItem.svelte';
  import { cleanText } from '$lib/utils/textCleaner';
  import { getThemeStyles } from '$lib/utils/sections'

  export let data: SalesAdvantagesSection

  // Get theme-based styles for content
  const theme = getThemeStyles(data.styles?.theme)

  let expandedAdvantage: number | null = null

  function toggleAdvantage(index: number) {
    expandedAdvantage = expandedAdvantage === index ? null : index
  }

  const portableTextComponents: PortableTextComponents = {
    listItem: {
      bullet: CustomListItem,
      normal: CustomListItem,
    }
  };

</script>

<!-- Content -->
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
      className="{theme.headings} text-4xl lg:text-5xl font-bold mb-6"
    />
    {#if data.subtitle}
      <CleanText 
        text={data.subtitle}
        tag="p"
        className="{theme.text} text-xl max-w-3xl mx-auto"
      />
    {/if}
  </div>

  <!-- Advantages Grid -->
  <div class="grid gap-8" class:md:grid-cols-2={data.advantages.length >= 2} class:lg:grid-cols-3={data.advantages.length >= 5}>
    {#each data.advantages as advantage, index}
      <div class="h-full">
        <button 
          class="w-full h-full text-left cursor-pointer group"
          on:click={() => toggleAdvantage(index)}
        >
          <div class="h-full p-8 {theme.background} rounded-lg shadow transition-all duration-300 hover:shadow-lg hover:{theme.background}/90">
            <!-- Content -->
            <div>
              <div class="flex items-start justify-between gap-4 mb-4">
                <CleanText 
                  text={advantage.title}
                  tag="h3"
                  className="{theme.headings} text-xl font-medium"
                />
                <div class="flex-shrink-0 mt-1">
                  <svg 
                    class="w-4 h-4 transform transition-transform duration-200 {expandedAdvantage === index ? 'rotate-180' : ''} text-primary-600" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
              <div class="{theme.text} text-gray-700 relative">
                <div class="overflow-hidden">
                  {#if expandedAdvantage === index}
                    <div 
                      class="py-2"
                      transition:slide|local={{ duration: 300 }}
                    >
                      <div class="[&_.page-content_:last-child]:mb-0">
                        <PortableTextContent 
                          value={advantage.fullText} 
                          components={portableTextComponents}
                        />
                      </div>
                    </div>
                  {:else if advantage.shortText}
                    <div 
                      class="py-2"
                      transition:slide|local={{ duration: 300 }}
                    >
                      <CleanText 
                        text={advantage.shortText}
                        tag="p"
                        className="mb-0"
                      />
                    </div>
                  {/if}
                </div>
              </div>
            </div>
          </div>
        </button>
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
