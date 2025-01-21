import groq from 'groq';

export const featuresSectionFields = groq`
  layout,
  eyebrow,
  title,
  subtitle,
  videoId,
  platform,
  features[] {
    title,
    subtitle,
    subtitle_hover,
    icon,
    description,
    link {
      text,
      href
    }
  }
`;
