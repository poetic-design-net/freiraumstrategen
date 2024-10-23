<script lang="ts">
  import { fly } from 'svelte/transition';
  import { cubicOut } from 'svelte/easing';
  import { onMount } from 'svelte';

  let currentIndex = 0;
  let container: HTMLElement;
  let backgroundHue = 0;
  let cardWidth: number;
  let visibleCards: number;

  const articles = [
    { img: "saturn-assets/images/features/image-article1.png", title: "The heart of what makes we valuable" },
    { img: "saturn-assets/images/features/image-article2.png", title: "The heart of what makes we valuable" },
    { img: "saturn-assets/images/features/image-article3.png", title: "The heart of what makes we valuable" },
    { img: "saturn-assets/images/features/image-article1.png", title: "Another valuable insight" },
    { img: "saturn-assets/images/features/image-article2.png", title: "More valuable content" },
  ];

  function updateDimensions() {
    if (container) {
      cardWidth = container.firstElementChild?.clientWidth || 0;
      visibleCards = Math.floor(container.clientWidth / cardWidth);
    }
  }

  function scrollToIndex(index: number) {
    if (container) {
      updateDimensions();
      const maxIndex = Math.max(0, articles.length - visibleCards);
      const targetIndex = Math.min(Math.max(0, index), maxIndex);
      const targetScroll = targetIndex * cardWidth;

      container.scrollTo({
        left: targetScroll,
        behavior: 'smooth'
      });

      currentIndex = targetIndex;
    }
  }

  function nextSlide() {
    scrollToIndex(currentIndex + 1);
  }

  function prevSlide() {
    scrollToIndex(currentIndex - 1);
  }

  onMount(() => {
    if (container) {
      updateDimensions();
      window.addEventListener('resize', updateDimensions);

      let isScrolling = false;
      let scrollTimeout: ReturnType<typeof setTimeout>;

      function handleScroll() {
        if (!isScrolling) {
          isScrolling = true;
        }
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
          isScrolling = false;
          const nearestIndex = Math.round(container.scrollLeft / cardWidth);
          if (nearestIndex !== currentIndex) {
            scrollToIndex(nearestIndex);
          }
        }, 250); // Erhöhte Verzögerung für sanfteres Verhalten
      }

      container.addEventListener('scroll', handleScroll);

      return () => {
        container.removeEventListener('scroll', handleScroll);
        window.removeEventListener('resize', updateDimensions);
      };
    }
  });
</script>


  <img class="absolute top-0 right-0" src="saturn-assets/images/features/star-element-right.png" alt="">
  
  <div class=" relative container px-4 mx-auto">
    <div class="flex flex-wrap items-center">
      <div class="w-full lg:w-2/3 xl:w-1/2 px-4 mb-12 lg:mb-0">
        <div class="max-w-lg">
          <span class="inline-block py-1 px-3 mb-4 text-xs font-medium text-primary-900 bg-primary-50 rounded-full">Die Story zum Erfolg</span>
          <h1 class="font-heading text-5xl xs:text-6xl md:text-6xl font-thin text-gray-900">
            <span>Was ist ein </span>
            <span class="font-medium">Freiraumstratege?</span>
          </h1>
        </div>
      </div>
      <div class="w-full lg:w-1/3 xl:w-1/2 px-4">
        <div class="max-w-lg lg:ml-auto">
          <p class="text-lg text-gray-500">So, how do you know which is the right tax software agency for your company? Well, you can't go wrong with choosing Saturn.</p>
        </div>
      </div>
    </div>
    </div>
    <div class="container px-4 mx-auto relative z-10">
      <div class="flex px-4 justify-end mb-8">
        <div class="lg:flex items-center">
          <div class="flex space-x-4">
            <button on:click={prevSlide} class="p-2 bg-primary-900 text-white rounded-full hover:bg-primary-800 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button on:click={nextSlide} class="p-2 bg-primary-900 text-white rounded-full hover:bg-primary-800 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="container mx-auto">
      <div class="relative overflow-x-hidden mt-8 w-screen">
        <div class="ml-[-16px] ml-[calc(-50vw+50%)]">
          <div bind:this={container} class="flex overflow-x-auto snap-x snap-mandatory py-10 hide-scrollbar pl-4 pr-[100vw]"> 
            {#each articles as article, i}
            <div class="article w-[85vw] sm:w-[45vw] md:w-[30vw] lg:w-[calc(100vw/3)] max-w-[400px] flex-shrink-0 pr-6 snap-start">
              <div in:fly="{{ y: 50, duration: 800, delay: i * 200, easing: cubicOut }}" 
                   class="bg-white rounded-lg overflow-hidden h-full flex flex-col transition-all duration-300 hover:shadow-lg">
                <div class="relative overflow-hidden">
                  <div class="aspect-w-16 aspect-h-9">
                    <img class="w-full h-full object-cover transition-transform duration-300 hover:scale-105" src={article.img} alt="">
                  </div>
                </div>
                <div class="p-6 flex flex-col flex-grow ">
                  <h3 class="text-2xl font-semibold mb-4 text-gray-800">{article.title}</h3>
                  <p class="text-gray-600 mb-4">Kurze Beschreibung des Artikels...</p>
                  <div class="mt-auto">
                    <a class="inline-flex items-center justify-center px-4 py-2 text-sm font-regular text-primary-900 rounded-full border border-primary-900 hover:bg-primary-900 hover:text-white transition duration-900" href="/">
                      <span class="mr-2">Learn More</span>
                      <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.9199 0.62C12.8185 0.375651 12.6243 0.181475 12.3799 0.0799999C12.2597 0.028759 12.1306 0.00157999 11.9999 0H1.99994C1.73472 0 1.48037 0.105357 1.29283 0.292893C1.1053 0.48043 0.999939 0.734784 0.999939 1C0.999939 1.26522 1.1053 1.51957 1.29283 1.70711C1.48037 1.89464 1.73472 2 1.99994 2H9.58994L1.28994 10.29C1.19621 10.383 1.12182 10.4936 1.07105 10.6154C1.02028 10.7373 0.994141 10.868 0.994141 11C0.994141 11.132 1.02028 11.2627 1.07105 11.3846C1.12182 11.5064 1.19621 11.617 1.28994 11.71C1.3829 11.8037 1.4935 11.8781 1.61536 11.9289C1.73722 11.9797 1.86793 12.0058 1.99994 12.0058C2.13195 12.0058 2.26266 11.9797 2.38452 11.9289C2.50638 11.8781 2.61698 11.8037 2.70994 11.71L10.9999 3.41V11C10.9999 11.2652 11.1053 11.5196 11.2928 11.7071C11.4804 11.8946 11.7347 12 11.9999 12C12.2652 12 12.5195 11.8946 12.707 11.7071C12.8946 11.5196 12.9999 11.2652 12.9999 11V1C12.9984 0.869323 12.9712 0.740222 12.9199 0.62Z" fill="currentColor"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            {/each}
          </div>
        </div>
      </div>
    </div>


<style>
  .hide-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  .hide-scrollbar::-webkit-scrollbar {
    display: none;
  }
  
  .border-gradient {
    border-image: linear-gradient(to right, #4a00e0, #8e2de2) 1;
  }
</style>