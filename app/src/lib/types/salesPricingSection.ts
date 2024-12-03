import type { Section } from '$lib/sanity/queries/types'

export interface PricingInfo {
  originalPrice: string
  currentPrice: string
  paymentInfo: string
}

export interface BonusItem {
  title: string
  value: string
  description: string
}

export interface GuaranteeBox {
  title: string
  description: string
}

export type TrustIconType = 'lock' | 'shield' | 'clock'

export interface TrustElement {
  icon: TrustIconType
  text: string
}

export interface SalesPricingButton {
  text: string
  link: string
}

export interface SalesPricingSection extends Section {
  _type: 'salesPricingSection'
  badge?: string
  title: string
  subtitle?: string
  earlyBirdBadge?: string
  pricing: PricingInfo
  features: string[]
  bonuses: BonusItem[]
  ctaButton?: SalesPricingButton
  guaranteeBox?: GuaranteeBox
  trustElements: TrustElement[]
}

// Type guard
export function isSalesPricingSection(section: any): section is SalesPricingSection {
  return section._type === 'salesPricingSection'
}
