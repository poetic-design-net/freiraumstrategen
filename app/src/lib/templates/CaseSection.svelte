<script lang="ts">
  import { fly } from 'svelte/transition';
  import { cubicOut } from 'svelte/easing';
  import { onMount } from 'svelte';
  import ImageRenderer from '$lib/components/ImageRenderer.svelte';

  export let data: {
    badge?: string;
    title?: string;
    description?: string;
    selectedPages?: any[];
    selectedPosts?: any[];
    displaySettings?: {
      showHeroImage: boolean;
      customExcerptLength: number;
    };
  };

  let currentIndex = 0;
  let container: HTMLElement;
  let backgroundHue = 0;
  let cardWidth: number;
  let visibleCards: number;

  const FALLBACK_IMAGE_URL = 'https://cdn.sanity.io/images/4gz7oym3/production/f99b18289276ea2555b3ef8b919a2048b9cb250d-379x420.png?w=400';

  $: allItems = [
    ...(data.selectedPosts || []).map(post => ({
      img: post.mainImage || { asset: { _ref: FALLBACK_IMAGE_URL } },
      title: (post.title || 'Kein Titel').replace(/[\u200B-\u200D\uFEFF]/g, ''),
      slug: `post/${post.slug?.current || 'no-slug'}`,
      excerpt: post.excerpt || 'Keine Beschreibung verfügbar'
    })),
    ...(data.selectedPages || []).map(page => ({
      img: page.heroImage || { asset: { _ref: FALLBACK_IMAGE_URL } },
      title: (page.title || 'Kein Titel').replace(/[\u200B-\u200D\uFEFF]/g, ''),
      slug: page.slug?.current || 'no-slug',
      excerpt: page.description || 'Keine Beschreibung verfügbar'
    }))
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
      const maxIndex = Math.max(0, allItems.length - visibleCards);
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
        }, 250);
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
<img class="absolute top-0 left-0 scale-y-[-1]" src="saturn-assets/images/headers/blue-light-left-bottom.png" alt="">
<div class="relative container px-4 mx-auto">
  <div class="flex flex-wrap items-center">
    <div class="w-full lg:w-2/3 xl:w-2/3 px-4 mb-12 lg:mb-0">
      <div class="w-full">
        <span class="inline-block py-1 px-3 mb-4 text-xs font-medium text-primary-900 bg-primary-50 rounded-full">{data.badge || 'Deine Story zum Erfolg'}</span>
        <h1 class="font-heading text-5xl xs:text-6xl md:text-7xl font-thin text-gray-900">
            {data.title}
        </h1>
      </div>
    </div>
    <div class="w-full lg:w-1/3 xl:w-1/3 px-4">
      <div class="max-w-lg lg:ml-auto">
        <p class="text-lg text-gray-500">{data.description || 'So, how do you know which is the right tax software agency for your company? Well, you can\'t go wrong with choosing Saturn.'}</p>
      </div>
    </div>
  </div>
</div>

