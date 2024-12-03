<script lang="ts">
  import YouTubePlayer from "$lib/components/YouTubePlayer.svelte";
  import Icon from "$lib/components/icons/Icon.svelte";
  import { onMount, onDestroy } from 'svelte';
  import { fade, scale } from 'svelte/transition';
  
  export let videoId: string;
  export let platform: 'youtube' | 'vimeo' = 'youtube';
  export let onClose: () => void;

  onMount(() => document.body.style.overflow = 'hidden');
  onDestroy(() => document.body.style.overflow = '');
</script>

<div class="modal-portal">
  <!-- Main modal container with backdrop -->
  <div 
    class="fixed inset-0 z-[100] flex items-center justify-center"
    transition:fade={{ duration: 200 }}
  >
    <!-- Backdrop -->
    <div 
      class="absolute inset-0 bg-black/90 backdrop-blur-sm"
      on:click={onClose}
    />

    <!-- Content -->
    <div
      class="relative w-full max-w-7xl mx-auto p-4 md:p-8"
      transition:scale={{ duration: 300, delay: 100, start: 0.95 }}
    >
      <!-- Close button -->
      <button 
        class="absolute top-4 right-4 z-10 p-2 text-white/50 hover:text-white transition-colors"
        on:click={onClose}
        aria-label="Close modal"
      >
        <Icon name="close" size={24} />
      </button>
      
      <!-- Video player -->
      <div class="bg-black rounded-2xl overflow-hidden shadow-2xl">
        {#if videoId}
          <YouTubePlayer {videoId} {platform} />
        {:else}
          <div class="flex items-center justify-center h-64">
            <p class="text-white text-sm">Warte auf Video ID...</p>
          </div>
        {/if}
      </div>
    </div>
  </div>
</div>

<style>
  :global(.modal-portal) {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 100;
    pointer-events: none;
  }

  :global(.modal-portal > *) {
    pointer-events: auto;
  }
</style>
