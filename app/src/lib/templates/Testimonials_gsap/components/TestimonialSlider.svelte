<script lang="ts">
  import type { TestimonialData, TestimonialAnimationConfig, TestimonialNavigationConfig } from '../types/testimonial.types';
  import TestimonialCard from './TestimonialCard.svelte';
  import Slider from '$lib/components/Slider.svelte';
  import { defaultNavigationConfig } from '$lib/types/navigation';

  export let testimonials: TestimonialData[];
  export let animation: TestimonialAnimationConfig;
  export let navigation: TestimonialNavigationConfig;

  // Map our config to match the global navigation config
  $: config = {
    ...defaultNavigationConfig,
    slideDuration: animation?.slideDuration ?? defaultNavigationConfig.slideDuration,
    dragThreshold: animation?.dragThreshold ?? defaultNavigationConfig.dragThreshold,
    showArrows: navigation?.showArrows ?? defaultNavigationConfig.showArrows,
    showDots: navigation?.showDots ?? defaultNavigationConfig.showDots,
    enableKeyboard: navigation?.enableKeyboard ?? defaultNavigationConfig.enableKeyboard,
    enableDrag: navigation?.enableDrag ?? defaultNavigationConfig.enableDrag
  };
</script>

<div class="testimonial-slider">
  <Slider 
    items={testimonials}
    {config}
    itemComponent={TestimonialCard}
  />
</div>

<style>
  .testimonial-slider {
    width: 100%;
    max-width: 100%;
    margin: 0 auto;
  }

</style>
