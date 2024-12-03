import { gsap } from 'gsap';
import type { DragState, NavigationConfig, NavigationState, NavigationHandlers } from '$lib/types/navigation';
import { 
  updateDragPosition, 
  updateAdjacentSlides, 
  resetDragPosition, 
  resetAdjacentSlides,
  updateDragCursor 
} from './slideAnimations';

export function handleKeyboardNavigation(
  e: KeyboardEvent,
  state: NavigationState,
  config: NavigationConfig,
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
  }
}

export function calculateNextIndex(
  currentIndex: number,
  totalSlides: number,
  direction: 'next' | 'prev'
): number {
  if (direction === 'next') {
    return (currentIndex + 1) % totalSlides;
  }
  return (currentIndex - 1 + totalSlides) % totalSlides;
}

export function shouldAnimate(
  isAnimating: boolean,
  newIndex: number,
  currentIndex: number
): boolean {
  return !isAnimating && newIndex !== currentIndex;
}

export function calculateDragThreshold(
  threshold: number = 15,
  windowWidth: number
): number {
  return windowWidth * (threshold / 100);
}

export function isDragValid(
  deltaX: number,
  threshold: number,
  currentIndex: number,
  totalSlides: number
): boolean {
  if (Math.abs(deltaX) <= threshold) {
    return false;
  }

  if (deltaX < 0 && currentIndex >= totalSlides - 1) {
    return false;
  }

  if (deltaX > 0 && currentIndex <= 0) {
    return false;
  }

  return true;
}

export function getSlideDirection(deltaX: number): 'next' | 'prev' {
  return deltaX < 0 ? 'next' : 'prev';
}

export function isMobileDevice(): boolean {
  if (typeof window === 'undefined') return false;
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}

export function initializeDragState(): DragState {
  return {
    startX: null,
    isDragging: false,
    dragStartX: 0,
    currentDragX: 0,
    isMobile: isMobileDevice()
  };
}

// Mouse Handlers
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

  updateDragPosition(slides[currentIndex], deltaX);
  updateAdjacentSlides(slides, currentIndex, deltaX);
}

export function handleMouseUp(
  dragState: DragState,
  slides: HTMLElement[],
  currentIndex: number,
  totalSlides: number,
  config: NavigationConfig,
  handlers: NavigationHandlers
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
  config: NavigationConfig
): void {
  if (!dragState.isDragging) return;
  dragState.isDragging = false;

  resetDragPosition(slides[currentIndex], config);
  resetAdjacentSlides(slides, currentIndex);
  updateDragCursor(slides[currentIndex], false);
  dragState.currentDragX = 0;
}

// Touch Handlers
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

  updateDragPosition(slides[currentIndex], deltaX);
  updateAdjacentSlides(slides, currentIndex, deltaX);
}

export function handleTouchEnd(
  e: TouchEvent,
  dragState: DragState,
  slides: HTMLElement[],
  currentIndex: number,
  totalSlides: number,
  config: NavigationConfig,
  handlers: NavigationHandlers
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
  config: NavigationConfig
): void {
  if (!dragState.startX) return;

  resetDragPosition(slides[currentIndex], config);
  resetAdjacentSlides(slides, currentIndex);
  
  dragState.startX = null;
  dragState.currentDragX = 0;
}

// Helper function to prevent default touch behavior when needed
export function preventDefaultTouch(e: TouchEvent): void {
  if (Math.abs(e.touches[0].clientX) > Math.abs(e.touches[0].clientY)) {
    e.preventDefault();
  }
}
