<script lang="ts">
  import { slide } from 'svelte/transition'
  import type { SalesAdvantagesSection } from '$lib/types/salesAdvantagesSection'
  import Icon from '$lib/components/icons/Icon.svelte';
  import CleanText from '$lib/components/CleanText.svelte';
  import Button from '$lib/components/Button.svelte';
  import { cleanText } from '$lib/utils/textCleaner';
  import { getSectionClasses, getThemeStyles } from '$lib/utils/sections'

  export let data: SalesAdvantagesSection

  // Get theme-based styles while preserving section-specific styling
  const sectionClasses = getSectionClasses('salesAdvantagesSection', data.styles)
  const theme = getThemeStyles(data.styles?.theme)

  let expandedAdvantage: number | null = null

  function toggleAdvantage(index: number) {
    expandedAdvantage = expandedAdvantage === index ? null : index
  }

  function formatTextWithChecks(text: string) {
    // Split text into lines
    const lines = text.split('\n');
    
    // Process each line
    return lines.map(line => {
      // Check if line starts with a bullet point
      if (line.trim().startsWith('•')) {
        // Replace bullet with check icon and wrap in flex container
        return `<div class="flex items-start gap-2 my-2">
          <span class="flex-shrink-0 mt-1">
            <svg class="w-4 h-4 text-primary-600" viewBox="0 0 20 20" fill="currentColor">
              <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
            </svg>
          </span>
          <span>${line.replace('•', '').trim()}</span>
        </div>`;
      }
      return line;
    }).join('');
  }
</script>

<section class="relative w-full {sectionClasses}">
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
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {#each data.advantages as advantage, index}
        <div class="h-full">
          <button 
            class="w-full h-full text-left cursor-pointer group"
            on:click={() => toggleAdvantage(index)}
          >
            <div class="h-full p-8 {theme.background} rounded-3xl shadow transition-all duration-300 hover:shadow-lg hover:{theme.background}/90">
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
                <div class="{theme.text} text-gray-700">
                  {#if expandedAdvantage === index}
                    <div transition:slide={{ duration: 300 }}>
                      {@html formatTextWithChecks(cleanText(advantage.fullText))}
                    </div>
                  {:else}
                    <CleanText 
                      text={advantage.shortText}
                      tag="p"
                    />
                  {/if}
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
</section>

<style>
  button {
    -webkit-tap-highlight-color: transparent;
  }
</style>
