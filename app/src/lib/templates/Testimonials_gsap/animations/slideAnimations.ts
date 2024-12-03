import { gsap } from 'gsap';
import type { TestimonialAnimationConfig } from '../types/testimonial.types';

export function initializeSlides(
  slider: HTMLElement,
  slides: HTMLElement[],
  maxHeight: number
): void {
  gsap.set(slider, {
    height: maxHeight
  });

  // Initialize all slides with their scale and opacity
  slides.forEach((slide, i) => {
    gsap.set(slide, {
      position: 'absolute',
      opacity: i === 0 ? 1 : 0,
      scale: i === 0 ? 1 : 0.8,
      x: i === 0 ? 0 : '100%',
      width: '100%'
    });
  });
}

export function createSlideAnimation(
  currentSlide: HTMLElement,
  nextSlide: HTMLElement,
  direction: number,
  config: TestimonialAnimationConfig
): gsap.core.Timeline {
  const duration = (config.slideDuration || 400) / 1000;

  const tl = gsap.timeline();

  // Set initial state of next slide
  tl.set(nextSlide, { 
    x: `${100 * direction}%`, 
    opacity: 0, 
    scale: 0.8 
  })
  // Animate current slide out
  .to(currentSlide, {
    x: `${-100 * direction}%`,
    opacity: 0,
    scale: 0.8,
    duration,
    ease: 'power2.inOut'
  })
  // Animate next slide in
  .to(nextSlide, {
    x: '0%',
    opacity: 1,
    scale: 1,
    duration,
    ease: 'power2.inOut'
  }, `-=${duration}`); // Start at the same time as current slide animation

  return tl;
}

export function updateSlideHeight(
  slider: HTMLElement,
  maxHeight: number
): void {
  gsap.to(slider, {
    height: maxHeight,
    duration: 0.3,
    ease: 'power2.inOut'
  });
}

export function resetSlidePosition(
  slide: HTMLElement,
  config: TestimonialAnimationConfig
): void {
  gsap.to(slide, {
    x: 0,
    scale: 1,
    duration: (config.slideDuration || 400) / 1000,
    ease: 'power2.inOut'
  });
}

export function setSlideVisibility(
  slides: HTMLElement[],
  currentIndex: number,
  direction: 'next' | 'prev'
): void {
  const nextIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1;
  
  if (nextIndex >= 0 && nextIndex < slides.length) {
    gsap.set(slides[nextIndex], {
      x: direction === 'next' ? '100%' : '-100%',
      opacity: 0,
      scale: 0.8
    });
  }
}

export function updateDragPosition(
  slide: HTMLElement,
  deltaX: number,
  scale: number = 1
): void {
  gsap.set(slide, {
    x: deltaX,
    scale: 1 - (Math.abs(deltaX) / window.innerWidth) * 0.2,
    cursor: 'grabbing'
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
      opacity: 1 - (Math.abs(deltaX) / window.innerWidth) * 0.5,
      scale: 0.8 + (Math.abs(deltaX) / window.innerWidth) * 0.2
    });
  } else if (deltaX > 0 && currentIndex > 0) {
    gsap.set(slides[currentIndex - 1], {
      x: -window.innerWidth + deltaX,
      opacity: 1 - (Math.abs(deltaX) / window.innerWidth) * 0.5,
      scale: 0.8 + (Math.abs(deltaX) / window.innerWidth) * 0.2
    });
  }
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
