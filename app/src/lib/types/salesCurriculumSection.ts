import type { Section } from '$lib/sanity/queries/types'

export interface CurriculumModule {
  week: number
  title: string
  description: string
  topics: string[]
}

export type BonusBoxStyle = 'orange' | 'primary' | 'gray'

export interface BonusBox {
  title: string
  description: string
  style?: BonusBoxStyle
  ctaButton?: {
    text: string
    link: string
  }
}

export interface SalesCurriculumSection extends Section {
  _type: 'salesCurriculumSection'
  badge?: string
  title: string
  subtitle?: string
  modules: CurriculumModule[]
  bonusBox: BonusBox
}

// Type guard
export function isSalesCurriculumSection(section: any): section is SalesCurriculumSection {
  return section._type === 'salesCurriculumSection'
}
