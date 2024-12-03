import groq from 'groq';
import { imageFields } from '../common';

export const kachelSectionFields = groq`
  heading {
    badge,
    title {
      regular,
      light
    }
  },
  description,
  mainKachel {
    image {
      ${imageFields}
    },
    badge,
    title,
    button {
      text,
      link
    }
  },
  sideKacheln[] {
    title,
    description,
    link,
    backgroundColor
  }
`;
