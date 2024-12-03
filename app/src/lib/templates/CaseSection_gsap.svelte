<script lang="ts">
  import type { CaseItem, CaseSectionData } from '$lib/types/caseSection';
  import Header from './CaseSection_gsap/Header.svelte';
  import Card from './CaseSection_gsap/Card.svelte';
  import ScrollSlider from '$lib/components/ScrollSlider.svelte';
  import { defaultNavigationConfig } from '$lib/types/navigation';

  export let data: CaseSectionData;

  // Combine selected pages and posts into items array, with null check
  $: items = [
    ...(data.selectedPages || []),
    ...(data.selectedPosts || [])
  ].filter(item => item); // Filter out any null/undefined items

  // Navigation config with animation duration
  $: config = {
    ...defaultNavigationConfig,
    showArrows: true,
    showDots: true,
    enableKeyboard: true,
    enableDrag: true,
    slideDuration: data.animation?.duration ? data.animation.duration * 1000 : 400,
    dragThreshold: 15
  };

  // Item props with display settings
  $: itemProps = {
    showHeroImage: data.displaySettings?.showHeroImage ?? true
  };
</script>

{#if data.enabled !== false && items.length > 0}
  <div class="relative">

    
    <Header 
      badge={data.badge || ''}
      title={data.title || ''}
      subtitle={data.subtitle || ''}
      description={data.description || ''}
    />

    <div class="container px-4 mx-auto relative z-10">
      <ScrollSlider
        {items}
        {config}
        itemComponent={Card}
        {itemProps}
      />
    </div>
  </div>
{/if}
