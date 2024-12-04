<script lang="ts">
  import type { TestimonialSectionData } from './Testimonials_gsap/types/testimonial.types';
  import Header from './Testimonials_gsap/components/Header.svelte';
  import TestimonialSlider from './Testimonials_gsap/components/TestimonialSlider.svelte';
  import { defaultTestimonialSection } from './Testimonials_gsap/types/testimonial.types';
  import { defaultNavigationConfig } from '$lib/types/navigation';

  export let data: TestimonialSectionData = defaultTestimonialSection;

  // Map animation and navigation settings to match global config
  $: animation = {
    slideDuration: data.animation?.slideDuration ?? defaultNavigationConfig.slideDuration,
    dragThreshold: data.animation?.dragThreshold ?? defaultNavigationConfig.dragThreshold,
    enabled: data.animation?.enabled ?? true
  };

  $: navigation = {
    showArrows: data.navigation?.showArrows ?? defaultNavigationConfig.showArrows,
    showDots: data.navigation?.showDots ?? defaultNavigationConfig.showDots,
    enableKeyboard: data.navigation?.enableKeyboard ?? defaultNavigationConfig.enableKeyboard,
    enableDrag: data.navigation?.enableDrag ?? defaultNavigationConfig.enableDrag
  };
</script>

<div class="w-full">
  <div class="max-w-xl lg:max-w-7xl mx-auto container">
{#if data.enabled && data.testimonials.length > 0}

      <Header header={data.header} />

    
    <TestimonialSlider
      testimonials={data.testimonials}
      {animation}
      {navigation}
    />
{/if}
</div>
</div>