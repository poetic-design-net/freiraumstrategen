import groq from 'groq'

export const salesContentSectionFullWidthFields = groq`
  enabled,
  badge,
  title,
  subtitle,
  leftColumnContent,
  rightColumnContent,
  fullWidthImage {
    asset->,
    alt
  },
  imagePosition,
  styles
`

export const salesContentSectionFullWidth = groq`{
  ${salesContentSectionFullWidthFields}
}`