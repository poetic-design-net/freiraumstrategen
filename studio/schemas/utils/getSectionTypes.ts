import { 
  HomeIcon, 
  ImageIcon, 
  DocumentIcon,
  UsersIcon, 
  StarIcon, 
  BlockElementIcon,
  BulbOutlineIcon,
  RocketIcon,
  ThListIcon,
  DocumentsIcon,
  CreditCardIcon,
  TagIcon,
  HeartIcon,
  UserIcon,
  CommentIcon,
  ClockIcon
} from '@sanity/icons'

interface SectionType {
  type: string
  title: string
  icon: React.ComponentType
  description?: string
}

export const getSectionTypes = (): SectionType[] => [
  {
    type: 'comingSoonSection',
    title: 'Coming Soon Sektion',
    icon: ClockIcon,
    description: 'Platzhalter-Sektion für zukünftige Inhalte'
  },
  {
    type: 'salesHeroSection',
    title: 'Sales Hero Sektion',
    icon: HomeIcon,
    description: 'Hauptbereich für Sales-Seiten'
  },
  {
    type: 'salesAdvantagesSection',
    title: 'Sales Vorteile',
    icon: StarIcon,
    description: 'Vorteile und Mehrwerte des Angebots'
  },
  {
    type: 'salesContentSection',
    title: 'Sales Content',
    icon: DocumentIcon,
    description: 'Hauptinhaltsbereich für Sales-Seiten'
  },
  {
    type: 'salesWhyContentSection',
    title: 'Sales Why Content',
    icon: DocumentIcon,
    description: 'Erklärender Inhaltsbereich mit Statistiken'
  },
  {
    type: 'salesCurriculumSection',
    title: 'Sales Lehrplan',
    icon: DocumentsIcon,
    description: 'Kursübersicht und Lehrplan'
  },
  {
    type: 'salesEmotionalSection',
    title: 'Sales Emotional',
    icon: HeartIcon,
    description: 'Emotionaler Bereich mit Hintergrundbild'
  },
  {
    type: 'salesEmotionalFreedomSection',
    title: 'Sales Emotional Freedom',
    icon: HeartIcon,
    description: 'Emotionaler Bereich mit Freiheitsaspekt'
  },
  {
    type: 'salesFaqSection',
    title: 'Sales FAQ',
    icon: CommentIcon,
    description: 'Häufig gestellte Fragen zum Angebot'
  },
  {
    type: 'salesFeaturesSection',
    title: 'Sales Features',
    icon: TagIcon,
    description: 'Hauptfunktionen und Features des Angebots'
  },
  {
    type: 'salesForWhoSection',
    title: 'Sales Zielgruppe',
    icon: UserIcon,
    description: 'Beschreibung der Zielgruppe und Anforderungen'
  },
  {
    type: 'salesPricingSection',
    title: 'Sales Preise',
    icon: CreditCardIcon,
    description: 'Preisgestaltung und Angebotspakete'
  },
  {
    type: 'strategyHeroSection',
    title: 'Strategy Hero Sektion',
    icon: RocketIcon,
    description: 'Hauptbereich für Strategie-Seiten'
  },
  {
    type: 'strategyIntroSection',
    title: 'Strategy Intro Sektion',
    icon: BulbOutlineIcon,
    description: 'Einführungsbereich für Strategie-Seiten'
  },
  {
    type: 'strategyFeaturesSection',
    title: 'Strategy Features Sektion',
    icon: StarIcon,
    description: 'Features-Bereich für Strategie-Seiten'
  },
  {
    type: 'strategyFeaturesSectionAlt',
    title: 'Strategy Features Sektion (Alt)',
    icon: StarIcon,
    description: 'Alternative Features-Sektion für Strategie-Seiten'
  },
  {
    type: 'heroSection',
    title: 'Hero Sektion',
    icon: HomeIcon,
    description: 'Hauptbereich der Seite mit Titel und Call-to-Action'
  },
  {
    type: 'caseSection',
    title: 'Scroll Slider',
    icon: DocumentsIcon,
    description: 'Pages & Posts'
  },
  {
    type: 'contentSectionAlt',
    title: 'Content Sektion (Alt)',
    icon: BlockElementIcon,
    description: 'Alternative Inhaltssektion mit speziellem Layout'
  },
  {
    type: 'stepSection',
    title: 'Schritt-für-Schritt',
    icon: RocketIcon,
    description: 'Prozessschritte oder Anleitungen'
  },
  {
    type: 'testimonialsSection',
    title: 'Testimonials',
    icon: UsersIcon,
    description: 'Kundenstimmen und Bewertungen'
  },
  {
    type: 'featuresSection',
    title: 'Features',
    icon: StarIcon,
    description: 'Hauptfunktionen und Vorteile'
  },
  {
    type: 'contentSection',
    title: 'Content Sektion',
    icon: DocumentIcon,
    description: 'Standard Inhaltsbereich'
  },
  {
    type: 'callToActionSection',
    title: 'Call to Action',
    icon: BulbOutlineIcon,
    description: 'Aktionsaufforderung mit Button'
  },
  {
    type: 'kachelSection',
    title: 'Kachel Sektion',
    icon: ThListIcon,
    description: 'Grid-Layout mit Inhaltskacheln'
  },
  {
    type: 'blogSection',
    title: 'Blog Sektion',
    icon: DocumentsIcon,
    description: 'Blog-Beiträge und News'
  },
  {
    type: 'contactFormSection',
    title: 'Kontakt Formular',
    icon: DocumentIcon,
    description: 'Kontaktformular Sektion'
  },
  {
    type: 'contactHeroSection',
    title: 'Kontakt Hero',
    icon: HomeIcon,
    description: 'Hero-Bereich für Kontaktseiten'
  },
  {
    type: 'faqSection',
    title: 'FAQ Sektion',
    icon: DocumentIcon,
    description: 'Häufig gestellte Fragen'
  },
  {
    type: 'uberunsHeroSection',
    title: 'Über uns Hero',
    icon: HomeIcon,
    description: 'Hero-Bereich für Über uns Seite'
  },
  {
    type: 'uberunsIntroSection',
    title: 'Über uns Intro',
    icon: BulbOutlineIcon,
    description: 'Einführungsbereich für Über uns Seite'
  },
  {
    type: 'uberunsTeamSection',
    title: 'Über uns Team',
    icon: UsersIcon,
    description: 'Team-Bereich für Über uns Seite'
  }
]

export const getSectionArray = () => ({
  name: 'sections',
  title: 'Sektionen',
  description: 'Wählen und ordnen Sie die Sektionen der Seite',
  type: 'array',
  of: getSectionTypes().map(({ type, title, description }) => ({
    type,
    title,
    description
  })),
  options: {
    sortable: true
  }
})
