import type { SectionStyles } from '../themeStyles'
import { isSectionStyles } from '../guards/sectionStyles'

const DEFAULT_STYLES: SectionStyles = {
  theme: 'light',
  padding: {
    top: '20',
    bottom: '20',
    topLg: '24',
    bottomLg: '24',
    topXl: '24',
    bottomXl: '32'
  },
  overflow: true
}

export function transformSectionStyles(value: unknown): SectionStyles {
  if (!value || typeof value !== 'object') {
    return DEFAULT_STYLES
  }

  if (!isSectionStyles(value)) {
    return DEFAULT_STYLES
  }

  // Ensure theme is always set
  const theme = value.theme || DEFAULT_STYLES.theme

  // Clean up padding values while preserving defaults
  const padding = value.padding
    ? Object.entries(value.padding).reduce((acc, [key, val]) => {
        if (val) {
          acc[key as keyof typeof value.padding] = val
        } else if (DEFAULT_STYLES.padding?.[key as keyof typeof DEFAULT_STYLES.padding]) {
          // Use default value if available
          acc[key as keyof typeof value.padding] = DEFAULT_STYLES.padding[key as keyof typeof DEFAULT_STYLES.padding]
        }
        return acc
      }, {} as NonNullable<SectionStyles['padding']>)
    : DEFAULT_STYLES.padding

  // Ensure overflow has a default value
  const overflow = typeof value.overflow === 'boolean' ? value.overflow : DEFAULT_STYLES.overflow

  return {
    theme,
    padding: Object.keys(padding || {}).length > 0 ? padding : DEFAULT_STYLES.padding,
    overflow,
    ...(value.customClasses ? { customClasses: value.customClasses } : {})
  }
}

export function transformSectionStylesToString(value: unknown): string {
  const styles = transformSectionStyles(value)
  return JSON.stringify(styles, null, 2)
}

export function transformStringToSectionStyles(value: string): SectionStyles {
  try {
    const parsed = JSON.parse(value)
    return transformSectionStyles(parsed)
  } catch {
    return DEFAULT_STYLES
  }
}
