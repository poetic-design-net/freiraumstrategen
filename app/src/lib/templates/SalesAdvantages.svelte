<script lang="ts">
  import { slide } from 'svelte/transition'
  import type { SalesAdvantagesSection } from '$lib/types/salesAdvantagesSection'
  import type { PortableTextComponents } from '@portabletext/svelte'
  import Icon from '$lib/components/icons/Icon.svelte';
  import CleanText from '$lib/components/CleanText.svelte';
  import PortableTextContent from '$lib/components/PortableTextContent.svelte';
  import CustomListItem from '$lib/components/CustomListItem.svelte';
  import { getThemeStyles } from '$lib/utils/sections'

  export let data: SalesAdvantagesSection

  // Get theme-based styles for content
  const theme = getThemeStyles(data.styles?.theme)

  let expandedAdvantage: number | null = null

  function toggleAdvantage(index: number) {
    expandedAdvantage = expandedAdvantage === index ? null : index
  }

  const portableTextComponents: PortableTextComponents = {
    listItem: {
      bullet: CustomListItem,
      normal: CustomListItem,
    }
  };
</script>

<div class="relative z-10 container px-4 mx-auto">
  <div class="text-center mb-20 space-y-4 max-w-3xl mx-auto">
    {#if data.badge}
      <CleanText 
        text={data.badge}
        className="inline-block font-medium uppercase {data.styles?.theme === 'light-gray' ? 'text-primary' : 'text-green'}"
      />
    {/if}
    <CleanText
      text={data.title}
      tag="h2"
      className="{theme.headings} text-3xl sm:text-5xl font-bold"
    />
    {#if data.subtitle}
      <CleanText 
        text={data.subtitle}
        tag="p"
        className="{theme.text} font-light pt-4 text-2xl max-w-4xl mx-auto"
      />
    {/if}
  </div>

  <!-- Advantages Grid -->
  <div class="grid max-w-6xl justify-center text-center m-auto gap-y-8 gap-x-32" class:md:grid-cols-2={data.advantages.length >= 2} class:lg:grid-cols-3={data.advantages.length >= 5}>
    {#each data.advantages as advantage, index}
      <button 
        class="h-full w-full group block"
        on:click={() => advantage.fullText && toggleAdvantage(index)}
      >
        <div class="h-full p-8 {theme.background} transition-all duration-300 text-center cursor-pointer
          {data.styles?.theme === 'light-gray'
            ? 'border-b-[6px] border-b-transparent hover:bg-white hover:border-b-green hover:rounded-xl hover:shadow-even'
            : 'hover:shadow-even hover:rounded-lg'
          }">
          <div class="h-full flex flex-col">
            <div class="flex flex-col items-center justify-center gap-4 mb-4">
              <Icon
                name={advantage.icon}
                className="w-16 h-16 mb-4 {data.styles?.theme === 'light-gray' ? 'text-black' : 'text-white'}"
                strokeWidth={1.2}
              />
              <CleanText
                text={advantage.title}
                tag="h3"
                className="{theme.headings} text-2xl font-medium group-hover:text-green"
              />
            </div>
            <div class="{theme.text} relative flex-1">
              <div class="overflow-hidden h-full flex flex-col">
                {#if expandedAdvantage === index}
                  <div
                    class="py-2"
                    transition:slide|local={{ duration: 300 }}
                  >
                    <div class="[&_.page-content_:last-child]:mb-0">
                      <PortableTextContent
                        value={advantage.fullText}
                        components={portableTextComponents}
                      />
                    </div>
                  </div>
                {:else if advantage.shortText}
                  <div
                    class="py-2"
                    transition:slide|local={{ duration: 300 }}
                  >
                    <CleanText
                      text={advantage.shortText}
                      tag="p"
                      className="mb-0"
                    />
                  </div>
                {/if}
                {#if advantage.fullText}
                  <div class="mt-auto pt-4">
                    <span
                      class="inline-block text-sm border rounded-full px-5 py-1
                      {data.styles?.theme === 'light-gray'
                        ? 'group-hover:text-green group-hover:border-green'
                        : 'group-hover:text-white group-hover:border-green group-hover:bg-green'
                      }"
                    >
                      {expandedAdvantage === index ? "weniger" : "mehr"}
                    </span>
                  </div>
                {/if}
              </div>
            </div>
          </div>
        </div>
      </button>
    {/each}
  </div>

  <!-- Bottom CTA -->
  {#if data.ctaButton}
    <div class="mt-16 text-center">
      <a 
        href={data.ctaButton.link}
        class="inline-block py-1.75 px-8 text-base group rounded-full uppercase font-normal transition-all duration-300 bg-green text-white hover:bg-white hover:text-green"
      >
        {data.ctaButton.text}
      </a>
    </div>
  {/if}
</div>

<style>
  :global(.shadow-custom) {
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.15);
  }
</style>
