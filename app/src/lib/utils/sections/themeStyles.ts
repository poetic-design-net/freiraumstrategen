type ThemeOption = 'light' | 'light-gray' | 'dark' | 'primary';

interface PaddingConfig {
  top?: string;
  bottom?: string;
  topMd?: string;
  bottomMd?: string;
  topLg?: string;
  bottomLg?: string;
  topXl?: string;
  bottomXl?: string;
}

interface SectionStyles {
  theme?: ThemeOption;
  padding?: PaddingConfig;
  overflow?: boolean;
  customClasses?: string;
}

interface ThemeConfig {
  background: string;
  text: string;
  headings: string;
  links: string;
  border?: string;
}

// Define base colors without opacity for each theme
const baseColors = {
  'light': {
    bg: 'transparent',
    text: 'text-gray-600',
    headings: 'text-gray-900',
    links: 'text-primary hover:text-primary-dark',
    border: 'border-gray-200'
  },
  'light-gray': {
    bg: 'bg-gray-50',
    text: '',
    headings: 'text-gray-900',
    links: 'text-primary hover:text-primary-dark',
    border: 'border-gray-200'
  },
  'dark': {
    bg: 'bg-primary-dark',
    text: 'text-white',
    headings: 'text-white',
    links: 'text-primary-light hover:text-primary',
    border: 'border-gray-700'
  },
  'primary': {
    bg: 'bg-primary',
    text: 'text-white',
    headings: 'text-white',
    links: 'text-white hover:text-primary-50',
    border: 'border-primary-600'
  }
};

// Define complete theme configurations including text colors for different elements
const themeConfigs: Record<ThemeOption, ThemeConfig> = {
  'light': {
    background: baseColors.light.bg,
    text: baseColors.light.text,
    headings: baseColors.light.headings,
    links: baseColors.light.links,
    border: baseColors.light.border
  },
  'light-gray': {
    background: baseColors['light-gray'].bg,
    text: baseColors['light-gray'].text,
    headings: baseColors['light-gray'].headings,
    links: baseColors['light-gray'].links,
    border: baseColors['light-gray'].border
  },
  'dark': {
    background: baseColors.dark.bg,
    text: baseColors.dark.text,
    headings: baseColors.dark.headings,
    links: baseColors.dark.links,
    border: baseColors.dark.border
  },
  'primary': {
    background: baseColors.primary.bg,
    text: baseColors.primary.text,
    headings: baseColors.primary.headings,
    links: baseColors.primary.links,
    border: baseColors.primary.border
  }
};

function getResponsivePaddingClasses(padding?: PaddingConfig): string {
  if (!padding) return '';

  const classes = [];

  // Base padding (mobile)
  if (padding.top) classes.push(`pt-${padding.top}`);
  if (padding.bottom) classes.push(`pb-${padding.bottom}`);

  // Tablet (md)
  if (padding.topMd) classes.push(`md:pt-${padding.topMd}`);
  if (padding.bottomMd) classes.push(`md:pb-${padding.bottomMd}`);

  // Desktop (lg)
  if (padding.topLg) classes.push(`lg:pt-${padding.topLg}`);
  if (padding.bottomLg) classes.push(`lg:pb-${padding.bottomLg}`);

  // Large Desktop (xl)
  if (padding.topXl) classes.push(`xl:pt-${padding.topXl}`);
  if (padding.bottomXl) classes.push(`xl:pb-${padding.bottomXl}`);

  return classes.join(' ');
}

export function getSectionThemeClasses(styles?: SectionStyles): string {
  if (!styles) return '';

  const paddingClasses = getResponsivePaddingClasses(styles.padding);
  const overflowClass = styles.overflow ? 'overflow-hidden' : '';
  const customClasses = styles.customClasses || '';

  // Get theme configuration
  const themeConfig = styles.theme ? themeConfigs[styles.theme] : themeConfigs.light;
  const themeClasses = `${themeConfig.background} ${themeConfig.text}`;

  // Add 'relative' class only if it's not already in customClasses
  const baseClasses = customClasses.includes('relative') ? '' : 'relative';

  return [baseClasses, paddingClasses, overflowClass, themeClasses, customClasses]
    .filter(Boolean)
    .join(' ');
}

// Helper function to get specific theme styles for different elements
export function getThemeStyles(theme: ThemeOption = 'light', opacity?: number) {
  const config = {...themeConfigs[theme]};
  
  // If opacity is provided, apply it to the background
  if (opacity !== undefined) {
    const baseColor = baseColors[theme].bg;
    config.background = `${baseColor}/${opacity}`;
  }
  
  return config;
}

// Export types for use in other files
export type { ThemeOption, PaddingConfig, SectionStyles, ThemeConfig };
