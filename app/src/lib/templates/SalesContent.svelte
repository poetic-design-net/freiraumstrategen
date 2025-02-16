<script lang="ts">
  import type { SalesContentSection } from '$lib/types/salesContentSection'
  import type { PortableTextComponents } from '@portabletext/svelte'
  import { slide } from 'svelte/transition'
  import { cubicOut } from 'svelte/easing'
  import { isSicherheitVisible } from '$lib/stores/sicherheit'
  import SanityImage from '$lib/components/SanityImage.svelte'
  import PortableTextContent from '$lib/components/PortableTextContent.svelte'
  import ContentImageRenderer from '$lib/components/ContentImageRenderer.svelte'
  import VideoRenderer from '$lib/components/VideoRenderer.svelte'
  import CustomListItem from '$lib/components/CustomListItem.svelte'
  import PortableTextButton from '$lib/components/PortableTextButton.svelte'
  import Icon from '$lib/components/icons/Icon.svelte'
  import { cleanText } from '$lib/utils/textCleaner'
  import { getThemeStyles, getSectionClasses } from '$lib/utils/sections'
  import Button from '$lib/components/Button.svelte'

  export let data: SalesContentSection

  let isVisible: boolean;
  
  isSicherheitVisible.subscribe(value => {
    isVisible = value;
  });

  // Get theme-based styles for text colors and background with opacity
  const theme = getThemeStyles(data.styles?.theme)
  const boxTheme = getThemeStyles(data.styles?.theme || 'light', 80)
  
  // Determine content width class based on data.contentWidth
  $: contentWidthClass = data.contentWidth === 'max-3-xl' ? 'max-w-3xl' :
                       data.contentWidth === 'full' ? 'max-w-full' : 
                       'max-w-5xl'
  
  // Determine text alignment class based on data.headlineAlignment
  $: headlineAlignmentClass = data.headlineAlignment === 'left' ? 'text-left' : 'text-center'

  // Get section classes based on the layout
  $: sectionClasses = getSectionClasses('salesContentSection', data.styles)

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


  <div class="container px-4 mx-auto">
      <div class={data.contentWidth === 'full' ? 'w-full' : `max-w-lg lg:max-w-3xl xl:${contentWidthClass} mx-auto`}>
      <!-- Content -->
      {#if data.layout === 'single'}
        <!-- Single Column Layout -->
        <div class="space-y-10 mb-10">
          {#if data.badge}
            <div class="text-center">
              <span class="inline-block uppercase font-medium text-primary-800">
                {cleanText(data.badge)}
              </span>
            </div>
          {/if}
          {#if data.title}
            <div class="{contentWidthClass} {headlineAlignmentClass}">
              <h2 class="{theme.headings} text-3xl mx-auto lg:text-5xl font-bold">
                {cleanText(data.title)}
              </h2>
            </div>
          {/if}
          {#if data.subtitle}
            <div>
              <span class="inline-block py-1 text-2xl max-w-4xl {theme.text}">
                {cleanText(data.subtitle)}
              </span>
            </div>
          {/if}
        </div>
    
        <div class="{contentWidthClass} mx-auto">
          <div>
            <PortableTextContent
              value={sanitizedLeftContent}
              components={portableTextComponents}
              customClass="{theme.text} text-lg"
            />
          </div>
        </div>
      {:else}
        <!-- Double Column Layout -->
        <div class={data.contentWidth === 'full' ? 'flex flex-wrap' : 'flex flex-wrap -mx-4'}>
          <div class={data.contentWidth === 'full' ? 'w-full lg:w-1/2 sm:pr-6 mb-12 lg:mb-0' : 'w-full lg:w-1/2 px-4 mb-12 lg:mb-0'}>
            <div class={data.contentWidth === 'full' ? 'w-full' : 'max-w-lg'}>
              <!-- Left Column Content -->
              <PortableTextContent
                value={sanitizedLeftContent}
                components={portableTextComponents}
                customClass="{theme.text} text-lg"
              />
            </div>
          </div>
          <div class={data.contentWidth === 'full' ? 'w-full lg:w-1/2 sm:pl-12' : 'w-full lg:w-1/2 px-4'}>
            <div class={data.contentWidth === 'full' ? 'w-full' : 'max-w-lg'}>
              <!-- Header Elements in Left Column -->
               {#if data.badge}
               <span class="inline-block uppercase font-medium text-primary-800 mb-6">
                 {cleanText(data.badge)}
               </span>
             {/if}
             <h2 class="{theme.headings} text-3xl lg:text-5xl font-bold mb-6">
               {cleanText(data.title)}
             </h2>
             {#if data.subtitle}
               <span class="inline-block py-1 text-2xl {theme.text} mb-10">
                 {cleanText(data.subtitle)}
               </span>
             {/if}
              <PortableTextContent
                value={sanitizedRightContent}
                components={portableTextComponents}
                customClass="{theme.text}"
              />
            </div>
          </div>
        </div>
      {/if}

      <!-- Button Section -->
      {#if data.button}
        <div class="flex justify-center mt-12">
          <Button
            text={data.button.text}
            href={data.button.url}
            variant={data.button.style || 'primary'}
            size={data.button.size || 'md'}
          />
        </div>
      {/if}

      <!-- Benefits -->
      {#if (data.image?.asset) || (Array.isArray(data.benefits) && data.benefits.length > 0)}
        <div class="{boxTheme.background} mt-12 shadow-lg rounded-lg overflow-hidden">
          <div class="flex flex-col md:flex-row {!data.image?.asset && Array.isArray(data.benefits) && data.benefits.length > 0 ? 'md:justify-center' : ''}">
            {#if data.image?.asset}
              <div class="md:w-1/2">
                <SanityImage
                  value={data.image}
                  customClass="w-full h-full object-cover"
                />
              </div>
            {/if}
            {#if Array.isArray(data.benefits) && data.benefits.length > 0}
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
                        className="text-primary-600 flex-shrink-0 align-self-start"
                      />
                      <span class="{theme.text} text-base">{cleanText(benefit.toString())}</span>
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
