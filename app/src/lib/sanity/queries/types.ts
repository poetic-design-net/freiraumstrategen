import type { SanityImage } from '$lib/types/heroSection';
import type { CasePageReference, CasePostReference, DisplaySettings, AnimationSettings } from '$lib/types/caseSection';
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import type { SectionStyles } from '$lib/utils/sections';

export interface SEO {
  metaTitle?: string;
  metaDescription?: string;
  openGraphImage?: SanityImage;
  keywords?: string[];
  canonicalUrl?: string;
}

export interface Section {
  _type: string;
  _key: string;
  enabled: boolean;
  styles?: SectionStyles;
  [key: string]: any;
}

// StepSection interfaces
export interface Step {
  number: number;
  title: string;
  description: any[];  // Changed to any[] to match component expectation
  image: {
    _type: 'image';
    asset: SanityImageSource;
    alt?: string;
  };
}

export interface StepSectionData extends Section {
  _type: 'stepSection';
  enabled: boolean;
  badge: string;
  heading: {
    thin: string;
    regular: string;
  };
  steps: Step[];
}

// ContentSectionAlt interfaces
interface ButtonData {
  text: string;
  link: string;
  variant: 'orange' | 'primary' | 'secondary';
}

interface SliderImage {
  image: {
    _type: 'image';
    asset: SanityImageSource;
  };
  alt: string;
}

interface SliderSettings {
  autoplaySpeed: number;
  transitionDuration: number;
}

export interface ContentSectionAltData extends Section {
  _type: 'contentSectionAlt';
  enabled: boolean;
  leftColumn: {
    badge: string;
    heading: {
      line1: string;
      line2: string;
      line3: string;
    };
    paragraphs: string[];
    button: ButtonData;
  };
  rightColumn: {
    heading: string;
    featureList: Array<{ text: string }>;
    paragraphs: string[];
    imageSlider: {
      images: SliderImage[];
      settings: SliderSettings;
    };
  };
  backgroundImage: {
    _type: 'image';
    asset: SanityImageSource;
  };
}

export interface CaseSection extends Section {
  _type: 'caseSection';
  badge?: string;
  title?: string;
  subtitle?: string;
  description?: string;
  selectedPages: CasePageReference[];
  selectedPosts: CasePostReference[];
  displaySettings: DisplaySettings;
  animation?: AnimationSettings;
}

export interface FeatureLink {
  text: string;
  href: string;
}

export interface Feature {
  title: string;
  subtitle: string;
  subtitle_hover: string;
  icon: 'education' | 'structure' | 'strategy' | 'liveTrading' | 'community' | 'riskManagement';
  description: string[];
  link?: FeatureLink;
}

export interface FeatureSectionData extends Section {
  _type: 'featuresSection';
  eyebrow: string;
  title: string;
  subtitle: string;
  videoId: string;
  features: Feature[];
}

export interface StrategyHeroSection extends Section {
  _type: 'strategyHeroSection';
  headline?: {
    prefix: string;
    main: string;
  };
  backgroundImage: SanityImage;
  statistics: {
    firstStat: {
      value: string;
      label: string;
    };
    secondStat: {
      value: string;
      label: string;
    };
  };
  cta: {
    text: string;
    link: string;
  };
  video: {
    youtubeId: string;
    buttonText: string;
    duration: string;
  };
}

export interface StrategyIntroSection extends Section {
  _type: 'strategyIntroSection';
  heading: {
    regular: string;
    thin: string;
  };
  content: {
    mainParagraph: string;
    secondaryParagraph: string;
  };
  teamCard: {
    members: Array<{
      image: SanityImage;
      name: string;
    }>;
    title: string;
    subtitle: string;
  };
  mainImage?: SanityImage;
}

interface BaseStrategyFeaturesSection extends Section {
  badge: string;
  heading: {
    regular: string;
    highlighted: string;
  };
  content: {
    mainParagraph: string;
    secondaryParagraph: string;
  };
  features: Array<{
    title: string;
    subtitle: string;
    subtitle_hover: string;
    icon: 'time' | 'chart' | 'team';
    iconColor: 'primary' | 'blue' | 'green';
  }>;
  testimonial?: {
    image: SanityImage;
    title: string;
    description: string;
  };
  mainImage?: SanityImage;
}

export interface StrategyFeaturesSection extends BaseStrategyFeaturesSection {
  _type: 'strategyFeaturesSection';
}

export interface StrategyFeaturesSectionAlt extends BaseStrategyFeaturesSection {
  _type: 'strategyFeaturesSectionAlt';
}
