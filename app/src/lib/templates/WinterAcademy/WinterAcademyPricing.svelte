<script lang="ts">
  const features = [
    'Kompletter 8-Wochen Intensivkurs',
    'Persönliches 1:1 Mentoring',
    'Live Trading Sessions',
    'Private Community Zugang',
    'Trading Tools & Templates',
    'Lebenslanger Zugriff',
    'E-Mail & Chat Support',
    'Wöchentliche Q&A Calls'
  ];

  const bonuses = [
    {
      title: 'Trading Journal Pro',
      value: '497€',
      description: 'Professionelles Template für Performance-Tracking und Trade-Analyse'
    },
    {
      title: 'Premium Indikator-Paket',
      value: '997€',
      description: 'Suite von exklusiven Trading-Indikatoren für präzise Marktanalysen'
    },
    {
      title: 'Strategie-Handbuch 2024',
      value: '297€',
      description: 'Detaillierte Trading-Strategien mit aktualisierten Setups'
    },
    {
      title: 'Risikomanagement-Toolkit',
      value: '397€',
      description: 'Tools und Templates für professionelles Money Management'
    }
  ];
</script>

<div class="relative z-10 container px-4 mx-auto">
  <div class="max-w-5xl mx-auto">
    <!-- Section Header -->
    <div class="text-center mb-20">
      <span class="inline-block py-1 px-3 mb-4 text-xs font-medium text-primary-900 bg-primary-50 rounded-full">
        WINTER ACADEMY 2024
      </span>
      <h2 class="text-4xl lg:text-5xl font-bold mb-6">
        Investiere in deine Trading-Zukunft
      </h2>
      <p class="text-xl text-gray-600 max-w-3xl mx-auto">
        Sichere dir jetzt einen der limitierten Plätze und starte deine Transformation zum erfolgreichen Trader
      </p>
    </div>

    <!-- Pricing Box -->
    <div class="relative">
      <!-- Background Elements -->
      <div class="absolute -inset-4 lg:-inset-8 bg-gray-50 rounded-[2.5rem] -z-10"></div>
      <div class="absolute -inset-3 lg:-inset-6 bg-ultra-light rounded-[2rem] -z-10 opacity-60"></div>
      
      <!-- Content -->
      <div class="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div class="p-8 lg:p-12">
          <!-- Header -->
          <div class="text-center mb-12">
            <div class="inline-block px-4 py-2 bg-primary-50 rounded-full mb-6">
              <span class="text-sm font-medium text-primary-800">EARLY BIRD ANGEBOT - NUR NOCH 8 PLÄTZE</span>
            </div>
            <div class="flex items-center justify-center gap-4 mb-4">
              <span class="text-3xl font-light text-gray-400 line-through">3.997€</span>
              <span class="text-5xl font-bold text-primary-800">2.497€</span>
            </div>
            <div class="text-gray-600">
              Einmalzahlung oder 3 Monatsraten à 897€
            </div>
          </div>

          <!-- Features Grid -->
          <div class="grid md:grid-cols-2 gap-6 mb-12">
            {#each features as feature}
              <div class="flex items-center gap-3">
                <svg class="w-5 h-5 text-primary-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span class="text-gray-700">{feature}</span>
              </div>
            {/each}
          </div>

          <!-- Bonuses -->
          <div class="bg-gray-50 rounded-xl p-8 mb-12">
            <h3 class="text-xl font-bold mb-6">Bonus-Pakete im Wert von 2.188€</h3>
            <div class="space-y-6">
              {#each bonuses as bonus}
                <div class="flex items-center gap-6">
                  <div class="w-20 text-right">
                    <span class="font-bold text-primary-800">{bonus.value}</span>
                  </div>
                  <div class="flex-grow">
                    <div class="font-medium mb-1">{bonus.title}</div>
                    <div class="text-sm text-gray-600">{bonus.description}</div>
                  </div>
                </div>
              {/each}
            </div>
          </div>

          <!-- CTA -->
          <div class="text-center">
            <a 
              href="mailto:support@freiraumstrategen.de?subject=Winter%20Academy%20Anmeldung" 
              class="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white bg-primary-800 hover:bg-primary-900 rounded-xl transition-colors w-full md:w-auto group"
            >
              Jetzt Platz sichern
              <svg class="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <div class="mt-4 text-sm text-gray-600">
              Nur noch 8 Plätze zum Early Bird Preis verfügbar
            </div>
          </div>
        </div>

        <!-- Bottom Banner -->
        <div class="bg-primary-800 text-white px-8 py-6 text-center">
          <div class="font-medium mb-1">100% Zufriedenheitsgarantie</div>
          <div class="text-sm text-primary-100">
            30 Tage Geld-zurück-Garantie - Starte ohne Risiko in deine Trading-Zukunft
          </div>
        </div>
      </div>
    </div>

    <!-- Trust Elements -->
    <div class="mt-16 text-center">
      <div class="flex flex-wrap justify-center gap-8 text-gray-500 text-sm">
        <div class="flex items-center gap-2">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          <span>Sichere Zahlung</span>
        </div>
        <div class="flex items-center gap-2">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
          <span>30 Tage Geld-zurück-Garantie</span>
        </div>
        <div class="flex items-center gap-2">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>Sofortiger Zugang</span>
        </div>
      </div>
    </div>
  </div>
</div>
