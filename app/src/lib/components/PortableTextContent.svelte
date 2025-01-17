<script lang="ts">
  import { PortableText } from '@portabletext/svelte';
  import type { PortableTextComponents } from '@portabletext/svelte';
  import TextAlignmentBlock from './TextAlignmentBlock.svelte';
  
  export let value: any;
  export let components: PortableTextComponents = {};
  export let customClass = '';

  const mergedComponents: PortableTextComponents = {
    ...components,
    types: {
      ...components.types,
      textAlignment: TextAlignmentBlock
    }
  };
</script>

<style>
  .page-content :global(h2) {
    font-size: 1.875rem;
    line-height: 2.25rem;
    font-weight: 300;
    letter-spacing: -0.025em;
    margin-top: 3rem;
    margin-bottom: 1.5rem;
  }
  @media (min-width: 640px) {
    .page-content :global(h2) {
      font-size: 2.25rem;
      line-height: 2.5rem;
    }
  }

  .page-content :global(p:not(:only-child)) {
    margin-bottom: 1.5rem;
  }

  .page-content :global(ul) {
    padding: 2rem;
    margin-top: 1.5rem;
    background-color: rgb(243 244 246);
    border-radius: 0.5rem;
  }

  .page-content :global(li) {
    display: flex;
    align-items: center;
    margin-bottom: 1.5rem;
  }

  .page-content :global(li:last-child) {
    margin-bottom: 0;
  }

   .page-content :global(img) {
    margin-bottom: 1.5rem;
  }

  .page-content :global(blockquote) {
    margin: 2rem 0;
    padding: 1.5rem 2rem;
    background-color: rgb(243 244 246);
    border-left: 4px solid #006775;
    font-style: italic;
    border-radius: 0.5rem;
  }

  @media (min-width: 640px) {
    .page-content :global(blockquote) {
      padding: 2rem 3rem;
    }
  }

  .page-content :global(blockquote p) {
    margin-bottom: 0;
  }
</style>

<div class="page-content {customClass}">
  <PortableText {value} components={mergedComponents} />
</div>
