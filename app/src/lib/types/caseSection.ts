import type { SanityImage } from './heroSection';
import type { Slug } from '@sanity/types';
import type { BaseSection } from './sections';

export type CasePageReference = {
  _type: 'page';
  title: string;
  description?: string;
  slug: Slug;
  hero?: {
    title?: string;
    subtitle?: string;
    backgroundImage?: SanityImage;
  };
  seo?: {
    openGraphImage?: SanityImage;
  };
  sections?: Array<{
    backgroundImage?: SanityImage;
  }>;
};

export type CasePostReference = {
  _type: 'post';
  title: string;
  slug: Slug;
  excerpt?: string;
  mainImage?: SanityImage;
};

export type CaseItem = CasePageReference | CasePostReference;

export type AnimationSettings = {
  enabled: boolean;
  duration: number;
};

export type DisplaySettings = {
  showHeroImage: boolean;
  customExcerptLength: number;
};

export interface CaseSectionProps extends BaseSection {
  _type: 'caseSection';
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  selectedPages: CasePageReference[];
  selectedPosts: CasePostReference[];
  displaySettings: DisplaySettings;
  animation: AnimationSettings;
}

export const defaultCaseSectionProps: CaseSectionProps = {
  _type: 'caseSection',
  _key: '',
  enabled: true,
  badge: 'Deine Story zum Erfolg',
  title: 'Was macht ein erfolgreichen',
  subtitle: 'Trader aus?',
  description: 'Entdecken Sie unsere verschiedenen Angebote und finden Sie den perfekten Weg zu Ihrem Trading-Erfolg.',
  selectedPages: [],
  selectedPosts: [],
  displaySettings: {
    showHeroImage: true,
    customExcerptLength: 150
  },
  animation: {
    enabled: true,
    duration: 0.6
  }
};

export interface CaseSectionData extends BaseSection {
  _type: 'caseSection';
  badge?: string;
  title?: string;
  subtitle?: string;
  description?: string;
  selectedPages?: CasePageReference[];
  selectedPosts?: CasePostReference[];
  displaySettings?: {
    showHeroImage?: boolean;
    customExcerptLength?: number;
  };
  animation?: {
    enabled?: boolean;
    duration?: number;
  };
}
