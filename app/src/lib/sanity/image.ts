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

// Optimierte Breakpoints für responsive Bilder
const breakpoints = [320, 480, 640, 768, 1024, 1280, 1536, 1920];

export function urlFor(source: SanityImageSource) {
  return builder.image(source).auto('format').fit('max');
}

export function enhanceUrl(source: SanityImageSource, width?: number) {
  const defaultWidth = breakpoints[0];
  const optimalWidth = !width 
    ? defaultWidth 
    : breakpoints.find(bp => bp >= width) || breakpoints[breakpoints.length - 1];

  return builder
    .image(source)
    .auto('format')
    .fit('max')
    .width(optimalWidth);
}

export function getResponsiveImage(source: SanityImageSource) {
  if (!source?.asset?._ref) return null;

  const generateSrcSet = (width: number) => {
    const url = enhanceUrl(source, width)
      .url();
    return `${url} ${width}w`;
  };

  // Generate srcSet with auto format
  const srcSet = breakpoints
    .map(width => generateSrcSet(width))
    .join(', ');

  const src = enhanceUrl(source).url();
  const dimensions = source.asset?.metadata?.dimensions || { width: 1024, height: 768 };

  return {
    src,
    srcSet,
    sizes: '(min-width: 1920px) 1920px, (min-width: 1536px) 1536px, (min-width: 1280px) 1280px, (min-width: 1024px) 1024px, (min-width: 768px) 768px, (min-width: 640px) 640px, (min-width: 480px) 480px, (min-width: 320px) 320px, 100vw',
    width: dimensions.width,
    height: dimensions.height
  };
}