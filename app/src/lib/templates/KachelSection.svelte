<script lang="ts">
  import { onMount } from 'svelte';
  import { gsap } from 'gsap';
  import { ScrollTrigger } from 'gsap/all';
  import { urlFor } from '$lib/sanity/image';

  export let data: {
    enabled: boolean;
    heading: {
      badge: string;
      title: {
        regular: string;
        light: string;
      };
    };
    description: string;
    mainKachel: {
      image: {
        asset: any;
        alt: string;
      };
      badge: string;
      title: string;
      button: {
        text: string;
        link: string;
      };
    };
    sideKacheln: Array<{
      title: string;
      description: string;
      link: string;
      backgroundColor: 'green' | 'red' | 'gray';
    }>;
  };

  onMount(() => {
    // ScrollTrigger Registration
    if (typeof window !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".kachel-heading",
        start: "top 80%",
        once: true
      },
      defaults: {
        duration: 0.8,
        ease: "power2.out"
      }
    });

    tl.to(".kachel-heading", { 
      opacity: 1 
    })
    .to(".kachel-main", { 
      opacity: 1 
    }, "-=0.4")
    .to(".kachel-small, .kachel-small-last", { 
      opacity: 1,
      stagger: 0.2
    }, "-=0.4")
    .then(() => {
      let hoverTl = gsap.timeline({
        repeat: -1,
        repeatDelay: 1
      });

      // Container für die Kacheln
      const container = document.querySelector('.kachel-container');
      if (!container) return;

      // Event-Listener für alle Kacheln
      const kachels = gsap.utils.toArray<HTMLElement>(".kachel-small, .kachel-small-last");
      kachels.forEach((kachel) => {
        // Hover-Events für jede Kachel
        kachel.addEventListener('mouseenter', () => {
          hoverTl.kill(); // Timeline komplett stoppen
          // Alle Kacheln auf Base-Color zurücksetzen
          gsap.to(".kachel-small, .kachel-small-last", {
            backgroundColor: "var(--base-color)",
            duration: 0.25
          });
          // Hover-State für die aktuelle Kachel setzen
          gsap.to(kachel, {
            backgroundColor: "var(--hover-color)",
            duration: 0.25,
            ease: "power1.inOut"
          });
        });
      });

      // Container mouseleave Event
      container.addEventListener('mouseleave', () => {
        // Alle Kacheln zurücksetzen
        gsap.to(".kachel-small, .kachel-small-last", {
          backgroundColor: "var(--base-color)",
          duration: 0.25,
          ease: "power1.inOut",
          onComplete: () => {
            // Neue Timeline erstellen und starten
            hoverTl = gsap.timeline({
              repeat: -1,
              repeatDelay: 1
            });
            
            kachels.forEach((k) => {
              hoverTl
                .to(k, {
                  backgroundColor: "var(--hover-color)",
                  duration: 0.25,
                  ease: "power1.inOut"
                })
                .to(k, {
                  backgroundColor: "var(--base-color)",
                  duration: 0.25,
                  ease: "power1.inOut"
                }, "+=0.25");
            });
          }
        });
      });

      // Initial Loop-Animation
      kachels.forEach((kachel) => {
        hoverTl
          .to(kachel, {
            backgroundColor: "var(--hover-color)",
            duration: 0.25,
            ease: "power1.inOut"
          })
          .to(kachel, {
            backgroundColor: "var(--base-color)",
            duration: 0.25,
            ease: "power1.inOut"
          }, "+=0.25");
      });
    });
  });

  // Helper function to get background color class
  function getBackgroundColor(type: 'green' | 'red' | 'gray') {
    const colors = {
      green: 'bg-green-50 hover:bg-green-100',
      red: 'bg-red-50 hover:bg-red-100',
      gray: 'bg-gray-50 hover:bg-gray-600'
    };
    return colors[type] || colors.gray;
  }
</script>

<style>
  /* Initial State */
  :global(.kachel-heading),
  :global(.kachel-main),
  :global(.kachel-small),
  :global(.kachel-small-last) {
    opacity: 0;
  }

  /* Farb-Variablen für die Kacheln */
  :global(.kachel-small:nth-child(1)) {
    --base-color: rgb(240 253 244);    /* Original base color */
    --hover-color: hsl(189 100% 94%);  /* primary-800 für alle */
  }
  :global(.kachel-small:nth-child(2)) {
    --base-color: rgb(254 242 242);    /* Original base color */
    --hover-color: hsl(189 100% 94%);  /* primary-800 für alle */
  }
  :global(.kachel-small-last) {
    --base-color: #e1f7f9;    /* Original base color */
    --hover-color: hsl(189 100% 94%);  /* primary-800 für alle */
  }
</style>

