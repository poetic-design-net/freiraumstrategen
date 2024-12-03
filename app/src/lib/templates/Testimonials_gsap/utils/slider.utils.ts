import type { TestimonialAnimationConfig } from '../types/testimonial.types';

export function calculateMaxHeight(slides: HTMLElement[]): number {
  return Math.max(...slides.map(slide => slide.offsetHeight));
}

export function createResizeObserver(
  slider: HTMLElement,
  slides: HTMLElement[],
  onResize: (height: number) => void
): ResizeObserver {
  return new ResizeObserver(() => {
    const maxHeight = calculateMaxHeight(slides);
    onResize(maxHeight);
  });
}

export function cleanupResizeObserver(
  observer: ResizeObserver | null,
  slides: HTMLElement[]
): void {
  if (observer) {
    slides.forEach(slide => observer.unobserve(slide));
    observer.disconnect();
  }
}
