import type { Section } from '$lib/sanity/queries/types'
import type { PortableTextBlock } from '@portabletext/types'

export interface SalesAdvantage {
  title: string
  shortText?: string
  fullText: PortableTextBlock[]
}

export interface SalesAdvantagesButton {
  text: string
  link: string
}

export interface SalesAdvantagesSection extends Section {
  _type: 'salesAdvantagesSection'
  badge?: string
  title: string
  subtitle?: string
  advantages: SalesAdvantage[]
  ctaButton?: SalesAdvantagesButton
}

// Type guard
export function isSalesAdvantagesSection(section: any): section is SalesAdvantagesSection {
  return section._type === 'salesAdvantagesSection'
}
