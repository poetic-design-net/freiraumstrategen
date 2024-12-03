import type { Section } from '$lib/sanity/queries';
import type { HeroSectionData, ContentSectionData, CallToActionSectionData, TestimonialSectionData, FeatureSectionData } from '$lib/types/sections';
import type { StepSectionData, ContentSectionAltData } from '$lib/sanity/queries/types';
import type { CaseSectionData } from '$lib/types/caseSection';
import type { KachelSection } from '$lib/sanity/queries/pages';

export function isHeroSection(section: Section): section is (Section & HeroSectionData) {
  return section._type === 'heroSection';
}

export function isContentSection(section: Section): section is (Section & ContentSectionData) {
  return section._type === 'contentSection';
}

export function isContentSectionAlt(section: Section): section is (Section & ContentSectionAltData) {
  return section._type === 'contentSectionAlt';
}

export function isStepSection(section: Section): section is (Section & StepSectionData) {
  return section._type === 'stepSection';
}

export function isCallToActionSection(section: Section): section is (Section & CallToActionSectionData) {
  return section._type === 'callToActionSection';
}

export function isCaseSection(section: Section): section is (Section & CaseSectionData) {
  return section._type === 'caseSection';
}

export function isTestimonialsSection(section: Section): section is (Section & TestimonialSectionData) {
  return section._type === 'testimonialsSection';
}

export function isFeatureSection(section: Section): section is (Section & FeatureSectionData) {
  return section._type === 'featuresSection';
}

export function isBlogSection(section: Section): section is Section {
  return section._type === 'blogSection';
}

export function isKachelSection(section: Section): section is KachelSection {
  return section._type === 'kachelSection';
}
