<script lang="ts">
  import type { SalesContentSection } from '$lib/types/salesContentSection'
  import type { PortableTextComponents } from '@portabletext/svelte'
  import SanityImage from '$lib/components/SanityImage.svelte'
  import PortableTextContent from '$lib/components/PortableTextContent.svelte'
  import ContentImageRenderer from '$lib/components/ContentImageRenderer.svelte'
  import VideoRenderer from '$lib/components/VideoRenderer.svelte'
  import CustomListItem from '$lib/components/CustomListItem.svelte'
  import PortableTextButton from '$lib/components/PortableTextButton.svelte'
  import Icon from '$lib/components/icons/Icon.svelte'
  import { cleanText } from '$lib/utils/textCleaner'

  export let data: SalesContentSection

  function sanitizePortableText(blocks: any[]): any[] {
    return blocks.map(block => {
      if (block._type === 'block') {
        return {
          ...block,
          children: block.children.map((child: any) => {
            if (child._type === 'span') {
              return {
                ...child,
                text: cleanText(child.text)
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
      button: PortableTextButton
    },
    listItem: {
      bullet: CustomListItem,
      normal: CustomListItem,
    },
    marks: {},
    block: {}
  };

  $: sanitizedLeftContent = data.leftColumnContent ? sanitizePortableText(data.leftColumnContent) : [];
  $: sanitizedRightContent = data.rightColumnContent ? sanitizePortableText(data.rightColumnContent) : [];
</script>

<div class="relative z-10 container px-4 mx-auto">
  <div class="max-w-lg lg:max-w-3xl xl:max-w-5xl mx-auto">
    <div class="text-center mb-16">
      {#if data.badge}
        <span class="inline-block py-1 px-3 mb-4 text-xs font-medium text-primary-900 bg-primary-50 rounded-full shadow">
          {cleanText(data.badge)}
        </span>
      {/if}
      <h2 class="text-3xl lg:text-4xl font-bold mb-8">
        {cleanText(data.title)}</h2>

        {#if data.subtitle}
        <span class="inline-block py-1 text-2xl font-medium">{cleanText(data.subtitle)}</span>
        {/if}
    
    </div>

    <div class="flex flex-wrap -mx-4">
      <!-- Left Column -->
      <div class="w-full lg:w-1/2 px-4 mb-12 lg:mb-0">
        <div class="max-w-lg">
          <PortableTextContent 
            value={sanitizedLeftContent} 
            components={portableTextComponents}
            customClass="text-lg text-gray-700"
          />
        </div>
      </div>

      <!-- Right Column -->
      <div class="w-full lg:w-1/2 px-4">
        <div class="max-w-lg">
          <PortableTextContent 
            value={sanitizedRightContent} 
            components={portableTextComponents}
            customClass="text-lg text-gray-700"
          />
        </div>
      </div>
    </div>

    <!-- Image Box with Benefits -->
    <div class="bg-white mt-12 shadow-lg rounded-lg overflow-hidden">
      <div class="flex flex-col md:flex-row">
        <!-- Image -->
        <div class="md:w-1/2">
          {#if data.image}
            <SanityImage
              value={data.image}
              customClass="w-full h-full object-cover"
            />
          {/if}
        </div>

        <!-- Benefits -->
        <div class="md:w-1/2 p-6 flex flex-col justify-center">
          {#if data.benefitsIntro}
            <p class="text-xl text-gray-700 font-medium mb-6">
              {cleanText(data.benefitsIntro)}
            </p>
          {/if}

          <ul class="space-y-4">
            {#each data.benefits as benefit}
              <li class="flex items-center gap-2">
                <Icon 
                name="check" 
                size={18} 
                className="text-primary-600 mt-1"
              />
                <span class="text-base text-gray-700">{cleanText(benefit)}</span>
              </li>
            {/each}
          </ul>
        </div>
      </div>
    </div>
  </div>
</div>
