<script lang="ts">
  import type { ReviewSectionProps, GooglePlacesReview } from '$lib/types/reviewSection';
  import { onMount } from 'svelte';
  import { fade, scale } from 'svelte/transition';
  import SanityImage from '$lib/components/SanityImage.svelte';

  export let data: ReviewSectionProps;
  
  let reviews: GooglePlacesReview[] = [];
  let isLoading = true;
  let error: string | null = null;
  let selectedReview: GooglePlacesReview | null = null;
  let modalOpen = false;

  async function fetchReviews() {
    try {
      isLoading = true;
      error = null;
      
      if (!data.googlePlaces?.placeId) {
        throw new Error('Google Places ID ist nicht konfiguriert');
      }

      const response = await fetch(`/api/reviews?placeId=${data.googlePlaces.placeId}&maxReviews=20&forceRefresh=true`);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || `Fehler beim Laden der Bewertungen: ${response.status}`);
      }
      
      const result = await response.json();
      reviews = result.reviews;
    } catch (e) {
      console.error('Error fetching reviews:', e);
      error = e instanceof Error ? e.message : 'Ein unerwarteter Fehler ist aufgetreten';
    } finally {
      isLoading = false;
    }
  }

  function openModal(review: GooglePlacesReview) {
    selectedReview = review;
    modalOpen = true;
  }

  function closeModal() {
    modalOpen = false;
    selectedReview = null;
  }

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape' && modalOpen) {
      closeModal();
    }
  }

  onMount(() => {
    fetchReviews();
    document.addEventListener('keydown', handleKeydown);
    return () => {
      document.removeEventListener('keydown', handleKeydown);
    };
  });
</script>

<svelte:head>
  <style>
    .modal-backdrop {
      background-color: rgba(0, 0, 0, 0.5);
      backdrop-filter: blur(4px);
    }
    .modal-scrollable {
      max-height: 90vh;
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
    }
  </style>
</svelte:head>