<div class="relative container px-4 mx-auto">
  <div class="w-full mx-auto">
    <div class="flex flex-wrap -mx-4 mb-18 items-center">
      <div class="w-full lg:w-2/3 xl:w-1/2 px-4 mb-12 lg:mb-0">
        <div class="kachel-heading">
          <span class="inline-block py-1 px-3 mb-4 text-xs font-semibold text-primary-900 bg-primary-50 rounded-full">
            {data.heading.badge}
          </span>
          <h1 class="font-heading text-5xl xs:text-6xl md:text-7xl font-medium text-gray-900">
            <span>{data.heading.title.regular} </span>
            <span class="font-light">{data.heading.title.light}</span>
          </h1>
        </div>
      </div>
      <div class="w-full lg:w-1/3 xl:w-1/2 px-4">
        <div class="max-w-sm lg:ml-auto">
          <p class="text-lg text-gray-500">{data.description}</p>
        </div>
      </div>
    </div>
    <div class="flex flex-wrap -mx-4">
      <div class="w-full xl:w-1/2 px-4 mb-8 xl:mb-0">
        <div class="kachel-main relative h-full max-h-[600px]">
          <img 
            class="block h-full w-full rounded-3xl object-cover" 
            src={urlFor(data.mainKachel.image).url()} 
            alt={data.mainKachel.image.alt}
          >
          <div class="absolute inset-0 rounded-3xl bg-gradient-to-t from-black/0 via-black/10 to-black/30"></div>
          <div class="absolute top-0 left-0 h-full w-full p-8 md:p-12">
            <div class="flex flex-col items-start justify-between h-full max-w-sm">
              <div>
                <span class="block mb-3 text-sm text-primary-200 font-semibold uppercase">{data.mainKachel.badge}</span>
                <h3 class="text-3xl md:text-4xl text-gray-50 font-semibold">{data.mainKachel.title}</h3>
              </div>
              <a class="relative group inline-block w-full xs:w-auto py-4 px-6 text-primary-900 hover:text-white font-semibold bg-primary-50 rounded-md overflow-hidden transition duration-500" href={data.mainKachel.button.link}>
                <div class="absolute top-0 right-full w-full h-full bg-orange-600 text-white transform group-hover:translate-x-full group-hover:scale-105 transition duration-500"></div>
                <div class="relative flex items-center justify-center">
                  <span class="mr-4">{data.mainKachel.button.text}</span>
                  <span>
                    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12.92 0.62C12.8185 0.375651 12.6243 0.181475 12.38 0.0799999C12.2598 0.028759 12.1307 0.00157999 12 0H2C1.73478 0 1.48043 0.105357 1.29289 0.292893C1.10536 0.48043 1 0.734784 1 1C1 1.26522 1.10536 1.51957 1.29289 1.70711C1.48043 1.89464 1.73478 2 2 2H9.59L1.29 10.29C1.19627 10.383 1.12188 10.4936 1.07111 10.6154C1.02034 10.7373 0.994202 10.868 0.994202 11C0.994202 11.132 1.02034 11.2627 1.07111 11.3846C1.12188 11.5064 1.19627 11.617 1.29 11.71C1.38296 11.8037 1.49356 11.8781 1.61542 11.9289C1.73728 11.9797 1.86799 12.0058 2 12.0058C2.13201 12.0058 2.26272 11.9797 2.38458 11.9289C2.50644 11.8781 2.61704 11.8037 2.71 11.71L11 3.41V11C11 11.2652 11.1054 11.5196 11.2929 11.7071C11.4804 11.8946 11.7348 12 12 12C12.2652 12 12.5196 11.8946 12.7071 11.7071C12.8946 11.5196 13 11.2652 13 11V1C12.9984 0.869323 12.9712 0.740222 12.92 0.62Z" fill="currentColor"></path>
                    </svg>
                  </span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div class="w-full xl:w-1/2 px-4">
        <div class="flex flex-wrap h-full -mx-4 kachel-container">
          <div class="w-full md:w-1/2 px-4 mb-8 md:mb-0">
            <div class="flex flex-col h-full">
              {#each data.sideKacheln.slice(0, 2) as kachel}
                <a class="kachel-small relative block h-full {kachel === data.sideKacheln[0] ? 'mb-7' : ''} pt-8 px-8 pb-5 rounded-3xl {getBackgroundColor(kachel.backgroundColor)} transition duration-200" href={kachel.link}>
                  <div class="flex flex-col h-full justify-between max-w-sm pr-16">
                    <p class="text-sm text-gray-900 mb-10 md:mb-6">{kachel.description}</p>
                    <span class="text-3xl font-semibold text-gray-900">{kachel.title}</span>
                  </div>
                  <img class="absolute bottom-0 right-0 m-5" src="saturn-assets/images/features/arrow.svg" alt="">
                </a>
              {/each}
            </div>
          </div>
          <div class="w-full md:w-1/2 px-4">
            {#if data.sideKacheln[2]}
              <a class="kachel-small-last relative block h-full pt-8 px-8 pb-5 rounded-3xl {getBackgroundColor(data.sideKacheln[2].backgroundColor)} transition duration-200" href={data.sideKacheln[2].link}>
                <div class="flex h-full flex-col items-start justify-between max-w-sm pr-16">
                  <p class="text-sm text-gray-900 mb-10 md:mb-6">{data.sideKacheln[2].description}</p>
                  <span class="text-3xl font-semibold text-gray-900">{data.sideKacheln[2].title}</span>
                </div>
                <img class="absolute bottom-0 right-0 m-5" src="saturn-assets/images/features/arrow.svg" alt="">
              </a>
            {/if}
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
