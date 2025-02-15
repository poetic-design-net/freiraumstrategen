import type { SalesContentSectionFullWidth } from '$lib/types/salesContentSectionFullWidth'

export function isSalesContentSectionFullWidth(section: unknown): section is SalesContentSectionFullWidth {
  return (
    typeof section === 'object' &&
    section !== null &&
    '_type' in section &&
    section._type === 'salesContentSectionFullWidth' &&
    'enabled' in section &&
    typeof section.enabled === 'boolean'
  )
}

export function getSalesContentSectionFullWidthProps(section: SalesContentSectionFullWidth) {
  return section;
}