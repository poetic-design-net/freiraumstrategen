import type { SectionStyles } from '../themeStyles'
import { isSectionStyles } from '../guards/sectionStyles'
import { defaultSectionStyles } from '../constants'

const DEFAULT_STYLES: SectionStyles = {
  theme: 'light',
  padding: {
    top: '24',
    bottom: '24'
  },
  overflow: true
}

// List of section types that should not have default padding
const NO_PADDING_SECTIONS = [
  'salesHeroSection',
  'heroSection',
  'uberunsHeroSection',
  'contactHeroSection',
  'dividerSection'
]

export function transformSectionStyles(value: unknown, sectionType?: string): SectionStyles {
  // For dividerSection, return an empty object
  if (sectionType === 'dividerSection') {
    return {}
  }

  // Get section-specific defaults or fall back to DEFAULT_STYLES
  const sectionDefaults = sectionType ? defaultSectionStyles[sectionType] || DEFAULT_STYLES : DEFAULT_STYLES;

  if (!value || typeof value !== 'object') {
    // For sections without padding, return styles without padding
    if (sectionType && NO_PADDING_SECTIONS.includes(sectionType)) {
      const { padding, ...restDefaults } = sectionDefaults
      return restDefaults
    }
    return sectionDefaults
  }

  if (!isSectionStyles(value)) {
    // For sections without padding, return styles without padding
    if (sectionType && NO_PADDING_SECTIONS.includes(sectionType)) {
      const { padding, ...restDefaults } = sectionDefaults
      return restDefaults
    }
    return sectionDefaults
  }

  // Ensure theme is always set
  const theme = value.theme || sectionDefaults.theme

  // Handle padding based on section type
  let padding = undefined
  if (!NO_PADDING_SECTIONS.includes(sectionType || '')) {
    if (value.padding) {
      padding = Object.entries(value.padding).reduce((acc, [key, val]) => {
        if (val) {
          acc[key as keyof typeof value.padding] = val
        } else if (sectionDefaults.padding?.[key as keyof typeof sectionDefaults.padding]) {
          // Use section-specific default value if available
          acc[key as keyof typeof value.padding] = sectionDefaults.padding[key as keyof typeof sectionDefaults.padding]
        }
        return acc
      }, {} as NonNullable<SectionStyles['padding']>)
    } else {
      padding = sectionDefaults.padding
    }
  }

  // Ensure overflow has a default value
  const overflow = typeof value.overflow === 'boolean' ? value.overflow : sectionDefaults.overflow

  return {
    theme,
    ...(padding ? { padding } : {}),
    overflow,
    ...(value.customClasses ? { customClasses: value.customClasses } : {})
  }
}

export function transformSectionStylesToString(value: unknown, sectionType?: string): string {
  const styles = transformSectionStyles(value, sectionType)
  return JSON.stringify(styles, null, 2)
}

export function transformStringToSectionStyles(value: string, sectionType?: string): SectionStyles {
  try {
    const parsed = JSON.parse(value)
    return transformSectionStyles(parsed, sectionType)
  } catch {
    return transformSectionStyles({}, sectionType)
  }
}
