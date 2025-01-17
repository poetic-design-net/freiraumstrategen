<script lang="ts">
  import type { SalesHeroSection } from '$lib/types/salesHeroSection'
  import { onMount } from 'svelte'
  import { gsap } from 'gsap'
  import SanityImage from '$lib/components/SanityImage.svelte'
  import Icon from '$lib/components/icons/Icon.svelte'
  import CleanText from '$lib/components/CleanText.svelte'
  import { getThemeStyles } from '$lib/utils/sections'

  export let data: SalesHeroSection

  // Get theme-based styles
  const theme = getThemeStyles(data.styles?.theme)

  let headlineRef: HTMLElement
  let subheadlineRef: HTMLElement
  let statsBoxRef: HTMLElement
  let descriptionRef: HTMLElement
  let ctaButtonRef: HTMLElement
  let isContentLoaded = false
  
  // Wait for data and DOM
  $: if (data && headlineRef && subheadlineRef) {
    isContentLoaded = true
  }

  // Modern animation sequence with refined timings
  $: if (isContentLoaded) {
    const tl = gsap.timeline({
      paused: false,
      defaults: {
        ease: "power2.out",
        duration: 0.8,
        clearProps: "all"
      }
    })
    
    tl.from(".hero-bg", {
      opacity: 0,
      scale: 1.05,
      duration: 1.2,
      ease: "power1.out"
    })
    .from(headlineRef, {
      y: 30,
      opacity: 0,
      duration: 0.9,
      ease: "power3.out"
    }, "-=0.8")
    .from(subheadlineRef, {
      y: 20,
      opacity: 0,
      duration: 0.8
    }, "-=0.7")
    .from(statsBoxRef?.children || [], {
      y: 20,
      opacity: 0,
      stagger: {
        amount: 0.4,
        ease: "power2.out"
      },
      duration: 0.5
    }, "-=0.6")
    .from(descriptionRef, {
      y: 15,
      opacity: 0,
      duration: 0.7
    }, "-=0.3")
    .from(".cta-container", {
      y: 10,
      opacity: 0,
      duration: 0.6
    }, "-=0.4")
    .from(".glow-icon-container", {
      scale: 0.8,
      opacity: 0,
      duration: 0.5,
      ease: "back.out(1.2)"
    }, "-=0.3")
  }
</script>

<div class="relative w-full h-full-header flex items-center">
  <!-- Background -->
  <div class="absolute inset-0 -z-10">
    {#if data.backgroundImage}
      <div class="relative block w-full h-full">
        <SanityImage
          value={data.backgroundImage}
          customClass="absolute inset-0 w-full h-full object-cover hero-bg"
        />
      </div>
    {/if}
    <div class="absolute inset-0 backdrop-blur-[6px]"></div>

    <!-- Gradient Overlay -->
    <div class="absolute inset-0 
      bg-gradient-to-b 
      from-black/10
      via-black/20 
      to-black/40"
    ></div>
    <div class="absolute inset-0 
      bg-black/20 
      backdrop-brightness-90 
      backdrop-contrast-110"
    ></div>
  </div>

  <div class="w-full max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
    <!-- Headlines -->
    <div class="space-y-4">
      <div bind:this={headlineRef}>
        <CleanText 
          text={data.headline}
          tag="h1"
          className="{theme.headings} font-heading text-4xl xs:text-5xl md:text-6xl xl:text-7xl font-bold"
        />
      </div>
       <!-- Subtitle -->
      {#if data.subheadline}
        <div bind:this={subheadlineRef}>
          <CleanText 
            text={data.subheadline}
            tag="p"
            className="{theme.text} text-xl font-light opacity-95"
          />
        </div>
      {/if}
    </div>

    <!-- Stats -->
    {#if data.stats && data.stats.length > 0}
      <div bind:this={statsBoxRef} class="w-full max-w-4xl mt-8">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
          {#each data.stats as stat}
            <div class="text-center">
              <CleanText 
                text={stat.value}
                className="block text-2xl font-medium bg-gradient-to-br from-primary-400 to-primary-600 bg-clip-text text-transparent"
              />
              <CleanText 
                text={stat.label}
                className="{theme.text} block text-sm  mt-1 opacity-95"
              />
            </div>
          {/each}
        </div>
      </div>
    {/if}

    <!-- Description -->
    {#if data.description}
      <div bind:this={descriptionRef} class="mt-8">
        <CleanText 
          text={data.description}
          tag="span"
          className="{theme.text} text-lg md:text-xl font-light opacity-95 max-w-4xl mx-auto"
        />
      </div>
    {/if}

    <!-- CTA Buttons -->
    <div class="cta-container flex flex-wrap gap-4 justify-center mt-12">
      {#if data.primaryCTA}
        <a 
          href={data.primaryCTA.link}
          bind:this={ctaButtonRef}
          class="group relative flex items-center gap-2 px-8 py-4
            text-primary-900
            rounded-md
            bg-white hover:bg-primary-50
            transition-all duration-300
            shadow-lg shadow-black/5"
        >
          <CleanText 
            text={data.primaryCTA.text}
            className="text-base font-medium"
          />
          <div class="relative glow-icon-container">
            <div class="absolute -inset-1 animate-[pulse_4s_ease-in-out_infinite] opacity-20
              rounded-full 
              bg-primary-500/5 
              blur-sm"
            ></div>
            <Icon 
              name="cursor-arrow" 
              size={20} 
              className="relative animate-[bounce_2s_ease-in-out_infinite] text-primary-600"
            />
          </div>
        </a>
      {/if}
      {#if data.secondaryCTA}
        <a 
          href={data.secondaryCTA.link}
          class="relative px-8 py-4 text-base font-medium {theme.text} border-2 border-current/20 
            hover:bg-current/10 hover:backdrop-blur-sm rounded-md transition-all duration-300"
        >
          <CleanText text={data.secondaryCTA.text} />
        </a>
      {/if}
    </div>
  </div>
</div>
