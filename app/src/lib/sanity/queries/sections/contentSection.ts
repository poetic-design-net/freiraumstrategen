import groq from 'groq'
import { imageFields } from '../common'

export const contentSectionFields = groq`
  layout,
  theme,
  header {
    badge,
    heading {
      regular,
      thin
    },
    alignment
  },
  leftColumn {
    highlightedContent[] {
      ...,
      _type == 'image' => {
        ${imageFields}
      },
      _type == 'video' => {
        url
      },
      _type == 'button' => {
        text,
        url,
        style
      }
    },
    regularContent[] {
      ...,
      _type == 'image' => {
        ${imageFields}
      },
      _type == 'video' => {
        url
      },
      _type == 'button' => {
        text,
        url,
        style
      }
    }
  },
  rightColumn {
    highlightedContent[] {
      ...,
      _type == 'image' => {
        ${imageFields}
      },
      _type == 'video' => {
        url
      },
      _type == 'button' => {
        text,
        url,
        style
      }
    },
    regularContent[] {
      ...,
      _type == 'image' => {
        ${imageFields}
      },
      _type == 'video' => {
        url
      },
      _type == 'button' => {
        text,
        url,
        style
      }
    }
  },
  backgroundImage {
    ${imageFields}
  },
  callToAction {
    enabled,
    style,
    text,
    url
  },
  separator {
    enabled,
    style
  },
  animation {
    enabled,
    type
  },
  spacing {
    top,
    bottom
  }
`
