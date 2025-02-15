<script lang="ts">
  import CleanText from './CleanText.svelte';
  import YouTubePlayer from './YouTubePlayer.svelte';
  import { fade } from 'svelte/transition';
  import { onMount } from 'svelte';
  
  export let videoButton: {
    text: string;
    duration: string;
    videoId: string;
    platform?: 'youtube' | 'vimeo';
  };
  export let theme: { text: string } | undefined = undefined;

  let isVideoOpen = false;
  let isButtonVisible = true;

  function toggleVideo() {
    isVideoOpen = !isVideoOpen;
    document.documentElement.classList.toggle('overflow-hidden', isVideoOpen);
  }

  function handleScroll() {
    const scrollPercent = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight) * 100;
    isButtonVisible = scrollPercent < 95; // Button ist sichtbar bis 90% der Seite gescrollt wurde
  }

  onMount(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  });

  $: textColorClass = theme?.text || 'text-white';
</script>

<!-- Video Button -->
{#if isButtonVisible}
  <button
    class="group relative flex items-center
      transition-all duration-300
      hover:scale-[1.02] active:scale-[0.98]
      transform-gpu"
    on:click={toggleVideo}
    transition:fade={{ duration: 300 }}
  >
    <div class="relative">
      <div class="absolute -inset-3.5 animate-ping rounded-full bg-green-500/10 duration-1000"></div>
      <div class="relative h-12 w-12 rounded-full bg-green-500/90 flex items-center justify-center">
        <svg class="w-6 h-6 text-white translate-x-0.5" fill="none" viewBox="0 0 24 24">
          <path fill="currentColor" d="M8 5v14l11-7z"/>
        </svg>
      </div>
    </div>
  </button>
{/if}

<!-- Video Overlay (if open) -->
{#if isVideoOpen}
  <div 
    class="fixed inset-0 z-[99999] bg-black"
    transition:fade={{ duration: 300 }}
  >
    <!-- Close Button -->
    <button 
      class="absolute top-4 right-4 z-10 p-2 text-white/20 hover:text-white bg-black/20 hover:bg-black/40 rounded-full backdrop-blur-sm transition-all duration-300"
      on:click={toggleVideo}
    >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
      </svg>
    </button>

    <!-- Video Container -->
    <div class="absolute inset-0 flex items-center justify-center p-4 md:p-8">
      <div class="w-full h-full max-w-7xl aspect-video bg-black">
        <YouTubePlayer
          videoId={videoButton.videoId}
          platform={videoButton.platform || 'youtube'}
          autoplay={true}
        />
      </div>
    </div>
  </div>
{/if}
