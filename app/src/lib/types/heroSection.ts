export type SanityImage = {
  _type: 'image';
  asset: {
    _ref: string;
    _id?: string;
    url?: string;
    metadata?: {
      dimensions?: {
        width: number;
        height: number;
      };
    };
  };
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
  alt?: string;
};

export type PartnerLogo = {
  image: SanityImage;
  alt: string;
};

export type HeroSectionProps = {
  enabled?: boolean;
  gradientText?: string;
  heading: {
    highlighted: string;
    regular: string;
  };
  button: {
    text: string;
    link: string;
  };
  partners: {
    heading: string;
    logos: PartnerLogo[];
  };
  heroImage?: SanityImage;
  stats: {
    number: string;
    text: string;
    avatars: SanityImage[];
  };
};
