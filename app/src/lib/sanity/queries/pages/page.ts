import groq from 'groq';
import { expandSEO, imageFields } from '../common';

const expandImage = (fieldName: string) => groq`
  ${fieldName} {
    ${imageFields}
  }
`;

export const pageQuery = groq`*[_type == "page" && slug.current == $slug][0] {
  title,
  slug,
  ${expandSEO},
  hero {
    title,
    subtitle,
    ${expandImage('backgroundImage')}
  }
}`;
