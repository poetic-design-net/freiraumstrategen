import groq from 'groq';

export const seoFields = groq`
  metaTitle,
  metaDescription,
  openGraphImage {
    asset->{
      _ref,
      url,
      _id,
      metadata
    },
    alt
  },
  keywords,
  canonicalUrl
`;

export const imageFields = groq`
  asset->{
    _ref,
    url,
    _id,
    metadata
  },
  alt,
  hotspot,
  crop
`;

export const baseFields = groq`
  _type,
  enabled,
  _key
`;

// Helper to expand image references
export const expandImage = (fieldName: string) => groq`
  ${fieldName} {
    ${imageFields}
  }
`;

// Helper to expand SEO
export const expandSEO = groq`
  seo {
    ${seoFields}
  }
`;
