<script lang="ts">
  import AnimatedGradientText from "$lib/components/AnimatedGradientText.svelte";
  import Button from "$lib/components/Button.svelte";
  import SanityImage from "$lib/components/SanityImage.svelte";
  import LogoCarousel from "$lib/components/LogoCarousel.svelte";
  import { onMount } from 'svelte';
  import { gsap } from 'gsap';
  import { SplitText, ScrollTrigger } from 'gsap/all';

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
    const arrowPath = arrowRef?.querySelector('path');
    if (!arrowPath) return;

    // Batch initial states for better performance
    gsap.set([gradientTextRef, buttonRef, partnerSectionRef], { 
      opacity: 0,
      y: 20
    });
    
    gsap.set(splitHeadline.chars, { 
      opacity: 0,
      y: 20
    });

    gsap.set(arrowPath, {
      strokeDasharray: 120,
      strokeDashoffset: 120,
      opacity: 0
    });

    gsap.set(heroImageRef, {
      opacity: 0,
      translateX: 40,
      force3D: true
    });

    gsap.set(statsBoxRef, {
      opacity: 0,
      scale: 0.8
    });

    // Batch animations for better performance
    const tl = gsap.timeline({
      defaults: { 
        ease: "power2.out",
        duration: 0.4
      }
    });

    // Animate in parallel where possible
    tl.to([gradientTextRef, buttonRef], { 
      opacity: 1,
      y: 0,
    })
    .to(splitHeadline.chars, {
      opacity: 1,
      y: 0,
      stagger: 0.01 // Reduced stagger time
    }, "<")
    .to(arrowPath, {
      opacity: 1,
      strokeDashoffset: 0,
      duration: 0.3
    }, "<+=0.2")
    .to([heroImageRef, statsBoxRef], {
      opacity: 1,
      translateX: 0,
      scale: 1,
      force3D: true
    }, "<+=0.1")
    .to(partnerSectionRef, {
      opacity: 1,
      y: 0
    }, "<+=0.1");

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

  /* Initial States */
  :global(.hero-headline),
  :global(.hero-button),
  :global(.hero-image),
  :global(.hero-stats),
  :global(.hero-partners) {
    opacity: 0;
  }

  .hero-image-wrapper {
    position: relative;
    height: 448px;
    transform: translateZ(0);
    will-change: transform;
  }

  @media (min-width: 768px) {
    .hero-image-wrapper {
      height: 600px;
    }
  }

  /* Partner section styles */
  .partner-section {
    position: relative;
    --background-color: 255 255 255; /* For the carousel gradient mask */
  }
</style>

<div class="px-4 container sm:h-full-header">
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
              <div bind:this={partnerSectionRef} class="partner-section">
                {#if partners.heading}
                  <span class="block mb-4 text-sm font-medium text-gray-500">{partners.heading}</span>
                {/if}
                {#if partners.logos.length > 0}
                  <LogoCarousel logos={partners.logos} />
                {/if}
              </div>
            {/if}
          </div>
        </div>
        <div class="w-full lg:w-1/2 px-4">
          <div bind:this={heroImageRef} class="relative max-w-xl lg:max-w-lg mx-auto lg:mr-0">
            <div class="relative hero-image-wrapper">
              {#if heroImage && mounted}
                <SanityImage 
                  value={heroImage} 
                  customClass="absolute inset-0 w-full h-full object-cover rounded-lg"
                  priority={true}
                  fetchpriority="high"
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
</div>
