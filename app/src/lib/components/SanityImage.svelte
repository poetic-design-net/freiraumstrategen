<script lang="ts">
  import { enhanceUrl } from '$lib/sanity/image';
  import { onMount, createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  export let value: any;
  export let customClass = '';
  export let sizes = '100vw'; // Allow custom sizes value

  let isLoading = true;
  let hasError = false;
  let mounted = false;

  function sanitizeAlt(text: string | undefined) {
    return text ? text.replace(/[^\w\s]/gi, '').trim() : '';
  }

  // Handle both direct URLs and Sanity references
  $: imageUrl = value?.asset?.url || (value?.asset?._ref && enhanceUrl(value).url()) || null;
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
  <div class="relative {className}">
    <picture>
      <source
        type="image/webp"
        srcset={imageUrl}
        {sizes}
      />
      <img 
        class="{className} transition-opacity duration-300 {isLoading ? 'opacity-0' : 'opacity-100'}"
        src={imageUrl}
        {sizes}
        alt={altText}
        loading="lazy"
        decoding="async"
        on:load={handleLoad}
        on:error={handleError}
      />
    </picture>
    {#if isLoading}
      <div class="absolute inset-0 bg-gray-100 animate-pulse" />
    {/if}
  </div>
{:else if hasError}
  <div class="relative {className} bg-gray-100 flex items-center justify-center">
    <span class="text-gray-400">Image failed to load</span>
  </div>
{/if}
