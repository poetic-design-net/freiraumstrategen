<script lang="ts">
  import { onMount } from 'svelte';
  import { gsap } from 'gsap';
  import type { NavigationConfig } from '$lib/types/navigation';
  import { defaultNavigationConfig } from '$lib/types/navigation';
  import NavigationDots from './navigation/NavigationDots.svelte';
  import SliderControls from './navigation/SliderControls.svelte';

  export let items: any[] = [];
  export let config: NavigationConfig = defaultNavigationConfig;
  export let itemComponent: any;
  export let itemProps: Record<string, any> = {};

  let scrollContainer: HTMLElement;
  let wrapper: HTMLElement;
  let cards: HTMLElement[] = [];
  let currentIndex = 0;
  let isAnimating = false;

  // Ensure boolean values with defaults
  $: showArrows = config?.showArrows ?? defaultNavigationConfig.showArrows;
  $: showDots = config?.showDots ?? defaultNavigationConfig.showDots;

  function updateCardStyles(index: number) {
    cards.forEach((card, i) => {
      const distance = i - index;
      gsap.to(card, {
        scale: distance <= 1 ? 1 : 
              distance === 2 ? 0.95 : 
              distance === 3 ? 0.9 : 0.85,
        opacity: distance <= 1 ? 1 : 
                distance === 2 ? 0.8 : 
                distance === 3 ? 0.6 : 0.4,
        duration: 0.4,
        ease: "power2.inOut"
      });
    });
  }

  function handleScroll() {
    if (!scrollContainer || isAnimating) return;
    const scrollLeft = scrollContainer.scrollLeft;
    const cardWidth = cards[0]?.clientWidth || 0;
    const maxScroll = cardWidth * (items.length - 1);
    
    if (scrollLeft > maxScroll) {
      scrollContainer.scrollLeft = maxScroll;
      return;
    }
    
    const newIndex = Math.min(
      Math.max(0, Math.round(scrollLeft / cardWidth)),
      items.length - 1
    );
    
    if (newIndex !== currentIndex) {
      currentIndex = newIndex;
      updateCardStyles(newIndex);
    }
  }

  function scrollToIndex(index: number) {
    if (!scrollContainer || isAnimating) return;
    
    const maxIndex = items.length - 1;
    const targetIndex = Math.min(Math.max(0, index), maxIndex);
    
    isAnimating = true;
    const cardWidth = cards[0]?.clientWidth || 0;
    
    gsap.to(scrollContainer, {
      scrollLeft: targetIndex * cardWidth,
      duration: 0.6,
      ease: "power2.out",
      onStart: () => {
        currentIndex = targetIndex;
        updateCardStyles(targetIndex);
      },
      onComplete: () => {
        isAnimating = false;
      }
    });
  }

  function next() {
    if (currentIndex >= items.length - 1) return;
    scrollToIndex(currentIndex + 1);
  }

  function prev() {
    if (currentIndex <= 0) return;
    scrollToIndex(currentIndex - 1);
  }

  onMount(() => {
    if (!scrollContainer) return;
    
    // Wait for next tick to ensure DOM is ready
    setTimeout(() => {
      cards = Array.from(wrapper.children) as HTMLElement[];
      if (cards.length > 0) {
        updateCardStyles(0);
      }
    }, 0);

    scrollContainer.addEventListener('scroll', handleScroll);
    
    return () => {
      scrollContainer.removeEventListener('scroll', handleScroll);
    };
  });
</script>

<div class="relative w-full">
  {#if showArrows && items?.length > 1}
    <SliderControls
      onNext={next}
      onPrev={prev}
      isFirstSlide={currentIndex <= 0}
      isLastSlide={currentIndex >= items.length - 1}
    />
  {/if}

  <div class="relative overflow-x-hidden w-screen">
    <div class="ml-[-16px] ml-[calc(-50vw+50%)]">
      <div 
        bind:this={scrollContainer} 
        class="flex overflow-x-auto hide-scrollbar pl-4 pr-[100vw]"
      >
        <div class="flex" bind:this={wrapper}>
          {#each items as item, i}
            <div 
              class="w-[85vw] sm:w-[45vw] md:w-[30vw] lg:w-[calc(100vw/3)] flex-shrink-0 pr-6"
            >
              <svelte:component this={itemComponent} {item} {...itemProps} />
            </div>
          {/each}
        </div>
      </div>
    </div>
  </div>

  {#if showDots && items?.length > 1}
    <NavigationDots
      totalSlides={items?.length ?? 0}
      {currentIndex}
      onDotClick={scrollToIndex}
      {isAnimating}
    />
  {/if}
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
