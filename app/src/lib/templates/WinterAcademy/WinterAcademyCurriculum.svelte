<script lang="ts">
  const modules = [
    {
      week: 1,
      title: 'Grundlagen & Marktverständnis',
      description: 'In der ersten Woche lernst Du die wichtigsten Grundlagen des Tradings kennen. Du verstehst, wie die Märkte funktionieren und wie Du sie effektiv analysieren kannst.',
      topics: [
        'Einführung in die verschiedenen Märkte und ihre Besonderheiten',
        'Grundlegende Chartanalyse und wichtige Chartmuster',
        'Zeitmanagement und Tradingplan-Entwicklung',
        'Auswahl der richtigen Handelsplattform und Tools',
        'Risikomanagement-Grundlagen'
      ]
    },
    {
      week: 2,
      title: 'Technische Analyse & Charting',
      description: 'Diese Woche widmen wir uns der technischen Analyse. Du lernst, wie Du Charts professionell analysierst und Handelssignale erkennst.',
      topics: [
        'Fortgeschrittene Chartmuster und ihre Bedeutung',
        'Trendlinien, Support und Resistance Levels',
        'Wichtige technische Indikatoren und ihre Anwendung',
        'Volumenanalyse und Market Profile',
        'Praktische Übungen zur Chartanalyse'
      ]
    },
    {
      week: 3,
      title: 'Risikomanagement & Money Management',
      description: 'Das Herzstück erfolgreichen Tradings: Diese Woche konzentrieren wir uns auf professionelles Risiko- und Money-Management.',
      topics: [
        'Entwicklung einer persönlichen Risikostrategie',
        'Position Sizing und Portfoliomanagement',
        'Stop-Loss Strategien und Take-Profit Levels',
        'Drawdown-Management und Kapitalsicherung',
        'Risiko/Rendite-Optimierung'
      ]
    },
    {
      week: 4,
      title: 'Trading-Psychologie & Mindset',
      description: 'In dieser Woche fokussieren wir uns auf die mentale Komponente des Tradings - ein oft unterschätzter, aber entscheidender Erfolgsfaktor.',
      topics: [
        'Psychologische Herausforderungen im Trading',
        'Emotionsmanagement und Stressresistenz',
        'Entwicklung von Trader-Disziplin',
        'Umgang mit Verlusten und Gewinnen',
        'Trading-Tagebuch und Selbstreflexion'
      ]
    },
    {
      week: 5,
      title: 'Fortgeschrittene Trading-Strategien',
      description: 'Jetzt geht es in die Tiefe: Du lernst fortgeschrittene Strategien kennen und wie Du sie in verschiedenen Marktphasen einsetzt.',
      topics: [
        'Momentum Trading und Trendfolgestrategien',
        'Swing Trading und Positionstrading',
        'Breakout Trading und Range Trading',
        'Mean Reversion Strategien',
        'Entwicklung eigener Trading-Strategien'
      ]
    },
    {
      week: 6,
      title: 'Portfolio-Management & Diversifikation',
      description: 'Diese Woche widmen wir uns der Optimierung Deines Trading-Portfolios und der Diversifikation Deiner Strategien.',
      topics: [
        'Asset-Allokation und Portfoliostrukturierung',
        'Korrelationsanalyse verschiedener Märkte',
        'Hedging-Strategien und Risikominimierung',
        'Performance-Tracking und -Optimierung',
        'Langfristige Portfolio-Planung'
      ]
    }
  ];
</script>

<div class="relative z-10 container px-4 mx-auto">
  <div class="text-center mb-20">
    <span class="inline-block py-2 px-4 mb-4 text-sm font-semibold text-white bg-primary-600 rounded-lg shadow-md transform hover:scale-105 transition-transform duration-300">
      KURSPLAN
    </span>
    <h2 class="text-4xl lg:text-5xl font-bold mb-6">
      Dein 6-Wochen Lehrplan
    </h2>
    <p class="text-xl text-gray-600 max-w-3xl mx-auto">
      Ein strukturierter Weg vom Grundlagenwissen bis zum professionellen Trading-System.
    </p>
  </div>

  <!-- Modules Grid -->
  <div class="grid grid-cols-1 md:grid-cols-2 gap-16">
    {#each modules as module}
      <div class="group">
        <div class="relative p-8 bg-ultra-light rounded-3xl shadow hover:shadow-md transition-all duration-300">
          <!-- Week Badge -->
          <div class="absolute -top-4 left-8 px-4 py-2 bg-white rounded-full shadow-md">
            <span class="text-sm font-bold bg-gradient-to-r from-primary-700 to-primary-500 bg-clip-text text-transparent">
              Woche {module.week}
            </span>
          </div>

          <!-- Content -->
          <div class="mt-4">
            <h3 class="text-2xl font-bold mb-4 text-primary-800">{module.title}</h3>
            <p class="text-gray-600 mb-6">{module.description}</p>
            
            <div class="space-y-3">
              {#each module.topics as topic}
                <div class="flex items-start gap-3">
                  <svg class="w-5 h-5 mt-1 text-primary-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span class="text-gray-700">{topic}</span>
                </div>
              {/each}
            </div>
          </div>
        </div>
      </div>
    {/each}
  </div>

  <!-- Bottom Info Box -->
<div class="mt-16 relative overflow-hidden rounded-3xl">
  <!-- Background with image -->
  <div class="absolute inset-0 bg-orange-600">
    <img
      class="absolute top-0 left-0 w-full h-full opacity-30 object-cover"
      src="saturn-assets/images/newsletter/bg-gradient-color-big.png"
      alt=""
    >
  </div>

  <!-- Content -->
  <div class="relative z-10 p-10 rounded-3xl text-center">
    <h3 class="text-3xl font-medium text-white mb-6">Bonus: Lebenslanger Zugriff</h3>
    <p class="text-white mb-8 max-w-2xl mx-auto text-lg leading-relaxed">
      Du erhältst unbegrenzten Zugang zu allen Kursinhalten, Updates und der Community - auch nach Abschluss der 6 Wochen.
      Zusätzlich profitierst du von regelmäßigen Live-Sessions und Q&As mit unseren Experten.
    </p>
    <a 
      href="#pricing" 
      class="inline-flex items-center justify-center px-8 py-4 text-lg text-orange-600 bg-white hover:bg-orange-50 rounded-lg transition-colors duration-300 shadow hover:shadow-md transform "
    >
      Jetzt durchstarten
      <svg class="ml-2 w-6 h-6 transition-transform duration-300 ease-in-out" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
      </svg>
    </a>
  </div>
</div>
</div>
