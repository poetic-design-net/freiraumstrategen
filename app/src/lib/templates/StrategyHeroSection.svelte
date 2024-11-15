<script lang="ts">
import Button from "$lib/components/Button.svelte";
import { onMount } from 'svelte';
import { gsap } from 'gsap';
import { SplitText, ScrollTrigger } from 'gsap/all';
import YouTubePlayer from "$lib/components/YouTubePlayer.svelte";

gsap.defaults({
  duration: 0.6,
  ease: "power2.out"
});

let headlineRef: HTMLElement;
let buttonRef: HTMLElement;
let statsBoxRef: HTMLElement;
let rightContentRef: HTMLElement;
let arrowRef: HTMLElement;
let videoButtonRef: HTMLElement;

onMount(() => {
  if (typeof window !== 'undefined') {
    gsap.registerPlugin(SplitText);

    const splitHeadline = new SplitText(headlineRef, { type: "chars,words" });
    
    const tl = gsap.timeline({
      paused: false,
      onComplete: () => {
        tl.kill();
      }
    });
    
    tl.from(splitHeadline.chars, {
      opacity: 0,
      y: 20,
      stagger: 0.02
    })
    .from(statsBoxRef, {
      opacity: 0,
      y: 20,
      duration: 0.8
    }, "-=0.2")
    .from(".arrow-container", {
      opacity: 0,
      y: 20,
      duration: 0.4
    }, "-=0.4")
    // Icon Animation - kommt etwas später
    .from(".glow-icon-container", {
      opacity: 0,
      y: 20,
      duration: 0.4
    }, "+=0.2"); // 0.2 Sekunden Verzögerung nach dem Button
  }
});
// Video Modal Logic
let isVideoOpen = false;
  
function toggleVideo() {
  isVideoOpen = !isVideoOpen;
  if (isVideoOpen) {
    gsap.from(".video-modal", {
      opacity: 0,
      scale: 0.9,
      duration: 0.4,
      ease: "back.out(1.7)"
    });
  }
}
</script>

