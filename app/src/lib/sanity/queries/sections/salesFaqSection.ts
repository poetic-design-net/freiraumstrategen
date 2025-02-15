import groq from 'groq'

export const salesFaqSectionFields = groq`
  enabled,
  badge,
  title,
  subtitle,
  "faqs": faqs[]-> {
    _id,
    _type,
    title,
    question,
    answer,
    additionalInfo
  },
  contactInfo {
    text,
    email
  },
  ctaButton {
    text,
    link
  }
`

export const salesFaqSection = groq`{
  ${salesFaqSectionFields}
}`