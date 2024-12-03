<script lang="ts">
  import { onMount } from 'svelte';
  import { gsap } from 'gsap';
  import { ScrollTrigger } from 'gsap/all';

  gsap.registerPlugin(ScrollTrigger);

  const features = [
    {
      icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01',
      title: 'Professionelle Trading-Strategien',
      description: 'Entwickle deinen eigenen Trading-Stil mit bewährten Strategien für verschiedene Marktphasen.',
      color: 'from-blue-400 to-blue-600'
    },
    {
      icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
      title: 'Risikomanagement-Masterclass',
      description: 'Lerne, wie du dein Trading-Kapital effektiv schützt und nachhaltig aufbaust.',
      color: 'from-green-400 to-green-600'
    },
    {
      icon: 'M13 10V3L4 14h7v7l9-11h-7z',
      title: 'Live-Trading-Sessions',
      description: 'Erlebe Trading in Echtzeit und lerne direkt von erfahrenen Tradern in den Märkten.',
      color: 'from-yellow-400 to-yellow-600'
    },
    {
      icon: 'M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122',
      title: 'Individuelle Betreuung',
      description: 'Persönliches Mentoring und maßgeschneiderte Unterstützung für deinen Trading-Erfolg.',
      color: 'from-purple-400 to-purple-600'
    },
    {
      icon: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
      title: 'Trading-Workstation Setup',
      description: 'Optimiere dein Trading-Setup mit den effektivsten Tools und Indikatoren.',
      color: 'from-red-400 to-red-600'
    },
    {
      icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
      title: 'Flexible Zeiteinteilung',
      description: 'Lerne in deinem eigenen Tempo und integriere das Trading optimal in deinen Alltag.',
      color: 'from-indigo-400 to-indigo-600'
    }
  ];

  let featuresRef: HTMLElement;

  onMount(() => {
    const cards = featuresRef.querySelectorAll('.feature-card');
    
    cards.forEach((card, index) => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: "top bottom-=100",
          toggleActions: "play none none reverse"
        },
        opacity: 0,
        y: 50,
        duration: 0.6,
        delay: index * 0.1
      });
    });
  });
</script>

<div class="relative py-20 lg:py-32 overflow-hidden">
  <!-- Background Elements -->
  <div class="absolute inset-0">
    <div class="absolute inset-0 
      bg-gradient-to-br from-primary-900/5 to-transparent"
    ></div>
    <div class="absolute inset-y-0 right-0 w-1/2
      bg-gradient-to-l from-primary-50/20 to-transparent"
    ></div>
  </div>

  <div class="container px-4 mx-auto relative z-10">
    <div class="max-w-7xl mx-auto">
      <!-- Section Header -->
      <div class="text-center mb-20">
        <span class="inline-block py-1 px-3 mb-4 text-xs font-medium text-primary-900 bg-primary-50 rounded-full">
          ACADEMY FEATURES
        </span>
        <h2 class="text-4xl lg:text-5xl font-bold mb-6">
          Dein Weg zum erfolgreichen Trader
        </h2>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto">
          Ein umfassendes Programm, das dich vom Anfänger zum selbstbewussten Trader entwickelt.
        </p>
      </div>

      <!-- Features Grid -->
      <div 
        bind:this={featuresRef}
        class="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {#each features as feature}
          <div class="feature-card group">
            <div class="relative h-full p-8 bg-white rounded-3xl shadow-sm hover:shadow-lg transition-all duration-300">
              <!-- Hover Gradient Border -->
              <div class="absolute inset-0 rounded-3xl bg-gradient-to-br {feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
              
              <!-- Icon -->
              <div class="w-12 h-12 mb-6 flex items-center justify-center rounded-xl bg-gradient-to-br {feature.color} bg-opacity-10">
                <svg 
                  class="w-6 h-6 text-gray-700" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    stroke-linecap="round" 
                    stroke-linejoin="round" 
                    stroke-width="2" 
                    d={feature.icon}
                  />
                </svg>
              </div>

              <!-- Content -->
              <h3 class="text-xl font-bold mb-4 group-hover:text-primary-800 transition-colors duration-300">
                {feature.title}
              </h3>
              <p class="text-gray-600">
                {feature.description}
              </p>

              <!-- Hover Line -->
              <div class="absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r {feature.color} scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
            </div>
          </div>
        {/each}
      </div>

      <!-- Bottom CTA -->
      <div class="mt-16 text-center">
        <a 
          href="#curriculum" 
          class="inline-flex items-center justify-center px-8 py-4 text-base font-medium text-white bg-primary-800 hover:bg-primary-900 rounded-xl transition-colors group"
        >
          Zum Lehrplan
          <svg class="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </a>
      </div>
    </div>
  </div>
</div>

<style>
  .feature-card {
    backface-visibility: hidden;
  }
</style>
