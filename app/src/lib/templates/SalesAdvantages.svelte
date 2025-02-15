<script lang="ts">
  import { slide } from 'svelte/transition'
  import type { SalesAdvantagesSection } from '$lib/types/salesAdvantagesSection'
  import type { PortableTextComponents } from '@portabletext/svelte'
  import Icon from '$lib/components/icons/Icon.svelte';
  import CleanText from '$lib/components/CleanText.svelte';
  import Button from '$lib/components/Button.svelte';
  import PortableTextContent from '$lib/components/PortableTextContent.svelte';
  import CustomListItem from '$lib/components/CustomListItem.svelte';
  import { cleanText } from '$lib/utils/textCleaner';
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

<!-- Content -->
<div class="relative z-10 container px-4 mx-auto ">
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
      className="{theme.headings} text-5xl font-bold"
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
      <div class="h-full">
          <div class="h-full p-8 {theme.background} transition-all duration-300 hover:{theme.background}/90 text-center">
            <!-- Content -->
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
                  className="{theme.headings} text-2xl font-medium"
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
                     <Button
                       variant="outline"
                       size="sm"
                       on:click={() => toggleAdvantage(index)}
                       text={expandedAdvantage === index ? "weniger" : "mehr"}
                     />
                    </div>
                  {/if}
                </div>
              </div>
            </div>
          </div>
      </div>
    {/each}
  </div>

  <!-- Bottom CTA -->
  {#if data.ctaButton}
    <div class="mt-16 text-center">
      <Button 
        text={data.ctaButton.text}
        href={data.ctaButton.link}
        size="md"
        variant="green"
      />
    </div>
  {/if}
</div>

<style>
  button {
    -webkit-tap-highlight-color: transparent;
  }
</style>
