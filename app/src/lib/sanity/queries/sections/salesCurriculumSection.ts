import groq from 'groq';

export const salesCurriculumSectionFields = groq`
  badge,
  title,
  subtitle,
  layout,
  modules[] {
    week,
    title,
    description,
    topics,
    badge,
    badgeIcon,
    date,
    startTime,
    endTime
  },
  bonusBox {
    style,
    title,
    description,
    ctaButton {
      text,
      link
    }
  }
`;
