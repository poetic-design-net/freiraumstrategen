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

// Optimierte Breakpoints basierend auf typischen Viewport-Größen und Hero-Bilder
const breakpoints = [320, 480, 640, 768, 1024, 1280, 1536, 1920];

export function enhanceUrl(source: SanityImageSource, width?: number) {
  // Bestimme die optimale Bildbreite basierend auf dem nächstgrößeren Breakpoint
  const defaultWidth = breakpoints[0];
  const optimalWidth = !width ? defaultWidth : 
    breakpoints.find(bp => bp >= width) || breakpoints[breakpoints.length - 1];

  // Basiseinstellungen für das Bild
  const baseImage = builder
    .image(source)
    .auto('format') // Erlaubt Sanity die beste Format-Auswahl
    .fit('max')
    .sharpen(1)
    .forceDownload(false);

  // Setze die Breite entsprechend der Breakpoints
  if (optimalWidth) {
    baseImage.width(optimalWidth);
  }

  // Füge format-spezifische Qualitätseinstellungen hinzu
  baseImage
    .format('webp') // Setze WebP als Standardformat
    .quality(85); // Höhere Qualität für WebP, da es besser komprimiert
    
  return baseImage;
}

export function getResponsiveImage(source: SanityImageSource) {
  if (!source?.asset?._ref) return null;

  // Generate standard WebP srcSet
  const srcSet = breakpoints
    .map(width => {
      const url = enhanceUrl(source, width)
        .format('webp')
        .quality(85)
        .url();
      return `${url} ${width}w`;
    })
    .join(', ');

  // Generate AVIF srcSet
  const avifSrcSet = breakpoints
    .map(width => {
      const url = enhanceUrl(source, width)
        .format('webp') // Sanity wandelt dies serverseitig in AVIF um wenn möglich
        .quality(75)
        .url();
      return `${url} ${width}w`;
    })
    .join(', ');

  // Verwende WebP als Standardformat für src
  const src = enhanceUrl(source)
    .format('webp')
    .quality(85)
    .url();

  // Get original image dimensions
  const dimensions = source.asset?.metadata?.dimensions || { width: 1024, height: 768 };
  
  return {
    src,
    srcSet,
    avifSrcSet,
    sizes: '(min-width: 1920px) 1920px, (min-width: 1536px) 1536px, (min-width: 1280px) 1280px, (min-width: 1024px) 1024px, (min-width: 768px) 768px, (min-width: 640px) 640px, (min-width: 480px) 480px, (min-width: 320px) 320px, 100vw',
    width: dimensions.width,
    height: dimensions.height
  };
}
