<script lang="ts">
  import { sanitizeText } from '$lib/utils';

  export let text: string;
  export let tag: keyof HTMLElementTagNameMap = 'span';
  export let className = '';
</script>

<svelte:element 
  this={tag} 
  class={className}
>
  {sanitizeText(text)}
</svelte:element>
