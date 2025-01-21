import type { HeroSectionData, ContentSectionData, CallToActionSectionData, TestimonialSectionData, LegacyContentSection } from '$lib/types/sections';
import type { StepSectionData, ContentSectionAltData } from '$lib/sanity/queries/types';
import type { ContentSectionProps, ContentSectionLayout, ContentSectionTheme, Column } from '$lib/types/contentSection';
import type { CasePageReference, CasePostReference, CaseSectionProps, CaseSectionData } from '$lib/types/caseSection';
import type { KachelSection, KachelSectionProps } from '$lib/types/kachelSection';
import type { FeatureSectionData, FeatureIcon } from '$lib/types/featureSection';
import type { ReviewSectionData, ReviewSectionProps } from '$lib/types/reviewSection';
import { defaultCaseSectionProps } from '$lib/types/caseSection';
import { defaultColumn } from '$lib/types/contentSection';
import type { Image } from '@sanity/types';
import { urlFor } from '$lib/sanity/image';

export function getKachelSectionProps(section: KachelSection): KachelSectionProps {
  return {
    enabled: section.enabled,
    heading: {
      badge: section.heading?.badge || 'WISSENSWERTES',
      title: {
        regular: section.heading?.title?.regular || 'Hier findest du',
        light: section.heading?.title?.light || 'alles was du wissen musst'
      }
    },
    description: section.description || '',
    mainKachel: {
      image: {
        asset: section.mainKachel?.image?.asset,
        alt: section.mainKachel?.image?.alt || 'Kachel Image'
      },
      badge: section.mainKachel?.badge || '',
      title: section.mainKachel?.title || '',
      button: {
        text: section.mainKachel?.button?.text || '',
        link: section.mainKachel?.button?.link || ''
      }
    },
    sideKacheln: section.sideKacheln?.map(kachel => ({
      title: kachel.title || '',
      description: kachel.description || '',
      link: kachel.link || '',
      backgroundColor: kachel.backgroundColor || 'gray'
    })) || []
  };
}

export function getHeroSectionProps(section: HeroSectionData) {
  return {
    gradientText: section.gradientText,
    heading: {
      highlighted: section.heading?.highlighted || '',
      regular: section.heading?.regular || ''
    },
    button: {
      text: section.button?.text || 'Kennenlerntour starten',
      link: section.button?.link || ''
    },
    partners: {
      heading: section.partners?.heading || 'Unsere zuverlässigen Partner',
      logos: section.partners?.logos || []
    },
    heroImage: section.heroImage || {
      _type: 'image',
      asset: {
        _type: 'reference',
        _ref: 'image-default-hero-image'
      }
    },
    stats: {
      number: section.stats?.number || '100+',
      text: section.stats?.text || 'Zufriedene Freiraumstrategen',
      avatars: section.stats?.avatars || []
    }
  };
}

function convertToPortableText(text: string | string[]) {
  const texts = Array.isArray(text) ? text : [text];
  return texts.map(t => ({
    _type: 'block',
    children: [{
      _type: 'span',
      text: t
    }],
    markDefs: [],
    style: 'normal'
  }));
}

export function getContentSectionProps(section: ContentSectionData & LegacyContentSection): ContentSectionProps {
  if (!section) return {};

  const leftColumn: Column = {
    ...defaultColumn,
    highlightedContent: section.leftColumn?.highlightedContent || [],
    regularContent: section.leftColumn?.regularContent || []
  };

  const rightColumn: Column = {
    ...defaultColumn,
    highlightedContent: section.rightColumn?.highlightedContent || [],
    regularContent: section.rightColumn?.regularContent || []
  };

  return {
    enabled: section.enabled ?? true,
    layout: section.layout ?? 'single-column',
    theme: section.theme ?? 'light-gray', // Changed default theme to light-gray
    header: section.header ? {
      badge: section.header.badge || '',
      heading: {
        regular: section.header.heading?.regular || '',
        thin: section.header.heading?.thin || ''
      }
    } : undefined,
    leftColumn,
    rightColumn,
    backgroundImage: section.backgroundImage ? {
      _type: 'image',
      asset: section.backgroundImage.asset,
      alt: section.backgroundImage.alt
    } : undefined
  };
}

