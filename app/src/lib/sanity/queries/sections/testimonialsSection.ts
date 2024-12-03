import groq from 'groq';
import { imageFields } from '../common';

export const testimonialsSectionFields = groq`
  header {
    badge,
    heading {
      regular,
      thin
    },
    subtitle
  },
  testimonials[]-> {
    _id,
    name,
    position,
    title,
    content,
    image {
      ${imageFields}
    }
  },
  animation {
    slideDuration,
    dragThreshold
  },
  navigation {
    showArrows,
    showDots,
    enableKeyboard,
    enableDrag
  }
`;
