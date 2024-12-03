import type { DragState } from '$lib/types/navigation';
import type { TestimonialAnimationConfig } from '../types/testimonial.types';
import { updateDragPosition, updateAdjacentSlides, resetDragPosition, resetAdjacentSlides } from '../animations/dragAnimations';
import { calculateDragThreshold, isDragValid, getSlideDirection } from '$lib/utils/navigation';

export function handleTouchStart(
  e: TouchEvent,
  dragState: DragState,
  enableDrag: boolean
): void {
  if (!enableDrag) return;
  dragState.startX = e.touches[0].clientX;
  dragState.dragStartX = e.touches[0].clientX;
  dragState.currentDragX = 0;
}

export function handleTouchMove(
  e: TouchEvent,
  dragState: DragState,
  slides: HTMLElement[],
  currentIndex: number
): void {
  if (!dragState.startX) return;

  const deltaX = e.touches[0].clientX - dragState.dragStartX;
  dragState.currentDragX = deltaX;

  // Update current slide position
  updateDragPosition(slides[currentIndex], deltaX);

  // Update adjacent slides
  updateAdjacentSlides(slides, currentIndex, deltaX);
}

export function handleTouchEnd(
  e: TouchEvent,
  dragState: DragState,
  slides: HTMLElement[],
  currentIndex: number,
  totalSlides: number,
  config: TestimonialAnimationConfig,
  handlers: { next: () => void; prev: () => void }
): void {
  if (!dragState.startX) return;

  const deltaX = dragState.startX - e.changedTouches[0].clientX;
  const threshold = calculateDragThreshold(config.dragThreshold, window.innerWidth);

  if (isDragValid(deltaX, threshold, currentIndex, totalSlides)) {
    const direction = getSlideDirection(deltaX);
    if (direction === 'next') {
      handlers.next();
    } else {
      handlers.prev();
    }
  } else {
    // Reset positions if swipe wasn't enough
    resetDragPosition(slides[currentIndex], config);
    resetAdjacentSlides(slides, currentIndex);
  }

  dragState.startX = null;
  dragState.currentDragX = 0;
}

export function handleTouchCancel(
  dragState: DragState,
  slides: HTMLElement[],
  currentIndex: number,
  config: TestimonialAnimationConfig
): void {
  if (!dragState.startX) return;

  resetDragPosition(slides[currentIndex], config);
  resetAdjacentSlides(slides, currentIndex);
  
  dragState.startX = null;
  dragState.currentDragX = 0;
}

// Helper function to prevent default touch behavior when needed
export function preventDefaultTouch(e: TouchEvent): void {
  // Prevent default only if we're handling the touch
  if (Math.abs(e.touches[0].clientX) > Math.abs(e.touches[0].clientY)) {
    e.preventDefault();
  }
}
