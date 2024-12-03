import { gsap } from 'gsap';
import type { NavigationConfig } from '$lib/types/navigation';

export function initializeSlides(
  slider: HTMLElement,
  slides: HTMLElement[],
  maxHeight: number
): void {
  // Set container height
  gsap.set(slider, {
    height: maxHeight
  });
  
  // Initial setup for all slides - start with small scale
  slides.forEach((slide, i) => {
    gsap.set(slide, {
      position: 'absolute',
      opacity: i === 0 ? 1 : 0,
      scale: i === 0 ? 1 : 0.8,
      x: i === 0 ? 0 : '100%',
      width: '100%',
      top: 0,
      left: 0
    });
  });
}

export function createSlideAnimation(
  currentSlide: HTMLElement,
  nextSlide: HTMLElement,
  direction: number,
  config: NavigationConfig
): gsap.core.Timeline {
  const tl = gsap.timeline({
    onComplete: () => {
      // Animation complete callback if needed
    }
  });

  // Set initial state of next slide
  tl.set(nextSlide, { 
    x: `${100 * direction}%`, 
    opacity: 0, 
    scale: 0.8,
    display: 'block'
  })
  // Animate current slide out
  .to(currentSlide, {
    x: `${-100 * direction}%`,
    opacity: 0,
    scale: 0.8,
    duration: 0.4,
    ease: 'power2.out'
  })
  // Animate next slide in
  .to(nextSlide, {
    x: '0%',
    opacity: 1,
    scale: 1,
    duration: 0.4,
    ease: 'power2.out'
  }, '-=0.4');

  return tl;
}

export function updateSlideHeight(
  slider: HTMLElement,
  maxHeight: number
): void {
  gsap.set(slider, { 
    height: maxHeight 
  });
}

export function updateDragPosition(
  slide: HTMLElement,
  deltaX: number
): void {
  gsap.set(slide, {
    x: deltaX,
    cursor: 'grabbing'
  });
}

export function updateAdjacentSlides(
  slides: HTMLElement[],
  currentIndex: number,
  deltaX: number
): void {
  // Show and prepare next/prev slide based on drag direction
  if (deltaX < 0 && currentIndex < slides.length - 1) {
    // Next slide
    gsap.set(slides[currentIndex + 1], {
      x: window.innerWidth + deltaX,
      opacity: 1,
      scale: 0.8, // Start small
      display: 'block'
    });
  } else if (deltaX > 0 && currentIndex > 0) {
    // Previous slide
    gsap.set(slides[currentIndex - 1], {
      x: -window.innerWidth + deltaX,
      opacity: 1,
      scale: 0.8, // Start small
      display: 'block'
    });
  }
}

export function resetDragPosition(
  slide: HTMLElement,
  config: NavigationConfig
): void {
  gsap.to(slide, {
    x: 0,
    scale: 1, // Ensure current slide is full size
    duration: 0.4,
    ease: 'power2.out'
  });
}

export function resetAdjacentSlides(
  slides: HTMLElement[],
  currentIndex: number
): void {
  // Reset next slide
  if (currentIndex < slides.length - 1) {
    gsap.set(slides[currentIndex + 1], {
      x: '100%',
      opacity: 0,
      scale: 0.8,
      display: 'block'
    });
  }
  // Reset previous slide
  if (currentIndex > 0) {
    gsap.set(slides[currentIndex - 1], {
      x: '-100%',
      opacity: 0,
      scale: 0.8,
      display: 'block'
    });
  }
}

export function updateDragCursor(
  slide: HTMLElement,
  isDragging: boolean
): void {
  gsap.set(slide, {
    cursor: isDragging ? 'grabbing' : 'grab'
  });
}

// For backward compatibility with existing code
export function updateCardStyles(cards: HTMLElement[], index: number) {
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
