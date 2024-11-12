<script lang="ts">
import AnimatedGradientText from "$lib/components/AnimatedGradientText.svelte";
import Button from "$lib/components/Button.svelte";
import { onMount } from 'svelte';
import { gsap } from 'gsap';
import { SplitText,ScrollTrigger } from 'gsap/all';


gsap.defaults({
  duration: 0.6,
  ease: "power2.out"
});

let headlineRef: HTMLElement;
let gradientTextRef: HTMLElement;
let partnerSectionRef: HTMLElement;
let heroImageRef: HTMLElement;
let statsBoxRef: HTMLElement;
let arrowRef: HTMLElement;
let buttonRef: HTMLElement;


onMount(() => {
  gsap.registerPlugin(ScrollTrigger, SplitText);

  const splitHeadline = new SplitText(headlineRef, { type: "chars,words" });
  
  // Arrow path animation setup
  gsap.set(".arrow-path", {
    strokeDasharray: 120,
    strokeDashoffset: 120
  });
  
  const tl = gsap.timeline({
    paused: false,
    onComplete: () => {
      tl.kill();
    }
  });
  
  tl.from(gradientTextRef, { 
    opacity: 0, 
    y: 20
  })
  .from(splitHeadline.chars, {
    opacity: 0,
    y: 20,
    stagger: 0.02
  }, "-=0.4")
  .from(buttonRef, {
    opacity: 0,
    y: 20
  }, "-=0.4")
  .from(arrowRef, {
    opacity: 0,
    x: -20
  }, "-=0.4")
  // Arrow drawing animation
  .to(".arrow-path", {
    strokeDashoffset: 0,
    duration: 0.6,
    ease: "power2.out"
  }, "-=0.4")
  .from(heroImageRef, {
    opacity: 0,
    x: 40,
    duration: 0.8
  }, "-=0.6")
  .from(statsBoxRef, {
    opacity: 0,
    scale: 0.8
  }, "-=0.4")
  .from(partnerSectionRef, {
    opacity: 0,
    y: 20
  }, "-=0.2");

  tl.play();
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
    .arrow-path {
      stroke-dasharray: 120;
      stroke-dashoffset: 0;
    }
    path {
      stroke: #111827;
    stroke-width: 1.5px;
    stroke-linecap: round;
    stroke-linejoin: round;
    fill: none;
    }

    /* Initial States */
    :global(.hero-headline),
    :global(.hero-button),
    :global(.hero-arrow),
    :global(.hero-image),
    :global(.hero-stats),
    :global(.hero-partners) {
      opacity: 0;
    }
  </style>
  

    <img class="absolute bottom-0 left-0" src="saturn-assets/images/headers/blue-light-left-bottom.png" alt="">
    <img class="absolute top-0 right-0 w-52 md:w-auto opacity-40" src="saturn-assets/images/headers/star-background-header.png" alt="">
   
    
    <div class="relative container mt-12 md:mt-24 px-4 mx-auto">
        <div class="relative container px-4 mx-auto">
            <div class="flex flex-wrap -mx-4 items-center">
              <div class="w-full lg:w-1/2 px-4 mb-16 lg:mb-0">
            
                <div class="max-w-xl lg:mx-0 lg:max-w-2xl relative z-10">
                    <div class="hero-gradient-text text-left mb-4" bind:this={gradientTextRef}>
                        <AnimatedGradientText text="Hier lernst Du mit klarer Strategie und wenig Zeitaufwand." />
                    </div>
                    
                    <h1 bind:this={headlineRef} class="font-heading text-5xl xs:text-6xl md:text-8xl xl:text-10xl font-thin text-gray-900 mb-8 sm:mb-14">              
                        <span class="relative inline-block">                     
                              <span class="font-medium">Erfolgreich</span> an der Börse handeln.
                        </span>            
                      </h1>
                  <div class="lg:flex mb-24 items-center">
                    <div class="mb-10 lg:mb-0 lg:mr-10">
                    
                     
                      <svg 
                      bind:this={arrowRef}
                      width="120" 
                      height="24" 
                      viewBox="0 0 120 24" 
                      fill="none" 
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path 
                        class="arrow-path"
                        d="M3 12H115M115 12L105 4M115 12L105 20"
                        stroke="currentColor"
                        stroke-width="1.5"
                        stroke-linecap="round" 
                        stroke-linejoin="round"
                      />
                    </svg>
                    
                      
                    
                    </div>
                    <div bind:this={buttonRef}>
                      <Button icon="arrow-right" text="Kennenlerntour starten"/>
                    </div>
                  </div>
                  <div bind:this={partnerSectionRef}>
                    <span class="block mb-2 text-sm font-medium text-gray-500">Unsere zuverlässigen Partner</span>
                    <div class="flex items-center -mx-4">
                      <div class="w-1/3 px-4">
                        <img class="block" src="https://trading.zuerich/wp-content/uploads/2024/03/swissquote.svg" alt="">
                      </div>
                      <div class="w-1/3 px-4">
                        <img class="block" src="https://www.lynxbroker.de/app/uploads/2020/04/eurex-logo-partner-online-broker-lynx.svg" alt="">
                      </div>
                      <div class="w-1/3 px-4">
                        <img class="block" src="https://www.algo-camp.de/wp-content/uploads/2021/07/Logo-GBE-brokers.png" alt="">
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="w-full lg:w-1/2 px-4">
                <div bind:this={heroImageRef} class="relative max-w-xl lg:max-w-lg mx-auto lg:mr-0">
                  <img class="absolute bottom-0 left-0 -ml-64 opacity-10" src="saturn-assets/images/headers/star-dark-right.svg" alt="">
                  <img class="relative block h-[448px] md:h-[600px] object-cover rounded-lg w-full" src="/assets/hero_home-old.jpg" alt="">
                  <div bind:this={statsBoxRef} class="absolute bottom-0 right-0 p-7">
                    <div class="p-6 bg-white/90 rounded-2xl">
                      <div class="flex mb-14 items-center">
                        <img class="w-10 h-10" src="saturn-assets/images/headers/avatar4.png" alt="">
                        <img class="w-10 h-10 -ml-2" src="saturn-assets/images/headers/avatar3.png" alt="">
                        <img class="w-10 h-10 -ml-2" src="saturn-assets/images/headers/avatar2.png" alt="">
                        <img class="w-10 h-10 -ml-2" src="saturn-assets/images/headers/avatar1.png" alt="">
                        <div class="p-px bg-white rounded-full -ml-2">
                          <div class="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200">
                            <span class="font-medium">5K+</span>
                          </div>
                        </div>
                      </div>
                      <span class="block mb-2 text-4xl font-bold">100+</span>
                      <span class="font-light text-gray-900">Zufriedene Freiraumstrategen</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div><!-- Hero content -->
    </div>
  
   