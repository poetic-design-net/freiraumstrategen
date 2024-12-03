import type { SanityImage } from '$lib/types/heroSection';

interface HeadlineProps {
  prefix: string;
  main: string;
}

interface VideoProps {
  youtubeId: string;
  buttonText: string;
  duration: string;
}

export interface StrategyHeroProps {
  enabled?: boolean;
  headline?: HeadlineProps;
  backgroundImage: SanityImage;
  statistics: {
    firstStat: {
      value: string;
      label: string;
    };
    secondStat: {
      value: string;
      label: string;
    };
  };
  cta: {
    text: string;
    link: string;
  };
  video?: VideoProps;
}
