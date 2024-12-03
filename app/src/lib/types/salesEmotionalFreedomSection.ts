import type { Section } from '$lib/sanity/queries/types'
import type { SanityImageSource } from "@sanity/image-url/lib/types/types"

export interface SalesEmotionalFreedomButton {
  text: string
  link: string
}

export interface SalesEmotionalFreedomSection extends Section {
  _type: 'salesEmotionalFreedomSection'
  badge?: string
  title: string
  description?: string
  additionalText?: string
  backgroundImage: {
    _type: 'image'
    asset: SanityImageSource
    alt?: string
  }
  ctaButton?: SalesEmotionalFreedomButton
}

// Type guard
export function isSalesEmotionalFreedomSection(section: any): section is SalesEmotionalFreedomSection {
  return section._type === 'salesEmotionalFreedomSection'
}
