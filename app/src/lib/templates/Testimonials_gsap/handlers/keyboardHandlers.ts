import type { TestimonialNavigationConfig } from '../types/testimonial.types';
import { shouldAnimate } from '$lib/utils/navigation';

interface NavigationState {
  currentIndex: number;
  isAnimating: boolean;
  totalSlides: number;
}

interface NavigationHandlers {
  next: () => void;
  prev: () => void;
}

export function handleKeydown(
  e: KeyboardEvent,
  state: NavigationState,
  config: TestimonialNavigationConfig,
  handlers: NavigationHandlers
): void {
  if (!config.enableKeyboard || state.isAnimating) return;

  switch(e.key) {
    case 'ArrowLeft':
    case 'ArrowUp':
      if (state.currentIndex > 0) {
        e.preventDefault();
        handlers.prev();
      }
      break;
    case 'ArrowRight':
    case 'ArrowDown':
      if (state.currentIndex < state.totalSlides - 1) {
        e.preventDefault();
        handlers.next();
      }
      break;
    case 'Home':
      if (state.currentIndex !== 0) {
        e.preventDefault();
        handlers.prev();
      }
      break;
    case 'End':
      if (state.currentIndex !== state.totalSlides - 1) {
        e.preventDefault();
        handlers.next();
      }
      break;
    case ' ':
    case 'Enter':
      e.preventDefault();
      if (state.currentIndex < state.totalSlides - 1) {
        handlers.next();
      } else {
        // Loop back to first slide
        handlers.prev();
      }
      break;
  }
}

export function setupKeyboardListeners(
  element: HTMLElement,
  state: NavigationState,
  config: TestimonialNavigationConfig,
  handlers: NavigationHandlers
): () => void {
  const keydownHandler = (e: KeyboardEvent) => 
    handleKeydown(e, state, config, handlers);

  element.addEventListener('keydown', keydownHandler);

  // Return cleanup function
  return () => {
    element.removeEventListener('keydown', keydownHandler);
  };
}

// Helper function to determine if keyboard navigation should be enabled
export function isKeyboardNavigationEnabled(
  config: TestimonialNavigationConfig,
  state: NavigationState,
  direction: 'next' | 'prev'
): boolean {
  if (!config.enableKeyboard || state.isAnimating) return false;

  if (direction === 'next') {
    return state.currentIndex < state.totalSlides - 1;
  } else {
    return state.currentIndex > 0;
  }
}

// Helper function to get aria-label for keyboard navigation
export function getKeyboardNavigationLabel(
  direction: 'next' | 'prev',
  currentIndex: number,
  totalSlides: number
): string {
  const currentSlide = currentIndex + 1;
  
  if (direction === 'next') {
    return `Gehe zu Slide ${Math.min(currentSlide + 1, totalSlides)} von ${totalSlides}`;
  } else {
    return `Gehe zu Slide ${Math.max(currentSlide - 1, 1)} von ${totalSlides}`;
  }
}
