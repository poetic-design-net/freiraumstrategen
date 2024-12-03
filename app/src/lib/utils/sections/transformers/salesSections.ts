import type { SalesHeroSection } from '$lib/types/salesHeroSection'
import type { SalesAdvantagesSection } from '$lib/types/salesAdvantagesSection'
import type { SalesContentSection } from '$lib/types/salesContentSection'
import type { SalesCurriculumSection } from '$lib/types/salesCurriculumSection'
import type { SalesEmotionalSection } from '$lib/types/salesEmotionalSection'
import type { SalesEmotionalFreedomSection } from '$lib/types/salesEmotionalFreedomSection'
import type { SalesFaqSection } from '$lib/types/salesFaqSection'
import type { SalesFeaturesSection } from '$lib/types/salesFeaturesSection'
import type { SalesForWhoSection } from '$lib/types/salesForWhoSection'
import type { SalesPricingSection } from '$lib/types/salesPricingSection'
import type { SalesWhyContentSection } from '$lib/types/salesWhyContentSection'

export function isSalesHeroSection(section: any): section is SalesHeroSection {
  return section._type === 'salesHeroSection'
}

export function getSalesHeroProps(section: SalesHeroSection) {
  if (!isSalesHeroSection(section)) {
    throw new Error('Invalid section type')
  }

  return {
    ...section,
    stats: section.stats || [],
    description: section.description || '',
    primaryCTA: section.primaryCTA || {
      text: '',
      link: ''
    },
    secondaryCTA: section.secondaryCTA || {
      text: '',
      link: ''
    },
    videoButton: section.videoButton || {
      text: 'Watch Video',
      duration: '',
      videoId: ''
    },
    headline: section.headline || '',
    subheadline: section.subheadline || '',
    backgroundImage: section.backgroundImage || {
      _type: 'image',
      asset: null,
      alt: ''
    }
  }
}

export function isSalesAdvantagesSection(section: any): section is SalesAdvantagesSection {
  return section._type === 'salesAdvantagesSection'
}

export function getSalesAdvantagesProps(section: SalesAdvantagesSection) {
  if (!isSalesAdvantagesSection(section)) {
    throw new Error('Invalid section type')
  }

  return {
    ...section,
    badge: section.badge || '',
    title: section.title || '',
    subtitle: section.subtitle || '',
    advantages: section.advantages || [],
    ctaButton: section.ctaButton || {
      text: '',
      link: ''
    }
  }
}

export function isSalesContentSection(section: any): section is SalesContentSection {
  return section._type === 'salesContentSection'
}

export function getSalesContentProps(section: SalesContentSection) {
  if (!isSalesContentSection(section)) {
    throw new Error('Invalid section type')
  }

  return {
    ...section,
    badge: section.badge || '',
    title: section.title || '',
    subtitle: section.subtitle || '',
    leftColumnContent: section.leftColumnContent || [],
    rightColumnContent: section.rightColumnContent || [],
    benefits: section.benefits || [],
    image: section.image || {
      _type: 'image',
      asset: null,
      alt: ''
    }
  }
}

export function isSalesCurriculumSection(section: any): section is SalesCurriculumSection {
  return section._type === 'salesCurriculumSection'
}

export function getSalesCurriculumProps(section: SalesCurriculumSection) {
  if (!isSalesCurriculumSection(section)) {
    throw new Error('Invalid section type')
  }

  return {
    ...section,
    badge: section.badge || '',
    title: section.title || '',
    subtitle: section.subtitle || '',
    modules: section.modules || [],
    bonusBox: section.bonusBox || {
      title: '',
      description: '',
      ctaButton: {
        text: '',
        link: ''
      }
    }
  }
}

export function isSalesEmotionalSection(section: any): section is SalesEmotionalSection {
  return section._type === 'salesEmotionalSection'
}

export function getSalesEmotionalProps(section: SalesEmotionalSection) {
  if (!isSalesEmotionalSection(section)) {
    throw new Error('Invalid section type')
  }

  return {
    ...section,
    badge: section.badge || '',
    title: section.title || '',
    description: section.description || '',
    quote: section.quote || '',
    backgroundImage: section.backgroundImage || {
      _type: 'image',
      asset: null,
      alt: ''
    },
    ctaButton: section.ctaButton || {
      text: '',
      link: ''
    }
  }
}

