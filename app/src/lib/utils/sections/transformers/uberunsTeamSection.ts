import type { UberunsTeamSection } from '$lib/types/uberunsTeamSection';
import type { Section } from '$lib/sanity/queries/types';

export function isUberunsTeamSection(section: Section): section is UberunsTeamSection {
  return section._type === 'uberunsTeamSection';
}

export function getUberunsTeamProps(section: UberunsTeamSection): UberunsTeamSection {
  return section;
}