export function getContentSectionAltProps(section: ContentSectionAltData) {
  return {
    enabled: section.enabled,
    backgroundImage: section.backgroundImage,
    leftColumn: {
      badge: section.leftColumn?.badge || '',
      heading: {
        line1: section.leftColumn?.heading?.line1 || '',
        line2: section.leftColumn?.heading?.line2 || '',
        line3: section.leftColumn?.heading?.line3 || ''
      },
      paragraphs: section.leftColumn?.paragraphs || [],
      button: {
        text: section.leftColumn?.button?.text || '',
        link: section.leftColumn?.button?.link || '',
        variant: (section.leftColumn?.button?.variant || 'orange') as 'orange' | 'primary' | 'secondary'
      }
    },
    rightColumn: {
      heading: section.rightColumn?.heading || '',
      paragraphs: section.rightColumn?.paragraphs || [],
      imageSlider: {
        images: section.rightColumn?.imageSlider?.images || [],
        settings: {
          autoplaySpeed: section.rightColumn?.imageSlider?.settings?.autoplaySpeed || 5000,
          transitionDuration: section.rightColumn?.imageSlider?.settings?.transitionDuration || 800
        }
      }
    }
  };
}

export function getStepSectionProps(section: StepSectionData) {
  return {
    enabled: section.enabled,
    badge: section.badge || 'Schritt für Schritt erklärt',
    heading: {
      thin: section.heading?.thin || 'In wenigen Schritten',
      regular: section.heading?.regular || 'zum Erfolg'
    },
    steps: section.steps?.map(step => ({
      number: step.number,
      title: step.title || '',
      description: step.description || '',
      image: step.image
    })) || []
  };
}

function preserveImageData(image: any) {
  if (!image?.asset) return undefined;

  return {
    _type: 'image',
    asset: {
      _ref: image.asset._ref,
      _id: image.asset._id,
      url: image.asset.url,
      metadata: image.asset.metadata
    },
    ...(image.alt && { alt: image.alt }),
    ...(image.hotspot && { hotspot: image.hotspot }),
    ...(image.crop && { crop: image.crop })
  };
}

export function getCaseSectionProps(section: CaseSectionData): CaseSectionProps {
  if (!section) return defaultCaseSectionProps;

  const selectedPages = (section.selectedPages || [])
    .filter(Boolean)
    .map((page: any) => {
      if (!page) return null;

      const transformedPage = {
        ...page,
        _type: 'page' as const
      };

      if (page.hero?.backgroundImage) {
        transformedPage.hero = {
          ...page.hero,
          backgroundImage: preserveImageData(page.hero.backgroundImage)
        };
      }

      if (page.seo?.openGraphImage) {
        transformedPage.seo = {
          ...page.seo,
          openGraphImage: preserveImageData(page.seo.openGraphImage)
        };
      }

      if (page.sections?.[0]?.backgroundImage) {
        transformedPage.sections = [{
          ...page.sections[0],
          backgroundImage: preserveImageData(page.sections[0].backgroundImage)
        }];
      }

      return transformedPage;
    })
    .filter(Boolean) as CasePageReference[];

  const selectedPosts = (section.selectedPosts || [])
    .filter(Boolean)
    .map((post: any) => {
      if (!post) return null;

      const transformedPost = {
        ...post,
        _type: 'post' as const
      };

      if (post.mainImage) {
        transformedPost.mainImage = preserveImageData(post.mainImage);
      }

      return transformedPost;
    })
    .filter(Boolean) as CasePostReference[];

  return {
    _type: section._type,
    _key: section._key,
    enabled: section.enabled ?? defaultCaseSectionProps.enabled,
    badge: section.badge || defaultCaseSectionProps.badge,
    title: section.title || defaultCaseSectionProps.title,
    subtitle: section.subtitle || defaultCaseSectionProps.subtitle,
    description: section.description || defaultCaseSectionProps.description,
    selectedPages,
    selectedPosts,
    displaySettings: {
      showHeroImage: section.displaySettings?.showHeroImage ?? defaultCaseSectionProps.displaySettings.showHeroImage,
      customExcerptLength: section.displaySettings?.customExcerptLength ?? defaultCaseSectionProps.displaySettings.customExcerptLength
    },
    animation: {
      enabled: section.animation?.enabled ?? defaultCaseSectionProps.animation.enabled,
      duration: section.animation?.duration ?? defaultCaseSectionProps.animation.duration
    }
  };
}

