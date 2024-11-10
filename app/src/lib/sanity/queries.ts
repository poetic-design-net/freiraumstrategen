import type { PortableTextBlock } from '@portabletext/types';
import type { ImageAsset, Slug } from '@sanity/types';
import groq from 'groq';

export const postQuery = groq`*[_type == "post" && slug.current == $slug][0]{
	...,
	"category": category->{ title, slug },
}`;

export const postsQuery = groq`*[_type == "post" && defined(slug.current)] {
    _id,
    title,
    slug,
    excerpt,
    _createdAt,
    mainImage, 
    "category": category->{ title, slug }
} | order(_createdAt desc)`;

export const pageQuery = groq`*[_type == "page" && slug.current == $slug][0] {
	title,
	slug,
	hero {
	  title,
	  subtitle,
	  backgroundImage {
		asset->{
		  url
		}
	  }
	}
  }`;

  export const testimonialsQuery = groq`*[_type == "testimonial"] {
	_id,
	name,
	position,
	title,
	content,
	"imageUrl": image.asset->url
  }`;

  export const navigationQuery = groq`
  *[_type == "navigation"] {
    _id,
    title,
    identifier,
    items[] {
	_key,
      title,
      path,
      columns[] {
        title,
        links[] {
          title,
          href
        }
      },
      featured {
        "imageUrl": image.asset->url,
        title,
        description,
        link
      }
    }
  }
`;

export type Faq = {
    _id: string;
    title: string;
    question: string;
    answer: string;
};

export const faqQuery = groq`
  *[_type == "faq"] {
    _id,
    title,
    question,
    answer
  }
`;

  export interface PageData {
	title: string;
	slug: Slug;
	hero: {
	  title: string;
	  subtitle: string;
	  backgroundImage: {
		asset: {
		  url: string;
		};
	  };
	};
  }
  
  
  export interface Post {
    _type: 'post';
    _id: string; 
    _createdAt: string;
    title?: string;
    slug: Slug;
    excerpt?: string;
    mainImage?: any;  // Zurück zum ursprünglichen Typ
    body: PortableTextBlock[];
    category: {
        title: string;
        slug: Slug;
    };
    likes?: number;  
}

  export interface Testimonial {
	_id: string;
	name: string;
	title: string;
	position: string;
	content: string;
	imageUrl: string;
  }
  
  export interface Navigation {
	items?: NavigationItem[];
  }
  
  export interface NavigationItem {
	_key: string;
	title: string;
	path: string;
	columns?: Array<{
	  title: string;
	  links: Array<{ title: string; href: string; }>;
	}>;
	featured?: {
	  imageUrl: string;
	  title: string;
	  description: string;
	  link: string;
	};
  }