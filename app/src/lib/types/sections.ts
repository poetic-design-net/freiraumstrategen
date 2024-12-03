import type { SanityImage } from './heroSection';
import type { CaseSectionData } from './caseSection';
import type { TestimonialData } from '$lib/templates/Testimonials_gsap/types/testimonial.types';
import type { PortableTextBlock } from '@portabletext/types';
import type { Column, BackgroundImage } from './contentSection';
import type { FeatureIcon, FeatureLayout } from './featureSection';

// Base interface for all sections
export interface BaseSection {
  _type: string;
  _key: string;
  enabled: boolean;
  id?: string; // Optional ID field for anchor links
}

// Legacy interface for backward compatibility
export interface LegacyContentSection {
  leftColumn?: {
    highlightedParagraphs?: string[];
    regularParagraphs?: string[];
  };
  rightColumn?: {
    highlightedParagraph?: string;
    regularParagraphs?: string[];
  };
}

export interface HeroSectionData extends BaseSection {
  _type: 'heroSection';
  gradientText?: string;
  heading?: {
    highlighted?: string;
    regular?: string;
  };
  button?: {
    text?: string;
    link?: string;
  };
  partners?: {
    heading?: string;
    logos?: any[];
  };
  heroImage?: SanityImage;
  stats?: {
    number?: string;
    text?: string;
    avatars?: any[];
  };
}

export interface ContentSectionData extends BaseSection {
  _type: 'contentSection';
  layout?: 'single-column' | 'two-columns';
  theme?: 'light' | 'dark';
  header?: {
    badge?: string;
    heading?: {
      regular?: string;
      thin?: string;
    };
  };
  leftColumn?: Column;
  rightColumn?: Column;
  backgroundImage?: BackgroundImage;
}

export interface CallToActionSectionData extends BaseSection {
  _type: 'callToActionSection';
  content: any;
  form: any;
  design: any;
  animation: any;
}

export interface TestimonialSectionData extends BaseSection {
  _type: 'testimonialSection';
  header: {
    badge: string;
    heading: {
      regular: string;
      thin: string;
    };
    subtitle: string;
  };
  testimonials: TestimonialData[];
  animation?: {
    slideDuration?: number;
    dragThreshold?: number;
  };
  navigation?: {
    showArrows?: boolean;
    showDots?: boolean;
    enableKeyboard?: boolean;
    enableDrag?: boolean;
  };
}

export interface Feature {
  title: string;
  subtitle: string;
  subtitle_hover: string;
  icon: FeatureIcon;
  description: any[];
  link?: {
    text: string;
    href: string;
  };
}

export interface FeatureSection {
  _type: 'featuresSection';
  layout: FeatureLayout;
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  videoId?: string;
  features: Feature[];
}

export interface FeatureSectionData extends BaseSection, Omit<FeatureSection, '_type'> {
  _type: 'featuresSection';
}

// Export the union type of all sections
export type Section =
  | HeroSectionData
  | ContentSectionData
  | CallToActionSectionData
  | CaseSectionData
  | TestimonialSectionData
  | FeatureSectionData;
