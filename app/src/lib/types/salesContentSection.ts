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
  layout?: 'single' | 'double' | 'fullWidth'
  contentWidth?: 'full' | 'max-w-5xl' | 'max-3-xl'
  headlineAlignment?: 'center' | 'left'
  leftColumnContent?: PortableTextBlock[]
  rightColumnContent?: PortableTextBlock[]
  imagePosition?: 'left' | 'right'
  image?: {
    _type: 'image'
    asset: SanityImageSource
    alt?: string
  }
  fullWidthImage?: {
    _type: 'image'
    asset: SanityImageSource
    alt?: string
  }
  button?: {
    text: string
    url: string
    style?: 'primary' | 'secondary' | 'orange' | 'green'
    size?: 'sm' | 'md' | 'lg'
  }
  benefitsIntro?: string
  benefits?: string[]
}

// Type guard
export function isSalesContentSection(section: any): section is SalesContentSection {
  return section._type === 'salesContentSection'
}
