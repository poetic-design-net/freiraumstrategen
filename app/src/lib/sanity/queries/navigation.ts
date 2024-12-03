import groq from 'groq';

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

export const navigationQuery = groq`*[_type == "navigation"][0] {
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
}`;
