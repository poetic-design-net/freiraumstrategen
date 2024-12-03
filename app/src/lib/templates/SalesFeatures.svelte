<script lang="ts">
  import { onMount } from 'svelte'
  import { gsap } from 'gsap'
  import type { SalesFeaturesSection } from '$lib/types/salesFeaturesSection'
  import Icon from '$lib/components/icons/Icon.svelte';
  import CleanText from '$lib/components/CleanText.svelte';
  import Button from '$lib/components/Button.svelte';

  export let data: SalesFeaturesSection

  let featuresRef: HTMLElement

  onMount(() => {
    const cards = featuresRef.querySelectorAll('.feature-card')
    
    cards.forEach((card, index) => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: "top bottom-=100",
          toggleActions: "play none none reverse"
        },
        opacity: 0,
        y: 50,
        duration: 0.6,
        delay: index * 0.1
      })
    })
  })

  function getIconColor(color: string | undefined) {
    switch (color) {
      case 'blue': return 'from-blue-400 to-blue-600'
      case 'green': return 'from-green-400 to-green-600'
      case 'orange': return 'from-orange-400 to-orange-600'
      case 'purple': return 'from-purple-400 to-purple-600'
      case 'red': return 'from-red-400 to-red-600'
      default: return 'from-primary-800 to-primary-600'
    }
  }

  function getIconPath(icon: string | undefined) {
    switch (icon) {
      case 'time': return 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
      case 'chart': return 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z'
      case 'team': return 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z'
      case 'education': return 'M12 14l9-5-9-5-9 5 9 5z M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z M12 14l-6.16-3.422a12.083 12.083 0 00-.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 016.824-2.998 12.078 12.078 0 00-.665-6.479L12 14z'
      case 'structure': return 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z'
      case 'strategy': return 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z'
      default: return 'M13 10V3L4 14h7v7l9-11h-7z'
    }
  }
</script>

<div class="container  w-full py-20 lg:py-20 overflow-hidden">
  <!-- Background Elements -->
  <div class="absolute inset-0">
    <div class="absolute inset-0 bg-gradient-to-br from-primary-900/5 to-transparent"></div>
    <div class="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-primary-50/20 to-transparent"></div>
  </div>

  <div class="container px-4 mx-auto relative z-10">
    <div class="max-w-7xl mx-auto">
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
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          />
        {/if}
      </div>

      <!-- Features Grid -->
      <div 
        bind:this={featuresRef}
        class="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {#each data.features as feature}
          <div class="feature-card group">
            <div class="relative h-full p-8 bg-white rounded-xl shadow hover:shadow-lg transition-all duration-300">
              <!-- Hover Gradient Border -->
              <div class="absolute inset-0 rounded-xl bg-gradient-to-br {getIconColor(feature.iconColor)} opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
              
              <!-- Icon -->
              <div class="w-12 h-12 mb-6 flex items-center justify-center rounded-full bg-gradient-to-br {getIconColor(feature.iconColor)} bg-opacity-10">
                <svg 
                  class="w-6 h-6 text-gray-700" 
                  fill="none" 
                  stroke="white" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    stroke-linecap="round" 
                    stroke-linejoin="round" 
                    stroke-width="2" 
                    d={getIconPath(feature.icon)}
                  />
                </svg>
              </div>

              <!-- Content -->
              <CleanText 
                text={feature.title}
                tag="h3"
                className="text-xl font-bold mb-4 group-hover:text-primary-800 transition-colors duration-300"
              />
              <CleanText 
                text={feature.shortText}
                tag="p"
                className="text-gray-600"
              />

              <!-- Hover Line -->
              <div class="absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r {getIconColor(feature.iconColor)} scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
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
  </div>
</div>

<style>
  .feature-card {
    backface-visibility: hidden;
  }
</style>
