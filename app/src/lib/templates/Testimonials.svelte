<script lang="ts">
  import { fly } from 'svelte/transition';
  import { cubicOut } from 'svelte/easing';
  import { onMount } from 'svelte';

  export let testimonials;
  let currentIndex = 0;
  let container: HTMLElement;
  let cardWidth: number;
  let visibleCards: number;

  function updateDimensions() {
    if (container) {
      cardWidth = container.firstElementChild?.clientWidth || 0;
      visibleCards = Math.floor(container.clientWidth / cardWidth);
    }
  }

  function scrollToIndex(index: number) {
    if (container) {
      updateDimensions();
      const maxIndex = Math.max(0, testimonials.length - visibleCards);
      const targetIndex = Math.min(Math.max(0, index), maxIndex);
      const targetScroll = targetIndex * cardWidth;

      container.scrollTo({
        left: targetScroll,
        behavior: 'smooth'
      });

      currentIndex = targetIndex;
    }
  }

  onMount(() => {
    if (container) {
      updateDimensions();
      window.addEventListener('resize', updateDimensions);

      return () => {
        window.removeEventListener('resize', updateDimensions);
      };
    }
  });
</script>

<div class="relative container px-4 mx-auto py-16">
  <div class="max-w-7xl mx-auto">
    <div class="text-center mb-16">
      <span class="inline-block py-1 px-3 mb-4 text-xs font-medium text-primary-900 bg-primary-50 rounded-full">Testimonials</span>
      <h2 class="font-heading text-4xl md:text-5xl font-medium text-gray-900 mb-4">
        <span>Was sagen </span>
        <span class="font-thin">die Teilnehmer</span>
      </h2>
    </div>

    <div class="relative overflow-x-hidden w-screen">
      <div class="ml-[-16px] ml-[calc(-50vw+50%)]">
        <div 
          bind:this={container} 
          class="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar pl-4 pr-[100vw]"
        >
          {#if testimonials && testimonials.length > 0}
            {#each testimonials as testimonial (testimonial._id)}
              <div class="w-[85vw] md:w-[70vw] flex-shrink-0 pr-6 snap-start">
                <div 
                  in:fly="{{ y: 50, duration: 800, delay: 200, easing: cubicOut }}" 
                  class="h-full p-8 md:p-12 bg-white rounded-xl border border-gray-100">
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
          {:else}
            <p>Keine Testimonials verfügbar.</p>
          {/if}
        </div>
      </div>
    </div>

    <div class="flex items-center justify-center pt-8">
      {#each testimonials as _, i}
        <button 
          on:click={() => scrollToIndex(i)} 
          class="mx-1 w-2 h-2 rounded-full transition-all duration-300 {i === currentIndex ? 'bg-primary-900 w-4' : 'bg-gray-300 hover:bg-primary-200'}"
          aria-label="Gehe zu Slide {i + 1}"
        ></button>
      {/each}
    </div>
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
