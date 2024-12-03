import groq from 'groq';

export interface Faq {
    _id: string;
    title: string;
    question: string;
    answer: string;
    additionalInfo?: string;
}

export const faqQuery = groq`
  *[_type == "faq"] {
    _id,
    title,
    question,
    answer,
    additionalInfo
  }
`;