<div class="container px-4 mx-auto relative z-10">
  <div class="flex px-4 justify-end mb-8">
    <div class="w-full lg:w-1/3 px-4">
      <div class="flex items-center justify-end">
        <button on:click={prevSlide} class="inline-flex mr-3 w-14 h-14 items-center justify-center rounded-full bg-gray-100 hover:border-primary-900 text-gray-600 hover:text-primary-900 hover:bg-gray-200 transition duration-200">
          <svg width="12" height="14" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0.0799999 6.62C0.127594 6.49725 0.19896 6.38511 0.290001 6.29L5.29 1.29C5.38324 1.19676 5.49393 1.1228 5.61575 1.07234C5.73757 1.02188 5.86814 0.995911 6 0.995911C6.2663 0.995911 6.5217 1.1017 6.71 1.29C6.80324 1.38324 6.8772 1.49393 6.92766 1.61575C6.97812 1.73758 7.00409 1.86814 7.00409 2C7.00409 2.2663 6.8983 2.5217 6.71 2.71L3.41 6H11C11.2652 6 11.5196 6.10536 11.7071 6.2929C11.8946 6.48043 12 6.73479 12 7C12 7.26522 11.8946 7.51957 11.7071 7.70711C11.5196 7.89465 11.2652 8 11 8H3.41L6.71 11.29C6.80373 11.383 6.87812 11.4936 6.92889 11.6154C6.97966 11.7373 7.0058 11.868 7.0058 12C7.0058 12.132 6.97966 12.2627 6.92889 12.3846C6.87812 12.5064 6.80373 12.617 6.71 12.71C6.61704 12.8037 6.50644 12.8781 6.38458 12.9289C6.26272 12.9797 6.13201 13.0058 6 13.0058C5.86799 13.0058 5.73728 12.9797 5.61542 12.9289C5.49356 12.8781 5.38296 12.8037 5.29 12.71L0.290001 7.71C0.19896 7.6149 0.127594 7.50275 0.0799999 7.38C-0.0200176 7.13654 -0.0200176 6.86346 0.0799999 6.62Z" fill="#222"></path>
          </svg>
        </button>
        <button on:click={nextSlide} class="inline-flex w-14 h-14 items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-primary-900 transition duration-200">
          <svg width="12" height="14" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.92 6.62C11.8724 6.49725 11.801 6.38511 11.71 6.29L6.71 1.29C6.61676 1.19676 6.50607 1.1228 6.38425 1.07234C6.26243 1.02188 6.13186 0.995911 6 0.995911C5.7337 0.995911 5.4783 1.1017 5.29 1.29C5.19676 1.38324 5.1228 1.49393 5.07234 1.61575C5.02188 1.73758 4.99591 1.86814 4.99591 2C4.99591 2.2663 5.1017 2.5217 5.29 2.71L8.59 6H1C0.734784 6 0.48043 6.10536 0.292893 6.2929C0.105357 6.48043 0 6.73479 0 7C0 7.26522 0.105357 7.51957 0.292893 7.70711C0.48043 7.89465 0.734784 8 1 8H8.59L5.29 11.29C5.19627 11.383 5.12188 11.4936 5.07111 11.6154C5.02034 11.7373 4.9942 11.868 4.9942 12C4.9942 12.132 5.02034 12.2627 5.07111 12.3846C5.12188 12.5064 5.19627 12.617 5.29 12.71C5.38296 12.8037 5.49356 12.8781 5.61542 12.9289C5.73728 12.9797 5.86799 13.0058 6 13.0058C6.13201 13.0058 6.26272 12.9797 6.38458 12.9289C6.50644 12.8781 6.61704 12.8037 6.71 12.71L11.71 7.71C11.801 7.6149 11.8724 7.50275 11.92 7.38C12.02 7.13654 12.02 6.86346 11.92 6.62Z" fill="#222"></path>
          </svg>
        </button>
      </div>
    </div>
  </div>
</div>

<div class="container mx-auto">
  <div class="relative overflow-x-hidden mt-8 w-screen">
    <div class="ml-[-16px] ml-[calc(-50vw+50%)]">
      <div bind:this={container} class="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar pl-4 pr-[100vw]"> 
        {#each allItems as item, i}
          <div class="article w-[85vw] sm:w-[45vw] md:w-[30vw] lg:w-[calc(100vw/3)] flex-shrink-0 pr-6 snap-start">
            <a href={`/${item.slug}`} class="block h-full">
              <div in:fly="{{ y: 50, duration: 800, delay: i * 200, easing: cubicOut }}" class="bg-white rounded-lg overflow-hidden h-full flex flex-col duration-300">
                <div class="relative overflow-hidden group hover:shadow-lg transition-all duration-200"> 
                  <ImageRenderer value={item.img} />           
                </div>
                <div class="p-4 flex flex-col flex-grow">
                  <h3 class="text-3xl font-medium mb-5">{item.title}</h3>
                  <div class="mt-auto">
                    <span class="inline-flex items-center justify-center px-4 py-2 text-sm font-regular text-primary-900 rounded-full border border-gray-100 hover:border-primary-900 hover:bg-primary-900 hover:text-white transition duration-200">
                      <span class="mr-2">Mehr erfahren</span>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="size-5">
                        <path fill-rule="evenodd" d="M5.22 14.78a.75.75 0 0 0 1.06 0l7.22-7.22v5.69a.75.75 0 0 0 1.5 0v-7.5a.75.75 0 0 0-.75-.75h-7.5a.75.75 0 0 0 0 1.5h5.69l-7.22 7.22a.75.75 0 0 0 0 1.06Z" clip-rule="evenodd" />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
            </a>
          </div>
        {/each}
      </div>
    </div>
  </div>
  <div class="mt-12 flex items-center justify-center">
    {#each allItems as _, i}
      <button 
        on:click={() => scrollToIndex(i)} 
        class="mr-1 w-7 h-1 cursor-pointer {i === currentIndex ? 'bg-primary-900' : 'bg-gray-400 hover:bg-primary-600'}"
        aria-label="Gehe zu Slide {i + 1}"
      ></button>
    {/each}
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
</style>
