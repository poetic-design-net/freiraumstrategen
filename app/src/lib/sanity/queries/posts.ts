import type { PortableTextBlock } from '@portabletext/types';
import type { Slug } from '@sanity/types';
import groq from 'groq';

export interface Post {
    _type: 'post';
    _id: string; 
    _createdAt: string;
    title?: string;
    slug: Slug;
    excerpt?: string;
    mainImage?: any;
    body: PortableTextBlock[];
    category: {
        title: string;
        slug: Slug;
    };
    likes?: number;  
}

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
