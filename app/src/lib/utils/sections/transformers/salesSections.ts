import type { SalesHeroSection } from '$lib/types/salesHeroSection';
import type { Section } from '$lib/sanity/queries/types';

export function isSalesHeroSection(section: any): section is SalesHeroSection {
  return (
    section &&
    typeof section === 'object' &&
    section._type === 'salesHeroSection' &&
    typeof section.enabled === 'boolean'
  );
}

export function getSalesHeroProps(section: SalesHeroSection) {
  return section;
}

export function isSalesAdvantagesSection(section: any): section is Section {
  return (
    section &&
    typeof section === 'object' &&
    section._type === 'salesAdvantagesSection' &&
    typeof section.enabled === 'boolean'
  );
}

export function getSalesAdvantagesProps(section: Section) {
  return section;
}

export function isSalesContentSection(section: any): section is Section {
  return (
    section &&
    typeof section === 'object' &&
    section._type === 'salesContentSection' &&
    typeof section.enabled === 'boolean'
  );
}

export function getSalesContentProps(section: Section) {
  return section;
}

export function isSalesCurriculumSection(section: any): section is Section {
  return (
    section &&
    typeof section === 'object' &&
    section._type === 'salesCurriculumSection' &&
    typeof section.enabled === 'boolean'
  );
}

export function getSalesCurriculumProps(section: Section) {
  return section;
}

export function isSalesEmotionalSection(section: any): section is Section {
  return (
    section &&
    typeof section === 'object' &&
    section._type === 'salesEmotionalSection' &&
    typeof section.enabled === 'boolean'
  );
}

export function getSalesEmotionalProps(section: Section) {
  return section;
}

export function isSalesEmotionalFreedomSection(section: any): section is Section {
  return (
    section &&
    typeof section === 'object' &&
    section._type === 'salesEmotionalFreedomSection' &&
    typeof section.enabled === 'boolean'
  );
}

export function getSalesEmotionalFreedomProps(section: Section) {
  return section;
}

export function isSalesFaqSection(section: any): section is Section {
  return (
    section &&
    typeof section === 'object' &&
    section._type === 'salesFaqSection' &&
    typeof section.enabled === 'boolean'
  );
}

export function getSalesFaqProps(section: Section) {
  return section;
}

export function isSalesFeaturesSection(section: any): section is Section {
  return (
    section &&
    typeof section === 'object' &&
    section._type === 'salesFeaturesSection' &&
    typeof section.enabled === 'boolean'
  );
}

export function getSalesFeaturesProps(section: Section) {
  return section;
}

export function isSalesForWhoSection(section: any): section is Section {
  return (
    section &&
    typeof section === 'object' &&
    section._type === 'salesForWhoSection' &&
    typeof section.enabled === 'boolean'
  );
}

export function getSalesForWhoProps(section: Section) {
  return section;
}

export function isSalesPricingSection(section: any): section is Section {
  return (
    section &&
    typeof section === 'object' &&
    section._type === 'salesPricingSection' &&
    typeof section.enabled === 'boolean'
  );
}

export function getSalesPricingProps(section: Section) {
  return section;
}

export function isSalesWhyContentSection(section: any): section is Section {
  return (
    section &&
    typeof section === 'object' &&
    section._type === 'salesWhyContentSection' &&
    typeof section.enabled === 'boolean'
  );
}

export function getSalesWhyContentProps(section: Section) {
  return section;
}
