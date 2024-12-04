<script lang="ts">
  import type { SalesHeroSection } from '$lib/types/salesHeroSection'
  import { onMount } from 'svelte'
  import { gsap } from 'gsap'
  import SanityImage from '$lib/components/SanityImage.svelte'
  import YouTubePlayer from '$lib/components/YouTubePlayer.svelte'
  import Icon from '$lib/components/icons/Icon.svelte'
  import CleanText from '$lib/components/CleanText.svelte'
  import { getThemeStyles } from '$lib/utils/sections'
  import SectionContainer from '$lib/components/sections/SectionContainer.svelte'

  export let data: SalesHeroSection

  // Get theme-based styles
  const theme = getThemeStyles(data.styles?.theme)

  let isVideoOpen = false
  let headlineRef: HTMLElement
  let subheadlineRef: HTMLElement
  let statsBoxRef: HTMLElement
  let descriptionRef: HTMLElement
  let ctaButtonRef: HTMLElement
  let videoButtonRef: HTMLElement
  let isContentLoaded = false
  
  function toggleVideo() {
    isVideoOpen = !isVideoOpen
    if (isVideoOpen) {
      gsap.from(".video-modal", {
        opacity: 0,
        scale: 0.98,
        duration: 0.5,
        ease: "power2.out"
      })
    }
  }

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
    .from(videoButtonRef, {
      opacity: 0,
      x: 20,
      duration: 0.6,
      ease: "power2.inOut"
    }, "-=0.4")
  }
</script>

<SectionContainer section={data}>
  <div slot="background" class="absolute inset-0 hero-bg">
    {#if data.backgroundImage}
      <SanityImage
        value={data.backgroundImage}
        customClass="w-full h-full object-cover"
      />
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

  <div slot="default" class="relative flex-1 flex flex-col min-h-screen">
    <!-- Video Button -->
    {#if data.videoButton}
      <div 
        bind:this={videoButtonRef}
        class="fixed z-20 bottom-6 right-6 md:bottom-12 md:right-12"
      >
        <button 
          class="group relative flex items-center md:gap-4 
            bg-gray-900/75 hover:bg-gray-900/85
            backdrop-blur-sm 
            rounded-full md:rounded-2xl 
            p-2.5 md:p-4 md:pr-6 
            transition-all duration-300 
            hover:scale-105
            shadow-lg shadow-gray-900/10 
            hover:shadow-xl hover:shadow-gray-900/20"
          on:click={toggleVideo}
        >
          <div class="relative">
            <div class="absolute -inset-2.5 md:-inset-4 animate-ping rounded-full bg-primary-500/10 duration-1000"></div>
            <div class="relative h-9 w-9 md:h-12 md:w-12 rounded-full bg-primary-500/90 flex items-center justify-center shadow-lg shadow-primary-500/20">
              <svg class="w-4 h-4 md:w-6 md:h-6 text-white translate-x-0.5" fill="none" viewBox="0 0 24 24">
                <path fill="currentColor" d="M8 5v14l11-7z"/>
              </svg>
            </div>
          </div>
          
          <div class="hidden md:block text-left">
            <CleanText 
              text={data.videoButton.text}
              className="{theme.text} font-medium text-sm md:text-base"
            />
            <CleanText 
              text={data.videoButton.duration}
              className="{theme.text} opacity-80 text-xs md:text-sm"
            />
          </div>
        </button>
      </div>
    {/if}

    <div class="flex-1 flex justify-center items-center">
      <div class="max-w-4xl mx-auto text-center flex flex-col items-center gap-8">
        <!-- Headlines -->
        <div class="space-y-4">
          <div bind:this={headlineRef}>
            <CleanText 
              text={data.headline}
              tag="h1"
              className="{theme.headings} font-heading text-4xl xs:text-5xl md:text-6xl xl:text-7xl font-bold"
            />
          </div>
          {#if data.subheadline}
            <div bind:this={subheadlineRef}>
              <CleanText 
                text={data.subheadline}
                tag="p"
                className="{theme.text} text-2xl md:text-3xl font-light opacity-90"
              />
            </div>
          {/if}
        </div>

        <!-- Stats -->
        {#if data.stats && data.stats.length > 0}
          <div bind:this={statsBoxRef} class="w-full max-w-3xl">
            <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
              {#each data.stats as stat}
                <div class="text-center">
                  <CleanText 
                    text={stat.value}
                    className="block text-2xl font-bold bg-gradient-to-br from-primary-400 to-primary-600 bg-clip-text text-transparent"
                  />
                  <CleanText 
                    text={stat.label}
                    className="{theme.text} block text-sm font-medium mt-1 opacity-90"
                  />
                </div>
              {/each}
            </div>
          </div>
        {/if}

        <!-- Description -->
        {#if data.description}
          <div bind:this={descriptionRef}>
            <CleanText 
              text={data.description}
              tag="p"
              className="{theme.text} text-lg md:text-xl opacity-80 max-w-3xl"
            />
          </div>
        {/if}

        <!-- CTA Buttons -->
        <div class="cta-container flex flex-wrap gap-4 justify-center">
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
              class="px-8 py-4 text-base font-medium {theme.text} border-2 border-current/20 
                hover:bg-current/10 rounded-md transition-colors"
            >
              <CleanText text={data.secondaryCTA.text} />
            </a>
          {/if}
        </div>
      </div>
    </div>
  </div>
</SectionContainer>

<!-- Video Modal -->
{#if isVideoOpen && data.videoButton?.videoId}
  <div class="video-modal fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 md:p-8">
    <div class="relative w-full max-w-7xl mx-auto bg-black rounded-2xl overflow-hidden shadow-2xl">
      <button 
        class="absolute top-4 right-4 z-10 p-2 text-white/20 hover:text-white bg-black/20 hover:bg-black/40 rounded-full backdrop-blur-sm transition-all duration-300"
        on:click={toggleVideo}
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
        </svg>
      </button>
      
      <YouTubePlayer videoId={data.videoButton.videoId} />
    </div>
  </div>
{/if}

<style>
  :global(body.modal-open) {
    overflow: hidden;
  }
</style>
