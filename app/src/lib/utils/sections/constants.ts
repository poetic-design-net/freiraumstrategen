import type { ThemeOption, PaddingConfig, SectionStyles } from './themeStyles';
import { getSectionThemeClasses } from './themeStyles';

// Default styles for each section type if no custom styles are provided
export const defaultSectionStyles: Record<string, SectionStyles> = {
  // Hero Sections
  heroSection: { 
    theme: 'light', 
    overflow: true,
    customClasses: 'w-full min-h-screen flex flex-col'
  },
  salesHeroSection: { 
    theme: 'light', 
    overflow: true,
    customClasses: 'w-full min-h-screen flex flex-col'
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

  // Content Sections
  caseSection: { 
    theme: 'light', 
    padding: { 
      top: '20',
      bottom: '20',
      bottomXl: '32'
    }, 
    overflow: true 
  },
  salesContentSection: { 
    theme: 'light', 
    padding: { 
      top: '20',
      bottom: '20',
      bottomXl: '32'
    }, 
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
    customClasses: 'z-10' 
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
    theme: 'light', 
    padding: { 
      top: '20',
      bottom: '20',
      bottomXl: '32'
    }, 
    overflow: true 
  }
};

export function getSectionClasses(type: string, customStyles?: SectionStyles): string {
  const defaultStyles = defaultSectionStyles[type] || {};
  
  // Deep merge of padding values to preserve responsive settings
  const mergedPadding = customStyles?.padding
    ? {
        ...defaultStyles.padding,
        ...customStyles.padding
      }
    : defaultStyles.padding;

  // Merge styles with proper type handling
  const styles: SectionStyles = {
    ...defaultStyles,
    ...customStyles,
    padding: mergedPadding,
    // Merge customClasses properly
    customClasses: [defaultStyles.customClasses, customStyles?.customClasses]
      .filter(Boolean)
      .join(' ')
  };

  return getSectionThemeClasses(styles);
}
