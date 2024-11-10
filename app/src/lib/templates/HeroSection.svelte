<script lang="ts">

  import AnimatedGradientText from "$lib/components/AnimatedGradientText.svelte";
  import Button from "$lib/components/Button.svelte";
  import { onMount } from 'svelte';
  import { gsap } from "gsap";
  import { SplitText } from "gsap/all";
  import { heroTimeline } from '$lib/stores/animation';
  import { hasAnimationPlayed } from '$lib/stores/animationState';

  gsap.registerPlugin(SplitText);

  let headlineRef: HTMLElement;
  let gradientTextRef: HTMLElement;
  let partnerSectionRef: HTMLElement;
  let heroImageRef: HTMLElement;
  let statsBoxRef: HTMLElement;
  let arrowRef: HTMLElement;
  let buttonRef: HTMLElement;

  onMount(() => {
    let played;
    hasAnimationPlayed.subscribe(value => {
      played = value;
    });

    if (!played) {
      // Hero-Animationen zur existierenden Timeline hinzufügen
      heroTimeline.update(currentTl => {
        if (currentTl) {
          const splitText = new SplitText(headlineRef, { 
            type: "words,chars",
            charsClass: "char",
            wordsClass: "word"
          });

          currentTl.addLabel("heroStart", "start+=1.3")  // Start nach Logo-Animation
            .from(splitText.chars, {
              y: 100,
              opacity: 0,
              duration: 0.8,
              stagger: 0.02,
              ease: "power4.out",
            }, "heroStart")
            .from(gradientTextRef, {
              y: 30,
              opacity: 0,
              duration: 1,
              ease: "power3.out",
            }, "heroStart+=0.4")
            .from(heroImageRef, {
              x: 100,
              opacity: 0,
              duration: 1.2,
              ease: "power2.out",
            }, "-=0.8")
            .from(statsBoxRef, {
              y: 50,
              opacity: 0,
              duration: 0.8,
              ease: "back.out(1.7)",
            }, "-=0.5")
            .from(partnerSectionRef, {
              y: 30,
              opacity: 0,
              duration: 0.8,
              ease: "power2.out",
            }, "-=0.3")
            .fromTo(arrowRef.querySelector('path'), {
              strokeDasharray: 120,
              strokeDashoffset: 120,
            }, {
              strokeDashoffset: 0,
              duration: 1,
              ease: "power2.out",
            }, "-=0.5")
            .from(buttonRef, {
              scale: 0.8,
              opacity: 0,
              duration: 0.6,
              ease: "back.out(1.7)",
            }, "-=0.3");
        }
        return currentTl;
      });
    } else {
      // Wenn Animation bereits gespielt wurde, Elemente direkt sichtbar machen
      gsap.set([
        "headlineRef", 
        "gradientTextRef",
        "partnerSectionRef",
        "heroImageRef",
        "statsBoxRef",
        "arrowRef",
        "buttonRef"
      ], {
        opacity: 1,
        y: 0,
        x: 0,
        scale: 1
      });
    }
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
  </style>
  

    <img class="absolute bottom-0 left-0" src="saturn-assets/images/headers/blue-light-left-bottom.png" alt="">
    <img class="absolute top-0 right-0 w-52 md:w-auto opacity-30" src="saturn-assets/images/headers/star-background-header.png" alt="">
   
    
    <div class="relative container mt-12 md:mt-24 px-4 mx-auto">
        <div class="relative container px-4 mx-auto">
            <div class="flex flex-wrap -mx-4 items-center">
              <div class="w-full lg:w-1/2 px-4 mb-16 lg:mb-0">
            
                <div class="max-w-xl mx-auto lg:mx-0 lg:max-w-2xl relative z-10">
                    <div bind:this={gradientTextRef} class="inline-block mb-4">
                        <AnimatedGradientText text="Hier lernst Du mit klarer Strategie und wenig Zeitaufwand." />
                    </div>
                    
                    <h1 
                      bind:this={headlineRef} 
                      class="font-heading text-5xl xs:text-6xl md:text-8xl xl:text-10xl font-thin text-gray-900 mb-8 sm:mb-14"
                    >              
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
                        d="M3 12H115M115 12L105 4M115 12L105 20"
                        stroke-linecap="round" 
                        stroke-linejoin="round"
                      />
                    </svg>
                    
                      
                    
                    </div>
                    <div bind:this={buttonRef}>
                      <Button />
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
  
   