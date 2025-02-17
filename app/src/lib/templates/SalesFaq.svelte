<script lang="ts">
  import { slide } from 'svelte/transition'
  import type { SalesFaqSection } from '$lib/types/salesFaqSection'
  import CleanText from '$lib/components/CleanText.svelte';
  import Button from '$lib/components/Button.svelte';
  import Icon from '$lib/components/icons/Icon.svelte';

  export let data: SalesFaqSection

  // Initialisiere expandedIndex basierend auf isExpanded
  let expandedIndex: number | null = data.faqs.findIndex(faq => faq.isExpanded)
  if (expandedIndex === -1) expandedIndex = null

  function toggleFaq(index: number) {
    expandedIndex = expandedIndex === index ? null : index
  }
</script>

<div class="relative z-10 container px-4 mx-auto ">
  <div class="max-w-3xl mx-auto">
    <!-- Section Header -->
    <div class="text-center mb-20">
      {#if data.badge}
        <CleanText 
          text={data.badge}
          className="inline-block mb-8 font-medium uppercase text-primary"
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
          className="text-xl text-gray-600"
        />
      {/if}
    </div>

    <!-- FAQ List -->
    <div class="space-y-4">
      {#each data.faqs as faq, index}
        <div class="overflow-hidden text-2xl text-primary border-b-2 border-primary after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:border-b-4 after:border-b-green after:opacity-0 hover:after:opacity-100 after:duration-300 relative {expandedIndex === index ? 'after:opacity-100' : ''}">
          <button
            class="w-full text-left py-4 flex items-center justify-between transition-colors"
            on:click={() => toggleFaq(index)}
          >
            <CleanText 
              text={faq.question}
              className="font-medium pr-8"
            />
            <div class="flex-shrink-0">
              <div class="relative w-12 h-12">
                <div class="absolute inset-0">
                  <svg class="w-12 h-12 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <g class="transform transition-all duration-500 ease-in-out" style="transform-origin: center; {expandedIndex === index ? 'transform: rotate(180deg)' : ''}">
                      <path
                        class="transform transition-all duration-500 ease-in-out"
                        style="transform-origin: center; {expandedIndex === index ? 'transform: scaleY(0)' : ''}"
                        stroke-linecap="butt"
                        stroke-linejoin="miter"
                        stroke-width="1"
                        d="M12 5v14"
                      />
                      <path
                        stroke-linecap="butt"
                        stroke-linejoin="miter"
                        stroke-width="1"
                        d="M5 12h14"
                      />
                    </g>
                  </svg>
                </div>
              </div>
            </div>
          </button>
          {#if expandedIndex === index}
            <div 
              class="py-4"
              transition:slide={{ duration: 300 }}
            >
              <div class="space-y-4">
                <CleanText
                  text={faq.answer}
                  className="whitespace-pre-line text-xl"
                />
                {#if faq.additionalInfo}
                  <CleanText
                    text={faq.additionalInfo}
                    className="whitespace-pre-line text-gray-600 text-base mt-4"
                  />
                {/if}
              </div>
            </div>
          {/if}
        </div>
      {/each}
    </div>

    <!-- Bottom CTA -->
    <div class="mt-16 text-center">
      {#if data.contactInfo}
        <div class="mb-8">
          {#if data.contactInfo.text}
            <CleanText
              text={data.contactInfo.text}
              tag="p"
              className="text-gray-600"
            />
          {/if}
        </div>
        <div class="flex flex-wrap gap-4 justify-center items-center">
          {#if data.contactInfo.email}
            <a
              href="mailto:{data.contactInfo.email}"
              class="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-primary-800 hover:text-primary-900 group"
            >
              <Icon name="mail" size={20} className="mr-2" />
              <CleanText text={data.contactInfo.email} />
            </a>
          {/if}
        </div>
      {/if}
      
      {#if data.ctaButton}
        <div class="flex justify-center mt-4">
          <Button
            text={data.ctaButton.text}
            href={data.ctaButton.link}
            variant="green"
          />
        </div>
      {/if}
    </div>
  </div>
</div>

<style>
  button {
    -webkit-tap-highlight-color: transparent;
  }
</style>
