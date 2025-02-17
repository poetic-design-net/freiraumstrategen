<script lang="ts">
  import { getResponsiveImage } from '$lib/sanity/image';
  import { createEventDispatcher, onMount } from 'svelte';
  
  const dispatch = createEventDispatcher();
  
  export let value: any;
  export let customClass = '';
  export let width: number | undefined = undefined;
  export let height: number | undefined = undefined;
  export let priority = false;
  export let fetchpriority: 'high' | 'low' | 'auto' = priority ? 'high' : 'auto';
  export let sizes: string | undefined = undefined;
  export let isHero = false;
  
  let isLoading = priority ? false : true;
  let hasError = false;
  let imageRef: HTMLImageElement;
  let mainImageLoaded = false;
  
  function sanitizeAlt(text: string | undefined) {
    return text ? text.replace(/[^\w\s]/gi, '').trim() : '';
  }
  
  // Entferne doppelte Klassennamen
  function normalizeClassName(className: string): string {
    const classes = className.split(' ').filter(Boolean);
    const uniqueClasses = [...new Set(classes)];
    return uniqueClasses.join(' ').trim();
  }
  
  $: responsiveImageData = (() => {
    if (!value?.asset) return null;
  
    try {
      return getResponsiveImage(value, {
        maxWidth: width || 1920,
        maxHeight: height,
        sizes,
        isHero
      });
    } catch (error) {
      console.error('Error generating responsive data:', error);
      return null;
    }
  })();
  
  $: imageUrl = responsiveImageData?.src || null;
  $: srcSet = responsiveImageData?.srcSet || '';
  $: altText = sanitizeAlt(value?.alt);
  $: className = normalizeClassName(customClass);
  $: lqipUrl = responsiveImageData?.lqip;
  
  function handleLoad(event: Event) {
    mainImageLoaded = true;
    isLoading = false;
    hasError = false;
    dispatch('imageLoaded', { element: imageRef });
  }
  
  function handleError(event: Event) {
    isLoading = false;
    hasError = true;
    dispatch('imageError');
  }

  // Preload das Hauptbild für wichtige Bilder
  onMount(() => {
    if (priority && imageUrl) {
      const preloadLink = document.createElement('link');
      preloadLink.rel = 'preload';
      preloadLink.as = 'image';
      preloadLink.href = imageUrl;
      document.head.appendChild(preloadLink);
    }
  });
</script>

{#if imageUrl}
  <div class="relative {className}" style="background-color: #f3f4f6;">
    <!-- LQIP Hintergrundbild -->
    {#if lqipUrl && !mainImageLoaded}
      <div 
        class="absolute inset-0 bg-cover bg-center" 
        style="background-image: url({lqipUrl});"
      />
    {/if}

    <!-- Hauptbild -->
    <img 
      bind:this={imageRef}
      class="{className}"
      class:opacity-0={!mainImageLoaded}
      class:opacity-100={mainImageLoaded}
      src={imageUrl}
      srcset={srcSet}
      sizes={responsiveImageData?.sizes}
      alt={altText}
      loading={priority ? 'eager' : 'lazy'}
      {fetchpriority}
      decoding={priority ? 'sync' : 'async'}
      width={responsiveImageData?.width}
      height={responsiveImageData?.height}
      on:load={handleLoad}
      on:error={handleError}
    />
    
    <!-- Loading Zustand -->
    {#if isLoading && !lqipUrl}
      <div class="absolute inset-0 bg-white animate-pulse overflow-hidden" />
    {/if}
  </div>
{:else if hasError}
  <div class="relative {className} bg-white flex items-center justify-center">
    <span class="text-gray-400">Image failed to load</span>
  </div>
{/if}

<style>
  img {
    /* Verhindert CLS während des Ladens */
    transform: translateZ(0);
    will-change: opacity;
  }
</style>