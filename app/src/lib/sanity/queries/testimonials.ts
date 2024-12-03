import groq from 'groq';

export interface Testimonial {
  _id: string;
  name: string;
  title: string;
  position: string;
  content: string;
  imageUrl: string;
}

export const testimonialsQuery = groq`*[_type == "testimonial"] {
  _id,
  name,
  position,
  title,
  content,
  "imageUrl": image.asset->url
}`;
