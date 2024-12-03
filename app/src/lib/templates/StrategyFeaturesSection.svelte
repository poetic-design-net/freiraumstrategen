<script lang="ts">
import Button from "$lib/components/Button.svelte";
import SanityImage from "$lib/components/SanityImage.svelte";
import type { StrategyFeaturesSection } from "$lib/types/strategySection";

export let data: StrategyFeaturesSection;

// Function to get background color class based on index
const getBgColorClass = (index: number): string => {
  const colors = ['bg-primary-100', 'bg-blue-100', 'bg-green-100'];
  return colors[index % colors.length];
};

// Function to get text color class based on index
const getTextColorClass = (index: number): string => {
  const colors = ['text-primary-600', 'text-blue-600', 'text-green-600'];
  return colors[index % colors.length];
};
</script>

{#if data?.enabled}
  <img class="absolute bottom-0 left-0" src="saturn-assets/images/features/left-blue-center.png" alt="">
  <img class="absolute bottom-1/2 right-0 transform translate-y-1/2" src="saturn-assets/images/features/primary-right-top.png" alt="">
  <div class="relative container px-4 mx-auto">
    <div class="max-w-7xl mx-auto">
      <div class="flex flex-wrap items-center -mx-4">
        <div class="w-full lg:w-1/2 px-4 order-last lg:order-first">
          <div class="relative pb-20 lg:pb-0">
            <div class="absolute top-0 left-0 -mt-8 md:mt-9 inline-flex p-4 bg-white rounded-3xl shadow-xl z-10">
              <div>
                {#if data.testimonial?.image}
                  <SanityImage
                    value={data.testimonial.image}
                    customClass="w-12 h-12 rounded-full object-cover"
                  />
                {/if}
              </div>
              <div class="mx-3">
                <span class="font-semibold">{data.testimonial?.title || ''}</span>
                <span class="block text-sm text-gray-500">{data.testimonial?.description || ''}</span>
              </div>
              <div class="items-center text-green-500">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z" />
                </svg>
              </div>
            </div>
            <div class="absolute bottom-0 right-0 max-w-xs lg:-mb-16 z-10">
              <div class="px-6 pt-6 pb-6 lg:pr-8 bg-white rounded-3xl shadow-xl">
                {#each data.features || [] as feature, index}
                  <div class="inline-flex mb-6 last:mb-0">
                    <div class="flex items-center justify-center w-12 h-12 rounded-full {getBgColorClass(index)}">
                      {#if feature.icon === 'time'}
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 {getTextColorClass(index)}" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      {:else if feature.icon === 'chart'}
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 {getTextColorClass(index)}" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                      {:else if feature.icon === 'team'}
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 {getTextColorClass(index)}" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                      {/if}
                    </div>
                    <div class="mx-3">
                      <span class="text-sm font-semibold">{feature.title}</span>
                      <span class="block text-xs text-gray-500">{feature.subtitle}</span>
                    </div>
                  </div>
                {/each}
              </div>
            </div>
            {#if data.mainImage}
              <SanityImage
                value={data.mainImage}
                customClass="mx-auto pb-14"
              />
            {/if}
          </div>
        </div>
        <div class="w-full lg:w-1/2 px-4 mb-24 lg:mb-0">
          <div class="max-w-lg mx-auto lg:mr-0">
            <span class="inline-block py-1 px-3 mb-4 text-xs font-semibold text-primary-900 bg-primary-50 shadow rounded-full">{data.badge || ''}</span>
            <h1 class="font-heading text-4xl xs:text-5xl font-thin text-gray-900 mb-6">
              <span>{data.heading?.regular || ''}</span>
              <span class="font-semibold text-gray-900">{data.heading?.highlighted || ''}</span>
            </h1>
            <p class="text-lg font-semibold mb-6">{data.content?.mainParagraph || ''}</p>
            <p class="text-gray-600">{data.content?.secondaryParagraph || ''}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
{/if}
