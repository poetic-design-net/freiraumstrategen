import groq from 'groq';

export const strategyIntroSectionFields = groq`
  heading,
  content,
  teamCard {
    title,
    subtitle,
    members[] {
      name,
      image {
        asset->{
          _ref,
          url,
          _id,
          metadata
        },
        alt,
        hotspot,
        crop
      }
    }
  },
  mainImage {
    asset->{
      _ref,
      url,
      _id,
      metadata
    },
    alt,
    hotspot,
    crop
  },
  imageOverlay {
    name,
    subtitle,
    stats {
      value,
      unit
    }
  }
`;
