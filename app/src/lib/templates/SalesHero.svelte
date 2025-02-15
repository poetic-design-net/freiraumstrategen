<script lang="ts">
  import type { SalesHeroSection } from '$lib/types/salesHeroSection'
  import { onMount } from 'svelte'
  import { gsap } from 'gsap'
  import SanityImage from '$lib/components/SanityImage.svelte'
  import Icon from '$lib/components/icons/Icon.svelte'
  import CleanText from '$lib/components/CleanText.svelte'
  import PortableTextContent from '$lib/components/PortableTextContent.svelte'
  import Button from '$lib/components/Button.svelte'

  export let data: SalesHeroSection

  let headlineRef: HTMLElement
  let headline2Ref: HTMLElement
  let subheadlineRef: HTMLElement
  let descriptionRef: HTMLElement
  let ctaContainerRef: HTMLElement
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
    .from(headline2Ref, {
      y: 25,
      opacity: 0,
      duration: 0.85,
      ease: "power3.out"
    }, "-=0.6")
    .from(descriptionRef, {
      y: 15,
      opacity: 0,
      duration: 0.7
    }, "-=0.3")
    .from(ctaContainerRef, {
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

<div class="relative w-full  sm:h-full-header flex flex-col justify-between">
  <!-- Background -->
  <div class="absolute h-full inset-0 -z-10 bg-white">
    {#if data.backgroundImage}
      <div class="relative w-full h-full">
        <SanityImage
          value={data.backgroundImage}
          customClass="absolute inset-0 w-full h-full object-cover object-right hero-bg"
        />
        <!-- Dark overlay for mobile -->
        <div class="absolute inset-0 bg-black/15 md:hidden"></div>
      </div>
    {/if}
  </div>

  <!-- Main Content -->
  <div class="relative flex-1 flex flex-col justify-center items-center py-12 px-4">
    <div class="container mx-auto">
      <div class="max-w-5xl mx-auto text-center flex flex-col items-center ">
         <!-- Subtitle -->
         {#if data.subheadline}
         <div bind:this={subheadlineRef}>
           <CleanText
             text={data.subheadline}
             tag="p"
             className="font-heading text-xl sm:text-xl md:text-xl lg:text-2xl font-light text-white md:text-primary uppercase "
           />
         </div>
         {/if}
              <!-- Headlines -->
        <div bind:this={headlineRef}>
          <CleanText
            text={data.headline}
            tag="h1"
            className="font-heading text-3xl sm:text-4xl md:text-6xl lg:text-6xl font-bold text-white md:text-primary"
          />
        </div>
        {#if data.headline2}
          <div bind:this={headline2Ref} class="mt-2">
            <PortableTextContent
              value={data.headline2}
              customClass="font-heading text-3xl sm:text-4xl md:text-6xl lg:text-6xl font-light text-white md:text-primary"
            />
          </div>
        {/if}

        <!-- Description -->
        {#if data.description}
          <div bind:this={descriptionRef}>
            <CleanText
              text={data.description}
              tag="span"
              className="text-base sm:text-lg md:text-xl font-light max-w-3xl mx-auto text-white md:text-inherit"
            />
          </div>
        {/if}

        <!-- CTA Buttons -->
        <div bind:this={ctaContainerRef} class="cta-container flex flex-wrap gap-6 md:gap-16 justify-center mt-16">
          {#if data.primaryCTA}
            <Button
              href={data.primaryCTA.link}
              text={data.primaryCTA.text}
              variant="green"
              size="md"
            />
          {/if}
          {#if data.secondaryCTA}
            <Button
              href={data.secondaryCTA.link}
              text={data.secondaryCTA.text}
              variant="outline"
              size="md"
            />
          {/if}
        </div>
      </div>
    </div>
  </div>

  <!-- Stats -->
  {#if data.stats && data.stats.length > 0}
    <div class="w-full bg-primary-800 py-6 sm:py-8">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {#each data.stats as stat}
            <div class="flex flex-col items-center text-white">
              <CleanText
                text={stat.label}
                className="text-lg uppercase"
              />
              <CleanText
                text={stat.value}
                className="text-2xl sm:text-3xl md:text-4xl font-medium"
              />
            </div>
          {/each}
        </div>
      </div>
    </div>
  {/if}
</div>
