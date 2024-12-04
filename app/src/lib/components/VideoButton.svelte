<script lang="ts">
  import { gsap } from 'gsap'
  import YouTubePlayer from './YouTubePlayer.svelte'
  import CleanText from './CleanText.svelte'

  export let videoButton: {
    text: string
    duration: string
    videoId: string
  }
  export let theme: any

  let isVideoOpen = false
  let videoButtonRef: HTMLElement
  
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

  $: if (videoButtonRef) {
    gsap.from(videoButtonRef, {
      opacity: 0,
      x: 20,
      duration: 0.6,
      ease: "power2.inOut"
    })
  }
</script>

<div 
  bind:this={videoButtonRef}
  class="fixed z-[100] bottom-6 right-6 md:bottom-12 md:right-12"
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
        text={videoButton.text}
        className="{theme.text} font-medium text-sm md:text-base"
      />
      <CleanText 
        text={videoButton.duration}
        className="{theme.text} opacity-80 text-xs md:text-sm"
      />
    </div>
  </button>
</div>

<!-- Video Modal -->
{#if isVideoOpen && videoButton?.videoId}
  <div class="video-modal fixed inset-0 z-[200] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 md:p-8">
    <div class="relative w-full max-w-7xl mx-auto bg-black rounded-2xl overflow-hidden shadow-2xl">
      <button 
        class="absolute top-4 right-4 z-10 p-2 text-white/20 hover:text-white bg-black/20 hover:bg-black/40 rounded-full backdrop-blur-sm transition-all duration-300"
        on:click={toggleVideo}
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
        </svg>
      </button>
      
      <YouTubePlayer videoId={videoButton.videoId} />
    </div>
  </div>
{/if}

<style>
  :global(body.modal-open) {
    overflow: hidden;
  }
</style>
