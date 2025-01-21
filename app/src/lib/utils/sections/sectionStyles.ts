export interface SectionStyles {
  theme?: 'light' | 'dark' | 'light-gray';
  padding?: 'none' | 'small' | 'medium' | 'large';
}

export function getThemeStyles(theme?: string) {
  switch (theme) {
    case 'light':
      return {
        background: 'bg-white',
        text: 'text-gray-900',
        border: 'border-gray-200',
      };
    case 'dark':
      return {
        background: 'bg-gray-900',
        text: 'text-white',
        border: 'border-gray-800',
      };
    case 'light-gray':
    default:
      return {
        background: 'bg-gray-50',
        text: 'text-gray-900',
        border: 'border-gray-200',
      };
  }
}