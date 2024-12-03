import type { PortableTextBlock } from '@portabletext/types';

export type ContentSectionLayout = 'single-column' | 'two-columns';
export type ContentSectionTheme = 'light' | 'dark';
export type TextAlignment = 'start' | 'center' | 'end';
export type ButtonStyle = 'primary' | 'secondary' | 'orange';
export type ButtonSize = 'sm' | 'md' | 'lg';
export type ButtonIcon = 'none' | 'arrow-right' | 'arrow-left' | 'arrow-up' | 'arrow-down' | 'arrow-down-right' | 'arrow-my-down' | 'cursor-arrow' | 'chevron-down' | 'arrow-return';

export interface Button {
  _type: 'button';
  text?: string;
  url?: string;
  style?: ButtonStyle;
  size?: ButtonSize;
  icon?: ButtonIcon;
  position?: TextAlignment;
}

export interface Header {
  badge?: string;
  heading?: {
    regular?: string;
    thin?: string;
  };
  alignment?: TextAlignment;
}

export interface Column {
  highlightedContent?: PortableTextBlock[];
  regularContent?: PortableTextBlock[];
}

export interface BackgroundImage {
  _type: 'image';
  asset: {
    _type: 'reference';
    _ref: string;
  };
  alt?: string;
}

export interface ContentSectionProps {
  enabled?: boolean;
  layout?: ContentSectionLayout;
  theme?: ContentSectionTheme;
  header?: Header;
  leftColumn?: Column;
  rightColumn?: Column;
  backgroundImage?: BackgroundImage;
}

export const defaultHeader: Header = {
  badge: '',
  heading: {
    regular: '',
    thin: ''
  },
  alignment: 'center'
};

export const defaultColumn: Column = {
  highlightedContent: [],
  regularContent: []
};

export const defaultBackgroundImage: BackgroundImage = {
  _type: 'image',
  asset: {
    _type: 'reference',
    _ref: ''
  }
};

export const defaultLeftColumn = defaultColumn;
export const defaultRightColumn = defaultColumn;
