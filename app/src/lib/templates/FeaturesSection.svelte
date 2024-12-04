<script lang="ts">
  import { onMount } from 'svelte';
  import { fade, fly } from 'svelte/transition';
  import Button from '$lib/components/Button.svelte';
  import YouTubePlayer from '$lib/components/YouTubePlayer.svelte';
  import Icon from '$lib/components/icons/Icon.svelte';
  import type { IconName } from '$lib/components/icons';
  import type { FeatureSectionData, Feature, FeatureIcon } from '$lib/types/featureSection';
  import { cleanText } from '$lib/utils/textCleaner';

  export let data: FeatureSectionData;
  let visible = false;

  onMount(() => {
    visible = true;
  });

  function getHoverBoxPosition(event: MouseEvent & { currentTarget: HTMLElement }) {
    const target = event.currentTarget;
    const rect = target.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const scrollY = window.scrollY;
    
    const elementTopPosition = rect.top + scrollY;
    const elementBottomPosition = rect.bottom + scrollY;
    const documentHeight = document.documentElement.scrollHeight;
    
    const spaceAbove = elementTopPosition;
    const spaceBelow = documentHeight - elementBottomPosition;
    
    const hoverBox = target.querySelector('.hover-box') as HTMLElement | null;
    if (hoverBox) {
      if (spaceAbove < 300) {
        hoverBox.style.cssText = `
          top: 100%;
          bottom: auto;
          margin-top: 1rem;
          margin-bottom: 0;
        `;
      } else {
        hoverBox.style.cssText = `
          bottom: 100%;
          top: auto;
          margin-bottom: 1rem;
          margin-top: 0;
        `;
      }
    }
  }

  const getIconName = (iconType: FeatureIcon): IconName => {
    switch (iconType) {
      case 'education':
        return 'education';
      case 'structure':
        return 'structure';
      case 'strategy':
        return 'strategy';
      case 'liveTrading':
        return 'live-trading';
      case 'community':
        return 'community';
      case 'riskManagement':
        return 'risk-management';
      default:
        return 'education';
    }
  };

  $: isVideoLayout = data.layout === 'withVideo';
  $: featuresFirstHalf = isVideoLayout ? data.features.slice(0, 3) : data.features.slice(0, Math.ceil(data.features.length / 2));
  $: featuresSecondHalf = isVideoLayout ? data.features.slice(3) : data.features.slice(Math.ceil(data.features.length / 2));
</script>

