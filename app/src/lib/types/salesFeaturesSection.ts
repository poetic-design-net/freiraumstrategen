import type { Section } from '$lib/sanity/queries/types'

export type IconType = 'time' | 'chart' | 'team' | 'education' | 'structure' | 'strategy'
export type IconColor = 'primary' | 'blue' | 'green' | 'orange' | 'purple' | 'red'

export interface SalesFeature {
  title: string
  shortText: string
  icon?: IconType
  iconColor?: IconColor
}

export interface SalesFeaturesButton {
  text: string
  link: string
}

export interface SalesFeaturesSection extends Section {
  _type: 'salesFeaturesSection'
  badge?: string
  title: string
  subtitle?: string
  features: SalesFeature[]
  ctaButton?: SalesFeaturesButton
}

// Type guard
export function isSalesFeaturesSection(section: any): section is SalesFeaturesSection {
  return section._type === 'salesFeaturesSection'
}
