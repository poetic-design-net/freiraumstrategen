<script lang="ts">
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
  if (typeof window !== 'undefined' && !sessionStorage.getItem('heroAnimated')) {
    gsap.registerPlugin(ScrollTrigger, SplitText);

    const splitHeadline = new SplitText(headlineRef, { type: "chars,words" });
    
    const tl = gsap.timeline({
      paused: true,
      onComplete: () => {
        tl.kill();
        sessionStorage.setItem('heroAnimated', 'true');
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
  }
});
</script>

<style>
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    /* Initial States */
    :global(.hero-gradient-text),
    :global(.hero-headline),
    :global(.hero-button),
    :global(.hero-arrow),
    :global(.hero-image),
    :global(.hero-stats),
    :global(.hero-partners) {
      opacity: 0;
    }
  </style>
  

    <img class="absolute left-0 top-0 opacity-50" src="saturn-assets/images/features/star-left.png" alt="">
    <img class="absolute right-0 bottom-0 opacity-50" src="saturn-assets/images/features/light-orange.png" alt="">
    <div class="relative container px-4 mx-auto">
      <div class="max-w-7xl mx-auto">
        <div class="flex flex-wrap -mx-4">
          <div class="w-full lg:w-1/2 px-4 mb-14 lg:mb-0">
            <div class="max-w-md lg:max-w-xl mx-auto lg:mx-0">
              <h1 class="font-heading text-5xl xs:text-6xl font-medium text-gray-900 mb-6">
                <span>Kontaktiere uns</span>
                <span class="font-thin block"> und lerne uns kennen</span>
              </h1>       
              <div class="mb-10">
                <h4 class="font-heading text-2xl font-medium text-gray-900 mb-4">
                  Wir sind für Dich da
                  ... und nehmen uns die Zeit für Dein Anliegen. 
                </h4>
                <p class="text-gray-500 text-lg">
                  In unserem Büro in Zürich bist Du herzlich willkommen, auf einen Kaffee vorbei zu kommen, oder uns beim Trading über die Schulter zu schauen. 
                  </p>
                  <p class="mt-8 text-xl font-medium text-gray-900 mb-4">
                    Nur keine Scheu, wir freuen uns auf Dich!
                    Komm bei uns vorbei
                  </p>
              </div>
              <div class="inline-block sm:inline-flex flex-col w-full bg-white rounded-xl shadow">
                <div class="flex flex-wrap w-full">
                  <!-- Linke Hälfte -->
                  <div class="w-full sm:w-1/3 p-5 flex items-center">
                    <div class="flex items-center">
                      <img 
                        class="h-18 w-18 rounded-full border-2 border-white object-cover" 
                        src="assets/tobias_freiraumstrategen.jpg" 
                        alt="Tobias"
                      >
                      <img 
                        class="-ml-4 h-18 w-18 rounded-full border-2 border-white object-cover" 
                        src="assets/trader_coach_johannes-1024x619.jpg" 
                        alt="Johannes"
                      >
                    </div>
                  </div>
                  
                  <!-- Rechte Hälfte -->
                  <div class="w-full sm:w-2/3 p-5">
                    <span class="block text-2xl font-medium">Tobias und Johannes</span>
                    <span class="text-gray-500 text-sm">Die Freiraumstrategen</span>
                  </div>
                </div>
                
                <!-- Unterer Teil volle Breite -->
                
              </div>
              <div class="w-full  mt-8">
                  <Button text="Mehr über uns" icon="arrow-right" />
              </div>
            </div>
          </div>
          <div class="w-full lg:w-1/2 px-4">
            <div class="relative max-w-md lg:max-w-lg mx-auto lg:mr-0">
              <img class="w-full rounded-lg" src="assets/buero_in_zuerich-793x1024.jpg" alt="">
              <div class="absolute bottom-0 left-0 p-4">
                <div class="inline-block p-6 bg-white/90 rounded-lg">
                  <span class="block mb-2 text-xl font-medium">Freiraum Strategen GmbH </span>
                  <span class="block mb-2 text-sm text-gray-500">Weinbergstrasse 73 CH – 8006 Zürich</span>
                  <div class="inline-flex p-2 items-center bg-gray-50/40 rounded-md gap-4">
                    <a href="/">
                      <svg xmlns="http://www.w3.org/2000/svg" 
                           fill="none" 
                           viewBox="0 0 24 24" 
                           stroke-width="1.5" 
                           stroke="currentColor" 
                           class="size-6 text-primary-800 hover:text-primary-600 transition-colors">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                      </svg>
                    </a>
                    <a href="/">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 text-primary-800 hover:text-primary-600 transition-colors">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                      </svg>
                    </a>
                    <a href="/">
                      <svg xmlns="http://www.w3.org/2000/svg" 
                           fill="none" 
                           viewBox="0 0 24 24" 
                           stroke-width="1.5" 
                           stroke="currentColor" 
                           class="size-6 text-primary-800 hover:text-primary-600 transition-colors">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 3.75v4.5m0-4.5h-4.5m4.5 0-6 6m3 12c-8.284 0-15-6.716-15-15V4.5A2.25 2.25 0 0 1 4.5 2.25h1.372c.516 0 .966.351 1.091.852l1.106 4.423c.11.44-.054.902-.417 1.173l-1.293.97a1.062 1.062 0 0 0-.38 1.21 12.035 12.035 0 0 0 7.143 7.143c.441.162.928-.004 1.21-.38l.97-1.293a1.125 1.125 0 0 1 1.173-.417l4.423 1.106c.5.125.852.575.852 1.091V19.5a2.25 2.25 0 0 1-2.25 2.25h-2.25Z" />
                      </svg>
                    </a>
         
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  
