<script lang="ts">
  // No GSAP needed
</script>

<div class="relative min-h-[80vh] flex items-center overflow-hidden">
  <!-- Background Image Layer -->
  <div class="absolute inset-0">
    <img 
      src="/assets/Trader-Coaching.jpg" 
      alt="Professional Trading" 
      class="w-full h-full object-cover motion-safe:parallax"
    />
  </div>

  <!-- Overlay Layer -->
  <div class="absolute inset-0 bg-black/40"></div>
  
  <!-- Content Layer -->
  <div class="container px-4 mx-auto relative z-10">
    <div class="max-w-3xl mr-auto"> <!-- Changed ml-auto to mr-auto -->
      <span class="inline-block py-1 px-3 mb-4 text-xs font-medium text-white bg-primary-600/70 shadow backdrop-blur-sm rounded-full">
        DEIN TRADING-DURCHBRUCH
      </span>
      <h2 class="text-4xl lg:text-5xl font-bold text-white mb-6">
        Professionelles Trading-Coaching
      </h2>
      <p class="text-xl text-white mb-8">
        Mit der richtigen Unterstützung und einem bewährten System kannst auch Du den Durchbruch im Trading schaffen. 
        Unsere Experten begleiten Dich auf jedem Schritt Deiner Trading-Reise.
      </p>
      <p class="text-lg text-white/90 mb-8">
        In der Winter Academy erhältst Du nicht nur Wissen, sondern auch das Selbstvertrauen und die Fähigkeiten, 
        die Du für erfolgreiches Trading brauchst.
      </p>
      <div class="text-2xl font-light text-white italic mb-8">
        "Der Unterschied zwischen einem erfolgreichen und einem durchschnittlichen Trader 
        liegt nicht im Wissen, sondern in der konsequenten Umsetzung einer bewährten Strategie."
      </div>
      <a 
        href="#pricing" 
        class="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-primary-900 bg-white hover:bg-primary-50 rounded-xl transition-colors group"
      >
        Jetzt durchstarten
        <svg class="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </a>
    </div>
  </div>
</div>

<style>
  @media (prefers-reduced-motion: no-preference) {
    .parallax {
      transform: translateZ(0);
      transition: transform 0.3s ease-out;
      will-change: transform;
    }

    .parallax:hover {
      transform: scale(1.05);
    }
  }
</style>
