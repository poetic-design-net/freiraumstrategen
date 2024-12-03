import groq from 'groq';
import { baseFields, expandSEO } from '../common';
import { testimonialsSectionFields } from '../sections/testimonialsSection';
import { caseSectionFields } from '../sections/caseSection';
import { kachelSectionFields } from '../sections/kachelSection';
import { featuresSectionFields } from '../sections/featuresSection';

export const frontpageQuery = groq`*[_type == "frontpage"][0] {
  title,
  ${expandSEO},
  sections[] {
    ${baseFields},
    ...,
    _type == 'testimonialsSection' => {
      ${testimonialsSectionFields}
    },
    _type == 'featuresSection' => {
      ${featuresSectionFields}
    },
    _type == 'caseSection' => {
      ${caseSectionFields}
    },
    _type == 'kachelSection' => {
      ${kachelSectionFields}
    }
  }
}`;
