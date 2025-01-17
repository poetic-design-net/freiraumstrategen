<script lang="ts">
  import type { TestimonialSectionData } from './Testimonials_gsap/types/testimonial.types';
  import { defaultTestimonialSection } from './Testimonials_gsap/types/testimonial.types';
  import { fly } from 'svelte/transition';
  import { cubicOut } from 'svelte/easing';
  import { onMount } from 'svelte';
  import NavigationDots from '$lib/components/navigation/NavigationDots.svelte';
  import SliderControls from '$lib/components/navigation/SliderControls.svelte';

  export let data: TestimonialSectionData = defaultTestimonialSection;
  let currentIndex = 0;
  let container: HTMLElement;
  let cardWidth: number;
  let visibleCards: number;
  let isAnimating = false;

  function updateDimensions() {
    if (container) {
      cardWidth = container.firstElementChild?.clientWidth || 0;
      visibleCards = Math.floor(container.clientWidth / cardWidth);
    }
  }

  function scrollToIndex(index: number) {
    if (container) {
      isAnimating = true;
      updateDimensions();
      const maxIndex = Math.max(0, data.testimonials.length - visibleCards);
      const targetIndex = Math.min(Math.max(0, index), maxIndex);
      const targetScroll = targetIndex * cardWidth;

      container.scrollTo({
        left: targetScroll,
        behavior: 'smooth'
      });

      currentIndex = targetIndex;
      
      // Reset isAnimating after animation completes
      setTimeout(() => {
        isAnimating = false;
      }, 500);
    }
  }

  function handleScroll() {
    if (container) {
      const scrollPosition = container.scrollLeft;
      const newIndex = Math.round(scrollPosition / cardWidth);
      if (newIndex !== currentIndex) {
        currentIndex = newIndex;
      }
      // Reset isAnimating flag when manual scroll is detected
      isAnimating = false;
    }
  }

  function handleNext() {
    if (!isAnimating) {
      scrollToIndex(currentIndex + 1);
    }
  }

  function handlePrev() {
    if (!isAnimating) {
      scrollToIndex(currentIndex - 1);
    }
  }

  onMount(() => {
    if (container) {
      updateDimensions();
      window.addEventListener('resize', updateDimensions);
      container.addEventListener('scroll', handleScroll);

      return () => {
        window.removeEventListener('resize', updateDimensions);
        container.removeEventListener('scroll', handleScroll);
      };
    }
  });

  $: isFirstSlide = currentIndex === 0;
  $: isLastSlide = currentIndex === Math.max(0, data.testimonials.length - visibleCards);
</script>

<div class="relative container px-4 mx-auto py-8">
  
  <div class="mx-auto">
    {#if data.enabled && data.testimonials.length > 0}
      {#if data.header}
        <div class="text-center">
          {#if data.header.badge}
            <span class="inline-block py-1 px-3 mb-4 text-xs font-medium text-primary-900 bg-primary-50 rounded-full">{data.header.badge}</span>
          {/if}
          {#if data.header.heading}
            <h2 class="font-heading text-4xl md:text-5xl font-medium text-gray-900 mb-4">
              <span>{data.header.heading.regular}</span>
              <span class="font-thin">{data.header.heading.thin}</span>
            </h2>
          {/if}
          
        </div>
      {/if}


      <SliderControls
        onNext={handleNext}
        onPrev={handlePrev}
        {isFirstSlide}
        {isLastSlide}
      />
      <div class="relative overflow-x-hidden w-screen">
        <div class="ml-[-16px] ml-[calc(-50vw+50%)]">
          <div 
            bind:this={container} 
            class="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar pl-4 pr-[100vw]"
          >
            {#each data.testimonials as testimonial (testimonial._id)}
              <div class="w-[85vw] md:w-[70vw] flex-shrink-0 pr-6 snap-start">
                <div 
                  in:fly="{{ y: 50, duration: 800, delay: 200, easing: cubicOut }}" 
                  class="h-full p-8 md:p-12 bg-white rounded-xl border border-gray-100"
                >
                  <div class="flex flex-col h-full">
                    <div class="mb-6">
                      <svg class="w-8 h-8 text-primary-900" fill="currentColor" viewBox="0 0 32 32">
                        <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z"/>
                      </svg>
                    </div>
                    <p class="text-xl md:text-2xl text-gray-600 mb-8 flex-grow font-light">{testimonial.content}</p>
                    <div class="border-t pt-6">
                      <p class="font-medium text-gray-900 mb-1">{testimonial.name}</p>
                      <p class="text-sm text-gray-500">{testimonial.position}</p>
                    </div>
                  </div>
                </div>
              </div>
            {/each}
          </div>
        </div>
      </div>

      <NavigationDots
        totalSlides={data.testimonials.length}
        {currentIndex}
        onDotClick={scrollToIndex}
        {isAnimating}
      />
    {/if}
  </div>
</div>

<style>
  .hide-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  .hide-scrollbar::-webkit-scrollbar {
    display: none;
  }
</style>
