<script lang="ts">
  import { PortableText } from '@portabletext/svelte';
  import type { PortableTextComponents } from '@portabletext/svelte';

  export let portableText: {
    value: {
      text: any;
      alignment?: string;
    };
    components: PortableTextComponents;
  };

  const { value, components } = portableText;
  const alignment = value?.alignment || 'left';
</script>

<div class="text-{alignment}">
  {#if value?.text}
    <PortableText value={value.text} {components} />
  {/if}
</div>
