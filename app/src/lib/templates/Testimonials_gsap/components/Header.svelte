<script lang="ts">
  import type { TestimonialHeader } from '../types/testimonial.types';

  export let header: TestimonialHeader;
</script>

<div class="flex flex-wrap -mx-4 mb-8">
  <div class="w-full lg:w-2/3 px-4">
    <span class="inline-block py-1 px-3 mb-4 text-xs font-medium text-primary-900 bg-primary-50 rounded-full shadow">
      {header.badge}
    </span>
    <h1 class="font-heading text-5xl xs:text-6xl font-medium text-gray-900 mb-4">
      <span>{header.heading.regular}</span>
      <span class="font-thin">{header.heading.thin}</span>
    </h1>
    <p class="text-gray-500">{header.subtitle}</p>
  </div>
</div>
