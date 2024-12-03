import type { DragState } from '$lib/types/navigation';
import type { TestimonialAnimationConfig } from '../types/testimonial.types';
import { updateDragPosition, updateAdjacentSlides, resetDragPosition, resetAdjacentSlides, updateDragCursor } from '../animations/dragAnimations';
import { calculateDragThreshold, isDragValid, getSlideDirection } from '$lib/utils/navigation';

export function handleMouseDown(
  e: MouseEvent,
  dragState: DragState,
  slides: HTMLElement[],
  currentIndex: number,
  enableDrag: boolean
): void {
  if (!enableDrag || dragState.isMobile) return;
  
  dragState.isDragging = true;
  dragState.dragStartX = e.clientX;
  dragState.currentDragX = 0;

  updateDragCursor(slides[currentIndex], true);
}

export function handleMouseMove(
  e: MouseEvent,
  dragState: DragState,
  slides: HTMLElement[],
  currentIndex: number
): void {
  if (!dragState.isDragging) return;

  const deltaX = e.clientX - dragState.dragStartX;
  dragState.currentDragX = deltaX;

  // Update current slide position
  updateDragPosition(slides[currentIndex], deltaX);

  // Update adjacent slides
  updateAdjacentSlides(slides, currentIndex, deltaX);
}

export function handleMouseUp(
  dragState: DragState,
  slides: HTMLElement[],
  currentIndex: number,
  totalSlides: number,
  config: TestimonialAnimationConfig,
  handlers: { next: () => void; prev: () => void }
): void {
  if (!dragState.isDragging) return;
  dragState.isDragging = false;

  const threshold = calculateDragThreshold(config.dragThreshold, window.innerWidth);

  if (isDragValid(dragState.currentDragX, threshold, currentIndex, totalSlides)) {
    const direction = getSlideDirection(dragState.currentDragX);
    if (direction === 'next') {
      handlers.next();
    } else {
      handlers.prev();
    }
  } else {
    // Reset positions if drag wasn't enough
    resetDragPosition(slides[currentIndex], config);
    resetAdjacentSlides(slides, currentIndex);
  }

  updateDragCursor(slides[currentIndex], false);
  dragState.currentDragX = 0;
}

export function handleMouseLeave(
  dragState: DragState,
  slides: HTMLElement[],
  currentIndex: number,
  config: TestimonialAnimationConfig
): void {
  if (!dragState.isDragging) return;
  dragState.isDragging = false;

  resetDragPosition(slides[currentIndex], config);
  resetAdjacentSlides(slides, currentIndex);
  updateDragCursor(slides[currentIndex], false);
  dragState.currentDragX = 0;
}
