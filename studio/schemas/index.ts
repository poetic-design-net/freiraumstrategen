// Import all schemas
import blockContent from './blockContent'
import post from './post'
import category from './category'
import page from './page'
import hero from './blocks/hero'
import testimonial from './testimonials'
import likes from './likes'
import navigation from './documents/navigation'
import faq from './faq'
import legal from './documents/legal'
import seo from './objects/seo'
import landingPage from './documents/landingPage'
import sectionStyles from './objects/sectionStyles'

// Import section schemas
import heroSection from './objects/sections/heroSection'
import caseSection from './objects/sections/caseSection'
import contentSectionAlt from './objects/sections/contentSectionAlt'
import stepSection from './objects/sections/stepSection'
import testimonialsSection from './objects/sections/testimonialsSection'
import featuresSection from './objects/sections/featuresSection'
import contentSection from './objects/sections/contentSection'
import callToActionSection from './objects/sections/callToActionSection'
import kachelSection from './objects/sections/kachelSection'
import strategyHeroSection from './objects/sections/strategyHeroSection'
import strategyIntroSection from './objects/sections/strategyIntroSection'
import strategyFeaturesSection from './objects/sections/strategyFeaturesSection'
import strategyFeaturesSectionAlt from './objects/sections/strategyFeaturesSectionAlt'
import blogSection from './objects/sections/blogSection'
import contactFormSection from './objects/sections/contactFormSection'
import contactHeroSection from './objects/sections/contactHeroSection'
import faqSection from './objects/sections/faqSection'
import uberunsHeroSection from './objects/sections/uberunsHeroSection'
import uberunsIntroSection from './objects/sections/uberunsIntroSection'
import uberunsTeamSection from './objects/sections/uberunsTeamSection'

// Import sales section schemas
import salesHeroSection from './objects/sections/salesHeroSection'
import salesAdvantagesSection from './objects/sections/salesAdvantagesSection'
import salesContentSection from './objects/sections/salesContentSection'
import salesCurriculumSection from './objects/sections/salesCurriculumSection'
import salesEmotionalSection from './objects/sections/salesEmotionalSection'
import salesEmotionalFreedomSection from './objects/sections/salesEmotionalFreedomSection'
import salesFaqSection from './objects/sections/salesFaqSection'
import salesFeaturesSection from './objects/sections/salesFeaturesSection'
import salesForWhoSection from './objects/sections/salesForWhoSection'
import salesPricingSection from './objects/sections/salesPricingSection'
import salesWhyContentSection from './objects/sections/salesWhyContentSection'

// Import frontpage schema
import frontpage from './documents/frontpage'

export const schemaTypes = [
  // Documents
  frontpage,
  post,
  page,
  legal,
  navigation,
  category,
  faq,
  testimonial,
  landingPage,
  
  // Objects
  blockContent,
  hero,
  likes,
  seo,
  sectionStyles,
  
  // Section Schemas
  heroSection,
  caseSection,
  contentSectionAlt,
  stepSection,
  testimonialsSection,
  featuresSection,
  contentSection,
  callToActionSection,
  kachelSection,
  strategyHeroSection,
  strategyIntroSection,
  strategyFeaturesSection,
  strategyFeaturesSectionAlt,
  blogSection,
  contactFormSection,
  contactHeroSection,
  faqSection,
  uberunsHeroSection,
  uberunsIntroSection,
  uberunsTeamSection,

  // Sales Section Schemas
  salesHeroSection,
  salesAdvantagesSection,
  salesContentSection,
  salesCurriculumSection,
  salesEmotionalSection,
  salesEmotionalFreedomSection,
  salesFaqSection,
  salesFeaturesSection,
  salesForWhoSection,
  salesPricingSection,
  salesWhyContentSection
]