export function getCallToActionProps(section: CallToActionSectionData) {
  return {
    content: section.content,
    form: section.form,
    design: section.design,
    animation: section.animation
  };
}

export function getTestimonialsSectionProps(section: TestimonialSectionData): TestimonialSectionData {
  return {
    _type: 'testimonialSection',
    _key: section._key,
    enabled: section.enabled,
    header: {
      badge: section.header?.badge || 'Testimonials',
      heading: {
        regular: section.header?.heading?.regular || 'Was sagen',
        thin: section.header?.heading?.thin || 'die Teilnehmer'
      },
      subtitle: section.header?.subtitle || 'Wie lebt es sich so?'
    },
    testimonials: section.testimonials || [],
    animation: {
      slideDuration: section.animation?.slideDuration ?? 400,
      dragThreshold: section.animation?.dragThreshold ?? 15
    },
    navigation: {
      showArrows: section.navigation?.showArrows ?? true,
      showDots: section.navigation?.showDots ?? true,
      enableKeyboard: section.navigation?.enableKeyboard ?? true,
      enableDrag: section.navigation?.enableDrag ?? true
    }
  };
}

export function getFeatureSectionProps(section: FeatureSectionData): FeatureSectionData {
  return {
    _type: 'featuresSection',
    _key: section._key,
    enabled: section.enabled ?? true,
    layout: section.layout || 'withVideo',
    eyebrow: section.eyebrow || '',
    title: section.title || '',
    subtitle: section.subtitle || '',
    videoId: section.videoId || '',
    features: section.features?.map(feature => ({
      title: feature.title || '',
      subtitle: feature.subtitle || '',
      subtitle_hover: feature.subtitle_hover || '',
      icon: (feature.icon || 'education') as FeatureIcon,
      description: feature.description || [],
      link: feature.link ? { 
        text: feature.link.text || '',
        href: feature.link.href || ''
      } : undefined
    })) || []
  };
}
export function getReviewSectionProps(section: ReviewSectionData): ReviewSectionProps {
  return {
    _type: 'reviewSection',
    _key: section._key,
    enabled: section.enabled ?? true,
    header: {
      badge: section.header?.badge || 'Bewertungen',
      heading: {
        regular: section.header?.heading?.regular || 'Was sagen unsere',
        thin: section.header?.heading?.thin || 'Kunden'
      },
      subtitle: section.header?.subtitle || ''
    },
    googlePlaces: {
      placeId: section.googlePlaces?.placeId || '',
      maxReviews: section.googlePlaces?.maxReviews || 5
    },
    // reviews wird später durch die API befüllt
    reviews: []
  };
}

export function getBlogSectionProps(section: any) {
  return {
    enabled: section.enabled ?? true,
    eyebrow: section.eyebrow || 'BLOG',
    title: section.title || 'News und',
    titleAccent: section.titleAccent || 'Artikel',
    maxPosts: section.maxPosts || 4,
    posts: section.posts || []
  };
}
