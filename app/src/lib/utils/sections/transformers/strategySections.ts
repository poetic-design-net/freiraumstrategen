import type { 
  StrategyHeroSection, 
  StrategyIntroSection, 
  StrategyFeaturesSection, 
  StrategyFeaturesSectionAlt 
} from '$lib/types/strategySection';
import type { StrategyHeroProps } from '$lib/templates/StrategyHeroSection/types';

export function getStrategyHeroProps(section: StrategyHeroSection): StrategyHeroProps {
  return {
    enabled: section.enabled,
    headline: section.headline || { prefix: '', main: '' },
    backgroundImage: section.backgroundImage,
    statistics: section.statistics,
    cta: section.cta,
    video: section.video
  };
}

export function getStrategyIntroProps(section: StrategyIntroSection): StrategyIntroSection {
  return {
    _type: 'strategyIntroSection' as const,
    _key: section._key,
    enabled: section.enabled,
    heading: section.heading || {
      regular: '',
      thin: ''
    },
    content: section.content || {
      mainParagraph: '',
      secondaryParagraph: ''
    },
    teamCard: section.teamCard ? {
      title: section.teamCard.title || '',
      subtitle: section.teamCard.subtitle || '',
      members: (section.teamCard.members || []).map(member => ({
        image: member.image,
        name: member.name || ''
      }))
    } : {
      title: '',
      subtitle: '',
      members: []
    },
    mainImage: section.mainImage
  };
}

export function getStrategyFeaturesProps(
  section: StrategyFeaturesSection | StrategyFeaturesSectionAlt
): StrategyFeaturesSection | StrategyFeaturesSectionAlt {
  const baseProps = {
    _type: section._type,
    _key: section._key,
    enabled: section.enabled,
    badge: section.badge || '',
    heading: section.heading || {
      regular: '',
      highlighted: ''
    },
    content: section.content || {
      mainParagraph: '',
      secondaryParagraph: ''
    },
    features: (section.features || []).map(feature => ({
      title: feature.title || '',
      subtitle: feature.subtitle || '',
      subtitle_hover: feature.subtitle_hover || '',
      icon: feature.icon || 'time',
      iconColor: feature.iconColor || 'primary'
    })),
    mainImage: section.mainImage,
    testimonial: section.testimonial
  };

  if (section._type === 'strategyFeaturesSectionAlt') {
    return {
      ...baseProps,
      _type: 'strategyFeaturesSectionAlt' as const
    };
  }

  return {
    ...baseProps,
    _type: 'strategyFeaturesSection' as const
  };
}
