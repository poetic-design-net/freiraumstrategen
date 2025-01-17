import type { Section } from '$lib/sanity/queries/types'

export type BadgeIcon = 'rocket' | 'star' | 'education' | 'strategy' | 'check'

export interface CurriculumModule {
  week: number
  title: string
  description: string
  topics: string[]
  badge?: string
  badgeIcon?: BadgeIcon
  date?: string
  startTime?: string
  endTime?: string
}

// Helper function to generate iCal format
export function generateICalEvent(module: CurriculumModule): string | null {
  if (!module.date || !module.startTime || !module.endTime) return null;
  
  const [startHour, startMinute] = module.startTime.split(':');
  const [endHour, endMinute] = module.endTime.split(':');
  
  const startDate = new Date(module.date);
  startDate.setHours(parseInt(startHour), parseInt(startMinute));
  
  const endDate = new Date(module.date);
  endDate.setHours(parseInt(endHour), parseInt(endMinute));
  
  const formatDate = (date: Date) => {
    return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  };

  const escapeText = (text: string) => {
    return text
      .replace(/[\\;,]/g, (match) => '\\' + match)
      .replace(/\n/g, '\\n')
      .replace(/\r/g, '\\r');
  };

  return [
    'BEGIN:VEVENT',
    `DTSTART:${formatDate(startDate)}`,
    `DTEND:${formatDate(endDate)}`,
    `SUMMARY:${escapeText(module.title)}`,
    `DESCRIPTION:${escapeText(module.description)}`,
    'END:VEVENT'
  ].join('\r\n');
}

export type BonusBoxStyle = 'orange' | 'primary' | 'gray'

export interface BonusBox {
  title: string
  description: string
  style?: BonusBoxStyle
  ctaButton?: {
    text: string
    link: string
  }
}

export type CurriculumLayout = 'two-columns' | 'single-column'

export interface SalesCurriculumSection extends Section {
  _type: 'salesCurriculumSection'
  badge?: string
  title: string
  subtitle?: string
  modules: CurriculumModule[]
  bonusBox?: BonusBox
  layout?: CurriculumLayout
}

// Type guard
export function isSalesCurriculumSection(section: any): section is SalesCurriculumSection {
  return section._type === 'salesCurriculumSection'
}
