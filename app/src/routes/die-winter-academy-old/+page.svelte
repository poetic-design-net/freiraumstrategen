<script lang="ts">
  import WinterAcademyHero from '$lib/templates/WinterAcademy/WinterAcademyHero.svelte';
  import WinterAcademyContent from '$lib/templates/WinterAcademy/WinterAcademyContent.svelte';
  import WinterAcademyWhyContent from '$lib/templates/WinterAcademy/WinterAcademyWhyContent.svelte';
  import WinterAcademyForWho from '$lib/templates/WinterAcademy/WinterAcademyForWho.svelte';
  import WinterAcademyAdvantages from '$lib/templates/WinterAcademy/WinterAcademyAdvantages.svelte';
  import WinterAcademyCurriculum from '$lib/templates/WinterAcademy/WinterAcademyCurriculum.svelte';
  import WinterAcademyEmotionalFreedom from '$lib/templates/WinterAcademy/WinterAcademyEmotionalFreedom.svelte';
  import WinterAcademyEmotionalCoaching from '$lib/templates/WinterAcademy/WinterAcademyEmotionalCoaching.svelte';
  import WinterAcademyPricing from '$lib/templates/WinterAcademy/WinterAcademyPricing.svelte';
  import WinterAcademyFaq from '$lib/templates/WinterAcademy/WinterAcademyFaq.svelte';

  // Simple scroll handler for any scroll-based functionality we might need
  let scrollProgress = 0;

  function handleScroll() {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight - windowHeight;
    scrollProgress = window.scrollY / documentHeight;
  }
</script>

<svelte:window on:scroll={handleScroll} />

<!-- Hero Section -->
<section 
  class="relative overflow-hidden"
  style="
    height: calc(100dvh - var(--header-height));
    padding-top: var(--header-height);
  "
>
  <WinterAcademyHero />
</section>

<!-- Main Content Section -->
<section class="relative py-24 lg:py-32 overflow-hidden">
  <!-- Background Gradients -->
  <div class="absolute inset-0">
    <div class="absolute inset-0 
      bg-[radial-gradient(circle_at_top_left,theme(colors.primary.50),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(var(--primary-rgb),0.05),transparent_30%)]"
    ></div>
  </div>




  <!-- Content -->
  <div class="relative z-10">
    <WinterAcademyContent 
      title="Ein voller Tag braucht kein kompliziertes Trading"
      subtitle="Doch Dein Kapital braucht Dich"
      badge="ZEITEFFIZIENTES TRADING"
    />
  </div>
</section>

<!-- Freedom Emotional Section -->
<section>
  <WinterAcademyEmotionalFreedom />
</section>

<!-- Why Winter Academy Section -->
<section class="relative py-24 lg:py-32 bg-gray-50 overflow-hidden">
  <WinterAcademyWhyContent />
</section>

<!-- For Who Section -->
<section class="relative py-24 lg:py-32 overflow-hidden">
  <div class="absolute inset-0">
    <div class="absolute inset-0 
      bg-[radial-gradient(circle_at_top_right,theme(colors.primary.50),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(var(--primary-rgb),0.05),transparent_30%)]"
    ></div>
  </div>
  <div class="relative z-10">
    <WinterAcademyForWho />
  </div>
</section>

<!-- Advantages Section -->
<section id="advantages" class="relative py-24 lg:py-32 bg-gray-50 overflow-hidden">
  <div class="absolute inset-0">
    <div class="absolute inset-0 
      bg-[radial-gradient(circle_at_bottom_left,theme(colors.primary.50),transparent_35%),radial-gradient(circle_at_top_right,rgba(var(--primary-rgb),0.05),transparent_30%)]"
    ></div>
  </div>
  <div class="relative z-10">
    <WinterAcademyAdvantages />
  </div>
</section>



<!-- Curriculum Section -->
<section id="curriculum" class="relative py-24 lg:py-32 overflow-hidden">
  <WinterAcademyCurriculum />
</section>

<!-- Coaching Emotional Section -->
<section>
  <WinterAcademyEmotionalCoaching />
</section>

<!-- Pricing Section -->
<section id="pricing" class="relative py-24 lg:py-32 bg-gray-50 overflow-hidden">
  <div class="absolute inset-0">
    <div class="absolute inset-0 
      bg-[radial-gradient(circle_at_center,theme(colors.primary.50),transparent_70%)]"
    ></div>
  </div>
  <div class="relative z-10">
    <WinterAcademyPricing />
  </div>
</section>

<!-- FAQ Section -->
<section id="faq" class="relative py-24 lg:py-32 overflow-hidden">
  <WinterAcademyFaq />
</section>

<!-- Final CTA -->
<section class="relative py-24 lg:py-32 overflow-hidden bg-primary-900 text-white">
  <div class="absolute inset-0">
    <div class="absolute inset-0 
      bg-[radial-gradient(circle_at_center,theme(colors.primary.800),transparent_100%)]"
    ></div>
  </div>
  
  <div class="container px-4 mx-auto relative z-10">
    <div class="max-w-4xl mx-auto text-center">
      <h2 class="text-4xl lg:text-5xl font-bold mb-8">
        Bereit für deinen Trading-Durchbruch?
      </h2>
      <p class="text-xl text-primary-100 mb-12 max-w-2xl mx-auto">
        Sichere dir jetzt einen der limitierten Plätze in der Winter Academy 2024 
        und starte deine Transformation zum erfolgreichen Trader.
      </p>
      <div class="flex flex-wrap gap-4 justify-center">
        <a 
          href="#pricing" 
          class="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-primary-900 bg-white hover:bg-primary-50 rounded-xl transition-colors group"
        >
          Jetzt Platz sichern
          <svg class="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </a>
        <a 
          href="mailto:support@freiraumstrategen.de" 
          class="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white border-2 border-white hover:bg-white/10 rounded-xl transition-colors"
        >
          Fragen? Kontaktiere uns
        </a>
      </div>
    </div>
  </div>
</section>

<style>
  section {
    scroll-margin-top: var(--header-height);
  }
</style>
