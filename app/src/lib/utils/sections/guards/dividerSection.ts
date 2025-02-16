import type { DividerSection } from '$lib/types/dividerSection'

export function isDividerSection(value: unknown): value is DividerSection {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const section = value as DividerSection;

  return (
    section._type === 'dividerSection' &&
    typeof section.headlineGreen === 'string' &&
    typeof section.headlineWhite === 'string' &&
    section.enabled !== false
  );
}

export function assertDividerSection(value: unknown): asserts value is DividerSection {
  if (!isDividerSection(value)) {
    throw new Error('Invalid divider section')
  }
}

export function getDividerSectionProps(section: DividerSection) {
  return section // Gesamte Section durchreichen, einschließlich der ID
}