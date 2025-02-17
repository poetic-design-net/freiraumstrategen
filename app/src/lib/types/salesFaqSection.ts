import type { Section } from '$lib/sanity/queries/types'

export interface FAQ {
  _id: string
  title: string
  question: string
  answer: string
  additionalInfo?: string
  isExpanded?: boolean
}

export interface ContactInfo {
  text?: string
  email?: string
}

export interface SalesFaqButton {
  text: string
  link: string
}

export interface SalesFaqSection extends Section {
  _type: 'salesFaqSection'
  badge?: string
  title: string
  subtitle?: string
  faqs: FAQ[]
  contactInfo?: ContactInfo
  ctaButton?: SalesFaqButton
}

// Type guard
export function isSalesFaqSection(section: any): section is SalesFaqSection {
  return section._type === 'salesFaqSection'
}
