<script lang="ts">
  import { enhanceUrl } from '$lib/sanity/image';

  export let value: any;
  export let customClass = '';

  // Handle both direct URLs and Sanity references
  $: imageUrl = value?.asset?.url || (value?.asset?._ref && enhanceUrl(value).url()) || null;
  $: altText = value?.alt || '';
</script>

{#if imageUrl}
  <img 
    class={customClass}
    src={imageUrl}
    alt={altText}
    loading="lazy"
    decoding="async"
  />
{/if}
