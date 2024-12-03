import type { Section } from '$lib/sanity/queries/types'

export interface Profile {
  title: string
  description: string
}

export interface Requirement {
  title: string
  points: string[]
}

export interface SalesForWhoButton {
  text: string
  link: string
}

export interface SalesForWhoSection extends Section {
  _type: 'salesForWhoSection'
  badge?: string
  title: string
  subtitle?: string
  profiles: Profile[]
  requirements: Requirement[]
  ctaButton?: SalesForWhoButton
  bottomText?: string
}

// Type guard
export function isSalesForWhoSection(section: any): section is SalesForWhoSection {
  return section._type === 'salesForWhoSection'
}
