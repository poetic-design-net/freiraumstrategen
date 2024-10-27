import type { PortableTextBlock } from '@portabletext/types';
import type { ImageAsset, Slug } from '@sanity/types';
import groq from 'groq';

export const postQuery = groq`*[_type == "post" && slug.current == $slug][0]{
	...,
	"category": category->{ title, slug },
}`;

export const postsQuery = groq`*[_type == "post" && defined(slug.current)] {
	...,
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
	_createdAt: string;
	title?: string;
	slug: Slug;
	excerpt?: string;
	mainImage?: ImageAsset;
	body: PortableTextBlock[];
	category: {
	  title: string;
	  slug: Slug;
	};
  }

