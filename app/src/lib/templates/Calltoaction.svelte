<script lang="ts">
  import MemberForm from '$lib/components/MemberForm.svelte';
  import { onMount } from 'svelte';
  import { gsap } from 'gsap';
  import ScrollTrigger from 'gsap/ScrollTrigger';
  import { cleanText } from '$lib/utils/textCleaner';
  import BackgroundImage from '$lib/components/BackgroundImage.svelte';

  interface Content {
    headline: string;
    description: string;
  }

  interface Form {
    enabled: boolean;
    successMessage?: string;
    errorMessage?: string;
  }

  interface Design {
    backgroundColor: string;
    backgroundImage?: {
      asset?: {
        url?: string;
      };
      hotspot?: {
        x: number;
        y: number;
      };
      crop?: {
        top: number;
        bottom: number;
        left: number;
        right: number;
      };
    };
    backgroundOpacity: number;
  }

  interface Animation {
    enabled: boolean;
    textAnimation?: {
      duration: number;
      stagger: number;
    };
    scrollIndicator?: {
      show: boolean;
      text: string;
    };
  }

  export let content: Content = {
    headline: 'Hole Dir kostenfreien Zugang zu unserem Mitgliederbereich',
    description: 'Mit einem kostenfreien Mitglieder-Zugang hast Du unmittelbaren Zugriff auf den Online Videokurs "Trading für Einsteiger", das "OrderTool" für den MetaTrader4, das "Trading Journal" und erhältst unseren Newsletter'
  };

  export let form: Form = {
    enabled: true,
    successMessage: 'Vielen Dank für Ihre Registrierung! Wir werden uns in Kürze bei Ihnen melden.',
    errorMessage: 'Es ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut.'
  };

  export let design: Design = {
    backgroundColor: 'bg-orange-600',
    backgroundOpacity: 0.3
  };

  export let animation: Animation = {
    enabled: true,
    textAnimation: {
      duration: 1,
      stagger: 0.15
    },
    scrollIndicator: {
      show: true,
      text: 'Scroll'
    }
  };
  
  $: cleanedHeadline = cleanText(content.headline);
  $: cleanedDescription = cleanText(content.description);
  $: cleanedBackgroundColor = cleanText(design.backgroundColor);
  $: cleanedOpacityClass = `opacity-${Math.round(design.backgroundOpacity * 100)}`;
  
  onMount(() => {
    if (typeof window !== 'undefined' && animation.enabled) {
      gsap.registerPlugin(ScrollTrigger);
      
      gsap.set('.headline', { opacity: 0, y: 20 });
      gsap.set('.animate-paragraph', { opacity: 0, y: 20 });
      gsap.set('.animate-form', { opacity: 0, y: 20 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".headline-container",
          start: "top 80%",
          once: true,
          toggleActions: "play none none none"
        }
      });

      tl.to('.headline', {
        opacity: 1,
        y: 0,
        duration: animation.textAnimation?.duration || 1,
        ease: "power4.out",
      })
      .to('.animate-paragraph', {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
      }, "-=0.5")
      .to('.animate-form', {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
      }, "-=0.7");

      if (animation.scrollIndicator?.show) {
        // Continuous bounce animation for the scroll indicator
        gsap.to(".scroll-indicator", {
          y: 15,
          opacity: 0.5,
          duration: 1.5,
          repeat: -1,
          yoyo: true,
          ease: "power1.inOut"
        });

        // Scroll indicator visibility control
        ScrollTrigger.create({
          trigger: ".cta-section",
          start: "top top",
          end: "bottom 15%", // Changed from 'bottom top' to 'bottom 25%' to keep visible longer
          onUpdate: (self) => {
            const progress = self.progress;
            // Fade out gradually as user scrolls past 75% of the section
            if (progress > 0.85) {
              const opacity = 1 - ((progress - 0.85) * 4); // Smooth fade out in the last 25%
              gsap.set(".scroll-indicator-container", { opacity: Math.max(0, opacity) });
            } else {
              gsap.set(".scroll-indicator-container", { opacity: 1 });
            }
          }
        });
      }
    }
  });
</script>

<div class="cta-section relative w-full min-h-dvh flex items-center {cleanedBackgroundColor} justify-center">
  {#if design.backgroundImage?.asset}
    <BackgroundImage 
      value={design.backgroundImage}
      customClass="absolute top-0 start-0 w-full h-full object-cover {cleanedOpacityClass}"
    />
  {/if}
  <div class="relative z-10 max-w-3xl mx-auto px-4 flex flex-col gap-12 headline-container py-20">
    <div class="text-center flex flex-col gap-8">
      <h4 class="headline font-heading text-4xl sm:text-5xl md:text-6xl text-gray-50 font-medium">
        {cleanedHeadline}
      </h4>
      <p class="text-lg font-light text-gray-50 animate-paragraph">
        {cleanedDescription}
      </p>
    </div>
    {#if form.enabled}
      <div class="animate-form">
        <MemberForm 
          successMessage={cleanText(form.successMessage)}
          errorMessage={cleanText(form.errorMessage)}
        />
      </div>
    {/if}
  </div>

  {#if animation.scrollIndicator?.show}
    <div class="scroll-indicator-container absolute end-0 top-1/2 transform -translate-y-1/2 z-20 hidden lg:flex flex-col items-center pe-8">
      <div class="flex flex-col items-center gap-2 opacity-75">
        <span class="text-white text-sm font-regular tracking-wider">{cleanText(animation.scrollIndicator.text)}</span>
        <div class="scroll-indicator w-6 h-12 border-2 border-white rounded-full flex items-start justify-center p-2">
          <svg 
            class="w-4 h-4 text-white" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              stroke-linecap="round" 
              stroke-linejoin="round" 
              stroke-width="2" 
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </div>
    </div>
  {/if}
</div>
