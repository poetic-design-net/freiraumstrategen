<script lang="ts">
  import { slide } from 'svelte/transition';

  const advantages = [
    {
      title: "Zeiteffizientes Trading",
      shortText: "Lerne, wie Du mit nur wenigen Stunden pro Woche erfolgreich traden kannst. Unser System ist speziell für Menschen entwickelt, die neben ihrem Beruf oder anderen Verpflichtungen traden möchten.",
      fullText: `Unser System ist speziell für Menschen entwickelt, die neben ihrem Beruf oder anderen Verpflichtungen traden möchten. Du lernst:

      • Wie Du Deine Tradingzeit optimal nutzt
      • Welche Märkte und Timeframes sich am besten für Deine Situation eignen
      • Wie Du auch mit begrenzter Zeit profitable Trading-Entscheidungen triffst
      • Effiziente Analyse- und Handelstechniken für maximale Zeitersparnis`
    },
    {
      title: "Professionelles Risikomanagement",
      shortText: "Ein ausgefeiltes Risikomanagement-System schützt Dein Kapital. Du lernst, wie Du Verluste minimierst und gleichzeitig Deine Gewinnchancen maximierst.",
      fullText: `Ein ausgefeiltes Risikomanagement-System schützt Dein Kapital. Wir zeigen Dir:

      • Wie Du Dein Risiko pro Trade präzise berechnest
      • Strategien zur Verlustbegrenzung und Gewinnmaximierung
      • Position Sizing und Portfoliomanagement
      • Psychologische Aspekte des Risikomanagements
      • Systematische Drawdown-Kontrolle`
    },
    {
      title: "Bewährte Trading-Strategien",
      shortText: "Du erhältst Zugang zu unseren erprobten Trading-Strategien, die sich in verschiedenen Marktphasen bewährt haben. Keine theoretischen Konzepte, sondern praxiserprobte Methoden.",
      fullText: `Du erhältst Zugang zu unseren erprobten Trading-Strategien, die sich in verschiedenen Marktphasen bewährt haben:

      • Klare Entry- und Exit-Regeln
      • Strategien für verschiedene Marktphasen
      • Technische und fundamentale Analysetools
      • Praktische Umsetzung in Live-Trading-Sessions
      • Kontinuierliche Strategieoptimierung`
    },
    {
      title: "Persönliches Mentoring",
      shortText: "Du erhältst individuelle Unterstützung von erfahrenen Tradern. Wir begleiten Dich Schritt für Schritt auf Deinem Weg zum erfolgreichen Trader.",
      fullText: `Du erhältst individuelle Unterstützung von erfahrenen Tradern:

      • Regelmäßige 1:1 Coaching-Sessions
      • Persönliches Feedback zu Deinen Trades
      • Individuelle Strategieanpassung
      • Direkte Ansprechpartner bei Fragen
      • Kontinuierliche Entwicklungsbegleitung`
    },
    {
      title: "Praxisorientierte Ausbildung",
      shortText: "Keine endlose Theorie, sondern praktische Anwendung. Du lernst durch Live-Trading-Sessions, reale Marktanalysen und konkrete Handelsbeispiele.",
      fullText: `Keine endlose Theorie, sondern praktische Anwendung:

      • Live-Trading-Sessions mit Experten
      • Reale Marktanalysen und Case Studies
      • Praktische Übungen und Assignments
      • Hands-on Experience in verschiedenen Märkten
      • Direkte Umsetzung des Gelernten`
    },
    {
      title: "Community & Support",
      shortText: "Werde Teil einer aktiven Trading-Community. Tausche Dich mit anderen Tradern aus, lerne von ihren Erfahrungen und profitiere von gegenseitiger Unterstützung.",
      fullText: `Werde Teil einer aktiven Trading-Community:

      • Zugang zur exklusiven Trading-Community
      • Regelmäßige Q&A Sessions
      • Erfahrungsaustausch mit anderen Tradern
      • 24/7 Support bei Fragen
      • Networking-Möglichkeiten`
    }
  ];

  let expandedAdvantage: number | null = null;

  function toggleAdvantage(index: number) {
    expandedAdvantage = expandedAdvantage === index ? null : index;
  }
</script>

<div class="relative z-10 container px-4 mx-auto">
  <div class="text-center mb-20">
    <span class="inline-block py-1 px-3 mb-4 text-xs font-medium text-primary-900 bg-primary-50 rounded-full">
      DEINE VORTEILE
    </span>
    <h2 class="text-4xl lg:text-5xl font-bold mb-6">
      Was die Winter Academy besonders macht
    </h2>
    <p class="text-xl text-gray-600 max-w-3xl mx-auto">
      Ein umfassendes Programm, das Dir alle Werkzeuge für Deinen Trading-Erfolg gibt
    </p>
  </div>

  <!-- Advantages Grid -->
  <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
    {#each advantages as advantage, index}
      <div class="h-full">
        <div class="h-full p-8 bg-white rounded-3xl shadow-sm hover:shadow-lg transition-all duration-300">
          <!-- Content -->
          <div>
            <h3 class="text-xl font-bold mb-4 text-primary-800">{advantage.title}</h3>
            <div class="text-gray-700">
              {#if expandedAdvantage === index}
                <div transition:slide={{ duration: 300 }}>
                  {@html advantage.fullText.replace(/\n/g, '<br>').replace(/•/g, '• ')}
                </div>
              {:else}
                <p>{advantage.shortText}</p>
              {/if}
            </div>
            
            <!-- Read More Button -->
            <button 
              class="mt-4 text-primary-600 hover:text-primary-800 text-sm font-medium flex items-center gap-1 transition-colors"
              on:click={() => toggleAdvantage(index)}
            >
              {expandedAdvantage === index ? 'Weniger anzeigen' : 'Mehr erfahren'}
              <svg 
                class="w-4 h-4 transform transition-transform duration-200 {expandedAdvantage === index ? 'rotate-180' : ''}" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
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

<style>
  button {
    -webkit-tap-highlight-color: transparent;
  }
</style>
