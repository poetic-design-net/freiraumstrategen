import type { Section } from '$lib/sanity/queries/types'
import type { SanityImageSource } from "@sanity/image-url/lib/types/types"

export interface SalesEmotionalButton {
  text: string
  link: string
}

export interface SalesEmotionalSection extends Section {
  _type: 'salesEmotionalSection'
  badge?: string
  title: string
  description?: string
  quote?: string
  alignment?: 'left' | 'center' | 'right'
  backgroundImage: {
    _type: 'image'
    asset: SanityImageSource
    alt?: string
  }
  ctaButton?: SalesEmotionalButton
}

// Type guard
export function isSalesEmotionalSection(section: any): section is SalesEmotionalSection {
  return section._type === 'salesEmotionalSection'
}
