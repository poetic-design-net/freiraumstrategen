<script lang="ts">
  import SanityImage from '$lib/components/SanityImage.svelte';
  import { cleanString } from '$lib/utils/stringUtils';
  import type { CaseItem } from '$lib/types/caseSection';
  import type { SanityImage as SanityImageType } from '$lib/types/heroSection';

  export let item: CaseItem;
  export let showHeroImage: boolean = true;

  function getImage(): SanityImageType | null {
    if (!item) return null;

    if (item._type === 'post') {
      return item.mainImage || null;
    } else {
      if (item.hero?.backgroundImage) {
        return item.hero.backgroundImage;
      }

      const sections = item.sections as unknown as { backgroundImage?: SanityImageType };
      if (sections?.backgroundImage) {
        return sections.backgroundImage;
      }

      return null;
    }
  }

  function getDescription(): string | undefined {
    if (!item) return undefined;

    if (item._type === 'post') {
      return item.excerpt;
    } else {
      return item.description;
    }
  }

  function getUrl(): string {
    if (!item?.slug?.current) return '/';

    if (item._type === 'post') {
      return `/post/${item.slug.current}`;
    } else {
      return `/${item.slug.current}`;
    }
  }

  $: image = getImage();
  $: description = getDescription();
  $: url = getUrl();
</script>

{#if item}
  <a href={url} class="block h-full pb-4">
    <div class="bg-white rounded-lg overflow-hidden h-full flex flex-col hover:shadow-sm transition-all duration-200">
      {#if showHeroImage && image}
        <div class="relative overflow-hidden"> 
          <SanityImage 
            value={image}
            customClass="aspect-[16/9] h-full w-full object-cover rounded-lg" 
          />
        </div>
      {/if}
      <div class="p-6 flex flex-col flex-grow">
        <h3 class="text-2xl font-medium mb-3">{cleanString(item?.title || '')}</h3>
        {#if description}
          <p class="text-gray-600 mb-5 line-clamp-3">{cleanString(description)}</p>
        {/if}
        <div class="mt-auto">
          <span class="inline-flex items-center justify-center px-4 py-2 text-sm font-regular text-primary-900 rounded-full border border-gray-100 hover:border-primary-900 hover:bg-primary-900 hover:text-white transition duration-200">
            <span class="mr-2">Mehr erfahren</span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="size-5">
              <path fill-rule="evenodd" d="M5.22 14.78a.75.75 0 0 0 1.06 0l7.22-7.22v5.69a.75.75 0 0 0 1.5 0v-7.5a.75.75 0 0 0-.75-.75h-7.5a.75.75 0 0 0 0 1.5h5.69l-7.22 7.22a.75.75 0 0 0 0 1.06Z" clip-rule="evenodd" />
            </svg>
          </span>
        </div>
      </div>
    </div>
  </a>
{:else}
  <div class="bg-white rounded-lg p-6 h-full flex items-center justify-center text-gray-500">
    No content available
  </div>
{/if}
