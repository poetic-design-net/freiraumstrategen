import type { Section } from '$lib/sanity/queries';
import type { StrategyHeroSection, StrategyIntroSection, StrategyFeaturesSection } from '$lib/sanity/queries/types';

export function isStrategyHeroSection(section: Section | StrategyHeroSection): section is StrategyHeroSection {
  return section._type === 'strategyHeroSection';
}

export function isStrategyIntroSection(section: Section | StrategyIntroSection): section is StrategyIntroSection {
  return section._type === 'strategyIntroSection';
}

export function isStrategyFeaturesSection(section: Section | StrategyFeaturesSection): section is StrategyFeaturesSection {
  return section._type === 'strategyFeaturesSection';
}

export function isStrategyFeaturesSectionAlt(section: Section | StrategyFeaturesSection): section is StrategyFeaturesSection {
  return section._type === 'strategyFeaturesSectionAlt';
}
