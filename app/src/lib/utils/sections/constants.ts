import type { CaseSection_gsap } from '$lib/components/sections';
import type { ThemeOption, PaddingConfig, SectionStyles } from './themeStyles';
import { getSectionThemeClasses } from './themeStyles';

// Default styles for each section type if no custom styles are provided
export const defaultSectionStyles: Record<string, SectionStyles> = {
  // Hero Sections
  heroSection: { 
    theme: 'light', 
    overflow: false,
    customClasses: 'w-full flex flex-col'
  },
  salesHeroSection: { 
    theme: 'light', 
    overflow: true,
    customClasses: 'w-full flex flex-col relative'
  },
  strategyHeroSection: { 
    theme: 'light', 
    overflow: true,
    customClasses: 'w-full h-full-header'
  },
  uberunsHeroSection: { 
    theme: 'light', 
    overflow: true,
    customClasses: 'w-full min-h-screen flex flex-col'
  },
  contactHeroSection: { 
    theme: 'light', 
    overflow: true,
    customClasses: 'w-full min-h-screen flex flex-col'
  },
  blogSection: { 
    theme: 'light-gray', 
    padding: { 
      top: '24',
      bottom: '12'
    }, 
    overflow: true 
  },

  // Content Sections
  CaseSection_gsap: { 
    theme: 'light', 
    padding: { 
      top: '20',
      bottom: '20',
      bottomXl: '32'
    }, 
    overflow: false 
  },
  salesContentSection: {
    theme: 'light',
    customClasses: 'relative',
    padding: {
      top: '20',
      bottom: '20',
      bottomXl: '32'
    },
    overflow: true
  },
  // Spezielle Variante für fullWidth Layout
  salesContentSectionFullWidth: {
    theme: 'light',
    customClasses: 'relative w-full',
    overflow: true
  },
  contentSectionAlt: { 
    theme: 'light-gray', 
    padding: { 
      top: '20',
      bottom: '20',
      topLg: '24',
      bottomLg: '24'
    }, 
    overflow: true 
  },
  stepSection: { 
    theme: 'light', 
    padding: { 
      top: '20',
      bottom: '20',
      bottomLg: '32'
    }
  },
  testimonialsSection: { 
    theme: 'light-gray', 
    padding: { 
      top: '20',
      bottom: '20',
      topLg: '24',
      bottomLg: '24'
    }, 
    overflow: true 
  },
  featuresSection: { 
    theme: 'light', 
    padding: { 
      top: '32',
      bottom: '32'
    }, 
    overflow: true 
  },
  contentSection: { 
    theme: 'light-gray', 
    padding: { 
      top: '20',
      bottom: '20'
    }, 
    overflow: true 
  },
  callToActionSection: { 
    theme: 'primary', 
    customClasses: 'w-full min-h-dvh lg:min-h-[200vh]' 
  },
  kachelSection: { 
    theme: 'light', 
    padding: { 
      top: '20',
      bottom: '20',
      topLg: '24',
      bottomLg: '24'
    }, 
    overflow: true 
  },
  strategyIntroSection: { 
    theme: 'light', 
    padding: { 
      top: '20',
      bottom: '20',
      topLg: '32',
      bottomLg: '32'
    }, 
    overflow: true 
  },
  strategyFeaturesSection: { 
    theme: 'light', 
    padding: { 
      top: '12',
      bottom: '12',
      topLg: '16',
      bottomLg: '16'
    }, 
    customClasses: 'z-10 overflow-visible'

  },
  strategyFeaturesSectionAlt: { 
    theme: 'light', 
    padding: { 
      top: '20',
      bottom: '20',
      topLg: '24',
      bottomLg: '24'
    }, 
    overflow: true 
  },
  salesEmotionalFreedomSection: { 
    theme: 'light', 
    overflow: true 
  },
  salesEmotionalSection: { 
    theme: 'light', 
    overflow: true 
  },
  salesWhyContentSection: { 
    theme: 'light-gray', 
    padding: { 
      top: '20',
      bottom: '20',
      bottomXl: '32'
    }, 
    overflow: true 
  },
  salesAdvantagesSection: { 
    theme: 'light', 
    padding: { 
      top: '20',
      bottom: '20',
      bottomXl: '32'
    }, 
    overflow: true 
  },
  salesFeaturesSection: { 
    theme: 'light', 
    padding: { 
      top: '20',
      bottom: '20',
      bottomXl: '32'
    }, 
    overflow: true 
  },
  salesForWhoSection: { 
    theme: 'light', 
    padding: { 
      top: '20',
      bottom: '20',
      bottomXl: '32'
    }, 
    overflow: true 
  },
  salesCurriculumSection: { 
    theme: 'light', 
    padding: { 
      top: '20',
      bottom: '20',
      bottomXl: '32'
    }, 
    overflow: true 
  },
  salesPricingSection: {
    theme: 'primary',
    padding: {
      top: '20',
      bottom: '20',
      bottomXl: '32'
    },
    overflow: true
  },
  reviewSection: {
    theme: 'light',
    padding: {
      top: '20',
      bottom: '20',
      topLg: '24',
      bottomLg: '24'
    },
    overflow: true,
    customClasses: 'bg-gray-50'
  },
};

// List of section types that should not have default padding
const NO_PADDING_SECTIONS = [
  'salesHeroSection',
  'heroSection',
  'uberunsHeroSection',
  'strategyHeroSection',
  'contactHeroSection',
  'comingSoonSection',
  'dividerSection',
  'salesContentSectionFullWidth'
];
export function getSectionClasses(type: string, customStyles?: SectionStyles, layout?: string): string {
  // For dividerSection, return an empty string to remove all styles
  if (type === 'dividerSection') {
    return '';
  }

  const baseStyles = defaultSectionStyles[type] || {};
  
  // Create a new object for the section styles
  let sectionStyles: SectionStyles = { ...baseStyles };
  
  // For sections with no padding, remove padding
  if (NO_PADDING_SECTIONS.includes(type)) {
    const { padding, ...restStyles } = sectionStyles;
    sectionStyles = restStyles;
  }
  
  // Deep merge of padding values to preserve responsive settings
  const mergedPadding = customStyles?.padding && !NO_PADDING_SECTIONS.includes(type)
    ? {
        ...sectionStyles.padding,
        ...customStyles.padding
      }
    : sectionStyles.padding;

  // Merge styles with proper type handling
  const styles: SectionStyles = {
    ...sectionStyles,
    ...customStyles,
    padding: mergedPadding,
    // Use only the custom classes from the merged styles, not both
    customClasses: customStyles?.customClasses || sectionStyles.customClasses
  };

  return getSectionThemeClasses(styles);
}
