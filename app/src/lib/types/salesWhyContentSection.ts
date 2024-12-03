import type { Section } from '$lib/sanity/queries/types'
import type { PortableTextBlock } from '@portabletext/types'

interface Stat {
  value: string
  label: string
}

export interface SalesWhyContentSection extends Section {
  _type: 'salesWhyContentSection'
  badge?: string
  title: string
  leftColumnContent?: PortableTextBlock[]
  rightColumnContent?: PortableTextBlock[]
  bulletPoints?: string[]
  stats?: Stat[]
}

// Type guard
export function isSalesWhyContentSection(section: any): section is SalesWhyContentSection {
  return section._type === 'salesWhyContentSection'
}
