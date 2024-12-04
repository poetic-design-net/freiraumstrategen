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
  import { getThemeStyles } from '$lib/utils/sections'

  export let data: SalesContentSection

  // Get theme-based styles for text colors and background with opacity
  const theme = getThemeStyles(data.styles?.theme)
  const boxTheme = getThemeStyles(data.styles?.theme || 'light', 80) // Using 80% opacity for the box background

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

<!-- Content only, no section-level styling -->
<div class="container px-4 mx-auto">
  <div class="max-w-lg lg:max-w-3xl xl:max-w-5xl mx-auto">
    <div class="text-center mb-16">
      {#if data.badge}
        <span class="inline-block py-1 px-3 mb-4 text-xs font-medium text-primary-900 bg-primary-50 rounded-full shadow">
          {cleanText(data.badge)}
        </span>
      {/if}
      <h2 class="{theme.headings} text-3xl lg:text-4xl font-bold mb-8">
        {cleanText(data.title)}</h2>

        {#if data.subtitle}
        <span class="inline-block py-1 text-2xl font-medium {theme.text}">
          {cleanText(data.subtitle)}
        </span>
        {/if}
    </div>

    <div class="flex flex-wrap -mx-4">
      <!-- Left Column -->
      <div class="w-full lg:w-1/2 px-4 mb-12 lg:mb-0">
        <div class="max-w-lg">
          <PortableTextContent 
            value={sanitizedLeftContent} 
            components={portableTextComponents}
            customClass="{theme.text} text-lg"
          />
        </div>
      </div>

      <!-- Right Column -->
      <div class="w-full lg:w-1/2 px-4">
        <div class="max-w-lg">
          <PortableTextContent 
            value={sanitizedRightContent} 
            components={portableTextComponents}
            customClass="{theme.text} text-lg"
          />
        </div>
      </div>
    </div>

    <!-- Image Box with Benefits -->
    {#if data.image || data.benefits?.length > 0}
      <div class="{boxTheme.background} mt-12 shadow-lg rounded-lg overflow-hidden">
        <div class="flex flex-col md:flex-row">
          <!-- Image -->
          {#if data.image}
            <div class="md:w-1/2">
              <SanityImage
                value={data.image}
                customClass="w-full h-full object-cover"
              />
            </div>
          {/if}

          <!-- Benefits -->
          {#if data.benefits?.length > 0}
            <div class="md:w-1/2 p-6 flex flex-col justify-center">
              {#if data.benefitsIntro}
                <p class="{theme.headings} text-xl font-medium mb-6">
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
                    <span class="{theme.text} text-base">{cleanText(benefit)}</span>
                  </li>
                {/each}
              </ul>
            </div>
          {/if}
        </div>
      </div>
    {/if}
  </div>
</div>
