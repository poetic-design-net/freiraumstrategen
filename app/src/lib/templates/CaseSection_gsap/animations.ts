import { gsap } from 'gsap';

interface AnimationSettings {
  enabled: boolean;
  duration: number;
}

const defaultAnimation: AnimationSettings = {
  enabled: true,
  duration: 0.6
};

export function updateCardStyles(
  cards: HTMLElement[],
  index: number,
  animation?: AnimationSettings
) {
  const settings = { ...defaultAnimation, ...animation };
  if (!settings.enabled) return;
  
  cards.forEach((card, i) => {
    const distance = i - index;
    gsap.to(card, {
      scale: distance <= 1 ? 1 : 
            distance === 2 ? 0.95 : 
            distance === 3 ? 0.9 : 0.85,
      opacity: distance <= 1 ? 1 : 
              distance === 2 ? 0.8 : 
              distance === 3 ? 0.6 : 0.4,
      duration: settings.duration || 0.4,
      ease: "power2.inOut"
    });
  });
}
