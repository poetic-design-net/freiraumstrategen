<script lang="ts">
  import { cleanText } from '$lib/utils/textCleaner';
  import type { TestimonialData } from '../types/testimonial.types';
  import SanityImage from '$lib/components/SanityImage.svelte';

  export let item: TestimonialData;
  $: testimonial = item; // For backward compatibility
</script>

<div class="h-full">
  <div class="px-6 py-12 xs:pl-12 xs:pr-14 bg-gray-100 rounded-3xl h-full">
    <div class="flex flex-col lg:flex-row items-start">
      <!-- Avatar -->
      <div class="w-24 h-24 mb-6 lg:mb-0 lg:mr-12 flex-shrink-0">
        <div class="w-full h-full overflow-hidden rounded-full">
          <SanityImage
            value={testimonial.image}
            customClass="w-full h-full object-cover"
          />
        </div>
      </div>

      <!-- Content -->
      <div class="flex-grow">
        <img 
          class="block mb-4" 
          src="/saturn-assets/images/testimonials/quote-orange.svg" 
          alt="Quotation mark"
        >
        <h4 class="text-2xl font-semibold text-gray-900 mb-6">
          {@html cleanText(testimonial.title)}
        </h4>
        <p class="text-gray-500 mb-5">
          {@html cleanText(testimonial.content)}
        </p>
        <div class="flex flex-wrap items-center gap-2">
          <span class="font-medium text-primary-900">
            {@html cleanText(testimonial.position)}
          </span>
          <span class="font-semibold text-primary-900">
            {@html cleanText(testimonial.name)}
          </span>
        </div>
      </div>
    </div>
  </div>
</div>
