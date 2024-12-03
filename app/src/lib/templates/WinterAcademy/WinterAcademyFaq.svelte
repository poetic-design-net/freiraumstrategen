<script lang="ts">
  import { slide } from 'svelte/transition';

  const faqs = [
    {
      question: 'Für wen ist die Winter Academy geeignet?',
      answer: `Die Winter Academy ist ideal für:

      • Berufstätige, die neben ihrem Job erfolgreich traden möchten
      • Trading-Einsteiger, die von Anfang an alles richtig machen wollen
      • Fortgeschrittene Trader, die ihre Ergebnisse optimieren möchten

      Vorkenntnisse sind nicht erforderlich, da wir bei den Grundlagen beginnen und schrittweise aufbauen. Wichtig ist vor allem die Bereitschaft, zu lernen und ein System konsequent umzusetzen.`
    },
    {
      question: 'Wie viel Zeit muss ich investieren?',
      answer: `Für optimale Ergebnisse solltest Du etwa 5-10 Stunden pro Woche einplanen. Dies umfasst:

      • Das Durcharbeiten der Lektionen
      • Teilnahme an Live-Sessions
      • Praktische Übungen und Analysen
      • Community-Austausch

      Da Du lebenslangen Zugriff auf alle Inhalte hast, kannst Du das Tempo selbst bestimmen und den Kurs optimal in Deinen Alltag integrieren.`
    },
    {
      question: 'Wie läuft die Ausbildung ab?',
      answer: `Die Winter Academy ist ein 8-wöchiges Intensivprogramm mit:

      • Umfangreichen Video-Lektionen
      • Wöchentlichen Live-Trading-Sessions
      • Persönlichem 1:1 Mentoring
      • Praktischen Übungen und Assignments
      • Zugang zur exklusiven Trading-Community

      Alle Inhalte sind on-demand verfügbar, sodass Du flexibel lernen kannst. Zusätzlich gibt es regelmäßige Q&A-Sessions für Deine individuellen Fragen.`
    },
    {
      question: 'Welche Märkte werden behandelt?',
      answer: `Wir fokussieren uns hauptsächlich auf:

      • Forex (Devisenhandel)
      • Aktien und Indizes
      • Kryptowährungen

      Die erlernten Strategien sind marktübergreifend anwendbar. Du lernst die Besonderheiten jedes Marktes kennen und entwickelst ein Gespür dafür, welcher Markt am besten zu Deinem Tradingstil passt.`
    },
    {
      question: 'Wie hoch ist das empfohlene Startkapital?',
      answer: `Wir empfehlen ein Mindest-Startkapital von 5.000€ für das Trading. Dies ermöglicht:

      • Ausreichende Diversifikation
      • Professionelles Risikomanagement
      • Realistische Gewinnchancen
      • Emotionale Stabilität beim Trading

      Der Fokus liegt zunächst auf dem Erlernen der Strategien und dem Risikomanagement. Das Kapital sollte erst eingesetzt werden, wenn Du die Grundlagen sicher beherrschst.`
    },
    {
      question: 'Gibt es eine Erfolgsgarantie?',
      answer: `Trading erfordert Disziplin und kontinuierliches Lernen. Wir bieten:

      • Bewährte Strategien und Systeme
      • Professionelles Mentoring
      • Umfassende Unterstützung
      • Praxiserprobte Methoden

      Der Erfolg hängt von Deiner konsequenten Umsetzung ab. Unsere Erfahrung zeigt, dass Teilnehmer, die sich an unser System halten, nach 3-6 Monaten erste konstante Erfolge erzielen.`
    }
  ];

  let expandedIndex: number | null = null;

  function toggleFaq(index: number) {
    expandedIndex = expandedIndex === index ? null : index;
  }
</script>

<div class="relative z-10 container px-4 mx-auto">
  <div class="max-w-3xl mx-auto">
    <!-- Section Header -->
    <div class="text-center mb-20">
      <span class="inline-block py-1 px-3 mb-4 text-xs font-medium text-primary-900 bg-primary-50 rounded-full">
        FAQ
      </span>
      <h2 class="text-4xl lg:text-5xl font-bold mb-6">
        Häufig gestellte Fragen
      </h2>
      <p class="text-xl text-gray-600">
        Alle wichtigen Antworten zur Winter Academy auf einen Blick
      </p>
    </div>

    <!-- FAQ List -->
    <div class="space-y-4">
      {#each faqs as faq, index}
        <div class="border border-gray-200 rounded-xl overflow-hidden bg-white hover:shadow-md transition-shadow duration-300">
          <button
            class="w-full text-left px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
            on:click={() => toggleFaq(index)}
          >
            <span class="font-medium pr-8">{faq.question}</span>
            <div class="flex-shrink-0">
              <div class="relative w-6 h-6">
                <div class="absolute inset-0 transform transition-transform duration-300 {expandedIndex === index ? 'rotate-180' : ''}">
                  <svg class="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
          </button>
          {#if expandedIndex === index}
            <div 
              class="px-6 py-4 bg-gray-50 border-t border-gray-200"
              transition:slide={{ duration: 300 }}
            >
              <p class="text-gray-600 leading-relaxed whitespace-pre-line">{faq.answer}</p>
            </div>
          {/if}
        </div>
      {/each}
    </div>

    <!-- Bottom CTA -->
    <div class="mt-16 text-center">
      <div class="mb-8">
        <p class="text-gray-600">
          Noch Fragen? Wir sind für dich da
        </p>
      </div>
      <div class="flex flex-wrap gap-4 justify-center">
        <a 
          href="mailto:support@freiraumstrategen.de" 
          class="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-primary-800 hover:text-primary-900 group"
        >
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          support@freiraumstrategen.de
        </a>
        <span class="text-gray-400 px-4">oder</span>
        <a 
          href="#pricing" 
          class="inline-flex items-center justify-center px-8 py-4 text-base font-medium text-white bg-primary-800 hover:bg-primary-900 rounded-xl transition-colors group"
        >
          Jetzt Platz sichern
          <svg class="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </a>
      </div>
    </div>
  </div>
</div>

<style>
  button {
    -webkit-tap-highlight-color: transparent;
  }
</style>
