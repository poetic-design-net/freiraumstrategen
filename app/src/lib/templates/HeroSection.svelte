<script lang="ts">
  import AnimatedGradientText from "$lib/components/AnimatedGradientText.svelte";
  import Button from "$lib/components/Button.svelte";
  import SanityImage from "$lib/components/SanityImage.svelte";
  import { onMount } from 'svelte';
  import { gsap } from 'gsap';
  import { SplitText, ScrollTrigger } from 'gsap/all';
  import type { HeroSectionProps } from '$lib/types/heroSection';

  export let gradientText: string = "Hier lernst Du mit klarer Strategie und wenig Zeitaufwand.";
  export let button: { text: string; link: string } = { text: 'Kennenlerntour starten', link: '' };
  export let partners: {
    heading: string;
    logos: Array<{ image: any }>;
  } = {
    heading: 'Unsere zuverlässigen Partner',
    logos: []
  };
  export let heroImage: any = undefined;
  export let stats: {
    number: string;
    text: string;
    avatars: any[];
  } = {
    number: '100+',
    text: 'Zufriedene Freiraumstrategen',
    avatars: []
  };

  let headlineRef: HTMLElement;
  let gradientTextRef: HTMLElement;
  let partnerSectionRef: HTMLElement;
  let heroImageRef: HTMLElement;
  let statsBoxRef: HTMLElement;
  let arrowRef: HTMLElement | SVGSVGElement;
  let buttonRef: HTMLElement;
  let mounted = false;

  onMount(() => {
    mounted = true;
    gsap.registerPlugin(ScrollTrigger, SplitText);

    const splitHeadline = new SplitText(headlineRef, { type: "chars,words" });
    
    // Get the arrow path element directly
    const arrowPath = arrowRef?.querySelector('path');
    if (!arrowPath) return;

    // Set initial state
    gsap.set(arrowPath, {
      strokeDasharray: 120,
      strokeDashoffset: 120,
      opacity: 0
    });
    
    const tl = gsap.timeline({
      paused: false,
      onComplete: () => {
        tl.kill();
      }
    });
    
    tl.from(gradientTextRef, { 
      opacity: 0, 
      y: 20,
      duration: 0.6
    })
    .from(splitHeadline.chars, {
      opacity: 0,
      y: 20,
      stagger: 0.02,
      duration: 0.4
    }, "-=0.4")
    .from(buttonRef, {
      opacity: 0,
      y: 20,
      duration: 0.4
    }, "-=0.4")
    .to(arrowPath, {
      opacity: 1,
      duration: 0.1
    })
    .to(arrowPath, {
      strokeDashoffset: 0,
      duration: 0.6,
      ease: "power2.inOut"
    })
    .from(heroImageRef, {
      opacity: 0,
      x: 40,
      duration: 0.8
    }, "-=0.4")
    .from(statsBoxRef, {
      opacity: 0,
      scale: 0.8,
      duration: 0.4
    }, "-=0.4")
    .from(partnerSectionRef, {
      opacity: 0,
      y: 20,
      duration: 0.4
    }, "-=0.2");

    tl.play();

    return () => {
      mounted = false;
      splitHeadline.revert();
      tl.kill();
    };
  });
</script>

<style>
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  .char {
    display: inline-block;
  }

  /* Initial States */
  :global(.hero-headline),
  :global(.hero-button),
  :global(.hero-image),
  :global(.hero-stats),
  :global(.hero-partners) {
    opacity: 0;
  }
</style>


<div class="relative isolate overflow-hidden">
  <div class="relative container mt-12 md:mt-24 px-4 mx-auto">
      <div class="flex flex-wrap -mx-4 items-center">
        <div class="w-full lg:w-1/2 px-4 mb-16 lg:mb-0">
          <div class="max-w-xl lg:mx-0 lg:max-w-2xl relative">
            <div class="hero-gradient-text text-left mb-4" bind:this={gradientTextRef}>
              <AnimatedGradientText text={gradientText} />
            </div>
            
            <h1 bind:this={headlineRef} class="font-heading text-5xl xs:text-6xl md:text-8xl xl:text-10xl font-thin text-gray-900 mb-8 sm:mb-14">              
              <span class="relative inline-block">  
                <span class="hidden">Erfolgreich an der Börse handeln</span>    
                <span class="font-medium">Erfolgreich</span> an der Börse handeln
              </span>            
            </h1>
            <div class="lg:flex mb-24 items-center">
              <div class="mb-10 lg:mb-0 lg:me-10">
                <svg 
                  bind:this={arrowRef}
                  width="120" 
                  height="24" 
                  viewBox="0 0 120 24" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path 
                    d="M3 12H115M115 12L105 4M115 12L105 20"
                    stroke="#111827"
                    stroke-width="2"
                    stroke-linecap="round" 
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
              <div bind:this={buttonRef}>
                <Button icon="none" text={button.text} href={button.link} />
              </div>
            </div>
            {#if partners.heading || partners.logos.length > 0}
              <div bind:this={partnerSectionRef}>
                {#if partners.heading}
                  <span class="block mb-2 text-sm font-medium text-gray-500">{partners.heading}</span>
                {/if}
                {#if partners.logos.length > 0}
                  <div class="flex items-center -mx-4">
                    {#each partners.logos as logo}
                      <div class="w-1/3 px-4">
                        <SanityImage value={logo.image} />
                      </div>
                    {/each}
                  </div>
                {/if}
              </div>
            {/if}
          </div>
        </div>
        <div class="w-full lg:w-1/2 px-4">
          <div bind:this={heroImageRef} class="relative max-w-xl lg:max-w-lg mx-auto lg:mr-0">
            <img 
              class="absolute bottom-0 left-0 -ml-64 opacity-10 pointer-events-none" 
              src="saturn-assets/images/headers/star-dark-right.svg" 
              alt=""
            >
            <div class="relative">
              {#if heroImage && mounted}
                <SanityImage 
                  value={heroImage} 
                  customClass="relative block h-[448px] md:h-[600px] object-cover rounded-lg w-full"
                />
              {/if}
            </div>
            {#if stats}
              <div bind:this={statsBoxRef} class="absolute bottom-0 right-0 p-7">
                <div class="p-6 bg-white/90 rounded-2xl">
                  {#if stats.avatars.length > 0}
                    <div class="flex mb-14 items-center">
                      {#each stats.avatars as avatar, i}
                        <div class="w-10 h-10 {i > 0 ? '-ms-2' : ''}">
                          <SanityImage value={avatar} />
                        </div>
                      {/each}
                      <div class="p-px bg-white rounded-full -ms-2">
                        <div class="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200">
                          <span class="font-medium">5K+</span>
                        </div>
                      </div>
                    </div>
                  {/if}
                  {#if stats.number}
                    <span class="block mb-2 text-4xl font-bold">{stats.number}</span>
                  {/if}
                  {#if stats.text}
                    <span class="font-light text-gray-900">{stats.text}</span>
                  {/if}
                </div>
              </div>
            {/if}
          </div>
        </div>
      </div>
    </div>
  </div>
