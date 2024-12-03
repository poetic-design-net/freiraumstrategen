<script lang="ts">
  const profiles = [
    {
      title: "Berufstätige",
      description: "Du bist berufstätig und möchtest neben Deinem Job erfolgreich traden. Du suchst nach einem System, das sich optimal in Deinen Alltag integrieren lässt und Dir trotzdem ermöglicht, profitable Trading-Entscheidungen zu treffen."
    },
    {
      title: "Trading-Einsteiger",
      description: "Du möchtest mit dem Trading beginnen oder hast erste Erfahrungen gemacht. Du suchst nach einer professionellen Ausbildung mit bewährten Strategien und persönlicher Betreuung, um von Anfang an die richtigen Entscheidungen zu treffen."
    },
    {
      title: "Fortgeschrittene Trader",
      description: "Du tradest bereits aktiv, aber Deine Ergebnisse sind noch nicht konstant genug. Du möchtest Deine Strategien optimieren, Dein Risikomanagement verbessern und Deine Performance auf ein neues Level bringen."
    }
  ];

  const requirements = [
    {
      title: "Zeit & Engagement",
      points: [
        "5-10 Stunden pro Woche für Lernen und Praxis",
        "Bereitschaft zur aktiven Teilnahme an Live-Sessions",
        "Fokus auf langfristigen Erfolg"
      ]
    },
    {
      title: "Technische Voraussetzungen",
      points: [
        "Stabile Internetverbindung",
        "Computer oder Laptop für Trading-Software",
        "Mindestens 5.000€ Startkapital für das Trading"
      ]
    },
    {
      title: "Persönliche Eigenschaften",
      points: [
        "Lernbereitschaft und Offenheit für neue Konzepte",
        "Disziplin und Durchhaltevermögen",
        "Bereitschaft, ein System konsequent zu befolgen"
      ]
    }
  ];
</script>

<div class="relative z-10 container px-4 mx-auto">
  <div class="text-center mb-16">
    <span class="inline-block py-1 px-3 mb-4 text-xs font-medium text-primary-900 bg-primary-50 rounded-full">
      FÜR WEN IST DIE WINTER ACADEMY
    </span>
    <h2 class="text-4xl lg:text-5xl font-bold mb-6">
      Dein Profil für den Trading-Erfolg
    </h2>
    <p class="text-xl text-gray-600 max-w-3xl mx-auto">
      Die Winter Academy ist für Menschen konzipiert, die ihr Trading professionalisieren 
      und dabei maximale Flexibilität behalten möchten.
    </p>
  </div>

  <!-- Target Audience Profiles -->
  <div class="grid md:grid-cols-3 gap-8 mb-20">
    {#each profiles as profile}
      <div class="p-8 bg-white rounded-3xl shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
        <h3 class="text-xl font-bold mb-4 text-primary-800">{profile.title}</h3>
        <p class="text-gray-700">{profile.description}</p>
      </div>
    {/each}
  </div>

  <!-- Requirements Section -->
<div class="py-16 bg-gray-50 rounded-lg">
  <h3 class="text-3xl font-semibold mb-12 text-center text-primary-800">Das solltest Du mitbringen</h3>
  <div class="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto px-4">
      {#each requirements as requirement}
      <div class="bg-white rounded-3xl p-8 shadow hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
        <h4 class="text-xl font-medium mb-6 text-primary-800">{requirement.title}</h4>
          <ul class="space-y-4">
            {#each requirement.points as point}
              <li class="flex items-start gap-3">
              <svg class="w-6 h-6 mt-1 flex-shrink-0 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clip-rule="evenodd" />
              </svg>
              <span class="text-gray-700 font-medium">{point}</span>
              </li>
            {/each}
          </ul>
        </div>
      {/each}
    </div>
  </div>

<style>
  .shadow-text {
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
  }
</style>

  <!-- Bottom CTA -->
  <div class="text-center mt-16">
    <p class="text-lg text-gray-600 mb-8">
      Wenn Du Dich in einem dieser Profile wiedererkennst und bereit bist, 
      die nötigen Voraussetzungen zu erfüllen, dann ist die Winter Academy genau das Richtige für Dich.
    </p>
    <a 
      href="#advantages" 
      class="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white bg-primary-800 hover:bg-primary-900 rounded-xl transition-colors group"
    >
      Entdecke die Vorteile
      <svg class="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
      </svg>
    </a>
  </div>
</div>
