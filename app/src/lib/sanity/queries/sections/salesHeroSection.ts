import groq from 'groq';
import { imageFields } from '../common';

export const salesHeroSectionFields = groq`
  headline,
  subheadline,
  description,
  stats[] {
    value,
    label
  },
  primaryCTA {
    text,
    link
  },
  secondaryCTA {
    text,
    link
  },
  videoButton {
    text,
    duration,
    videoId
  },
  backgroundImage {
    ${imageFields}
  }
`;
