export interface NavigationConfig {
  showArrows?: boolean;
  showDots?: boolean;
  enableKeyboard?: boolean;
  enableDrag?: boolean;
  slideDuration?: number;
  dragThreshold?: number;
}

export interface NavigationState {
  currentIndex: number;
  isAnimating: boolean;
  totalSlides: number;
}

export interface NavigationHandlers {
  next: () => void;
  prev: () => void;
}

export interface DragState {
  startX: number | null;
  isDragging: boolean;
  dragStartX: number;
  currentDragX: number;
  isMobile: boolean;
}

export interface DragAnimationOptions {
  scale?: number;
  opacity?: number;
  cursor?: string;
}

export const defaultNavigationConfig: NavigationConfig = {
  showArrows: true,
  showDots: true,
  enableKeyboard: true,
  enableDrag: true,
  slideDuration: 400,
  dragThreshold: 15
};
