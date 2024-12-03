import { gsap } from 'gsap';
import { SplitText, ScrollTrigger } from 'gsap/all';

interface HeroElements {
  headlineRef: HTMLElement;
  gradientTextRef: HTMLElement;
  partnerSectionRef: HTMLElement;
  heroImageRef: HTMLElement;
  statsBoxRef: HTMLElement;
  arrowRef: SVGSVGElement;
  buttonRef: HTMLElement;
}

export function initHeroAnimation(elements: HeroElements) {
  gsap.registerPlugin(ScrollTrigger, SplitText);

  const splitHeadline = new SplitText(elements.headlineRef, { type: "chars,words" });
  
  // Initial state setup
  gsap.set([elements.heroImageRef, elements.statsBoxRef], {
    opacity: 0,
    willChange: 'transform, opacity'
  });
  
  const tl = gsap.timeline({
    paused: false,
    onComplete: () => {
      // Remove willChange after animation completes
      gsap.set([elements.heroImageRef, elements.statsBoxRef], {
        willChange: 'auto'
      });
    }
  });
  
  tl.from(elements.gradientTextRef, { 
    opacity: 0, 
    y: 20,
    duration: 0.6
  })
  .from(splitHeadline.chars, {
    opacity: 0,
    y: 20,
    stagger: 0.02,
    duration: 0.4
  }, "-=0.4")
  .from(elements.buttonRef, {
    opacity: 0,
    y: 20,
    duration: 0.4
  }, "-=0.4")
  .from(elements.arrowRef, {
    opacity: 0,
    x: -20,
    duration: 0.4
  }, "-=0.4")
  .to(`${elements.arrowRef.tagName} .arrow-path`, {
    strokeDashoffset: 0,
    duration: 0.8,
    ease: "power2.inOut"
  }, "-=0.2")
  .to(elements.heroImageRef, {
    opacity: 1,
    duration: 0.8,
    ease: "power2.out"
  }, "-=0.6")
  .to(elements.statsBoxRef, {
    opacity: 1,
    duration: 0.6,
    ease: "power2.out"
  }, "-=0.4")
  .from(elements.partnerSectionRef, {
    opacity: 0,
    y: 20,
    duration: 0.4
  }, "-=0.2");

  // Return cleanup function
  return () => {
    // Kill all tweens and timelines
    gsap.killTweensOf([
      elements.gradientTextRef,
      elements.headlineRef,
      elements.buttonRef,
      elements.arrowRef,
      elements.heroImageRef,
      elements.statsBoxRef,
      elements.partnerSectionRef,
      ".arrow-path"
    ]);
    
    // Revert split text
    splitHeadline.revert();
    
    // Reset all elements to their default state
    gsap.set([
      elements.gradientTextRef,
      elements.headlineRef,
      elements.buttonRef,
      elements.arrowRef,
      elements.heroImageRef,
      elements.statsBoxRef,
      elements.partnerSectionRef
    ], {
      clearProps: "all"
    });
  };
}

export const gsapDefaults = {
  duration: 0.6,
  ease: "power2.out"
};
