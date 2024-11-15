<script lang="ts">
  import Button from "$lib/components/Button.svelte";
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';

  const images = [
    {
      src: "assets/diefreiraumstrategen_tobiasheitkoetter.jpg",
      alt: "Tobias Gründer Freiraumstrategen"
    },
    {
      src: "assets/AdobeStock_17567868_Preview.jpeg",
      alt: "Beschreibung 2"
    },
    {
      src: "assets/hero_home-old.jpg",
      alt: "Beschreibung 3"
    }
  ];

  let currentIndex = 0;
  let intervalId: NodeJS.Timeout;

  onMount(() => {
    startSlideshow();
    return () => clearInterval(intervalId);
  });

  function startSlideshow() {
    intervalId = setInterval(() => {
      currentIndex = (currentIndex + 1) % images.length;
    }, 5000);
  }

  function pauseSlideshow() {
    clearInterval(intervalId);
  }

  function resumeSlideshow() {
    startSlideshow();
  }
</script>

  <img class="absolute bottom-0 left-0 w-full opacity-10" src="assets/AdobeStock_298971347_Preview.jpeg" alt="">
  <div class="relative container px-4 mx-auto">
    <div class="max-w-7xl mx-auto">
      <div class="flex flex-wrap -mx-4">
        <!-- Linke Spalte -->
        <div class="w-full lg:w-1/2 px-4 mb-12 lg:mb-0">
          <div class="max-w-md md:max-w-lg mx-auto lg:mx-0">
            <span class="inline-block py-1 px-3 mb-4 text-xs font-semibold text-primary-900 bg-primary-50 rounded-full">
              Der Gründer und sein Team
            </span>
            <h1 class="font-heading text-4xl xs:text-6xl md:text-7xl font-medium text-gray-900 mb-12">
              <span class="block">Und?</span>
              <span>Wer hat's</span>
              <span class="block font-thin">Erfunden?</span>
            </h1>
            <p class="max-w-md text-lg xs:text-3xl font-light text-gray-600 mb-6">
              Arcu ultrices sit non magna enim id semper quam venenatis. Mi quisque ultrices hendrerit nec aliquet integer mollis faucibus morbi.
            </p>
            <p class="max-w-md text-lg xs:text-3xl font-light text-gray-600 mb-6">
              Augue justo at convallis vitae nunc maecenas est. Viverra duis feugiat posuere vitae tincidunt.
            </p>
            <p class="max-w-md text-lg xs:text-3xl font-light text-gray-600 mb-4">
              Augue justo at convallis vitae nunc maecenas est. Viverra duis feugiat posuere vitae tincidunt.
            </p>
            <div class="mt-12">
              <Button text="Mehr erfahren" href="/" variant="orange" />
            </div>
          </div>
        </div>

        <!-- Rechte Spalte -->
        <div class="w-full lg:w-1/2 px-4">
          <div class="max-w-md md:max-w-lg mx-auto lg:mr-0">
            <h3 class="text-xl xs:text-3xl font-medium text-gray-800 mb-6">
              Mi quisque ultrices hendrerit nec aliquet integer mollis faucibus morbi.
            </h3>
            <ul class="mb-6">
              <li class="flex mb-6 items-center">
                <img class="w-6 h-6 mr-4" src="saturn-assets/images/content/check-green.svg" alt="">
                <span class="text-base xs:text-lg font-semibold text-gray-900">Design Style well organized</span>
              </li>
              <li class="flex mb-6 items-center">
                <img class="w-6 h-6 mr-4" src="saturn-assets/images/content/check-green.svg" alt="">
                <span class="text-base xs:text-lg font-semibold text-gray-900">Component Library with many variants</span>
              </li>
              <li class="flex items-center">
                <img class="w-6 h-6 mr-4" src="saturn-assets/images/content/check-green.svg" alt="">
                <span class="text-base xs:text-lg font-semibold text-gray-900">All limited links</span>
              </li>
            </ul>
            <p class="text-base text-gray-700 mb-5">
              Pellentesque ipsum nulla in eget interdum a. Neque pellentesque pulvinar mauris pulvinar diam.
            </p>
            <p class="text-base text-gray-700 mb-8">
              Vestibulum est ante in congue a fusce nunc. At tristique donec nisi viverra vulputate blandit orci at lectus.
            </p>

            <!-- Image Slider -->
            <div 
              class="relative rounded-lg overflow-hidden aspect-[4/3]"
              on:mouseenter={pauseSlideshow}
              on:mouseleave={resumeSlideshow}
            >
              {#key currentIndex}
                <div 
                  class="absolute inset-0"
                  in:fade={{ duration: 800 }}
                  out:fade={{ duration: 800 }}
                >
                  <img 
                    class="w-full h-full object-cover rounded-lg" 
                    src={images[currentIndex].src} 
                    alt={images[currentIndex].alt}
                  >
                </div>
              {/key}
              
              <!-- Slider Indicators -->
              <div class="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
                {#each images as _, i}
                  <button 
                    class="w-2 h-2 rounded-full transition-all duration-300 {
                      i === currentIndex 
                        ? 'bg-primary-600 scale-125' 
                        : 'bg-primary-200 hover:bg-primary-300'
                    }"
                    on:click={() => currentIndex = i}
                    aria-label="Bild {i + 1} anzeigen"
                  />
                {/each}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
