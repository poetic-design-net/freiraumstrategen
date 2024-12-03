<script lang="ts">
  import { onMount } from 'svelte';
  import { gsap } from 'gsap';
  import type { DragState, NavigationConfig } from '$lib/types/navigation';
  import { defaultNavigationConfig } from '$lib/types/navigation';
  import { 
    initializeDragState,
    isMobileDevice
  } from '$lib/utils/navigation';
  import { 
    initializeSlides,
    createSlideAnimation,
    updateDragPosition,
    updateAdjacentSlides,
    resetDragPosition,
    resetAdjacentSlides,
    updateDragCursor
  } from '$lib/utils/slideAnimations';
  import NavigationDots from './navigation/NavigationDots.svelte';
  import SliderControls from './navigation/SliderControls.svelte';

  export let items: any[] = [];
  export let config: NavigationConfig = defaultNavigationConfig;
  export let itemComponent: any;
  export let itemProps: Record<string, any> = {};

  let currentIndex = 0;
  let slider: HTMLElement;
  let slides: HTMLElement[] = [];
  let isAnimating = false;
  let maxHeight = 0;
  let startX: number | null = null;
  let isDragging = false;
  let dragStartX: number;
  let currentDragX = 0;
  let isMobile = false;

  // Ensure boolean values with defaults
  $: showArrows = config?.showArrows ?? defaultNavigationConfig.showArrows;
  $: showDots = config?.showDots ?? defaultNavigationConfig.showDots;
  $: enableKeyboard = config?.enableKeyboard ?? defaultNavigationConfig.enableKeyboard;
  $: enableDrag = config?.enableDrag ?? defaultNavigationConfig.enableDrag;

  onMount(() => {
    if (!slider) return;
    
    try {
      // Get all slides
      slides = Array.from(slider.children) as HTMLElement[];
      
      // Calculate max height
      maxHeight = Math.max(...slides.map(slide => slide.offsetHeight));
      
      // Initialize slides with GSAP
      initializeSlides(slider, slides, maxHeight);

      // Optional: Resize Observer for dynamic height adjustment
      const resizeObserver = new ResizeObserver(() => {
        maxHeight = Math.max(...slides.map(slide => slide.offsetHeight));
        gsap.set(slider, { height: maxHeight });
      });

      slides.forEach(slide => resizeObserver.observe(slide));

      // Check for touch device
      isMobile = isMobileDevice();

      return () => resizeObserver.disconnect();
    } catch (error) {
      console.error('Error initializing slider:', error);
    }
  });

  function goToSlide(index: number) {
    if (isAnimating || index === currentIndex) return;
    isAnimating = true;

    const currentSlide = slides[currentIndex];
    const nextSlide = slides[index];
    const direction = index > currentIndex ? 1 : -1;

    // Update index immediately
    currentIndex = index;

    // Create and play animation
    const tl = createSlideAnimation(currentSlide, nextSlide, direction, config);
    tl.eventCallback('onComplete', () => {
      isAnimating = false;
    });
  }

  function next() {
    if (currentIndex >= items.length - 1 || isAnimating) return;
    goToSlide(currentIndex + 1);
  }

  function prev() {
    if (currentIndex <= 0 || isAnimating) return;
    goToSlide(currentIndex - 1);
  }

  function handleTouchStart(e: TouchEvent) {
    if (!enableDrag) return;
    startX = e.touches[0].clientX;
  }

  function handleTouchEnd(e: TouchEvent) {
    if (!enableDrag || !startX) return;
    
    const deltaX = startX - e.changedTouches[0].clientX;
    
    if (Math.abs(deltaX) > (config.dragThreshold || 20)) {
      if (deltaX > 0) {
        next();
      } else {
        prev();
      }
    }
    
    startX = null;
  }

  function handleMouseDown(e: MouseEvent) {
    if (isMobile || !enableDrag) return;
    isDragging = true;
    dragStartX = e.clientX;
    currentDragX = 0;
    
    updateDragCursor(slides[currentIndex], true);
  }

  function handleMouseMove(e: MouseEvent) {
    if (!isDragging || !enableDrag) return;
    
    const deltaX = e.clientX - dragStartX;
    currentDragX = deltaX;

    updateDragPosition(slides[currentIndex], deltaX);
    updateAdjacentSlides(slides, currentIndex, deltaX);
  }

  function handleMouseUp() {
    if (!isDragging || !enableDrag) return;
    isDragging = false;

    const threshold = window.innerWidth * 0.15;

    if (Math.abs(currentDragX) > threshold) {
      if (currentDragX < 0 && currentIndex < slides.length - 1) {
        goToSlide(currentIndex + 1);
      } else if (currentDragX > 0 && currentIndex > 0) {
        goToSlide(currentIndex - 1);
      } else {
        resetDragPosition(slides[currentIndex], config);
      }
    } else {
      resetDragPosition(slides[currentIndex], config);
    }

    resetAdjacentSlides(slides, currentIndex);
    updateDragCursor(slides[currentIndex], false);
    currentDragX = 0;
  }

  function handleWheel(e: WheelEvent) {
    if (isMobile || !enableDrag) return;
    
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
      e.preventDefault();
      
      if (isAnimating) return;
      
      if (e.deltaX > 30) {
        next();
      } else if (e.deltaX < -30) {
        prev();
      }
    }
  }

  function handleKeydown(e: KeyboardEvent) {
    if (!enableKeyboard || isAnimating) return;
    
    switch(e.key) {
      case 'ArrowLeft':
        prev();
        break;
      case 'ArrowRight':
        next();
        break;
    }
  }
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

  <div class="relative overflow-hidden">
    <div 
      bind:this={slider}
      class="relative w-full transition-height duration-300 touch-pan-x {!isMobile && enableDrag && 'hover:cursor-grab active:cursor-grabbing'}"
      style="min-height: {maxHeight}px"
      on:touchstart={handleTouchStart}
      on:touchend={handleTouchEnd}
      on:mousedown={handleMouseDown}
      on:mousemove={handleMouseMove}
      on:mouseup={handleMouseUp}
      on:mouseleave={handleMouseUp}
      on:wheel={handleWheel}
      on:keydown={handleKeydown}
      tabindex="0"
    >
      {#each items as item, i (item._id || i)}
        <div class="absolute top-0 left-0 w-full">
          <svelte:component this={itemComponent} {item} {...itemProps} />
        </div>
      {/each}
    </div>
  </div>

  {#if showDots && items?.length > 1}
    <NavigationDots
      totalSlides={items?.length ?? 0}
      {currentIndex}
      onDotClick={goToSlide}
      {isAnimating}
    />
  {/if}
</div>

<style>
  /* Cursor Styles */
  :global(.hover\:cursor-grab:hover) {
    cursor: grab;
  }
  
  :global(.active\:cursor-grabbing:active) {
    cursor: grabbing;
  }

  /* Touch Handling */
  :global(.touch-pan-x) {
    touch-action: pan-x pan-y;
  }
</style>
