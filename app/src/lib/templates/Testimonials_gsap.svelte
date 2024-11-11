<script lang="ts">
  import { onMount } from 'svelte';
  import { gsap } from 'gsap';
  import { sanitizeText } from '$lib/utils';
  import { browser } from '$app/environment';
  
  export let testimonials;
  let currentIndex = 0;
  let slider: HTMLElement;
  let slides: HTMLElement[];
  let isAnimating = false;
  let maxHeight = 0;
  let startY: number;
  let isDragging = false;
  let dragStartX: number;
  let currentDragX = 0;
  let isMobile = false;

  onMount(() => {
    slides = Array.from(slider.children) as HTMLElement[];
    
    // Berechne die maximale Höhe
    maxHeight = Math.max(...slides.map(slide => slide.offsetHeight));
    
    // Setze die Höhe des Containers
    gsap.set(slider, {
      height: maxHeight
    });
    
    // Initial Setup für Slides
    gsap.set(slides, {
      position: 'absolute',
      opacity: 0,
      scale: 0.8,
      x: '100%',
      width: '100%'
    });
    
    gsap.set(slides[0], {
      opacity: 1,
      scale: 1,
      x: 0
    });

    // Optional: Resize Observer für dynamische Höhenanpassung
    const resizeObserver = new ResizeObserver(() => {
      maxHeight = Math.max(...slides.map(slide => slide.offsetHeight));
      gsap.set(slider, { height: maxHeight });
    });

    slides.forEach(slide => resizeObserver.observe(slide));

    // Check für Touch Device
    if (browser) {
      isMobile = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    }

    return () => resizeObserver.disconnect();
  });

  function goToSlide(index: number) {
    if (isAnimating || index === currentIndex) return;
    isAnimating = true;

    const currentSlide = slides[currentIndex];
    const nextSlide = slides[index];
    const direction = index > currentIndex ? 1 : -1;

    // Timeline für smooth transitions
    const tl = gsap.timeline({
      onComplete: () => {
        currentIndex = index;
        isAnimating = false;
      }
    });

    tl.set(nextSlide, { x: `${100 * direction}%`, opacity: 0, scale: 0.8 })
      .to(currentSlide, {
        x: `${-100 * direction}%`,
        opacity: 0,
        scale: 0.8,
        duration: 0.6,
        ease: 'power2.inOut'
      })
      .to(nextSlide, {
        x: '0%',
        opacity: 1,
        scale: 1,
        duration: 0.6,
        ease: 'power2.inOut'
      }, '-=0.6');
  }

  function next() {
    goToSlide((currentIndex + 1) % testimonials.length);
  }

  function prev() {
    goToSlide((currentIndex - 1 + testimonials.length) % testimonials.length);
  }

  function handleTouchStart(e: TouchEvent) {
    if (!isMobile) return; // Touch nur auf Mobile
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
    isDragging = true;
  }

  function handleTouchMove(e: TouchEvent) {
    if (!isDragging) return;
    
    const deltaX = e.touches[0].clientX - dragStartX;
    currentDragX = deltaX;

    // Nur horizontale Bewegung abfangen
    if (Math.abs(deltaX) > Math.abs(e.touches[0].clientY - startY)) {
      e.preventDefault();
      
      // Gleiche Logik wie bei handleMouseMove
      gsap.set(slides[currentIndex], {
        x: deltaX
      });

      if (deltaX < 0 && currentIndex < slides.length - 1) {
        gsap.set(slides[currentIndex + 1], {
          x: window.innerWidth + deltaX,
          opacity: 1,
          scale: 1
        });
      } else if (deltaX > 0 && currentIndex > 0) {
        gsap.set(slides[currentIndex - 1], {
          x: -window.innerWidth + deltaX,
          opacity: 1,
          scale: 1
        });
      }
    }
  }

  function handleTouchEnd() {
    handleMouseUp(); // Gleiche Logik wie bei Mouse-Events
  }

  // Maus-Events für Desktop
  function handleMouseDown(e: MouseEvent) {
    if (isMobile) return; // Drag nur auf Desktop
    isDragging = true;
    dragStartX = e.clientX;
    
    // Aktuelle Slide Position speichern
    currentDragX = 0;
    
    // Animation vorbereiten
    gsap.set(slides[currentIndex], {
      cursor: 'grabbing'
    });
  }

  function handleMouseMove(e: MouseEvent) {
    if (!isDragging) return;
    
    const deltaX = e.clientX - dragStartX;
    currentDragX = deltaX;

    // Aktuelle Slide bewegen
    gsap.set(slides[currentIndex], {
      x: deltaX,
      cursor: 'grabbing'
    });

    // Nächste/Vorherige Slide vorbereiten
    if (deltaX < 0 && currentIndex < slides.length - 1) {
      gsap.set(slides[currentIndex + 1], {
        x: window.innerWidth + deltaX,
        opacity: 1,
        scale: 1
      });
    } else if (deltaX > 0 && currentIndex > 0) {
      gsap.set(slides[currentIndex - 1], {
        x: -window.innerWidth + deltaX,
        opacity: 1,
        scale: 1
      });
    }
  }

  function handleMouseUp() {
    if (!isDragging) return;
    isDragging = false;

    const threshold = window.innerWidth * 0.2; // 20% der Bildschirmbreite

    if (Math.abs(currentDragX) > threshold) {
      // Zur nächsten/vorherigen Slide wechseln
      if (currentDragX < 0 && currentIndex < slides.length - 1) {
        goToSlide(currentIndex + 1);
      } else if (currentDragX > 0 && currentIndex > 0) {
        goToSlide(currentIndex - 1);
      } else {
        // Zurück zur Ausgangsposition
        gsap.to(slides[currentIndex], {
          x: 0,
          duration: 0.3,
          ease: 'power2.out'
        });
      }
    } else {
      // Zurück zur Ausgangsposition wenn nicht weit genug gezogen
      gsap.to(slides[currentIndex], {
        x: 0,
        duration: 0.3,
        ease: 'power2.out'
      });
    }

    // Reset der Nachbar-Slides
    if (currentIndex < slides.length - 1) {
      gsap.set(slides[currentIndex + 1], {
        x: '100%',
        opacity: 0,
        scale: 0.8
      });
    }
    if (currentIndex > 0) {
      gsap.set(slides[currentIndex - 1], {
        x: '-100%',
        opacity: 0,
        scale: 0.8
      });
    }

    currentDragX = 0;
  }

  // Wheel Event für Mausrad/Trackpad
  function handleWheel(e: WheelEvent) {
    if (isMobile) return; // Keine Wheel Events auf Mobile
    
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
      e.preventDefault();
      
      if (isAnimating) return;
      
      if (e.deltaX > 50) {
        next();
      } else if (e.deltaX < -50) {
        prev();
      }
    }
    // Vertikales Scrollen wird durchgelassen
  }

  // Keyboard Navigation
  function handleKeydown(e: KeyboardEvent) {
    if (isAnimating) return;
    
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

<div 
  class="relative container px-4 mx-auto"
  on:keydown={handleKeydown}
  tabindex="0"
>
  <div class="max-w-7xl mx-auto">
    <div class="flex flex-wrap -mx-4 mb-8">
      <div class="w-full lg:w-2/3 px-4">
        <span class="inline-block py-1 px-3 mb-4 text-xs font-medium text-primary-900 bg-primary-50 rounded-full">Testimonials</span>
        <h1 class="font-heading text-5xl xs:text-6xl font-medium text-gray-900 mb-4">
          <span>Was sagen</span>
          <span class="font-thin">die Teilnehmer</span>
        </h1>
        <p class="text-gray-500">Wie lebt es sich so?</p>
      </div>
    </div>

    <!-- Navigation + Slider Container -->
    <div class="relative">
      <!-- Navigation Buttons -->
      <div class="flex items-center justify-end mb-8">
        <button 
          on:click={prev} 
          class="inline-flex mr-3 w-14 h-14 items-center justify-center rounded-full bg-gray-100 hover:border-primary-900 text-gray-600 hover:text-primary-900 hover:bg-gray-200 transition duration-200"
        >
          <svg width="12" height="14" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0.0799999 6.62C0.127594 6.49725 0.19896 6.38511 0.290001 6.29L5.29 1.29C5.38324 1.19676 5.49393 1.1228 5.61575 1.07234C5.73757 1.02188 5.86814 0.995911 6 0.995911C6.2663 0.995911 6.5217 1.1017 6.71 1.29C6.80324 1.38324 6.8772 1.49393 6.92766 1.61575C6.97812 1.73758 7.00409 1.86814 7.00409 2C7.00409 2.2663 6.8983 2.5217 6.71 2.71L3.41 6H11C11.2652 6 11.5196 6.10536 11.7071 6.2929C11.8946 6.48043 12 6.73479 12 7C12 7.26522 11.8946 7.51957 11.7071 7.70711C11.5196 7.89465 11.2652 8 11 8H3.41L6.71 11.29C6.80373 11.383 6.87812 11.4936 6.92889 11.6154C6.97966 11.7373 7.0058 11.868 7.0058 12C7.0058 12.132 6.97966 12.2627 6.92889 12.3846C6.87812 12.5064 6.80373 12.617 6.71 12.71C6.61704 12.8037 6.50644 12.8781 6.38458 12.9289C6.26272 12.9797 6.13201 13.0058 6 13.0058C5.86799 13.0058 5.73728 12.9797 5.61542 12.9289C5.49356 12.8781 5.38296 12.8037 5.29 12.71L0.290001 7.71C0.19896 7.6149 0.127594 7.50275 0.0799999 7.38C-0.0200176 7.13654 -0.0200176 6.86346 0.0799999 6.62Z" fill="currentColor"/>
          </svg>
        </button>
        <button 
          on:click={next} 
          class="inline-flex w-14 h-14 items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-primary-900 transition duration-200"
        >
          <svg width="12" height="14" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.92 6.62C11.8724 6.49725 11.801 6.38511 11.71 6.29L6.71 1.29C6.61676 1.19676 6.50607 1.1228 6.38425 1.07234C6.26243 1.02188 6.13186 0.995911 6 0.995911C5.7337 0.995911 5.4783 1.1017 5.29 1.29C5.19676 1.38324 5.1228 1.49393 5.07234 1.61575C5.02188 1.73758 4.99591 1.86814 4.99591 2C4.99591 2.2663 5.1017 2.5217 5.29 2.71L8.59 6H1C0.734784 6 0.48043 6.10536 0.292893 6.2929C0.105357 6.48043 0 6.73479 0 7C0 7.26522 0.105357 7.51957 0.292893 7.70711C0.48043 7.89465 0.734784 8 1 8H8.59L5.29 11.29C5.19627 11.383 5.12188 11.4936 5.07111 11.6154C5.02034 11.7373 4.9942 11.868 4.9942 12C4.9942 12.132 5.02034 12.2627 5.07111 12.3846C5.12188 12.5064 5.19627 12.617 5.29 12.71C5.38296 12.8037 5.49356 12.8781 5.61542 12.9289C5.73728 12.9797 5.86799 13.0058 6 13.0058C6.13201 13.0058 6.26272 12.9797 6.38458 12.9289C6.50644 12.8781 6.61704 12.8037 6.71 12.71L11.71 7.71C11.801 7.6149 11.8724 7.50275 11.92 7.38C12.02 7.13654 12.02 6.86346 11.92 6.62Z" fill="currentColor"/>
          </svg>
        </button>
      </div>

      <!-- Slider -->
      <div class="relative overflow-hidden">
        <div 
          bind:this={slider}
          class="relative w-full transition-height duration-300 {
            isMobile 
              ? 'touch-pan-y' 
              : 'hover:cursor-grab active:cursor-grabbing'
          }"
          style="min-height: {maxHeight}px"
          on:touchstart={handleTouchStart}
          on:touchmove|preventDefault={handleTouchMove}
          on:touchend={handleTouchEnd}
          on:mousedown={handleMouseDown}
          on:mousemove={handleMouseMove}
          on:mouseup={handleMouseUp}
          on:mouseleave={handleMouseUp}
          on:wheel={handleWheel}
        >
          {#each testimonials as testimonial, i (testimonial._id)}
            <div class="absolute top-0 left-0 w-full">
              <div class="px-6 py-12 xs:pl-12 xs:pr-14 bg-gray-100 rounded-3xl">
                <div class="flex flex-col lg:flex-row items-start">
                  <div class="w-32 h-32 mb-6 lg:mb-0 lg:mr-12 flex-shrink-0">
                    <div class="w-full h-full overflow-hidden rounded-full">
                      <img 
                        src={testimonial.imageUrl} 
                        alt={testimonial.title}
                        class="w-full h-full object-cover"
                      />   
                    </div>
                  </div>
                  <div class="flex-grow">
                    <img class="block mb-4" src="saturn-assets/images/testimonials/quote-orange.svg" alt="">
                    <h4 class="text-2xl font-semibold text-gray-900 mb-6">
                      {@html sanitizeText(testimonial.title)}
                    </h4>
                    <p class="text-gray-500 mb-5">
                      {@html sanitizeText(testimonial.content)}
                    </p>
                    <span class="font-medium text-primary-900">
                      {@html sanitizeText(testimonial.position)}
                    </span>
                    <span class="font-semibold text-primary-900">
                      {@html sanitizeText(testimonial.name)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          {/each}
        </div>
      </div>
    </div>

    <!-- Dots Navigation -->
    <div class="flex justify-center mt-8 gap-2">
      {#each testimonials as _, i}
        <button 
          class="w-2 h-2 rounded-full transition-all duration-300 {
            i === currentIndex 
              ? 'bg-primary-600 w-6' 
              : 'bg-gray-300 hover:bg-gray-400'
          }"
          on:click={() => goToSlide(i)}
          disabled={isAnimating}
          aria-label="Go to slide {i + 1}"
        />
      {/each}
    </div>
  </div>
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
  :global(.touch-pan-y) {
    touch-action: pan-y;
  }
</style>




