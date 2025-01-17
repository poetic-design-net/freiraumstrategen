import type { Section } from '$lib/sanity/queries/types'
import type { SanityImageSource } from "@sanity/image-url/lib/types/types"
import type { PortableTextBlock } from '@portabletext/types'

export interface Column {
  highlightedContent?: PortableTextBlock[]
  regularContent?: PortableTextBlock[]
}

export interface SalesContentSection extends Section {
  _type: 'salesContentSection'
  badge?: string
  title: string
  subtitle?: string
  layout?: 'single' | 'double'  // Add layout option
  leftColumn: Column
  rightColumn: Column
  image: {
    _type: 'image'
    asset: SanityImageSource
    alt?: string
  }
  benefitsIntro?: string
  benefits: string[]
}

// Type guard
export function isSalesContentSection(section: any): section is SalesContentSection {
  return section._type === 'salesContentSection'
}
