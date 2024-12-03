<script lang="ts">
  import { cleanText } from '$lib/utils/textCleaner';

  export let text: string;
  export let tag: keyof HTMLElementTagNameMap = 'span';
  export let className = '';
</script>

<svelte:element 
  this={tag} 
  class={className}
>
  {cleanText(text)}
</svelte:element>
