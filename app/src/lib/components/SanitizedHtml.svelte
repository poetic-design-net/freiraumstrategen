<script lang="ts">
  import { sanitizeHtmlContent } from '$lib/utils';

  export let html: string;
  export let tag: keyof HTMLElementTagNameMap = 'div';
  export let className = '';
  export let options = {};

  $: sanitizedContent = sanitizeHtmlContent(html, options);
</script>

<svelte:element 
  this={tag} 
  class={className}
>
  {@html sanitizedContent}
</svelte:element>
