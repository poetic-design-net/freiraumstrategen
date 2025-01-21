import type { Section } from '$lib/sanity/queries/types';

interface SanityImage {
  _type: 'image';
  asset: {
    _type: 'reference';
    _id: string;
    url?: string;
  };
}

export interface GooglePlacesReview {
  author_name: string;
  author_url: string;
  profile_photo_url?: string; // Optional, da wir jetzt authorImage verwenden
  authorImage?: SanityImage; // Das neue Sanity Image Feld
  rating: number;
  relative_time_description: string;
  text: string;
  time: number;
}

interface ReviewSectionHeader {
  badge: string;
  heading: {
    regular: string;
    thin: string;
  };
  subtitle?: string;
}

interface GooglePlacesSettings {
  placeId: string;
  maxReviews: number;
}

export interface ReviewSectionData extends Section {
  _type: 'reviewSection';
  enabled: boolean;
  header: ReviewSectionHeader;
  googlePlaces: GooglePlacesSettings;
}

// Die Props für die Komponente enthalten zusätzlich die gefetchten Reviews
export interface GooglePlacesResponse {
  reviews: GooglePlacesReview[];
  total: number;
  hasMore: boolean;
}

export interface ReviewSectionProps extends ReviewSectionData {
  reviews: GooglePlacesReview[];
}
