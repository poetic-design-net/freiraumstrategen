import type { ThemeOption, PaddingConfig, SectionStyles } from '../themeStyles'

export function isSectionStyles(value: unknown): value is SectionStyles {
  if (!value || typeof value !== 'object') return false

  const styles = value as SectionStyles

  // Check theme
  if (styles.theme && !['light', 'light-gray', 'dark', 'primary'].includes(styles.theme)) {
    return false
  }

  // Check padding if present
  if (styles.padding) {
    const padding = styles.padding
    const validPaddingValues = ['12', '20', '24', '32']
    const paddingKeys = [
      'top', 'bottom',
      'topMd', 'bottomMd',
      'topLg', 'bottomLg',
      'topXl', 'bottomXl'
    ]

    for (const key of paddingKeys) {
      if (padding[key as keyof PaddingConfig] && 
          !validPaddingValues.includes(padding[key as keyof PaddingConfig]!)) {
        return false
      }
    }
  }

  // Check overflow
  if (styles.overflow !== undefined && typeof styles.overflow !== 'boolean') {
    return false
  }

  // Check customClasses
  if (styles.customClasses !== undefined && typeof styles.customClasses !== 'string') {
    return false
  }

  return true
}

export function assertSectionStyles(value: unknown): asserts value is SectionStyles {
  if (!isSectionStyles(value)) {
    throw new Error('Invalid section styles')
  }
}
