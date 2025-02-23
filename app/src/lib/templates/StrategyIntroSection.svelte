<script lang="ts">
import Button from "$lib/components/Button.svelte";
import SanityImage from "$lib/components/SanityImage.svelte";
import type { StrategyIntroSection } from "$lib/sanity/queries/types";

export let data: StrategyIntroSection;

// Debug logs
$: {
  console.log('StrategyIntroSection - Full data:', data);
  console.log('StrategyIntroSection - Enabled:', data?.enabled);
  console.log('StrategyIntroSection - Heading:', data?.heading);
  console.log('StrategyIntroSection - Content:', data?.content);
  console.log('StrategyIntroSection - Team Card:', data?.teamCard);
  console.log('StrategyIntroSection - Main Image:', data?.mainImage);
  
  if (data?.teamCard?.members) {
    data.teamCard.members.forEach((member, index) => {
      console.log(`StrategyIntroSection - Team Member ${index}:`, member);
    });
  }
}

// Check if team card should be rendered
$: hasTeamMembers = data?.teamCard?.members && data.teamCard.members.length > 0;
</script>

{#if data?.enabled}
  <img class="absolute left-0 top-0 opacity-50" src="saturn-assets/images/features/star-left.png" alt="">
  <img class="absolute right-0 bottom-0 opacity-50" src="saturn-assets/images/features/light-orange.png" alt="">
  <div class="relative container px-4 mx-auto">
    <div class="max-w-7xl mx-auto">
      <div class="flex flex-wrap -mx-4">
        <div class="w-full lg:w-1/2 px-4 mb-14 lg:mb-0">
          <div class="max-w-md lg:max-w-xl mx-auto lg:mx-0">
            {#if data?.heading}
              <h1 class="font-heading text-5xl xs:text-6xl font-medium text-gray-900 mb-6">
                <span>{data.heading.regular || ''} </span>
                <span class="font-thin">{data.heading.thin || ''}</span>
              </h1>
            {/if}
            {#if data?.content}
              <div class="max-w-lg mb-10">
                <p class="text-gray-800 text-2xl mb-4">{data.content.mainParagraph || ''}</p>
                <p class="text-gray-600">{data.content.secondaryParagraph || ''}</p>
              </div>
            {/if}
            {#if hasTeamMembers}
              <div class="inline-block sm:inline-flex flex-col w-full rounded-xl shadow">
                <div class="flex flex-wrap w-full">
                  <!-- Linke Hälfte -->
                  <div class="w-full sm:w-1/3 p-5 flex items-center">
                    <div class="flex items-center">
                      {#each data.teamCard.members || [] as member, i}
                        <div class={i === 1 ? '-ms-4' : ''}>
                          {#if member?.image}
                            <SanityImage
                              value={member.image}
                              customClass="h-20 w-20 rounded-full border-2 border-white object-cover"
                            />
                          {/if}
                        </div>
                      {/each}
                    </div>
                  </div>
                  
                  <!-- Rechte Hälfte -->
                  <div class="w-full sm:w-2/3 p-5 flex flex-col justify-center">
                    <span class="block text-2xl font-medium">{data.teamCard.title || ''}</span>
                    <span class="text-primary-700 font-light text-sm">{data.teamCard.subtitle || ''}</span>
                  </div>
                </div>
              </div>
            {/if}
          </div>
        </div>
        {#if data?.mainImage}
          <div class="w-full lg:w-1/2 px-4">
            <div class="relative max-w-md lg:max-w-lg mx-auto lg:mr-0">
              <SanityImage
                value={data.mainImage}
                customClass="w-full h-full rounded-xl"
              />
              {#if data?.imageOverlay}
                <div class="absolute bottom-0 left-0 p-4">
                  <div class="inline-block p-5 bg-white/85 rounded-lg">
                    <span class="block mb-3 text-2xl font-semibold">{data.imageOverlay.name}</span>
                    <span class="block mb-2 text-sm text-gray-500">{data.imageOverlay.subtitle}</span>
                    {#if data.imageOverlay.stats}
                      <div class="inline-flex p-1 items-center bg-green-50 rounded-md">
                        <svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M8.80666 3.52664L5.47333 0.193305C5.40993 0.132611 5.33516 0.0850345 5.25333 0.0533049C5.09102 -0.0133738 4.90897 -0.0133738 4.74666 0.0533049C4.66483 0.0850345 4.59007 0.132611 4.52666 0.193305L1.19333 3.52664C1.13117 3.5888 1.08186 3.66259 1.04822 3.74381C1.01458 3.82502 0.997269 3.91207 0.997269 3.99997C0.997269 4.17751 1.06779 4.34777 1.19333 4.47331C1.31887 4.59884 1.48913 4.66937 1.66666 4.66937C1.8442 4.66937 2.01446 4.59884 2.14 4.47331L4.33333 2.2733V7.3333C4.33333 7.51012 4.40357 7.67969 4.52859 7.80471C4.65362 7.92973 4.82319 7.99997 5 7.99997C5.17681 7.99997 5.34638 7.92973 5.4714 7.80471C5.59642 7.67969 5.66666 7.51012 5.66666 7.3333V2.2733L7.86 4.47331C7.92197 4.53579 7.99571 4.58539 8.07694 4.61923C8.15818 4.65308 8.24532 4.6705 8.33333 4.6705C8.42134 4.6705 8.50847 4.65308 8.58971 4.61923C8.67095 4.58539 8.74469 4.53579 8.80666 4.47331C8.86915 4.41133 8.91874 4.3376 8.95259 4.25636C8.98644 4.17512 9.00386 4.08798 9.00386 3.99997C9.00386 3.91196 8.98644 3.82483 8.95259 3.74359C8.91874 3.66235 8.86915 3.58861 8.80666 3.52664Z" fill="#00AD6F"></path>
                        </svg>
                        <span class="ml-1 text-xs font-semibold text-green-900">{data.imageOverlay.stats.value}{data.imageOverlay.stats.unit}</span>
                      </div>
                    {/if}
                  </div>
                </div>
              {/if}
            </div>
          </div>
        {/if}
      </div>
    </div>
  </div>
{/if}
