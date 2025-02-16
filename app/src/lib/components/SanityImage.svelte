<script lang="ts">
  import { getResponsiveImage } from '$lib/sanity/image';
  import { createEventDispatcher } from 'svelte';
  
  const dispatch = createEventDispatcher();
  
  export let value: any;
  export let customClass = '';
  export let width: number | undefined = undefined;
  export let height: number | undefined = undefined;
  export let priority = false;
  export let fetchpriority: 'high' | 'low' | 'auto' = priority ? 'high' : 'auto';
  export let sizes: string | undefined = undefined;
  
  let isLoading = priority ? false : true;
  let hasError = false;
  let imageRef: HTMLImageElement;
  
  function sanitizeAlt(text: string | undefined) {
    return text ? text.replace(/[^\w\s]/gi, '').trim() : '';
  }
  
  // Entferne doppelte Klassennamen und 'block' aus customClass
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
        sizes
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
  
  function handleLoad(event: Event) {
    isLoading = false;
    hasError = false;
    dispatch('imageLoaded', { element: imageRef });
  }
  
  function handleError(event: Event) {
    isLoading = false;
    hasError = true;
    dispatch('imageError');
  }
  </script>
  
  {#if imageUrl}
    <div class="relative {className}">
      <img 
        bind:this={imageRef}
        class="{className}"
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
      
      {#if isLoading}
        <div class="absolute inset-0 bg-gray-100 animate-pulse overflow-hidden" />
      {/if}
    </div>
  {:else if hasError}
    <div class="relative {className} bg-gray-100 flex items-center justify-center">
      <span class="text-gray-400">Image failed to load</span>
    </div>
  {/if}