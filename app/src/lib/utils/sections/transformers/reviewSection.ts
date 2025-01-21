import type { ReviewSectionData } from '$lib/sanity/queries/types';
import type { Section } from '$lib/sanity/queries/types';

export function isReviewSection(section: Section): section is ReviewSectionData {
  return section._type === 'reviewSection';
}

export function getReviewSectionProps(section: ReviewSectionData) {
  return {
    _type: 'reviewSection',
    _key: section._key,
    enabled: section.enabled ?? true,
    header: {
      badge: section.header?.badge || 'Bewertungen',
      heading: {
        regular: section.header?.heading?.regular || 'Was sagen unsere',
        thin: section.header?.heading?.thin || 'Kunden'
      },
      subtitle: section.header?.subtitle || ''
    },
    googlePlaces: {
      placeId: section.googlePlaces?.placeId || '',
      maxReviews: section.googlePlaces?.maxReviews ?? 5
    },
    // reviews wird später durch die API befüllt
    reviews: []
  };
}
