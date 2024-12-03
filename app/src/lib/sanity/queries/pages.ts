// Re-export all page queries
export { frontpageQuery } from './pages/frontpage';
export { landingPageQuery } from './pages/landingPage';
export { pageQuery } from './pages/page';

// Import types
import type { 
  HeroSectionData,
  ContentSectionData,
  CallToActionSectionData,
  TestimonialSectionData,
  FeatureSectionData,
  Section 
} from '$lib/types/sections';

import type { CaseSectionData } from '$lib/types/caseSection';
import type { SanityImage } from '$lib/types/heroSection';

// Re-export imported types
export type {
  HeroSectionData,
  ContentSectionData,
  CallToActionSectionData,
  TestimonialSectionData,
  FeatureSectionData,
  Section,
  CaseSectionData,
  SanityImage
};

// Export interfaces that were originally in this file
export interface SEO {
  metaTitle?: string;
  metaDescription?: string;
  openGraphImage?: SanityImage;
  keywords?: string[];
  canonicalUrl?: string;
}

export interface KachelSection extends Section {
  _type: 'kachelSection';
  _key: string;
  enabled: boolean;
  heading: {
    badge: string;
    title: {
      regular: string;
      light: string;
    };
  };
  description: string;
  mainKachel: {
    image: SanityImage;
    badge: string;
    title: string;
    button: {
      text: string;
      link: string;
    };
  };
  sideKacheln: Array<{
    title: string;
    description: string;
    link: string;
    backgroundColor: 'green' | 'red' | 'gray';
  }>;
}

export interface LandingPageData {
  title: string;
  slug: { current: string };
  description?: string;
  seo?: SEO;
  sections?: Section[];
}
