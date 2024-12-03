# Testimonials GSAP Component Structure

## Overview
This document outlines the modular structure for the Testimonials GSAP component.

## Directory Structure
```
app/src/lib/templates/Testimonials_gsap/
├── components/
│   ├── Header.svelte
│   ├── TestimonialCard.svelte
│   └── TestimonialSlider.svelte
├── animations/
│   ├── slideAnimations.ts
│   └── dragAnimations.ts
├── handlers/
│   ├── dragHandlers.ts
│   ├── touchHandlers.ts
│   └── keyboardHandlers.ts
├── types/
│   └── testimonial.types.ts
├── utils/
│   └── slider.utils.ts
└── Testimonials.svelte
```

## Component Breakdown

### 1. Components

#### Header.svelte
- Displays the section header with badge, title, and subtitle
- Props: badge, heading (regular/thin), subtitle

#### TestimonialCard.svelte
- Individual testimonial card with image, quote, and content
- Props: testimonial data, animation settings

#### TestimonialSlider.svelte
- Main slider component with navigation controls
- Uses global NavigationDots and SliderControls components
- Manages slider state and interactions

### 2. Animations

#### slideAnimations.ts
```typescript
export function createSlideAnimation(
  currentSlide: HTMLElement,
  nextSlide: HTMLElement,
  direction: number,
  duration: number
): gsap.core.Timeline;

export function initializeSlides(
  slides: HTMLElement[],
  maxHeight: number
): void;
```

#### dragAnimations.ts
```typescript
export function updateSlidePosition(
  slide: HTMLElement,
  deltaX: number,
  options: DragAnimationOptions
): void;
```

### 3. Handlers

#### dragHandlers.ts
- Mouse drag event handlers
- Drag state management
- Drag animation coordination

#### touchHandlers.ts
- Touch event handlers for mobile
- Touch state management
- Touch animation coordination

#### keyboardHandlers.ts
- Keyboard navigation handlers
- Uses global navigation utilities

### 4. Types

#### testimonial.types.ts
```typescript
export interface TestimonialData {
  _id: string;
  title: string;
  content: string;
  imageUrl: string;
  position: string;
  name: string;
}

export interface TestimonialAnimationConfig {
  slideDuration: number;
  dragThreshold: number;
}

export interface TestimonialNavigationConfig {
  showArrows: boolean;
  showDots: boolean;
  enableKeyboard: boolean;
  enableDrag: boolean;
}
```

### 5. Utils

#### slider.utils.ts
```typescript
export function calculateMaxHeight(slides: HTMLElement[]): number;
export function updateSliderHeight(slider: HTMLElement, height: number): void;
export function calculateNextIndex(current: number, total: number, direction: 'next' | 'prev'): number;
```

## Usage Example

```svelte
<!-- Testimonials.svelte -->
<script lang="ts">
  import Header from './components/Header.svelte';
  import TestimonialSlider from './components/TestimonialSlider.svelte';
  import type { TestimonialSectionData } from '$lib/types/sections';

  export let data: TestimonialSectionData;
</script>

<section class="testimonials-section">
  <Header 
    badge={data.header.badge}
    heading={data.header.heading}
    subtitle={data.header.subtitle}
  />
  
  <TestimonialSlider
    testimonials={data.testimonials}
    animation={data.animation}
    navigation={data.navigation}
  />
</section>
```

## Benefits
1. Improved code organization and maintainability
2. Separation of concerns
3. Reusable components and utilities
4. Better type safety
5. Easier testing
6. Clearer component responsibilities
7. Reduced file complexity
8. Better performance through optimized imports
