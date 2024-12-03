import groq from 'groq';

export const caseSectionFields = groq`
  badge,
  title,
  subtitle,
  description,
  displaySettings {
    showHeroImage,
    customExcerptLength
  },
  animation {
    enabled,
    duration
  },
  selectedPages[]-> {
    _type,
    _id,
    title,
    slug,
    description,
    seo {
      openGraphImage {
        asset->{
          _ref,
          _id,
          url,
          metadata
        },
        alt
      }
    },
    hero {
      title,
      subtitle,
      backgroundImage {
        asset->{
          _ref,
          _id,
          url,
          metadata
        },
        alt,
        hotspot,
        crop
      }
    },
    sections[0] {
      backgroundImage {
        asset->{
          _ref,
          _id,
          url,
          metadata
        },
        alt,
        hotspot,
        crop
      }
    }
  },
  selectedPosts[]-> {
    _type,
    _id,
    title,
    slug,
    excerpt,
    mainImage {
      asset->{
        _ref,
        _id,
        url,
        metadata
      },
      alt,
      hotspot,
      crop
    }
  }
`;
