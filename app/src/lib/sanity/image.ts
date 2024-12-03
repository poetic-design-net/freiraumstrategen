import imageUrlBuilder from '@sanity/image-url';
import type { Image } from '@sanity/types';
import { client } from './client';

const builder = imageUrlBuilder(client);

export function urlFor(source: Image) {
  return builder.image(source).auto('format').fit('max');
}

export function enhanceUrl(source: Image, width?: number) {
  const baseImage = builder
    .image(source)
    .auto('format')
    .format('webp')
    .quality(80)
    .fit('max')
    .sharpen(1);
    
  return width ? baseImage.width(width) : baseImage;
}

// Breakpoint widths for responsive images
const breakpoints = [640, 768, 1024, 1280, 1536];

export function getResponsiveImage(source: Image) {
  if (!source?.asset?._ref) return null;

  const srcSet = breakpoints
    .map(width => {
      const url = enhanceUrl(source, width).url();
      return `${url} ${width}w`;
    })
    .join(', ');

  const src = enhanceUrl(source).url();

  return {
    src,
    srcSet,
    sizes: '(min-width: 1536px) 1536px, (min-width: 1280px) 1280px, (min-width: 1024px) 1024px, (min-width: 768px) 768px, (min-width: 640px) 640px, 100vw'
  };
}
