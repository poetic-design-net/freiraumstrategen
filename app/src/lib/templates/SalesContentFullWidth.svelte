<script lang="ts">
  import type { SalesContentSection } from '$lib/types/salesContentSection'
  import type { PortableTextComponents } from '@portabletext/svelte'
  import SanityImage from '$lib/components/SanityImage.svelte'
  import PortableTextContent from '$lib/components/PortableTextContent.svelte'
  import ContentImageRenderer from '$lib/components/ContentImageRenderer.svelte'
  import VideoRenderer from '$lib/components/VideoRenderer.svelte'
  import CustomListItem from '$lib/components/CustomListItem.svelte'
  import PortableTextButton from '$lib/components/PortableTextButton.svelte'
  import { cleanText } from '$lib/utils/textCleaner'
  import { getThemeStyles } from '$lib/utils/sections'

  export let data: SalesContentSection
  
  const theme = getThemeStyles(data.styles?.theme)

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

<div class="flex flex-col md:flex-row min-h-[300px] md:min-h-[600px]">
  <!-- Left Column -->
  <div class="w-full md:w-1/2 flex items-center justify-center p-4 sm:p-8 lg:p-16
               {data.imagePosition === 'right' ? '' : theme.background}
               {data.imagePosition === 'right' ? 'md:order-2' : 'md:order-1'}">
    <div class="w-full max-w-2xl">
      {#if data.badge}
        <span class="inline-block uppercase font-medium text-green text-sm sm:text-base mb-4 sm:mb-6">
          {cleanText(data.badge)}
        </span>
      {/if}
      
      <h2 class="{theme.headings} text-2xl sm:text-3xl lg:text-5xl font-medium mb-4 sm:mb-6">
        {cleanText(data.title)}
      </h2>
      
      {#if data.subtitle}
        <span class="inline-block text-xl sm:text-2xl {theme.text}">
          {cleanText(data.subtitle)}
        </span>
      {/if}
      
      <div class="mt-6 sm:mt-8">
        <PortableTextContent
          value={sanitizedLeftContent}
          components={portableTextComponents}
          customClass="{theme.text} text-base sm:text-lg font-light"
        />
      </div>
    </div>
  </div>

  <!-- Right Column -->
  <div class="w-full h-[400px] md:h-auto md:w-1/2 
              {data.imagePosition === 'right' ? 'md:order-2' : ''} 
              {data.imagePosition === 'right' ? theme.background : ''} 
              relative">
    {#if data.fullWidthImage?.asset}
      <div class="absolute inset-0">
        <SanityImage
          value={data.fullWidthImage}
          customClass="w-full h-full object-cover"
        />
      </div>
    {:else}
      <div class="flex items-center justify-center p-4 sm:p-8 lg:p-16 h-full">
        <div class="w-full max-w-2xl">
          <PortableTextContent
            value={sanitizedRightContent}
            components={portableTextComponents}
            customClass="{theme.text} text-base sm:text-lg"
          />
        </div>
      </div>
    {/if}
  </div>
</div>