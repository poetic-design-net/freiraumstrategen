import type { Section } from '$lib/sanity/queries/types'
import type { SanityImageSource } from "@sanity/image-url/lib/types/types"
import type { PortableTextBlock } from '@portabletext/types'
import type { SectionStyles } from '$lib/utils/sections/themeStyles'

export interface SalesContentSectionFullWidth extends Section {
  _type: 'salesContentSectionFullWidth'
  enabled: boolean
  styles?: SectionStyles
  badge?: string
  title: string
  subtitle?: string
  leftColumnContent?: PortableTextBlock[]
  rightColumnContent?: PortableTextBlock[]
  fullWidthImage?: {
    _type: 'image'
    asset: SanityImageSource
    alt?: string
  }
  imagePosition: 'left' | 'right'
}

// Type guard ist jetzt in salesSections.ts für konsistentes Verhalten mit anderen Sales Sections