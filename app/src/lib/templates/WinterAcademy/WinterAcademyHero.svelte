<script lang="ts">
  import { onMount } from 'svelte';
  import { gsap } from 'gsap';
  import { SplitText, ScrollTrigger } from 'gsap/all';
  import YouTubePlayer from "$lib/components/YouTubePlayer.svelte";

  gsap.defaults({
    duration: 0.6,
    ease: "power2.out"
  });

  let headlineRef: HTMLElement;
  let subheadlineRef: HTMLElement;
  let statsBoxRef: HTMLElement;
  let ctaButtonRef: HTMLElement;
  let videoButtonRef: HTMLElement;

  onMount(() => {
    if (typeof window !== 'undefined') {
      gsap.registerPlugin(SplitText);

      const splitHeadline = new SplitText(headlineRef, { type: "chars,words" });
      const splitSubheadline = new SplitText(subheadlineRef, { type: "chars,words" });
      
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
      .from(splitSubheadline.chars, {
        opacity: 0,
        y: 20,
        stagger: 0.01
      }, "-=0.3")
      .from(statsBoxRef, {
        opacity: 0,
        y: 20,
        duration: 0.8
      }, "-=0.2")
      .from(".cta-container", {
        opacity: 0,
        y: 20,
        duration: 0.4
      }, "-=0.4")
      .from(".glow-icon-container", {
        opacity: 0,
        y: 20,
        duration: 0.4
      }, "+=0.2");
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
      src="/assets/trading_mit_wenig_zeit.jpg" 
      alt="Winter Academy Trading"
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

  <!-- Video Button -->
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
      
      <div class="hidden md:block text-left">
        <p class="text-white font-medium text-sm md:text-base">
          Winter Academy Insights
        </p>
        <p class="text-white/80 text-xs md:text-sm">
          2:30 min
        </p>
      </div>

      <div class="hidden md:block absolute inset-x-0 -bottom-px h-px 
        bg-gradient-to-r from-transparent via-primary-500/50 to-transparent 
        scale-x-0 group-hover:scale-x-100 
        transition-transform duration-500"
      ></div>
    </button>
  </div>

  <!-- Main Content -->
  <div class="relative flex-1 flex flex-col">
    <div class="flex-1 flex justify-center items-center">
      <div class="container px-4 mx-auto">
        <div class="max-w-4xl mx-auto text-center flex flex-col items-center gap-8">
          <!-- Headlines -->
          <div class="space-y-4">
            <h1 
              bind:this={headlineRef} 
              class="font-heading text-4xl xs:text-5xl md:text-6xl xl:text-7xl font-bold text-white"
            >
              Finanziell erfolgreich aufgestellt ins Jahr 2025
            </h1>
            <p 
              bind:this={subheadlineRef}
              class="text-2xl md:text-3xl font-light text-white/90"
            >
              mit der Winter Academy
            </p>
          </div>

          <!-- Stats Box -->
          <div bind:this={statsBoxRef} class="w-full max-w-3xl">
            <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div class="text-center">
                <span class="block text-2xl font-bold bg-gradient-to-br from-primary-400 to-primary-600 bg-clip-text text-transparent">
                  12
                </span>
                <span class="block text-sm text-gray-200/90 font-medium mt-1">
                  Wochen Programm
                </span>
              </div>
              <div class="text-center">
                <span class="block text-2xl font-bold bg-gradient-to-br from-primary-400 to-primary-600 bg-clip-text text-transparent">
                  Kompetent
                </span>
                <span class="block text-sm text-gray-200/90 font-medium mt-1">
                  Unterstützung
                </span>
              </div>
              <div class="text-center">
                <span class="block text-2xl font-bold bg-gradient-to-br from-primary-400 to-primary-600 bg-clip-text text-transparent">
                  100%
                </span>
                <span class="block text-sm text-gray-200/90 font-medium mt-1">
                  Praxis-Orientiert
                </span>
              </div>
              <div class="text-center">
                <span class="block text-2xl font-bold bg-gradient-to-br from-primary-400 to-primary-600 bg-clip-text text-transparent">
                  1:1
                </span>
                <span class="block text-sm text-gray-200/90 font-medium mt-1">
                  Betreuung
                </span>
              </div>
            </div>
          </div>

          <!-- Description -->
          <p class="text-lg md:text-xl text-white/80 max-w-3xl">
            Eine ideale Kombination von Lernen in Theorie und Praxis, perfekt in Deinen Alltag integriert, 
            für Deinen konstanten Erfolg im Börsenhandel.
          </p>

          <!-- CTA Buttons -->
          <div class="cta-container flex flex-wrap gap-4 justify-center">
            <button 
              bind:this={ctaButtonRef}
              class="group relative flex items-center gap-2 px-8 py-4
                text-primary-900
                rounded-xl
                bg-white hover:bg-primary-50
                transition-all duration-300
                shadow-lg shadow-black/5"
            >
              <span class="text-base font-medium">
                Jetzt Platz sichern
              </span>
              <div class="relative glow-icon-container">
                <div class="absolute -inset-1 animate-[pulse_4s_ease-in-out_infinite] opacity-20
                  rounded-full 
                  bg-primary-500/5 
                  blur-sm"
                ></div>
                <svg class="w-5 h-5 relative animate-[bounce_2s_ease-in-out_infinite] text-primary-600" 
                  fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                    d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </button>
            <button 
              class="px-8 py-4 text-base font-medium text-white border-2 border-white/20 
                hover:bg-white/10 rounded-xl transition-colors"
            >
              Mehr erfahren
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- Video Modal -->
{#if isVideoOpen}
  <div 
    class="video-modal fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 md:p-8"
  >
    <div class="relative w-full max-w-7xl mx-auto bg-black rounded-2xl overflow-hidden shadow-2xl">
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
  :global(body.modal-open) {
    overflow: hidden;
  }
</style>
