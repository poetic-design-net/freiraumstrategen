import groq from 'groq';
import { baseFields, expandSEO, imageFields } from '../common';
import { strategyIntroSectionFields } from '../sections/strategyIntroSection';
import { caseSectionFields } from '../sections/caseSection';
import { testimonialsSectionFields } from '../sections/testimonialsSection';
import { kachelSectionFields } from '../sections/kachelSection';
import { featuresSectionFields } from '../sections/featuresSection';

const expandImage = (fieldName: string) => groq`
  ${fieldName} {
    ${imageFields}
  }
`;

export const landingPageQuery = groq`*[_type == "landingPage" && slug.current == $slug && !(_id in path("drafts.**"))][0] {
  _id,
  _type,
  title,
  slug,
  description,
  ${expandSEO},
  sections[] {
    ${baseFields},
    ...,
    _type == 'testimonialsSection' => {
      ${testimonialsSectionFields}
    },
    _type == 'caseSection' => {
      ${caseSectionFields}
    },
    _type == 'strategyIntroSection' => {
      ${strategyIntroSectionFields}
    },
    _type == 'kachelSection' => {
      ${kachelSectionFields}
    },
    _type == 'featuresSection' => {
      ${featuresSectionFields}
    },
    ${expandImage('backgroundImage')},
    ${expandImage('mainImage')},
    ${expandImage('avatar')}
  }
}`;
