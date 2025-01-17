<script lang="ts">
import Button from "$lib/components/Button.svelte";
import SanityImage from "$lib/components/SanityImage.svelte";
import type { UberunsTeamSection } from "$lib/types/uberunsTeamSection";

export let data: UberunsTeamSection;
</script>

{#if data.enabled}
  <div class="relative container px-4 mx-auto">
    <div class="max-w-2xl lg:max-w-3xl mx-auto xl:max-w-7xl">
      <div class="flex flex-wrap mb-20 -mx-4 items-center">
        <div class="w-full xl:w-1/2 px-4">
          <div>
            <h1 class="font-heading text-4xl xs:text-5xl md:text-6xl font-medium text-gray-900 mb-8">
              {#if data.headline.eyebrow}
                <span>{data.headline.eyebrow}</span>
              {/if}
              {#if data.headline.title}
                <span class="font-thin block">{data.headline.title}</span>
              {/if}
            </h1>
          </div>
        </div>
        <div class="w-full xl:w-1/2 px-4">
          <div class="max-w-md xl:ml-auto">
            {#if data.description}
              <p class="text-lg text-gray-600 mb-6">{data.description}</p>
            {/if}
            {#if data.cta}
              <a 
                class="inline-flex py-4 px-6 items-center text-sm text-primary-900 font-semibold bg-white border border-gray-200 hover:border-primary-900 rounded-lg transition duration-200" 
                href={data.cta.link}
              >
                <span class="mr-4">{data.cta.text}</span>
                <span>
                  <svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.83 5.28999L2.59 1.04999C2.49704 0.956266 2.38644 0.881872 2.26458 0.831103C2.14272 0.780334 2.01202 0.754196 1.88 0.754196C1.74799 0.754196 1.61729 0.780334 1.49543 0.831103C1.37357 0.881872 1.26297 0.956266 1.17 1.04999C0.983753 1.23736 0.879211 1.49081 0.879211 1.75499C0.879211 2.01918 0.983753 2.27263 1.17 2.45999L4.71 5.99999L1.17 9.53999C0.983753 9.72736 0.879211 9.98081 0.879211 10.245C0.879211 10.5092 0.983753 10.7626 1.17 10.95C1.26344 11.0427 1.37426 11.116 1.4961 11.1658C1.61794 11.2155 1.7484 11.2408 1.88 11.24C2.01161 11.2408 2.14207 11.2155 2.26391 11.1658C2.38575 11.116 2.49656 11.0427 2.59 10.95L6.83 6.70999C6.92373 6.61703 6.99813 6.50643 7.04889 6.38457C7.09966 6.26271 7.1258 6.13201 7.1258 5.99999C7.1258 5.86798 7.09966 5.73728 7.04889 5.61542C6.99813 5.49356 6.92373 5.38296 6.83 5.28999Z" fill="currentColor"></path>
                  </svg>
                </span>
              </a>
            {/if}
          </div>
        </div>
      </div>
      <div class="flex flex-wrap -mx-6 -mb-16">
        {#each data.teamMembers as member}
          <div class="w-full md:w-1/2 px-6 mb-16">
            {#if member.image}
              <SanityImage
                value={member.image}
                customClass="mb-6 w-full aspect-16/9 object-cover rounded-3xl"
              />
            {/if}
            <h5 class="text-2xl font-semibold text-gray-900 mb-4">{member.name}</h5>
            {#if member.position}
              <span class="text-sm text-gray-500 block mb-2">{member.position}</span>
            {/if}
            {#if member.bio}
              <span class="text-gray-500 block leading-relaxed">{member.bio}</span>
            {/if}
            {#if member.socialLinks && member.socialLinks.length > 0}
              <div class="flex gap-4 mt-4">
                {#each member.socialLinks as social}
                  <a 
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    class="text-gray-400 hover:text-primary-900 transition-colors"
                  >
                    {#if social.platform === 'linkedin'}
                      <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                      </svg>
                    {:else if social.platform === 'twitter'}
                      <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                      </svg>
                    {:else if social.platform === 'xing'}
                      <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18.188 0c-.517 0-.741.325-.927.66 0 0-7.455 13.224-7.702 13.657.015.024 4.919 9.023 4.919 9.023.17.308.436.66.967.66h3.454c.211 0 .375-.078.463-.22.089-.151.089-.346-.009-.536l-4.879-8.916c-.004-.006-.004-.016 0-.022L22.139.756c.095-.191.097-.387.006-.535C22.056.078 21.894 0 21.686 0h-3.498zM3.648 4.74c-.211 0-.385.074-.473.216-.09.149-.078.339.02.531l2.34 4.05c.004.01.004.016 0 .021L1.86 16.051c-.099.188-.093.381 0 .529.085.142.239.234.45.234h3.461c.518 0 .766-.348.945-.667l3.734-6.609-2.378-4.155c-.172-.315-.434-.667-.962-.667H3.648v.024z"/>
                      </svg>
                    {/if}
                  </a>
                {/each}
              </div>
            {/if}
          </div>
        {/each}
      </div>
    </div>
  </div>
{/if}
