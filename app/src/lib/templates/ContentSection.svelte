<script lang="ts">
  import type { Header, Column, BackgroundImage, ContentSectionLayout } from '$lib/types/contentSection';
  import { defaultHeader, defaultColumn, defaultBackgroundImage } from '$lib/types/contentSection';
  import type { PortableTextComponents } from '@portabletext/svelte';
  import ContentImageRenderer from '$lib/components/ContentImageRenderer.svelte';
  import VideoRenderer from '$lib/components/VideoRenderer.svelte';
  import CustomListItem from '$lib/components/CustomListItem.svelte';
  import SanityImage from '$lib/components/SanityImage.svelte';
  import PortableTextContent from '$lib/components/PortableTextContent.svelte';
  import PortableTextButton from '$lib/components/PortableTextButton.svelte';
  import { sanitizeText } from '$lib/utils';
  import { cleanObject } from '$lib/utils/textCleaner';

  export let header: Header | undefined = defaultHeader;
  export let leftColumn: Column | undefined = defaultColumn;
  export let rightColumn: Column | undefined = defaultColumn;
  export let backgroundImage: BackgroundImage | undefined = defaultBackgroundImage;
  export let layout: ContentSectionLayout = 'two-columns';
  export let section: any; // This contains the section data including styles

  $: currentHeader = cleanObject(header) ?? defaultHeader;
  $: currentLeftColumn = cleanObject(leftColumn) ?? defaultColumn;
  $: currentRightColumn = cleanObject(rightColumn) ?? defaultColumn;
  $: currentBackgroundImage = backgroundImage ?? defaultBackgroundImage;
  $: isSingleColumn = layout === 'single-column';
  $: isDarkTheme = section?.styles?.theme === 'dark';

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
      button: PortableTextButton
    },
    listItem: {
      bullet: CustomListItem,
      normal: CustomListItem,
    },
    marks: {},
    block: {}
  };

  $: sanitizedLeftHighlighted = currentLeftColumn.highlightedContent ? sanitizePortableText(currentLeftColumn.highlightedContent) : [];
  $: sanitizedLeftRegular = currentLeftColumn.regularContent ? sanitizePortableText(currentLeftColumn.regularContent) : [];
  $: sanitizedRightHighlighted = currentRightColumn.highlightedContent ? sanitizePortableText(currentRightColumn.highlightedContent) : [];
  $: sanitizedRightRegular = currentRightColumn.regularContent ? sanitizePortableText(currentRightColumn.regularContent) : [];
</script>

{#if currentBackgroundImage?.asset}
  <slot name="background">
    <div class="absolute inset-0 w-full h-full overflow-hidden">
      <SanityImage
        value={currentBackgroundImage}
        customClass="w-full h-full object-cover {isDarkTheme ? 'opacity-20' : 'opacity-80'}"
      />
    </div>
  </slot>
{/if}

<!-- Content container -->
<div class="container px-4 mx-auto">
  <div class="text-center mb-18">
    {#if currentHeader.badge}
      <span class="inline-block py-1 px-3 mb-4 text-xs font-medium shadow {isDarkTheme ? 'text-primary-900 bg-gray-50' : 'text-primary-900 bg-primary-50'} rounded-full">
        {currentHeader.badge}
      </span>
    {/if}
    {#if currentHeader.heading?.regular || currentHeader.heading?.thin}
      <h1 class="font-heading text-5xl xs:text-6xl md:text-7xl font-medium {isDarkTheme ? 'text-white' : 'text-gray-900'} mb-8">
        {#if currentHeader.heading.regular}
          <span>{currentHeader.heading.regular}</span>
        {/if}
        {#if currentHeader.heading.thin}
          <span class="font-light block">{currentHeader.heading.thin}</span>
        {/if}
      </h1>
    {/if}
  </div>
  <div class="max-w-lg lg:max-w-3xl xl:max-w-5xl mx-auto">
    <div class="flex flex-wrap {isSingleColumn ? '' : '-mx-8'}">
      {#if isSingleColumn}
        <div class="w-full max-w-3xl mx-auto">
          {#if sanitizedLeftHighlighted.length > 0}
<PortableTextContent
  value={sanitizedLeftHighlighted}
  components={portableTextComponents}
  customClass="text-2xl {isDarkTheme ? 'text-gray-200' : 'text-gray-800'} mb-8"
/>
          {/if}
          {#if sanitizedLeftRegular.length > 0}
<PortableTextContent
  value={sanitizedLeftRegular}
  components={portableTextComponents}
  customClass="text-lg {isDarkTheme ? 'text-gray-300' : 'text-gray-700'} mb-8"
/>
          {/if}
          {#if sanitizedRightHighlighted.length > 0}
<PortableTextContent
  value={sanitizedRightHighlighted}
  components={portableTextComponents}
  customClass="text-2xl {isDarkTheme ? 'text-gray-200' : 'text-gray-800'} mb-10"
/>
          {/if}
          {#if sanitizedRightRegular.length > 0}
<PortableTextContent
  value={sanitizedRightRegular}
  components={portableTextComponents}
  customClass="text-lg {isDarkTheme ? 'text-gray-300' : 'text-gray-700'}"
/>
          {/if}
        </div>
      {:else}
        <div class="w-full lg:w-1/2 px-8 mb-8 lg:mb-0">
          <div class="max-w-lg">
            {#if sanitizedLeftHighlighted.length > 0}
              <PortableTextContent
                value={sanitizedLeftHighlighted}
                components={portableTextComponents}
                customClass="text-2xl {isDarkTheme ? 'text-gray-200' : 'text-gray-800'} mb-8"
              />
            {/if}
            {#if sanitizedLeftRegular.length > 0}
              <PortableTextContent
                value={sanitizedLeftRegular}
                components={portableTextComponents}
                customClass="text-lg {isDarkTheme ? 'text-gray-300' : 'text-gray-700'}"
              />
            {/if}
          </div>
        </div>
        <div class="w-full lg:w-1/2 px-8">
          <div class="max-w-lg">
            {#if sanitizedRightHighlighted.length > 0}
              <PortableTextContent
                value={sanitizedRightHighlighted}
                components={portableTextComponents}
                customClass="text-2xl {isDarkTheme ? 'text-gray-200' : 'text-gray-800'} mb-10"
              />
            {/if}
            {#if sanitizedRightRegular.length > 0}
              <PortableTextContent
                value={sanitizedRightRegular}
                components={portableTextComponents}
                customClass="text-lg {isDarkTheme ? 'text-gray-300' : 'text-gray-700'}"
              />
            {/if}
          </div>
        </div>
      {/if}
    </div>
  </div>
</div>
