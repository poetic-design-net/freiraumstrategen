import type { DividerSection } from '$lib/types/dividerSection'

export function isDividerSection(value: unknown): value is DividerSection {
  console.log('isDividerSection called with:', value);
  if (!value || typeof value !== 'object') {
    console.log('isDividerSection: value is not an object');
    return false;
  }

  const section = value as DividerSection;

  const result = (
    section._type === 'dividerSection' &&
    typeof section.headlineGreen === 'string' &&
    typeof section.headlineWhite === 'string' &&
    section.enabled !== false // Überprüft, ob die Section aktiviert ist
  );

  console.log('isDividerSection result:', result);
  return result;
}

export function assertDividerSection(value: unknown): asserts value is DividerSection {
  if (!isDividerSection(value)) {
    throw new Error('Invalid divider section')
  }
}

export function getDividerSectionProps(section: DividerSection) {
  return {
    headlineGreen: section.headlineGreen,
    headlineWhite: section.headlineWhite,
    enabled: section.enabled,
    // Fügen Sie hier weitere Eigenschaften hinzu, wenn nötig
  }
}