import groq from "groq";
const postQuery = groq`*[_type == "post" && slug.current == $slug][0]{
	...,
	"category": category->{ title, slug },
}`;
const postsQuery = groq`*[_type == "post" && defined(slug.current)] {
	...,
	"category": category->{ title, slug }
  } | order(_createdAt desc)`;
const pageQuery = groq`*[_type == "page" && slug.current == $slug][0] {
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
const testimonialsQuery = groq`*[_type == "testimonial"] {
	_id,
	name,
	position,
	title,
	content,
	"imageUrl": image.asset->url
  }`;
export {
  postQuery as a,
  pageQuery as b,
  postsQuery as p,
  testimonialsQuery as t
};
