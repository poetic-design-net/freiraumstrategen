import type { SanityImageSource } from "@sanity/image-url/lib/types/types"
import type { Section } from '$lib/sanity/queries/types'
import type { PortableTextBlock } from '@portabletext/types'
import { isSectionStyles } from '$lib/utils/sections'

export interface SalesHeroStat {
  value: string
  label: string
}

export interface SalesHeroButton {
  text: string
  link: string
}

export interface SalesHeroVideo {
  text: string
  duration: string
  videoId: string
  platform?: 'youtube' | 'vimeo'
}

export interface SalesHeroSection extends Section {
  _type: 'salesHeroSection'
  headline: string
  headline2?: PortableTextBlock[]
  subheadline?: string
  backgroundImage: {
    _type: 'image'
    asset: SanityImageSource
    alt?: string
  }
  stats: SalesHeroStat[]
  description?: string
  primaryCTA?: SalesHeroButton
  secondaryCTA?: SalesHeroButton
  videoButton?: SalesHeroVideo
}

// Type guard
export function isSalesHeroSection(section: any): section is SalesHeroSection {
  if (!section || typeof section !== 'object') return false
  if (section._type !== 'salesHeroSection') return false

  // Check required fields
  if (typeof section.headline !== 'string') return false
  
  // Check optional fields
  if (section.headline2 && !Array.isArray(section.headline2)) return false
  if (section.subheadline && typeof section.subheadline !== 'string') return false
  
  // Check backgroundImage
  if (!section.backgroundImage || 
      section.backgroundImage._type !== 'image' || 
      !section.backgroundImage.asset) return false
      
  // Check stats array
  if (!Array.isArray(section.stats)) return false
  for (const stat of section.stats) {
    if (!stat || typeof stat.value !== 'string' || typeof stat.label !== 'string') {
      return false
    }
  }

  // Check optional description
  if (section.description && typeof section.description !== 'string') return false

  // Check optional CTAs
  if (section.primaryCTA && (
    typeof section.primaryCTA.text !== 'string' || 
    typeof section.primaryCTA.link !== 'string'
  )) return false

  if (section.secondaryCTA && (
    typeof section.secondaryCTA.text !== 'string' || 
    typeof section.secondaryCTA.link !== 'string'
  )) return false

  // Check optional video button
  if (section.videoButton) {
    if (
      typeof section.videoButton.text !== 'string' ||
      typeof section.videoButton.duration !== 'string' ||
      typeof section.videoButton.videoId !== 'string'
    ) return false

    // Check platform if present
    if (section.videoButton.platform &&
      !['youtube', 'vimeo'].includes(section.videoButton.platform)
    ) return false
  }

  // Check styles if present
  if (section.styles && !isSectionStyles(section.styles)) return false

  return true
}
