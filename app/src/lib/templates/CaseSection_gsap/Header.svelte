<script lang="ts">
  import { cleanString } from '$lib/utils/stringUtils';

  export let title: string = '';
  export let subtitle: string = '';
  export let badge: string = '';
  export let description: string = '';

  $: cleanedTitle = cleanString(title);
  $: cleanedSubtitle = cleanString(subtitle);
  $: cleanedBadge = cleanString(badge);
  $: cleanedDescription = cleanString(description);
</script>

<div class="relative container px-4 mx-auto">
  <div class="flex flex-wrap items-center">
    <div class="w-full lg:w-2/3 xl:w-2/3 px-4 mb-12 lg:mb-0">
      <div class="w-full">
        <span class="inline-block py-1 px-3 mb-4 text-xs font-medium text-primary-900 bg-primary-50 rounded-full shadow">{cleanedBadge}</span>
        <h1 class="font-heading text-5xl xs:text-6xl md:text-7xl font-thin text-gray-900">
          <span>{cleanedTitle} </span>
          <span class="font-medium">{cleanedSubtitle}</span>
        </h1>
      </div>
    </div>
    <div class="w-full lg:w-1/3 xl:w-1/3 px-4">
      <div class="max-w-lg lg:ml-auto">
        <p class="text-lg text-gray-500">{cleanedDescription}</p>
      </div>
    </div>
  </div>
</div>
