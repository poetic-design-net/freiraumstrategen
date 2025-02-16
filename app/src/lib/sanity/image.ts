import imageUrlBuilder from '@sanity/image-url';
import { client } from './client';

type SanityImageAsset = {
  _ref: string;
  _type?: string;
};

type SanityImage = {
  asset?: SanityImageAsset;
  _type?: string;
  hotspot?: {
    x: number;
    y: number;
    height: number;
    width: number;
  };
  crop?: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  };
};

const builder = imageUrlBuilder(client);

// Optimierte Breakpoints für verschiedene Anwendungsfälle
const breakpoints = {
  hero: [640, 768, 1024, 1280, 1536, 1920],
  content: [320, 480, 640, 768, 1024, 1280]
};

// Qualitäts-Mapping basierend auf Bildbreite
const getQualityForWidth = (width: number): number => {
  if (width <= 640) return 75;
  if (width <= 1024) return 80;
  if (width <= 1536) return 85;
  return 90;
};

export function urlFor(
  source: SanityImage,
  options: { 
    width?: number; 
    height?: number;
    quality?: number;
  } = {}
): string | null {
  if (!source?.asset?._ref) return null;

  let imageBuilder = builder.image(source)
    .auto('format')
    .format('webp')
    .fit('max');

  if (options.width) {
    imageBuilder = imageBuilder.width(options.width);
  }

  if (options.height) {
    imageBuilder = imageBuilder.height(options.height);
  }

  // Qualität basierend auf Bildbreite oder übergebener Option
  const quality = options.quality || (options.width ? getQualityForWidth(options.width) : 85);
  imageBuilder = imageBuilder.quality(quality);

  return imageBuilder.url();
}

export function enhanceUrl(
  url: string, 
  options: { 
    width?: number; 
    height?: number;
    quality?: number;
  } = {}
): string {
  if (!url) return '';

  const params = new URLSearchParams();
  params.set('auto', 'format');
  params.set('fm', 'webp'); // WebP als Standard-Format
  params.set('fit', 'max');

  if (options.width) {
    params.set('w', options.width.toString());
    // Setze Qualität basierend auf Breite
    const quality = options.quality || getQualityForWidth(options.width);
    params.set('q', quality.toString());
  }

  if (options.height) {
    params.set('h', options.height.toString());
  }

  const separator = url.includes('?') ? '&' : '?';
  return `${url}${separator}${params.toString()}`;
}

export function getResponsiveImage(
  source: SanityImage,
  options: {
    maxWidth?: number;
    maxHeight?: number;
    sizes?: string;
    quality?: number;
    isHero?: boolean;
  } = {}
): {
  src: string;
  srcSet: string;
  sizes: string;
  width: number;
  height: number;
  lqip?: string; // Low Quality Image Placeholder
} | null {
  if (!source?.asset) return null;

  try {
    const maxWidth = options.maxWidth || 1920;
    const useBreakpoints = options.isHero ? breakpoints.hero : breakpoints.content;
    const usedBreakpoints = useBreakpoints.filter(w => w <= maxWidth);

    // Generate LQIP (Low Quality Image Placeholder)
    const lqip = builder.image(source)
      .width(20)
      .blur(10)
      .quality(20)
      .format('webp')
      .url();

    // Generate srcSet using image builder
    const srcSet = usedBreakpoints
      .map(width => {
        const quality = options.quality || getQualityForWidth(width);
        const imgBuilder = builder.image(source)
          .auto('format')
          .format('webp')
          .fit('max')
          .width(width)
          .quality(quality);

        if (options.maxHeight) {
          const height = Math.round((width * options.maxHeight) / maxWidth);
          imgBuilder.height(height);
        }

        return `${imgBuilder.url()} ${width}w`;
      })
      .join(', ');

    // Optimierte sizes basierend auf Verwendung
    const defaultSizes = options.isHero ? [
      '(min-width: 1536px) 1920px',
      '(min-width: 1280px) 1536px',
      '(min-width: 1024px) 1280px',
      '(min-width: 768px) 1024px',
      '100vw'
    ] : [
      '(min-width: 1280px) 1280px',
      '(min-width: 1024px) 1024px',
      '(min-width: 768px) 768px',
      '(min-width: 640px) 640px',
      '100vw'
    ];

    // Base image using appropriate size and quality
    const baseWidth = usedBreakpoints[0];
    const baseQuality = options.quality || getQualityForWidth(baseWidth);
    const baseImageBuilder = builder.image(source)
      .auto('format')
      .format('webp')
      .fit('max')
      .width(baseWidth)
      .quality(baseQuality);

    if (options.maxHeight) {
      const height = Math.round((baseWidth * options.maxHeight) / maxWidth);
      baseImageBuilder.height(height);
    }

    return {
      src: baseImageBuilder.url(),
      srcSet,
      sizes: options.sizes || defaultSizes.join(', '),
      width: maxWidth,
      height: options.maxHeight || maxWidth,
      lqip
    };

  } catch (error) {
    console.error('Error in getResponsiveImage:', error);
    return null;
  }
}