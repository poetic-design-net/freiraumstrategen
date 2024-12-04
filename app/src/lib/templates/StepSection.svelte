<script lang="ts">
  import { onMount } from 'svelte';
  import { PortableText } from '@portabletext/svelte';
  import type { PortableTextComponents } from '@portabletext/svelte';
  import SanityImage from "$lib/components/SanityImage.svelte";
  import ContentImageRenderer from '$lib/components/ContentImageRenderer.svelte';
  import VideoRenderer from '$lib/components/VideoRenderer.svelte';
  import CustomListItem from '$lib/components/CustomListItem.svelte';
  import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
  import { sanitizeText } from '$lib/utils';

  interface Step {
    number: number;
    title: string;
    description: any[]; // Portable Text blocks
    image: {
      _type: 'image';
      asset: SanityImageSource;
      alt?: string;
    };
  }

  interface Props {
    enabled: boolean;
    badge: string;
    heading: {
      thin: string;
      regular: string;
    };
    steps: Step[];
  }

  export let data: Props;

  let activeStep = 0;
  let container: HTMLElement | null = null;

  function updateActiveStep() {
    if (!container) return;

    const stepElements = container.querySelectorAll('.step-content');
    const viewportHeight = window.innerHeight;
    const triggerPoint = viewportHeight * 0.25;

    for (let i = 0; i < stepElements.length; i++) {
      const rect = stepElements[i].getBoundingClientRect();
      if (rect.top < triggerPoint && rect.bottom > triggerPoint) {
        activeStep = i;
        break;
      }
    }
  }

  function sanitizePortableText(blocks: any[]): any[] {
    return blocks.map(block => {
      if (block._type === 'block') {
        return {
          ...block,
          children: block.children.map((child: any) => {
            if (child._type === 'span') {
              return {
                ...child,
                text: sanitizeText(child.text)
              };
            }
            return child;
          })
        };
      }
      return block;
    });
  }

  const portableTextComponents: PortableTextComponents = {
    types: {
      image: ContentImageRenderer,
      video: VideoRenderer,
    },
    listItem: {
      bullet: CustomListItem,
      normal: CustomListItem,
    }
  };

  onMount(() => {
    updateActiveStep();
    window.addEventListener('scroll', updateActiveStep);
    window.addEventListener('resize', updateActiveStep);

    return () => {
      window.removeEventListener('scroll', updateActiveStep);
      window.removeEventListener('resize', updateActiveStep);
    };
  });
</script>

{#if data.enabled}
<div class="w-full">
  <div class="max-w-xl lg:max-w-7xl mx-auto container">
    <div class="pb-32 text-center">
      <span class="inline-block py-1 px-3 mb-4 text-xs font-medium text-primary-900 bg-primary-50 rounded-full shadow">{data.badge}</span>
      <h1 class="font-heading text-5xl xs:text-6xl md:text-7xl font-medium text-light">
        <span class="font-thin">{data.heading.thin}</span>
        <span class="block">{data.heading.regular}</span>
      </h1>
    </div>
    <div class="flex flex-col lg:flex-row md:gap-24">
      <div bind:this={container} class="w-full lg:w-1/2 space-y-16 md:space-y-32 lg:space-y-72">
        {#each data.steps as step, index}
          <div 
            class="step-content pb-32 relative transition-all duration-300 ease-out"
            class:active={activeStep === index}
          >
            <div class="pl-12 relative">
              <div class="absolute left-0 top-0 w-8 h-8 rounded-full flex items-center justify-center bg-gray-700 text-white transition-colors duration-300 ease-out"
                   class:bg-primary-600={activeStep >= index}>
                {step.number}
              </div>
              <h3 class="text-3xl font-light mb-4">{step.title}</h3>
              <div class="text-gray-700 post-content">
                <PortableText
                  value={sanitizePortableText(step.description)}
                  components={portableTextComponents}
                />
              </div>
            </div>
            <div class="mt-4 pl-12 lg:hidden">
              <SanityImage
                value={step.image}
                customClass="w-full h-auto object-cover rounded-lg shadow-md"
              />
            </div>
          </div>
        {/each}
      </div>
      <div class="hidden sm:pl-12 lg:pl-0 lg:block w-1/2 relative">
        <div class="sticky top-32 h-[40vh]">
          {#each data.steps as step, index}
            <div class="absolute inset-0 transition-opacity duration-300 ease-out {activeStep === index ? 'opacity-100' : 'opacity-0'}">
              <SanityImage
                value={step.image}
                customClass="w-full h-full object-cover rounded-lg"
              />
            </div>
          {/each}
        </div>
      </div>
    </div>
  </div>
</div>
{/if}

<style lang="postcss">
  .step-content {
    opacity: 0.5;
    transition: opacity 0.3s ease-out;
  }
  .step-content.active {
    opacity: 1;
  }
  :global(.post-content h1) {
    @apply text-3xl mb-6;
  }
  :global(.post-content h2) {
    @apply text-2xl mb-4;
  }
  :global(.post-content h3) {
    @apply text-xl mb-3;
  }
  :global(.post-content h4) {
    @apply text-lg mb-2;
  }
  :global(.post-content p) {
    @apply mb-4;
  }
  :global(.post-content blockquote) {
    @apply border-l-4 border-gray-300 pl-4 italic my-4;
  }
  :global(.post-content a) {
    @apply text-primary-500 hover:text-primary-600 underline;
  }
  :global(.post-content strong) {
    @apply font-medium;
  }
  :global(.post-content em) {
    @apply italic;
  }
</style>
