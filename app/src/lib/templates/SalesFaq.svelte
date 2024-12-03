<script lang="ts">
  import { slide } from 'svelte/transition'
  import type { SalesFaqSection } from '$lib/types/salesFaqSection'
  import CleanText from '$lib/components/CleanText.svelte';
  import Button from '$lib/components/Button.svelte';
  import Icon from '$lib/components/icons/Icon.svelte';

  export let data: SalesFaqSection

  let expandedIndex: number | null = null

  function toggleFaq(index: number) {
    expandedIndex = expandedIndex === index ? null : index
  }
</script>

<div class="relative z-10 container px-4 mx-auto">
  <div class="max-w-3xl mx-auto">
    <!-- Section Header -->
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
          className="text-xl text-gray-600"
        />
      {/if}
    </div>

    <!-- FAQ List -->
    <div class="space-y-4">
      {#each data.faqs as faq, index}
        <div class="border border-gray-200 rounded-xl overflow-hidden bg-white hover:shadow-md transition-shadow duration-300">
          <button
            class="w-full text-left px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
            on:click={() => toggleFaq(index)}
          >
            <CleanText 
              text={faq.question}
              className="font-medium pr-8"
            />
            <div class="flex-shrink-0">
              <div class="relative w-6 h-6">
                <div class="absolute inset-0 transform transition-transform duration-300 {expandedIndex === index ? 'rotate-180' : ''}">
                  <svg class="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
          </button>
          {#if expandedIndex === index}
            <div 
              class="px-6 py-4 bg-gray-50 border-t border-gray-200"
              transition:slide={{ duration: 300 }}
            >
              <CleanText 
                text={faq.answer}
                className="text-gray-600 leading-relaxed whitespace-pre-line"
              />
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
          {#if data.ctaButton}
            <CleanText text="oder" className="text-gray-400 px-4" />
            <Button 
              text={data.ctaButton.text}
              href={data.ctaButton.link}
              icon="arrow-right"
              size="md"
              variant="primary"
            />
          {/if}
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
