import type { BaseSection } from './sections';

export type FeatureIcon = 'education' | 'structure' | 'strategy' | 'liveTrading' | 'community' | 'riskManagement';
export type FeatureLayout = 'withVideo' | 'withoutVideo';

export interface Feature {
  title: string;
  subtitle: string;
  subtitle_hover: string;
  icon: FeatureIcon;
  description: string[];
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
  platform?: 'youtube' | 'vimeo';
  features: Feature[];
}

export interface FeatureSectionData extends BaseSection, Omit<FeatureSection, '_type'> {
  _type: 'featuresSection';
}
