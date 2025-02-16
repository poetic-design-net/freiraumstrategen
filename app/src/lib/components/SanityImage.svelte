<script lang="ts">
  import { enhanceUrl, getResponsiveImage } from '$lib/sanity/image';
  import type { ImageFormat } from '@sanity/image-url/lib/types/types';
  import { onMount, createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  export let value: any;
  export let customClass = '';
  export let sizes = '(min-width: 1024px) 1024px, (min-width: 768px) 768px, (min-width: 640px) 640px, (min-width: 480px) 480px, (min-width: 320px) 320px, 100vw';
  export let width: number | undefined = undefined;
  export let height: number | undefined = undefined;
  export let quality = 80; // Balanced quality for WebP
  export let format: ImageFormat = 'webp';
  export let avifSrcSet: string | undefined = undefined;
  export let priority = false; // For LCP images
  export let fetchpriority: 'high' | 'low' | 'auto' = priority ? 'high' : 'auto';
  export let blur = !priority; // Disable blur for priority images

  let isLoading = true;
  let hasError = false;
  let mounted = false;
  let imageRef: HTMLImageElement;
  let blurDataURL: string | null = null;

  function sanitizeAlt(text: string | undefined) {
    return text ? text.replace(/[^\w\s]/gi, '').trim() : '';
  }

  // Generate blur data URL for progressive loading
  $: {
    if (blur && value?.asset?._ref) {
      blurDataURL = enhanceUrl(value)
        .quality(10)
        .blur(20)
        .width(20)
        .url();
    }
  }

  // Get responsive image data
  $: responsiveImageData = value?.asset?._ref ? getResponsiveImage(value) : null;
  
  // Use responsive image data or fallback to asset URL
  $: imageUrl = value?.asset?.url || responsiveImageData?.src || null;
  $: srcSet = responsiveImageData?.srcSet || '';

  $: altText = sanitizeAlt(value?.alt);
  $: className = `block ${customClass}`.trim();

  function handleLoad() {
    isLoading = false;
    hasError = false;
    dispatch('imageLoaded');
  }

  function handleError() {
    isLoading = false;
    hasError = true;
    dispatch('imageError');
  }

  onMount(() => {
    mounted = true;
    // Force image reload on mount
    if (imageUrl) {
      const img = new Image();
      img.src = imageUrl;
      img.onload = handleLoad;
      img.onerror = handleError;
    }
    return () => {
      mounted = false;
    };
  });
</script>

{#if imageUrl && mounted}
  <div 
    class="relative {className}" 
    style={width && height ? `aspect-ratio: ${width}/${height};` : ''}
  >
    <picture>
      <!-- AVIF als beste Option mit optimierter Qualität -->
      <source
        type="image/avif"
        srcset={avifSrcSet || srcSet}
        {sizes}
      />
      <!-- WebP als zweite Option -->
      <source
        type="image/webp"
        srcset={srcSet}
        {sizes}
      />
      <!-- JPEG als Fallback für ältere Browser -->
      <source
        type="image/jpeg"
        srcset={imageUrl}
        {sizes}
      />
      <img 
        bind:this={imageRef}
        class="{className} transition-opacity duration-300 {isLoading ? 'opacity-0' : 'opacity-100'}"
        src={imageUrl}
        srcset={srcSet}
        {sizes}
        alt={altText}
        loading={priority ? 'eager' : 'lazy'}
        fetchpriority={fetchpriority}
        decoding={priority ? 'sync' : 'async'}
        width={width || responsiveImageData?.width}
        height={height || responsiveImageData?.height}
        style={width && height ? `aspect-ratio: ${width}/${height};` : ''}
        on:load={handleLoad}
        on:error={handleError}
      />
    </picture>
    {#if isLoading}
      <div 
        class="absolute inset-0 bg-gray-100 animate-pulse overflow-hidden" 
        style={width && height ? `aspect-ratio: ${width}/${height};` : ''}
      >
        {#if blur && blurDataURL}
          <img
            src={blurDataURL}
            alt=""
            class="w-full h-full object-cover filter blur-lg transform scale-110"
            aria-hidden="true"
          />
        {/if}
      </div>
    {/if}
  </div>
{:else if hasError}
  <div class="relative {className} bg-gray-100 flex items-center justify-center">
    <span class="text-gray-400">Image failed to load</span>
  </div>
{/if}
