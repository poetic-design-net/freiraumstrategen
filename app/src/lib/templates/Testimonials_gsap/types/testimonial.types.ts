import type { SanityAsset } from '@sanity/image-url/lib/types/types';
import type { NavigationConfig } from '$lib/types/navigation';

export interface TestimonialData {
  _id: string;
  _type: 'testimonial';
  title: string;
  content: string;
  image: {
    asset: {
      _ref: string;
      url: string;
      _id: string;
      metadata: any;
    };
    alt?: string;
    hotspot?: {
      x: number;
      y: number;
    };
    crop?: {
      top: number;
      bottom: number;
      left: number;
      right: number;
    };
  };
  position: string;
  name: string;
}

export interface TestimonialHeader {
  badge: string;
  heading: {
    regular: string;
    thin: string;
  };
  subtitle: string;
}

export interface TestimonialAnimationConfig extends Pick<NavigationConfig, 'slideDuration' | 'dragThreshold'> {
  enabled?: boolean;
}

export interface TestimonialNavigationConfig extends Pick<NavigationConfig, 'showArrows' | 'showDots' | 'enableKeyboard' | 'enableDrag'> {}

export interface TestimonialSectionData {
  _type: 'testimonialSection';  // Fixed to match SectionRenderer
  _key: string;
  enabled: boolean;
  testimonials: TestimonialData[];
  header: TestimonialHeader;
  animation?: TestimonialAnimationConfig;
  navigation?: TestimonialNavigationConfig;
}

// Default values for the section data
export const defaultTestimonialSection: TestimonialSectionData = {
  _type: 'testimonialSection',  // Fixed to match SectionRenderer
  _key: '',
  enabled: true,
  testimonials: [],
  header: {
    badge: '',
    heading: { regular: '', thin: '' },
    subtitle: ''
  },
  animation: {
    slideDuration: 400,
    dragThreshold: 15,
    enabled: true
  },
  navigation: {
    showArrows: true,
    showDots: true,
    enableKeyboard: true,
    enableDrag: true
  }
};
