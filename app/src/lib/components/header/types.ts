import type { QueryResponseInitial } from '@sanity/svelte-loader';

export interface NavigationLink {
  title: string;
  href: string;
}

export interface NavigationColumn {
  title: string;
  links: NavigationLink[];
}

export interface FeaturedContent {
  imageUrl: string;
  title: string;
  description: string;
  link: string;
}

export interface NavigationItem {
  _key: string;
  title: string;
  path: string;
  columns?: NavigationColumn[];
  featured?: FeaturedContent;
}

export interface Navigation {
  items: NavigationItem[];
}

export interface HeaderProps {
  data: {
    navigationQuery: string;
    navigationOptions: {
      initial: QueryResponseInitial<Navigation>;
    };
  };
}
