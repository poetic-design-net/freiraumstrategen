import type { SectionStyles } from '../themeStyles'
import { isSectionStyles } from '../guards/sectionStyles'

export function transformSectionStyles(value: unknown): SectionStyles {
  if (!isSectionStyles(value)) {
    // Return default styles if invalid
    return {
      theme: 'light',
      padding: {
        top: '20',
        bottom: '20'
      },
      overflow: true
    }
  }

  // Clean up padding values
  if (value.padding) {
    const cleanPadding = Object.entries(value.padding).reduce((acc, [key, val]) => {
      if (val) {
        acc[key as keyof typeof value.padding] = val
      }
      return acc
    }, {} as NonNullable<SectionStyles['padding']>)

    return {
      ...value,
      padding: Object.keys(cleanPadding).length > 0 ? cleanPadding : undefined
    }
  }

  return value
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
    return {
      theme: 'light',
      padding: {
        top: '20',
        bottom: '20'
      },
      overflow: true
    }
  }
}