<div class="max-w-7xl mx-auto text-center">
  {#if data.eyebrow}
    <span class="inline-block py-1 px-3 mb-4 text-xs font-medium text-primary-900 bg-primary-50 rounded-full shadow">{data.eyebrow}</span>
  {/if}
  <h1 class="font-heading text-5xl xs:text-6xl md:text-7xl font-medium text-gray-900 mb-6">
    {#if data.title}<span>{cleanText(data.title)}</span>{/if}
    {#if data.subtitle}<span class="font-thin block">{cleanText(data.subtitle)}</span>{/if}
  </h1>
  <p class="text-gray-500 text-sm mb-24 flex items-center justify-center gap-2">
    <Icon name="info" size={16} />
    Für mehr Details bewegen Sie die Maus über die einzelnen Vorteile
  </p>
</div>

<div class="max-full container mx-auto">
  <div class="flex flex-wrap -mx-4 items-center">
    <div class="{isVideoLayout ? 'w-full lg:w-1/5' : 'w-full lg:w-1/2'} px-4 lg:pb-10 mb-16 lg:mb-0">
      <div class="mx-auto {isVideoLayout ? 'max-w-sm' : 'max-w-lg'}">
        {#each featuresFirstHalf as feature}
          <div class="flex items-center pb-12 mb-12 border-b border-gray-100 group relative">
            {#if feature === data.features[0]}
              <div class="absolute -right-2 -top-6 transform -translate-y-1/2 w-2 h-2">
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                <span class="relative inline-flex rounded-full h-2 w-2 bg-orange-600"></span>
              </div>
            {/if}
            <div class="flex flex-shrink-0 w-16 h-16 mr-6 items-center text-primary-700 justify-center bg-gray-100 rounded-full">
              <Icon name={getIconName(feature.icon)} size={20} />
            </div>
            <div>
              <h3 class="text-xl font-medium {isVideoLayout ? 'max-w-[160px]' : 'w-full'} leading-tight">{feature.title}</h3>
              <span class="text-sm text-gray-500 font-light mt-1 block">{feature.subtitle}</span>
            </div>

            {#if feature.description && feature.description.length > 0}
              <div 
                role="tooltip"
                class="hover-box absolute bg-white rounded-xl shadow-2xl p-6 opacity-0 invisible 
                       group-hover:opacity-100 group-hover:visible transition-all duration-300 z-[60] {isVideoLayout ? 'w-80' : 'w-full'}"
                on:mouseenter={getHoverBoxPosition}
                on:mousemove={getHoverBoxPosition}
              >
                <div class="relative">
                  <div class="flex items-center gap-3 mb-4">
                    <div class="flex-shrink-0">
                      <Icon name={getIconName(feature.icon)} size={24} className="text-primary-700" />
                    </div>
                    <h4 class="text-lg font-semibold text-gray-900">{cleanText(feature.title)}</h4>
                  </div>
                  <p class="text-gray-600 text-sm leading-relaxed">
                    {cleanText(feature.subtitle_hover)}
                  </p>
                  <ul class="mt-3 space-y-2">
                    {#each feature.description as item}
                      <li class="flex items-center gap-2 text-sm text-gray-600">
                        <div class="flex-shrink-0">
                          <Icon name="check" size={16} className="text-primary-600" />
                        </div>
                        <span class="leading-tight">{cleanText(item)}</span>
                      </li>
                    {/each}
                  </ul>
                  {#if feature.link}
                    <div class="mt-4">
                      <Button 
                        size="sm" 
                        variant="orange" 
                        href={feature.link.href} 
                        icon="arrow-right" 
                        text={cleanText(feature.link.text)}
                      />
                    </div>
                  {/if}
                </div>
              </div>
            {/if}
          </div>
        {/each}
      </div>
    </div>

    {#if isVideoLayout && data.videoId}
      <div class="w-full lg:w-3/5 px-16 mb-16 lg:mb-0">
        <div class="max-w-4xl mx-auto">  
          <YouTubePlayer videoId={data.videoId} />
        </div>  
      </div>
    {/if}

    <div class="{isVideoLayout ? 'w-full lg:w-1/5' : 'w-full lg:w-1/2'} px-4 lg:pb-10">
      <div class="mx-auto {isVideoLayout ? 'max-w-sm' : 'max-w-lg'}">
        {#each featuresSecondHalf as feature}
          <div class="flex items-center pb-12 mb-12 border-b border-gray-100 group relative">
            <div class="flex flex-shrink-0 w-16 h-16 mr-6 items-center justify-center text-primary-700 bg-gray-100 rounded-full">
              <Icon name={getIconName(feature.icon)} size={20} />
            </div>
            <div>
              <h3 class="text-xl font-medium {isVideoLayout ? 'max-w-[160px]' : 'w-full'} leading-tight">{cleanText(feature.title)}</h3>
              <span class="text-sm text-gray-500 font-light mt-1 block">{cleanText(feature.subtitle)}</span>
            </div>

            {#if feature.description && feature.description.length > 0}
              <div 
                role="tooltip"
                class="hover-box absolute bg-white rounded-xl shadow-2xl p-6 opacity-0 invisible 
                       group-hover:opacity-100 group-hover:visible transition-all duration-300 z-[60] {isVideoLayout ? 'w-80' : 'w-full'}"
                on:mouseenter={getHoverBoxPosition}
                on:mousemove={getHoverBoxPosition}
              >
                <div class="relative">
                  <div class="flex items-center gap-3 mb-4">
                    <div class="flex-shrink-0">
                      <Icon name={getIconName(feature.icon)} size={24} className="text-primary-700" />
                    </div>
                    <h4 class="text-lg font-semibold text-gray-900">{cleanText(feature.title)}</h4>
                  </div>
                  <p class="text-gray-600 text-sm leading-relaxed">
                    {cleanText(feature.subtitle_hover)}
                  </p>
                  <ul class="mt-3 space-y-2">
                    {#each feature.description as item}
                      <li class="flex items-center gap-2 text-sm text-gray-600">
                        <div class="flex-shrink-0">
                          <Icon name="check" size={16} className="text-primary-600" />
                        </div>
                        <span class="leading-tight">{cleanText(item)}</span>
                      </li>
                    {/each}
                  </ul>
                  {#if feature.link}
                    <div class="mt-4">
                      <Button 
                        size="sm" 
                        variant="orange" 
                        href={feature.link.href} 
                        icon="arrow-right" 
                        text={cleanText(feature.link.text)}
                      />
                    </div>
                  {/if}
                </div>
              </div>
            {/if}
          </div>
        {/each}
      </div>
    </div>
  </div>
</div>

<style>
  .hover-box {
    position: absolute;
    left: 0;
    transition: all 0.3s ease;
  }
</style>
