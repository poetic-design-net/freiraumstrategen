import type { SanityImage } from './heroSection';
import type { BaseSection } from './sections';

// Interface for the component's props
export interface KachelSectionProps {
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
    image: {
      asset: any;
      alt: string;  // Required in component
    };
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

// Interface for the Sanity data
export interface KachelSection extends BaseSection {
  _type: 'kachelSection';
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
