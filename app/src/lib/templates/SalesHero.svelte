<script lang="ts">
  import type { SalesHeroSection } from '$lib/types/salesHeroSection'
  import SanityImage from '$lib/components/SanityImage.svelte'
  import Icon from '$lib/components/icons/Icon.svelte'
  import CleanText from '$lib/components/CleanText.svelte'
  import PortableTextContent from '$lib/components/PortableTextContent.svelte'
  import Button from '$lib/components/Button.svelte'

  export let data: SalesHeroSection
</script>

<div class="relative w-full sm:h-full-header flex flex-col justify-between" role="region" aria-label="Hero Section">
  <!-- Background -->
  <div class="absolute h-full inset-0 -z-10 bg-white" aria-hidden="true">
    {#if data.backgroundImage}
      <div class="relative w-full h-full">
        <SanityImage
          value={data.backgroundImage}
          customClass="absolute inset-0 w-full h-full object-cover object-right hero-bg"
          priority={true}
          fetchpriority="high"
          quality={90}
        />
        <!-- Dark overlay for mobile -->
        <div class="absolute inset-0 bg-black/15 md:hidden" aria-hidden="true"></div>
      </div>
    {/if}
  </div>

  <!-- Main Content -->
  <div class="relative flex-1 flex flex-col justify-center items-center py-12 px-4">
    <div class="container mx-auto">
      <div class="max-w-5xl mx-auto text-center flex flex-col items-center">
        <!-- Subtitle -->
        {#if data.subheadline}
        <div class="animate-fade-slide-up" style="--delay: 0.3s">
          <CleanText
            text={data.subheadline}
            tag="p"
            className="font-heading text-xl sm:text-xl md:text-xl lg:text-2xl font-light text-white md:text-primary uppercase"
          />
        </div>
        {/if}
        <!-- Headlines -->
        <div class="animate-fade-slide-up" style="--delay: 0.4s">
          <CleanText
            text={data.headline}
            tag="h2"
            className="font-heading text-3xl sm:text-4xl md:text-6xl lg:text-6xl font-bold text-white md:text-primary"
          />
        </div>
        {#if data.headline2}
          <div class="mt-2 animate-fade-slide-up" style="--delay: 0.5s">
            <PortableTextContent
              value={data.headline2}
              customClass="font-heading text-3xl sm:text-4xl md:text-6xl lg:text-6xl font-light text-white md:text-primary"
            />
          </div>
        {/if}

        <!-- Description -->
        {#if data.description}
          <div class="animate-fade-slide-up" style="--delay: 0.6s">
            <CleanText
              text={data.description}
              tag="p"
              className="text-base sm:text-lg md:text-xl font-light max-w-3xl mx-auto text-white md:text-inherit"
            />
          </div>
        {/if}

        <!-- CTA Buttons -->
        <div class="cta-container flex flex-wrap gap-6 md:gap-16 justify-center mt-16 animate-fade-slide-up" style="--delay: 0.7s">
          {#if data.primaryCTA}
            <Button
              href={data.primaryCTA.link}
              text={data.primaryCTA.text}
              variant="green"
              size="md"
            />
          {/if}
          {#if data.secondaryCTA}
            <Button
              href={data.secondaryCTA.link}
              text={data.secondaryCTA.text}
              variant="outline"
              size="md"
            />
          {/if}
        </div>
      </div>
    </div>
  </div>

  <!-- Stats -->
  {#if data.stats && data.stats.length > 0}
    <div class="w-full bg-primary-800 py-6 sm:py-8">
      <div class="container mx-auto px-4">
        <dl class="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {#each data.stats as stat}
            <div class="flex flex-col items-center text-white">
              <dt class="text-lg uppercase">
                <CleanText
                  text={stat.label}
                  className="text-lg uppercase"
                />
              </dt>
              <dd class="text-2xl sm:text-3xl md:text-4xl font-medium">
                <CleanText
                  text={stat.value}
                  className="text-2xl sm:text-3xl md:text-4xl font-medium"
                />
              </dd>
            </div>
          {/each}
        </dl>
      </div>
    </div>
  {/if}
</div>
