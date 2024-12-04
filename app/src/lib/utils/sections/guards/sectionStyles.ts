import type { ThemeOption, PaddingConfig, SectionStyles } from '../themeStyles'

const validThemes = ['light', 'light-gray', 'dark', 'primary'] as const
const validPaddingValues = ['12', '20', '24', '32'] as const
const paddingKeys = [
  'top', 'bottom',
  'topMd', 'bottomMd',
  'topLg', 'bottomLg',
  'topXl', 'bottomXl'
] as const

export function isSectionStyles(value: unknown): value is SectionStyles {
  // Allow null/undefined values - they'll be handled by the transformer
  if (!value) return true
  if (typeof value !== 'object') return false

  const styles = value as SectionStyles

  // Theme validation - allow undefined/null (will use default)
  if (styles.theme !== undefined && 
      styles.theme !== null && 
      !validThemes.includes(styles.theme as ThemeOption)) {
    return false
  }

  // Padding validation - allow undefined/null or partial padding objects
  if (styles.padding !== undefined && styles.padding !== null) {
    const padding = styles.padding

    // Ensure it's an object
    if (typeof padding !== 'object') return false

    // Check each defined padding value
    for (const key of paddingKeys) {
      const value = padding[key as keyof PaddingConfig]
      if (value !== undefined && 
          value !== null && 
          !validPaddingValues.includes(value as typeof validPaddingValues[number])) {
        return false
      }
    }
  }

  // Overflow validation - allow undefined/null (will use default)
  if (styles.overflow !== undefined && 
      styles.overflow !== null && 
      typeof styles.overflow !== 'boolean') {
    return false
  }

  // CustomClasses validation - allow undefined/null/empty string
  if (styles.customClasses !== undefined && 
      styles.customClasses !== null && 
      typeof styles.customClasses !== 'string') {
    return false
  }

  return true
}

export function assertSectionStyles(value: unknown): asserts value is SectionStyles {
  if (!isSectionStyles(value)) {
    throw new Error('Invalid section styles')
  }
}

// Export constants for use in other files
export const VALID_THEMES = validThemes
export const VALID_PADDING_VALUES = validPaddingValues
export const PADDING_KEYS = paddingKeys
