import { isSalesForWhoSection } from "$lib/types/salesForWhoSection";

export const typeClasses = {
  heroSection: 'overflow-hidden',
  caseSection: 'pt-20 pb-20 xl:pb-32 overflow-hidden',
  salesContentSection: 'pt-20 pb-20 xl:pb-32 overflow-hidden',
  contentSectionAlt: 'py-20 lg:py-24 overflow-hidden bg-gray-100',
  stepSection: 'text-dark py-20 lg:pb-32',
  testimonialsSection: 'py-20 lg:pt-24 lg:pb-24 bg-gray-50 overflow-hidden',
  featuresSection: 'py-32 overflow-hidden',
  contentSection: 'bg-gray-50 overflow-hidden',
  callToActionSection: 'w-full min-h-dvh lg:min-h-[200vh]',
  kachelSection: 'py-20 lg:py-24 overflow-hidden',
  strategyHeroSection: 'relative overflow-hidden h-full-header ',
  strategyIntroSection: 'relative py-20 lg:py-32 overflow-hidden',
  strategyFeaturesSection: 'relative py-12 lg:py-16 z-10',
  strategyFeaturesSectionAlt: 'relative py-20 lg:py-24 overflow-hidden',
  salesEmotionalFreedomSection: 'w-full overflow-hidden',
  salesEmotionalSection: 'w-full overflow-hidden',
  salesWhyContentSection: 'pt-20 pb-20 xl:pb-32 overflow-hidden bg-gray-50 ',
  salesAdvantagesSection: 'pt-20 pb-20 xl:pb-32 overflow-hidden',
  salesFeaturesSection: 'pt-20 pb-20 xl:pb-32 overflow-hidden',
  salesForWhoSection: 'pt-20 pb-20 xl:pb-32 overflow-hidden',
  salesCurriculumSection: 'pt-20 pb-20 xl:pb-32 overflow-hidden'
   
} as const;

export function getSectionClasses(type: string): string {
  const baseClasses = 'relative';
  return `${baseClasses} ${typeClasses[type as keyof typeof typeClasses] || ''}`;
}
