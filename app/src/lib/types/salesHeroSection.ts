import type { SanityImageSource } from "@sanity/image-url/lib/types/types"
import type { Section } from '$lib/sanity/queries/types'

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
}

export interface SalesHeroSection extends Section {
  _type: 'salesHeroSection'
  headline: string
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
  return section._type === 'salesHeroSection'
}
