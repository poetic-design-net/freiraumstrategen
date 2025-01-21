import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

export interface SalesAdvantagesSection {
  _type: 'salesAdvantagesSection';
  enabled: boolean;
  title: string;
  advantages: { title: string; description: string }[];
}

export interface SalesContentSection {
  _type: 'salesContentSection';
  enabled: boolean;
  title: string;
  leftColumn: {
    badge: string;
    heading: { line1: string; line2: string; line3: string };
    content: any;
    button: { text: string; link: string; variant: 'orange' | 'primary' | 'secondary' };
  };
  rightColumn: {
    image: { _type: 'image'; asset: SanityImageSource };
  };
  image: { _type: 'image'; asset: SanityImageSource };
  benefits: { title: string; description: string }[];
}

export interface SalesCurriculumSection {
  _type: 'salesCurriculumSection';
  enabled: boolean;
  title: string;
  modules: { title: string; description: string }[];
}

export interface SalesEmotionalSection {
  _type: 'salesEmotionalSection';
  enabled: boolean;
  title: string;
  backgroundImage: { _type: 'image'; asset: SanityImageSource };
}

export interface SalesEmotionalFreedomSection {
  _type: 'salesEmotionalFreedomSection';
  enabled: boolean;
  title: string;
  backgroundImage: { _type: 'image'; asset: SanityImageSource };
}

export interface SalesFaqSection {
  _type: 'salesFaqSection';
  enabled: boolean;
  title: string;
  faqs: { question: string; answer: string }[];
}

export interface SalesFeaturesSection {
  _type: 'salesFeaturesSection';
  enabled: boolean;
  title: string;
  features: { title: string; description: string }[];
}

export interface SalesForWhoSection {
  _type: 'salesForWhoSection';
  enabled: boolean;
  title: string;
  profiles: { title: string; description: string }[];
  requirements: { title: string; description: string }[];
}

export interface SalesPricingSection {
  _type: 'salesPricingSection';
  enabled: boolean;
  title: string;
  pricing: { title: string; description: string; price: string }[];
  features: { title: string; description: string }[];
  bonuses: { title: string; description: string }[];
  trustElements: { title: string; description: string }[];
}

export interface SalesWhyContentSection {
  _type: 'salesWhyContentSection';
  enabled: boolean;
  title: string;
}
