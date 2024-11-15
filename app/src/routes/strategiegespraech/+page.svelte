<script lang="ts">
    import { useQuery } from '@sanity/svelte-loader';
    import type { PageData } from './$types';
    import ImageRenderer from '$lib/components/ImageRenderer.svelte';
    import { formatDate } from '$lib/utils';
    import { urlFor } from '$lib/sanity/image'; // Importiere die urlFor-Funktion
    import { sanitizeText } from '$lib/utils';
    import StrategyHeroSection from '$lib/templates/StrategyHeroSection.svelte';
    import ContentSection from '$lib/templates/ContentSection.svelte';
    import StrategyIntroSection from '$lib/templates/StrategyIntroSection.svelte';
    import StrategyFeaturesSection from '$lib/templates/StrategyFeaturesSection.svelte';
    import StrategyFeaturesSection_alt from '$lib/templates/StrategyFeaturesSection_alt.svelte';
	  import Calltoaction from '$lib/templates/Calltoaction.svelte';
  
    let scrollProgress = 0;

    if (typeof window !== 'undefined') {
		window.addEventListener('scroll', () => {
			const section = document.querySelector('section:has(.sticky)');
			if (section) {
				const rect = section.getBoundingClientRect();
				const viewportHeight = window.innerHeight;
				const totalHeight = section.offsetHeight + viewportHeight;
				const scrolled = window.scrollY;
				scrollProgress = Math.min(Math.max(scrolled / totalHeight, 0), 1);
			}
		});
	}

</script>

<section 
  class="relative overflow-hidden"
  style="
    height: calc(100dvh - var(--header-height));
    padding-top: var(--header-height);
  "
>
  <StrategyHeroSection />
</section>

<section class="relative py-20 lg:py-32 overflow-hidden">
    <StrategyIntroSection />
</section>

<section class="relative py-12 lg:py-16 z-10">
    <StrategyFeaturesSection />
</section>

<section class="relative py-24 pt-32 overflow-hidden">
    <!-- Background Gradients -->
    <div class="absolute inset-0">
      <div class="absolute inset-0 
        bg-[radial-gradient(circle_at_top_left,theme(colors.primary.50),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(var(--primary-rgb),0.05),transparent_30%)]"
      ></div>
      
      <div class="absolute inset-0 overflow-hidden">
        <div class="absolute -inset-[100%] 
          bg-[radial-gradient(70%_70%_at_50%_50%,theme(colors.primary.50)_0%,transparent_100%)] 
          opacity-30
          animate-[spin_75s_linear_infinite]"
        ></div>
        <div class="absolute inset-0 backdrop-blur-[120px]"></div>
      </div>
  
      <!-- Wichtig: Übergangs-Gradient innerhalb der ersten Section -->
      <div class="absolute inset-x-0 bottom-0 h-64 
        bg-gradient-to-b 
        from-transparent 
        via-white/80
        to-white"
      ></div>
    </div>
  
    <!-- Content -->
    <div class="relative z-10">
      <ContentSection />
    </div>
  </section>


  <section class="relative w-full min-h-dvh lg:min-h-[200vh]">
    <div class="relative lg:sticky lg:top-0 w-full min-h-dvh">
      <Calltoaction />
    </div>
  </section>

  <section class="relative py-20 lg:py-24 overflow-hidden">	
    <div 
      class="absolute inset-0 hidden lg:block"
      style="opacity: {Math.max(0, (scrollProgress - 0.5) * 2)};"
    ></div>
    <div class=" mx-auto relative z-10">
      <StrategyFeaturesSection_alt />
    </div>	
  </section>

