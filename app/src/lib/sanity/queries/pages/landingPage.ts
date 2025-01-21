// @ts-ignore
import groq from 'groq';
import { baseFields, expandSEO, imageFields } from '../common';
import { strategyIntroSectionFields } from '../sections/strategyIntroSection';
import { caseSectionFields } from '../sections/caseSection';
import { testimonialsSectionFields } from '../sections/testimonialsSection';
import { kachelSectionFields } from '../sections/kachelSection';
import { featuresSectionFields } from '../sections/featuresSection';
import { salesHeroSectionFields } from '../sections/salesHeroSection';
import { salesCurriculumSectionFields } from '../sections/salesCurriculumSection';

const expandImage = (fieldName: string) => groq`
  ${fieldName} {
    ${imageFields}
  }
`;

const expandHeaderFooter = groq`
  header->{
    title,
    navigation,
    ctaButton
  },
  footer->{
    title,
    navigation
  }
`;

export const landingPageQuery = groq`*[_type == "landingPage" && slug.current == $slug && !(_id in path("drafts.**"))][0] {
  _id,
  _type,
  title,
  slug,
  description,
  ${expandSEO},
  ${expandHeaderFooter},
  sections[] {
    ${baseFields},
    ...,
    _type == 'reviewSection' => {
      enabled,
      header {
        badge,
        heading {
          regular,
          thin
        },
        subtitle
      },
      googlePlaces {
        placeId,
        maxReviews
      }
    },
    _type == 'salesHeroSection' => {
      ${salesHeroSectionFields}
    },
    _type == 'salesCurriculumSection' => {
      ${salesCurriculumSectionFields}
    },
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
