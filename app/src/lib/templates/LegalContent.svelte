<script lang="ts">
  import { PortableText } from '@portabletext/svelte';
  import type { PortableTextComponents } from '@portabletext/svelte';
  import CustomListItem from '$lib/components/CustomListItem.svelte';
  import ContentImageRenderer from '$lib/components/ContentImageRenderer.svelte';

  export let title: string;
  export let content: any;

  const portableTextComponents: PortableTextComponents = {
    types: {
      image: ContentImageRenderer,
    },
    listItem: {
      bullet: CustomListItem,
      normal: CustomListItem,
    },
  };
</script>

<section class="relative py-12 md:py-24">
  <div class="container px-4 mx-auto">
    <div class="max-w-3xl mx-auto">
      <h1 class="font-heading tracking-tight text-4xl sm:text-5xl font-medium text-white mb-12">{title}</h1>
      <div class="text-lg text-gray-200">
        <PortableText
          value={content}
          components={portableTextComponents}
        />
      </div>
    </div>
  </div>
</section>
