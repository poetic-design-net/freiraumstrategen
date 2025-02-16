import imageUrlBuilder from '@sanity/image-url';
import { client } from './client';

const builder = imageUrlBuilder(client);
const breakpoints = [640, 768, 1024, 1280, 1536, 1920];

export function urlFor(
  source: SanityImageSource,
  options: { width?: number; height?: number } = {}
): string | null {
  if (!source?.asset?._ref) return null;

  let imageBuilder = builder.image(source)
    .auto('format')
    .fit('max');

  if (options.width) {
    imageBuilder = imageBuilder.width(options.width);
  }

  if (options.height) {
    imageBuilder = imageBuilder.height(options.height);
  }

  return imageBuilder.url();
}

export function enhanceUrl(
  url: string, 
  options: { width?: number; height?: number } = {}
): string {
  if (!url) return '';

  // Erstelle eine URL mit Parametern
  const params = new URLSearchParams();
  params.set('auto', 'format');
  params.set('fit', 'max');

  if (options.width) {
    params.set('w', options.width.toString());
  }
  if (options.height) {
    params.set('h', options.height.toString());
  }

  // Füge Parameter zur URL hinzu
  const separator = url.includes('?') ? '&' : '?';
  return `${url}${separator}${params.toString()}`;
}

export function getResponsiveImage(
  source: any,
  options: {
    maxWidth?: number;
    maxHeight?: number;
    sizes?: string;
    quality?: number; // Neue Option für Qualität
  } = {}
): {
  src: string;
  srcSet: string;
  sizes: string;
  width: number;
  height: number;
} | null {
  if (!source?.asset) return null;

  try {
    const maxWidth = options.maxWidth || 1920;
    const quality = options.quality || 100; // Höhere Default-Qualität
    const usedBreakpoints = breakpoints.filter(w => w <= maxWidth);

    // Generate srcSet using image builder
    const srcSet = usedBreakpoints
      .map(width => {
        const imgBuilder = builder.image(source)
          .auto('format')
          .fit('max')
          .width(width)
          .quality(quality); // Qualität setzen

        if (options.maxHeight) {
          const height = Math.round((width * options.maxHeight) / maxWidth);
          imgBuilder.height(height);
        }

        return `${imgBuilder.url()} ${width}w`;
      })
      .join(', ');

    // Base image using smallest breakpoint
    const baseImageBuilder = builder.image(source)
      .auto('format')
      .fit('max')
      .width(usedBreakpoints[0])
      .quality(quality); // Qualität auch für Base-Image

    if (options.maxHeight) {
      const height = Math.round((usedBreakpoints[0] * options.maxHeight) / maxWidth);
      baseImageBuilder.height(height);
    }

    // Default sizes string
    const defaultSizes = [
      '(min-width: 1536px) 1920px',
      '(min-width: 1280px) 1536px',
      '(min-width: 1024px) 1280px',
      '(min-width: 768px) 1024px',
      '(min-width: 640px) 768px',
      '100vw'
    ].join(', ');

    return {
      src: baseImageBuilder.url(),
      srcSet,
      sizes: options.sizes || defaultSizes,
      width: maxWidth,
      height: options.maxHeight || maxWidth
    };

  } catch (error) {
    console.error('Error in getResponsiveImage:', error);
    return null;
  }
}