{#if data.enabled}
  <section class="py-16 relative">
    <div class="container px-4 mx-auto">
      <!-- Header -->
      <div class="max-w-2xl mx-auto mb-16 text-center">
        {#if data.header.badge}
          <span class="inline-block py-1 px-3 mb-4 text-xs font-medium text-primary-900 bg-primary-50 rounded-full shadow">
            {data.header.badge}
          </span>
        {/if}
        
        <h2 class="font-heading mb-4">
          {#if data.header.heading.regular}
            <span class="block text-2xl xs:text-4xl md:text-5xl font-medium text-gray-900 mb-1">
              {data.header.heading.regular}
            </span>
          {/if}
          {#if data.header.heading.thin}
            <span class="block text-2xl xs:text-4xl md:text-5xl font-light text-gray-900">
              {data.header.heading.thin}
            </span>
          {/if}
        </h2>
        
        {#if data.header.subtitle}
          <p class="text-lg text-gray-500">{data.header.subtitle}</p>
        {/if}
      </div>

      <!-- Reviews Grid -->
      {#if isLoading}
        <div class="text-center">
          <div class="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-500"></div>
          <p class="mt-2 text-gray-600">Lade Bewertungen...</p>
        </div>
      {:else if error}
        <div class="text-center text-red-600">{error}</div>
      {:else if reviews.length === 0}
        <div class="text-center text-gray-600">Keine Bewertungen gefunden.</div>
      {:else}
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {#each reviews as review (review.time)}
              <button
                class="text-left bg-white rounded-lg shadow-lg p-6 transition-transform hover:scale-105 cursor-pointer w-full h-full flex flex-col"
                on:click={() => openModal(review)}
                in:fade={{duration: 300}}
              >
                <!-- Author Info -->
                <div class="flex items-start mb-4">
                  {#if review.authorImage}
                    <div class="w-12 h-12 rounded-full mr-4 overflow-hidden flex-shrink-0">
                      <SanityImage
                        value={{
                          ...review.authorImage,
                          alt: `Profilbild von ${review.author_name}`
                        }}
                        width={48}
                        height={48}
                      />
                    </div>
                  {:else}
                    <div class="w-12 h-12 rounded-full mr-4 bg-gray-100 flex items-center justify-center text-gray-500 flex-shrink-0">
                      {review.author_name.charAt(0).toUpperCase()}
                    </div>
                  {/if}
                  <div class="flex-1 min-w-0">
                    <p class="font-medium text-gray-900 truncate">
                      {review.author_name}
                    </p>
                    <div class="flex mt-1">
                      {#each Array(5) as _}
                        <svg class="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      {/each}
                    </div>
                  </div>
                  <time class="text-sm text-gray-500 flex-shrink-0">
                    {review.relative_time_description}
                  </time>
                </div>

                <!-- Review Text -->
                <p class="text-gray-600 line-clamp-3 flex-grow">{review.text}</p>
              </button>
            {/each}

            <!-- Static Google Review Link Tile -->
            <a
              href={`https://search.google.com/local/reviews?placeid=${data.googlePlaces?.placeId}`}
              target="_blank"
              rel="noopener noreferrer"
              class="bg-white rounded-lg shadow-lg p-6 transition-transform hover:scale-105 cursor-pointer w-full h-full flex flex-col items-center justify-center text-center"
              in:fade={{duration: 300}}
            >
              <div class="w-12 h-12 rounded-full mb-4 bg-primary-100 flex items-center justify-center">
                <svg class="w-6 h-6 text-primary-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
                </svg>
              </div>
              <p class="text-lg font-medium text-gray-900 mb-2">Mehr Bewertungen?</p>
              <p class="text-gray-600">Besuche uns auf Google für weitere Erfahrungsberichte.</p>
              <div class="flex mt-4">
                {#each Array(5) as _}
                  <svg class="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                {/each}
              </div>
            </a>
          </div>
      {/if}
    </div>
  </section>

  <!-- Review Modal -->
  {#if modalOpen && selectedReview}
    <div
      class="absolute inset-0 z-50 flex items-center justify-center"
      on:click={closeModal}
      transition:fade={{duration: 200}}
    >
      <!-- Backdrop -->
      <div class="absolute inset-0 modal-backdrop"></div>

      <!-- Modal Container -->
      <div
        class="relative z-50 w-full max-w-2xl mx-4 my-8 modal-scrollable"
        on:click|stopPropagation
      >
        <!-- Modal Content -->
        <div
          class="bg-white rounded-lg shadow-xl overflow-hidden"
          transition:scale={{duration: 200, start: 0.95}}
        >
          <!-- Modal Content -->
          <div class="bg-white p-6">
            <!-- Author Info -->
            <div class="flex items-start mb-6">
              {#if selectedReview.authorImage}
                <div class="w-16 h-16 rounded-full mr-4 overflow-hidden flex-shrink-0">
                  <SanityImage
                    value={{
                      ...selectedReview.authorImage,
                      alt: `Profilbild von ${selectedReview.author_name}`
                    }}
                    width={64}
                    height={64}
                  />
                </div>
              {:else}
                <div class="w-16 h-16 rounded-full mr-4 bg-gray-100 flex items-center justify-center text-gray-500 flex-shrink-0">
                  {selectedReview.author_name.charAt(0).toUpperCase()}
                </div>
              {/if}
              <div class="flex-1">
                <div class="flex items-center justify-between">
                  <h3 class="text-lg font-medium text-gray-900">
                    {selectedReview.author_name}
                  </h3>
                  <time class="text-sm text-gray-500">
                    {selectedReview.relative_time_description}
                  </time>
                </div>
                <div class="flex mt-2">
                  {#each Array(5) as _}
                    <svg class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  {/each}
                </div>
              </div>
            </div>

            <!-- Full Review Text -->
            <div class="prose max-w-none">
              <p class="text-gray-600 whitespace-pre-line">{selectedReview.text}</p>
            </div>

            <div class="mt-6 flex justify-between items-center">
              <a
                href={selectedReview.author_url}
                target="_blank"
                rel="noopener noreferrer"
                class="text-primary-600 hover:text-primary-800 font-medium"
              >
                Auf Google ansehen
              </a>
              <button
                class="ml-4 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-gray-700 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                on:click={closeModal}
              >
                Schließen
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  {/if}
{/if}