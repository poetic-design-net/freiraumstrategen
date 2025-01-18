import imageUrlBuilder from '@sanity/image-url';
import type { Image } from '@sanity/types';

interface ImageDimensions {
  width: number;
  height: number;
}

interface SanityImageSource {
  asset?: {
    _ref: string;
    _type: 'reference';
    url?: string;
    metadata?: {
      dimensions: ImageDimensions;
    };
  };
}
import { client } from './client';

const builder = imageUrlBuilder(client);

export function urlFor(source: SanityImageSource) {
  return builder.image(source).auto('format').fit('max');
}

// Optimierte Breakpoints basierend auf typischen Viewport-Größen
const breakpoints = [320, 480, 640, 768, 1024];

export function enhanceUrl(source: SanityImageSource, width?: number) {
  // Bestimme die optimale Bildbreite basierend auf dem nächstgrößeren Breakpoint
  const defaultWidth = breakpoints[0];
  const optimalWidth = !width ? defaultWidth : 
    breakpoints.find(bp => bp >= width) || breakpoints[breakpoints.length - 1];

  const baseImage = builder
    .image(source)
    .auto('format')
    .format('webp')
    .quality(80)
    .fit('max')
    .sharpen(1)
    .forceDownload(false)
    .width(optimalWidth); // Setze optimierte Breite
    
  return baseImage;
}

export function getResponsiveImage(source: SanityImageSource) {
  if (!source?.asset?._ref) return null;

  const srcSet = breakpoints
    .map(width => {
      const url = enhanceUrl(source, width).url();
      return `${url} ${width}w`;
    })
    .join(', ');

  const src = enhanceUrl(source).url();

  // Get original image dimensions
  const dimensions = source.asset?.metadata?.dimensions || { width: 1024, height: 768 };
  
  return {
    src,
    srcSet,
    sizes: '(min-width: 1024px) 1024px, (min-width: 768px) 768px, (min-width: 640px) 640px, (min-width: 480px) 480px, (min-width: 320px) 320px, 100vw',
    width: dimensions.width,
    height: dimensions.height
  };
}
