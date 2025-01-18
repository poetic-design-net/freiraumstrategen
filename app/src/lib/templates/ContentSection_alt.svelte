<script lang="ts">
  import Button from "$lib/components/Button.svelte";
  import SanityImage from "$lib/components/SanityImage.svelte";
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';
  import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

  interface ButtonData {
    text: string;
    link: string;
    variant: 'orange' | 'primary' | 'secondary';
  }

  interface SliderImage {
    image: {
      _type: 'image';
      asset: SanityImageSource;
    };
    alt: string;
  }

  interface SliderSettings {
    autoplaySpeed: number;
    transitionDuration: number;
  }

  interface Props {
    enabled: boolean;
    leftColumn: {
      badge: string;
      heading: {
        line1: string;
        line2: string;
        line3: string;
      };
      paragraphs: string[];
      button: ButtonData;
    };
    rightColumn: {
      heading: string;
      featureList: Array<{ text: string }>;
      paragraphs: string[];
      imageSlider: {
        images: SliderImage[];
        settings: SliderSettings;
      };
    };
    backgroundImage: {
      _type: 'image';
      asset: SanityImageSource;
    };
  }

  export let data: Props;

  let currentIndex = 0;
  let intervalId: NodeJS.Timeout;

  onMount(() => {
    if (data.rightColumn?.imageSlider?.images?.length > 0) {
      startSlideshow();
    }
    return () => clearInterval(intervalId);
  });

  function startSlideshow() {
    const speed = data.rightColumn?.imageSlider?.settings?.autoplaySpeed || 5000;
    intervalId = setInterval(() => {
      currentIndex = (currentIndex + 1) % data.rightColumn.imageSlider.images.length;
    }, speed);
  }

  function pauseSlideshow() {
    clearInterval(intervalId);
  }

  function resumeSlideshow() {
    startSlideshow();
  }
</script>

{#if data.enabled}
  {#if data.backgroundImage}
    <div class="absolute bottom-0 left-0 w-full opacity-10">
      <SanityImage
        value={data.backgroundImage}
        customClass="w-full"
      />
    </div>
  {/if}

  <div class=" container mx-auto">
    <div class="container px-0 ">
      <div class="flex flex-wrap -mx-4">
        <!-- Left column -->
        <div class="w-full lg:w-1/2 px-4 mb-12 lg:mb-0">
          <div class="max-w-md md:max-w-lg mx-auto lg:mx-0">
            {#if data.leftColumn.badge}
              <span class="inline-block py-1 px-3 mb-4 text-xs font-medium text-primary-900 bg-primary-50 rounded-full shadow">
                {data.leftColumn.badge}
              </span>
            {/if}
            
            {#if data.leftColumn.heading}
              <h1 class="font-heading text-4xl xs:text-6xl md:text-7xl font-medium text-gray-900 mb-12">
                {#if data.leftColumn.heading.line1}
                  <span class="block">{data.leftColumn.heading.line1}</span>
                {/if}
                {#if data.leftColumn.heading.line2}
                  <span>{data.leftColumn.heading.line2}</span>
                {/if}
                {#if data.leftColumn.heading.line3}
                  <span class="block font-thin">{data.leftColumn.heading.line3}</span>
                {/if}
              </h1>
            {/if}

            {#if data.leftColumn.paragraphs}
              {#each data.leftColumn.paragraphs as paragraph}
                <p class="max-w-md text-lg xs:text-3xl font-light text-gray-600 mb-6">
                  {paragraph}
                </p>
              {/each}
            {/if}

            {#if data.leftColumn.button}
              <div class="mt-12">
                <Button 
                  text={data.leftColumn.button.text} 
                  href={data.leftColumn.button.link} 
                  variant={data.leftColumn.button.variant} 
                />
              </div>
            {/if}
          </div>
        </div>

        <!-- Right column -->
        <div class="w-full lg:w-1/2 px-4">
          <div class="max-w-md md:max-w-lg mx-auto lg:mr-0">
            {#if data.rightColumn.heading}
              <h3 class="text-xl xs:text-3xl font-medium text-gray-800 mb-6">
                {data.rightColumn.heading}
              </h3>
            {/if}

            {#if data.rightColumn.featureList}
              <ul class="mb-6">
                {#each data.rightColumn.featureList as feature}
                  <li class="flex mb-6 items-center">
                    
                    <span class="text-base xs:text-lg font-semibold text-gray-900">{feature.text}</span>
                  </li>
                {/each}
              </ul>
            {/if}

            {#if data.rightColumn.paragraphs}
              {#each data.rightColumn.paragraphs as paragraph}
                <p class="text-base text-gray-700 mb-5">
                  {paragraph}
                </p>
              {/each}
            {/if}

            <!-- Image Slider -->
            {#if data.rightColumn.imageSlider?.images && data.rightColumn.imageSlider.images.length > 0}
              <div 
                class="relative rounded-lg overflow-hidden aspect-[4/3]"
                on:mouseenter={pauseSlideshow}
                on:mouseleave={resumeSlideshow}
              >
                {#key currentIndex}
                  <div 
                    class="absolute inset-0"
                    in:fade={{ duration: data.rightColumn.imageSlider.settings?.transitionDuration || 800 }}
                    out:fade={{ duration: data.rightColumn.imageSlider.settings?.transitionDuration || 800 }}
                  >
                    <SanityImage 
                      value={data.rightColumn.imageSlider.images[currentIndex].image}
                      customClass="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                {/key}
                
                <!-- Slider Indicators -->
                <div class="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
                  {#each data.rightColumn.imageSlider.images as _, i}
                    <button 
                      class="w-2 h-2 rounded-full transition-all duration-300 {
                        i === currentIndex 
                          ? 'bg-primary-600 scale-125' 
                          : 'bg-primary-200 hover:bg-primary-300'
                      }"
                      on:click={() => currentIndex = i}
                      aria-label="Show image {i + 1}"
                    />
                  {/each}
                </div>
              </div>
            {/if}
          </div>
        </div>
      </div>
    </div>
  </div>
{/if}
