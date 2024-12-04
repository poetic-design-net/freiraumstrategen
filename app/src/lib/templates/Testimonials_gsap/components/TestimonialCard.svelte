<script lang="ts">
  import { cleanText } from '$lib/utils/textCleaner';
  import type { TestimonialData } from '../types/testimonial.types';
  import SanityImage from '$lib/components/SanityImage.svelte';

  export let item: TestimonialData;
  $: testimonial = item; // For backward compatibility
</script>

<div class="h-full">
  <div class="px-12 py-12 xs:pl-12 xs:pr-14 bg-gray-100 rounded-3xl h-full">
    <div class="flex flex-col lg:flex-row items-start">
  

      <!-- Content -->
      <div class="flex-grow">
        <div class="mb-4">
          <svg class="w-8 h-8 text-primary-900" fill="currentColor" viewBox="0 0 32 32">
            <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z"/>
          </svg>
        </div>
        <h4 class="text-2xl font-semibold text-gray-900 mb-2">
          {@html cleanText(testimonial.title)}
        </h4>
        <p class="text-xl text-gray-600 mb-8 flex-grow font-light">
          {@html cleanText(testimonial.content)}
        </p>
        <div class="border-t pt-6">
          <p class="font-medium text-gray-900 mb-1">
            {@html cleanText(testimonial.position)}
          </p>
          <p class="text-sm text-gray-500">
            {@html cleanText(testimonial.name)}
          </p>
        </div>
      </div>
    </div>
  </div>
</div>
