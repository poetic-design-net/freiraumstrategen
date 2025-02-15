import type { DividerSection } from './dividerSection'

// Füge DividerSection zum Union Type hinzu
export type Section =
  | DividerSection
  // ... andere Section Types

// Füge DividerSection zum Mapping hinzu
export const sectionTypeMap = {
  'dividerSection': 'dividerSection',
  // ... andere Section Types
} as const
