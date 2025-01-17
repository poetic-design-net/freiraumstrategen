import groq from 'groq';
import type { UberunsTeamSection } from '$lib/types/uberunsTeamSection';

export const teamSectionQuery = groq`*[_type == "uberunsTeamSection"][0] {
  enabled,
  headline {
    eyebrow,
    title
  },
  fullWidthText,
  description,
  teamMembers[] {
    name,
    position,
    image {
      asset->,
      alt
    },
    bio,
    socialLinks[] {
      platform,
      url
    }
  },
  cta {
    text,
    link
  }
}`;

export type TeamSectionResponse = UberunsTeamSection;