<div class="w-full h-full flex flex-col">
  <!-- Background Image -->
  <div class="absolute inset-0">
    <img 
      class="w-full h-full object-cover" 
      src="assets/trader_coaching_tobias.jpg" 
      alt=""
    >
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
  
  <!-- Füge dies direkt nach dem Background Image ein -->
  <div 
    bind:this={videoButtonRef}
    class="fixed z-20 
      bottom-6 right-6 
      md:bottom-12 md:right-12"
  >
    <button 
      class="group relative flex items-center 
        md:gap-4 
        bg-gray-900/75 hover:bg-gray-900/85
        backdrop-blur-sm 
        rounded-full md:rounded-2xl 
        p-2.5 md:p-4 
        md:pr-6 
        transition-all duration-300 
        hover:scale-105
        shadow-lg shadow-gray-900/10 
        hover:shadow-xl hover:shadow-gray-900/20"
      on:click={toggleVideo}
    >
      <!-- Pulsierender Play Button -->
      <div class="relative">
        <div class="absolute 
          -inset-2.5 md:-inset-4 
          animate-ping 
          rounded-full 
          bg-primary-500/10 
          duration-1000"
        ></div>
        <div class="relative 
          h-9 w-9 
          md:h-12 md:w-12 
          rounded-full 
          bg-primary-500/90 
          flex items-center justify-center 
          shadow-lg shadow-primary-500/20"
        >
          <svg 
            class="w-4 h-4 md:w-6 md:h-6 
              text-white 
              translate-x-0.5" 
            fill="none" 
            viewBox="0 0 24 24"
          >
            <path 
              fill="currentColor" 
              d="M8 5v14l11-7z"
            />
          </svg>
        </div>
      </div>
      
      <!-- Text - nur auf Desktop -->
      <div class="hidden md:block text-left">
        <p class="text-white font-medium text-sm md:text-base">
          Wie funktioniert's?
        </p>
        <p class="text-white/80 text-xs md:text-sm">
          2:30 min
        </p>
      </div>

      <!-- Hover Line Effect - nur auf Desktop -->
      <div class="hidden md:block absolute inset-x-0 -bottom-px h-px 
        bg-gradient-to-r from-transparent via-primary-500/50 to-transparent 
        scale-x-0 group-hover:scale-x-100 
        transition-transform duration-500"
      ></div>
    </button>
  </div>
  
  <!-- Main Content Container -->
  <div class="relative flex-1 flex flex-col ">
    <!-- Center Content -->
    <div class="flex-1 flex justify-center items-center">
      <div class="container px-4 mx-auto">
        <div class="max-w-4xl mx-auto text-center flex flex-col items-center gap-8">
          <!-- Headline -->
          <h1 
            bind:this={headlineRef} 
            class="font-heading text-4xl xs:text-5xl md:text-6xl xl:text-7xl font-medium text-white"
          >
            <span class="font-thin">Wir laden ein zum</span>
            <span>Strategiegespräch</span>
          </h1>

          <!-- Stats Box -->
          <div bind:this={statsBoxRef} class="w-full max-w-md">
            <div class="grid grid-cols-[1fr_auto_1fr] items-center gap-8">
              <!-- Erste Statistik -->
              <div class="text-center">
                <span class="block text-xl xs:text-2xl font-semibold 
                  bg-gradient-to-br from-primary-600 to-primary-400
                  bg-clip-text text-transparent"
                >
                  18k+
                </span>
                <span class="block text-sm text-gray-200/90 font-medium mt-1">
                  Strategiegespräche
                </span>
              </div>
              
              <!-- Trennstrich - perfekt zentriert -->
              <div class="h-12 w-px bg-gradient-to-b from-primary-200 to-transparent self-center"></div>
              
              <!-- Zweite Statistik -->
              <div class="text-center">
                <span class="block text-xl xs:text-2xl font-semibold 
                  bg-gradient-to-br from-primary-600 to-primary-400
                  bg-clip-text text-transparent"
                >
                  100+
                </span>
                <span class="block text-sm text-gray-200/90 font-medium mt-1">
                  Seminare
                </span>
              </div>
            </div>
          </div>

          <!-- Button -->
         <!-- Arrow Component -->
              <div 
              bind:this={buttonRef}
              class="arrow-container cursor-pointer flex flex-col items-center gap-2 pt-4"
              on:click={() => window.location.href = '/tour'}
              >
              <button class="group relative flex items-center gap-2 px-6 py-2
                text-white/90 hover:text-white
                border border-white/20
                rounded-lg
                backdrop-blur-sm
                bg-white/5 hover:bg-white/10
                transition-all duration-300
                shadow-sm shadow-black/5"
              >
                <span class="text-sm font-medium">
                  Kennenlern-Tour starten
                </span>
                <div class="relative glow-icon-container">
                  <!-- Subtle Glow -->
                  <div class="absolute -inset-1 animate-[pulse_4s_ease-in-out_infinite] opacity-20
                    rounded-full 
                    bg-primary-500/5 
                    blur-sm"
                  ></div>
                  
                  <!-- Icon -->
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke-width="1.5" 
                    stroke="currentColor" 
                    class="size-6 relative animate-[bounce_2s_ease-in-out_infinite] text-primary-200"
                  >
                    <path 
                      stroke-linecap="round" 
                      stroke-linejoin="round" 
                      d="M15.042 21.672 13.684 16.6m0 0-2.51 2.225.569-9.47 5.227 7.917-3.286-.672ZM12 2.25V4.5m5.834.166-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243-1.59-1.59" 
                    />
                  </svg>
                </div>
                
                

                <!-- Optional: Subtle hover effect -->
                <div class="absolute inset-0 rounded-lg bg-gradient-to-r from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </button>
              
                        </div>
        </div>
      </div>
    </div>

    <!-- Bottom Content -->
    <div class="container px-4 mx-auto mb-8">
      <div class="xl:flex justify-center items-center">
        <!-- Stats Box -->
        <div class="mt-auto hidden">
          <div bind:this={buttonRef}>
            <Button text="Tour starten" icon="none" />
          </div>
        </div>
      </div>
    </div>
  </div>
</div>



<!-- Optional: Video Modal -->
{#if isVideoOpen}
  <div 
    class="video-modal fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 md:p-8"
  >
    <div class="relative w-full max-w-7xl mx-auto bg-black rounded-2xl overflow-hidden shadow-2xl">
      <!-- Close Button -->
      <button 
        class="absolute top-4 right-4 z-10 p-2 text-white/20 hover:text-white bg-black/20 hover:bg-black/40 rounded-full backdrop-blur-sm transition-all duration-300"
        on:click={toggleVideo}
      >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
      </svg>

      </button>
      
      <YouTubePlayer videoId="dQw4w9WgXcQ" />
    </div>
  </div>
{/if}

  
<style>
  .arrow-path {
    stroke-dasharray: 120;
    stroke-dashoffset: 120;
  }
  path {
    stroke: currentColor;
    stroke-width: 1.5px;
    stroke-linecap: round;
    stroke-linejoin: round;
    fill: none;
  }
  /* Optional: Verhindere Scrolling wenn Modal offen ist */
  :global(body.modal-open) {
    overflow: hidden;
  }
</style>