import { gsap } from 'gsap';
import type { DragAnimationOptions } from '$lib/types/navigation';
import type { TestimonialAnimationConfig } from '../types/testimonial.types';

export function updateDragPosition(
  slide: HTMLElement,
  deltaX: number,
  options: DragAnimationOptions = {}
): void {
  gsap.set(slide, {
    x: deltaX,
    cursor: options.cursor || 'grabbing'
  });
}

export function updateAdjacentSlides(
  slides: HTMLElement[],
  currentIndex: number,
  deltaX: number
): void {
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

export function resetDragPosition(
  slide: HTMLElement,
  config: TestimonialAnimationConfig
): void {
  gsap.to(slide, {
    x: 0,
    duration: (config.slideDuration || 400) / 1000,
    ease: 'power2.out'
  });
}

export function resetAdjacentSlides(
  slides: HTMLElement[],
  currentIndex: number
): void {
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
}

export function initializeDragStyles(
  slide: HTMLElement,
  isMobile: boolean,
  enableDrag: boolean
): void {
  if (!isMobile && enableDrag) {
    gsap.set(slide, {
      cursor: 'grab'
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
