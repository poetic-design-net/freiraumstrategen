<script lang="ts">
import { onMount } from 'svelte';
import { fade } from 'svelte/transition';
import type { StrategyHeroProps } from './StrategyHeroSection/types';
import Background from './StrategyHeroSection/Background.svelte';
import VideoButton from './StrategyHeroSection/VideoButton.svelte';
import Statistics from './StrategyHeroSection/Statistics.svelte';
import VideoModal from './StrategyHeroSection/VideoModal.svelte';

export let headline: StrategyHeroProps['headline'] = { prefix: '', main: '' };
export let backgroundImage: StrategyHeroProps['backgroundImage'];
export let statistics: StrategyHeroProps['statistics'];
export let cta: StrategyHeroProps['cta'];
export let video: StrategyHeroProps['video'] = undefined;

let isVideoOpen = false;
let isContentVisible = false;

onMount(() => {
  // Simple delay to ensure smooth entrance animation
  setTimeout(() => {
    isContentVisible = true;
  }, 100);
  
  // Debug video data
  console.log('Initial video data:', video);
});

// Debug video data changes
$: {
  console.log('Video data changed:', video);
  if (video?.youtubeId) {
    console.log('YouTube ID:', video.youtubeId);
  }
}

function toggleVideo() {
  isVideoOpen = !isVideoOpen;
  console.log('Video modal toggled, isVideoOpen:', isVideoOpen);
  console.log('Current video ID:', video?.youtubeId);
}
</script>

<div class="relative w-full h-full min-h-[600px] flex flex-col overflow-hidden">
  <Background {backgroundImage} />
  {#if video}
    <VideoButton {video} onToggle={toggleVideo} />
  {/if}
  
  <!-- Main Content Container -->
  <div class="relative flex-1 flex flex-col">
    <!-- Center Content -->
    <div class="flex-1 flex justify-center items-center">
      <div class="container px-4 mx-auto">
        {#if isContentVisible}
          <div 
            class="max-w-4xl mx-auto text-center flex flex-col items-center gap-8"
            in:fade={{ duration: 800, delay: 200 }}
          >
            <!-- Headline -->
            <h1 
              class="font-heading text-4xl xs:text-5xl md:text-6xl xl:text-7xl font-medium text-white"
            >
              <span class="font-thin">{headline?.prefix || ''}</span>
              <span>{headline?.main || ''}</span>
            </h1>

            {#if statistics}
              <Statistics {statistics} />
            {/if}

            <!-- CTA Button -->
            {#if cta}
              <div 
                class="flex flex-col items-center gap-2 pt-4"
              >
                <button 
                  class="group relative flex items-center gap-2 px-6 py-2
                    text-white/90 hover:text-white
                    border border-white/20
                    rounded-lg
                    backdrop-blur-sm
                    bg-white/5 hover:bg-white/10
                    transition-all duration-300
                    shadow-sm shadow-black/5"
                  on:click={() => window.location.href = cta.link}
                >
                  <span class="text-sm font-medium">
                    {cta.text}
                  </span>
                  <div class="relative">
                    <!-- Subtle Glow -->
                    <div class="absolute -inset-1 animate-pulse opacity-20
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
                      class="size-6 relative animate-bounce text-primary-200"
                    >
                      <path 
                        stroke-linecap="round" 
                        stroke-linejoin="round" 
                        d="M15.042 21.672 13.684 16.6m0 0-2.51 2.225.569-9.47 5.227 7.917-3.286-.672ZM12 2.25V4.5m5.834.166-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243-1.59-1.59" 
                      />
                    </svg>
                  </div>

                  <!-- Hover effect -->
                  <div class="absolute inset-0 rounded-lg bg-gradient-to-r from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </button>
              </div>
            {/if}
          </div>
        {/if}
      </div>
    </div>
  </div>
</div>

<!-- Video Modal -->
{#if isVideoOpen && video?.youtubeId}
  <VideoModal videoId={video.youtubeId} onClose={toggleVideo} />
{/if}
