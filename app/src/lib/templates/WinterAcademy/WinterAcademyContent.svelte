<script lang="ts">
  export let title: string = "Ein voller Tag braucht kein kompliziertes Trading";
  export let subtitle: string = "Doch Dein Kapital braucht Dich";
  export let badge: string = "ZEITEFFIZIENTES TRADING";
  export let imageSrc: string = "/assets/tobias_trading_coach.jpg"; 
  
  const benefits = [
    "Effizient und zeitsparend zu traden",
    "Klare Regeln zu befolgen, die Emotionen ausschalten",
    "Dein Risiko präzise zu kontrollieren",
    "Konstante Gewinne zu erzielen"
  ];

</script>

<div class="relative z-10 container px-4 mx-auto">
  <div class="max-w-lg lg:max-w-3xl xl:max-w-5xl mx-auto">
    <div class="text-center mb-16">
      {#if badge}
        <span class="inline-block py-1 px-3 mb-4 text-xs font-medium text-primary-900 bg-primary-50 rounded-full">
          {badge}
        </span>
      {/if}
      <h2 class="text-3xl lg:text-4xl font-bold mb-8">
        {title}. {subtitle}...
      </h2>
    </div>

    <div class="flex flex-wrap -mx-4">
      <div class="w-full lg:w-1/2 px-4 mb-12 lg:mb-0">
        <div class="max-w-lg">
          <p class="text-lg text-gray-700 mb-6">
            Vermutlich kommt Dir das bekannt vor: Auf der Arbeit läufst Du den Deadlines hinterher, der Posteingang wird partout nicht leerer und die To-dos werden einfach nicht weniger.
          </p>
          <p class="text-lg text-gray-700 mb-6">
            Zu den vielen Terminen kommt dann noch das unschöne Gefühl dazu, mal wieder öfter für die Familie und Freunde da zu sein, oder auch mal wieder etwas für sich zu machen. Sport zum Beispiel, oder einfach mal in Ruhe ein Buch zur Weiterbildung lesen.
          </p>
          <p class="text-lg text-gray-700">
            Und dann ist da noch der Wunsch, das eigene Kapital zu vermehren. Denn die Inflation frisst sich durch die Ersparnisse und die Altersvorsorge wird auch nicht von alleine mehr.
          </p>
          
        </div>
      </div>
      <div class="w-full lg:w-1/2 px-4">
        <div class="max-w-lg">
          <p class="text-lg text-gray-700 mb-6">
            Doch wie soll das alles unter einen Hut? Wie soll man neben all den Verpflichtungen auch noch die Zeit finden, sich um sein Kapital zu kümmern?
          </p>
          <p class="text-lg text-gray-700 mb-6">
            Die gute Nachricht ist: Es geht! Mit dem richtigen System und der richtigen Unterstützung kannst Du auch mit wenig Zeit erfolgreich traden.
          </p>
          <p class="text-lg text-gray-700 mb-6">
            In der Winter Academy zeigen wir Dir, wie Du mit nur wenigen Stunden pro Woche ein profitables Trading-System aufbaust. Du lernst, wie Du die richtigen Trades findest, Dein Risiko managst und Deine Gewinne maximierst - alles neben Deinem normalen Alltag.
          </p>
          </div>

      </div>
      
    </div>
    <div class="bg-white mt-12 shadow-lg rounded-lg overflow-hidden">
      <div class="flex flex-col md:flex-row">
        <div class="md:w-1/2">
          <img src={imageSrc} alt="Trading Image" class="w-full h-full object-cover">
        </div>
        <div class="md:w-1/2 p-6 flex flex-col justify-center">
          <p class="text-xl text-gray-700 font-medium mb-6">
            Wir haben ein System entwickelt, das Dir erlaubt:
          </p>

          <ul class="space-y-4">
  {#each benefits as benefit}
            <li class="flex items-center gap-2">
      <img class="w-6 h-6 mr-4" src="saturn-assets/images/content/check-green.svg" alt="">
      <span class="text-base text-gray-700">{benefit}</span>
            </li>
  {/each}
          </ul>
        </div>
      </div>
    </div>
  </div>
</div>
