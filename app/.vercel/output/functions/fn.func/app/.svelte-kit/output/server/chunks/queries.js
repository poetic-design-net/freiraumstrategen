import groq from "groq";
const postQuery = groq`*[_type == "post" && slug.current == $slug][0]{
	...,
	"category": category->{ title, slug },
}`;
const postsQuery = groq`*[_type == "post" && defined(slug.current)] {
    _id,
    title,
    slug,
    excerpt,
    _createdAt,
    mainImage, 
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
const navigationQuery = groq`
  *[_type == "navigation"] {
    _id,
    title,
    identifier,
    items[] {
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
        "image": image.asset->url,
        title,
        description,
        link
      }
    }
  }
`;
export {
  postQuery as a,
  pageQuery as b,
  navigationQuery as n,
  postsQuery as p,
  testimonialsQuery as t
};