export function isSalesEmotionalFreedomSection(section: any): section is SalesEmotionalFreedomSection {
  return section._type === 'salesEmotionalFreedomSection'
}

export function getSalesEmotionalFreedomProps(section: SalesEmotionalFreedomSection) {
  if (!isSalesEmotionalFreedomSection(section)) {
    throw new Error('Invalid section type')
  }

  return {
    ...section,
    badge: section.badge || '',
    title: section.title || '',
    description: section.description || '',
    additionalText: section.additionalText || '',
    backgroundImage: section.backgroundImage || {
      _type: 'image',
      asset: null,
      alt: ''
    },
    ctaButton: section.ctaButton || {
      text: '',
      link: ''
    }
  }
}

export function isSalesFaqSection(section: any): section is SalesFaqSection {
  return section._type === 'salesFaqSection'
}

export function getSalesFaqProps(section: SalesFaqSection) {
  if (!isSalesFaqSection(section)) {
    throw new Error('Invalid section type')
  }

  return {
    ...section,
    badge: section.badge || '',
    title: section.title || '',
    subtitle: section.subtitle || '',
    faqs: section.faqs || [],
    contactInfo: section.contactInfo || {
      text: '',
      email: ''
    },
    ctaButton: section.ctaButton || {
      text: '',
      link: ''
    }
  }
}

export function isSalesFeaturesSection(section: any): section is SalesFeaturesSection {
  return section._type === 'salesFeaturesSection'
}

export function getSalesFeaturesProps(section: SalesFeaturesSection) {
  if (!isSalesFeaturesSection(section)) {
    throw new Error('Invalid section type')
  }

  return {
    ...section,
    badge: section.badge || '',
    title: section.title || '',
    subtitle: section.subtitle || '',
    features: section.features || [],
    ctaButton: section.ctaButton || {
      text: '',
      link: ''
    }
  }
}

export function isSalesForWhoSection(section: any): section is SalesForWhoSection {
  return section._type === 'salesForWhoSection'
}

export function getSalesForWhoProps(section: SalesForWhoSection) {
  if (!isSalesForWhoSection(section)) {
    throw new Error('Invalid section type')
  }

  return {
    ...section,
    badge: section.badge || '',
    title: section.title || '',
    subtitle: section.subtitle || '',
    profiles: section.profiles || [],
    requirements: section.requirements || [],
    ctaButton: section.ctaButton || {
      text: '',
      link: ''
    }
  }
}

export function isSalesPricingSection(section: any): section is SalesPricingSection {
  return section._type === 'salesPricingSection'
}

export function getSalesPricingProps(section: SalesPricingSection) {
  if (!isSalesPricingSection(section)) {
    throw new Error('Invalid section type')
  }

  return {
    ...section,
    badge: section.badge || '',
    title: section.title || '',
    subtitle: section.subtitle || '',
    earlyBirdBadge: section.earlyBirdBadge || '',
    pricing: section.pricing || {
      originalPrice: '',
      currentPrice: '',
      paymentInfo: ''
    },
    features: section.features || [],
    bonuses: section.bonuses || [],
    ctaButton: section.ctaButton || {
      text: '',
      link: ''
    },
    guaranteeBox: section.guaranteeBox || {
      title: '',
      description: ''
    },
    trustElements: section.trustElements || []
  }
}

export function isSalesWhyContentSection(section: any): section is SalesWhyContentSection {
  return section._type === 'salesWhyContentSection'
}

export function getSalesWhyContentProps(section: SalesWhyContentSection) {
  if (!isSalesWhyContentSection(section)) {
    throw new Error('Invalid section type')
  }

  return {
    ...section,
    badge: section.badge || '',
    title: section.title || '',
    leftColumnContent: section.leftColumnContent || [],
    rightColumnContent: section.rightColumnContent || [],
    bulletPoints: section.bulletPoints || [],
    stats: section.stats || []
  }
}
