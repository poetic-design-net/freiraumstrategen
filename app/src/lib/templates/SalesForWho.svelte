<script lang="ts">
  import type { SalesForWhoSection } from '$lib/types/salesForWhoSection'
  import Icon from '$lib/components/icons/Icon.svelte'
  import CleanText from '$lib/components/CleanText.svelte'
  import Button from '$lib/components/Button.svelte'
  import { getThemeStyles } from '$lib/utils/sections'

  export let data: SalesForWhoSection

  // Get theme-based styles for content
  const theme = getThemeStyles(data.styles?.theme)

  function getProfileIcon(title: string): 'clock' | 'education' | 'strategy' {
    if (title.toLowerCase().includes('berufstätige')) return 'clock'
    if (title.toLowerCase().includes('einsteiger')) return 'education'
    return 'strategy' // For Fortgeschrittene Trader
  }
</script>

<div class="relative z-10 container px-4 mx-auto">
  <div class="text-center mb-16">
    {#if data.badge}
      <CleanText 
        text={data.badge}
        className="inline-block py-1 px-3 mb-4 text-xs font-medium text-primary-900 bg-primary-50 rounded-full shadow"
      />
    {/if}
    <CleanText 
      text={data.title}
      tag="h2"
      className="{theme.headings} text-4xl lg:text-5xl font-bold mb-6"
    />
    {#if data.subtitle}
      <CleanText 
        text={data.subtitle}
        tag="p"
        className="{theme.text} text-xl max-w-3xl mx-auto"
      />
    {/if}
  </div>

  <!-- Target Audience Profiles -->
  <div class="grid md:grid-cols-3 gap-8 mb-20">
    {#each data.profiles as profile}
      <div class="p-8 bg-white rounded-xl shadow transition-all duration-300">
        <div class="flex items-center gap-3 mb-4">
          <Icon 
            name={getProfileIcon(profile.title)}
            size={24}
            className="text-primary-600"
          />
          <CleanText 
            text={profile.title}
            tag="h3"
            className="{theme.headings} text-xl font-medium"
          />
        </div>
        <CleanText 
          text={profile.description}
          tag="p"
          className="{theme.text}"
        />
      </div>
    {/each}
  </div>

  <!-- Requirements Section -->
  <div class="py-16 bg-gray-50 rounded-lg">
    <CleanText 
      text="Das solltest Du mitbringen"
      tag="h3"
      className="{theme.headings} text-3xl font-medium mb-12 text-center"
    />
    <div class="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto px-4">
      {#each data.requirements as requirement}
        <div class="bg-white rounded-xl p-8 shadow hover:shadow transition-all duration-300 transform">
          <CleanText 
            text={requirement.title}
            tag="h4"
            className="{theme.headings} text-xl font-medium mb-6"
          />
          <ul class="space-y-4">
            {#each requirement.points as point}
              <li class="flex items-start gap-3">
                <Icon 
                  name="check" 
                  size={18} 
                  className="text-primary-600 mt-1"
                />
                <CleanText 
                  text={point}
                  className="{theme.text}"
                />
              </li>
            {/each}
          </ul>
        </div>
      {/each}
    </div>
  </div>

  <!-- Bottom CTA -->
  {#if data.ctaButton}
    <div class="text-center mt-16 max-w-lg m-auto">
      <CleanText 
        text={data.bottomText || 'Wenn Du Dich in einem dieser Profile wiedererkennst und bereit bist, die nötigen Voraussetzungen zu erfüllen, dann ist die Winter Academy genau das Richtige für Dich.'}
        tag="p"
        className="{theme.text} text-lg mb-8"
      />
      <div class="inline-block"> <!-- Added wrapper div for better centering -->
        <Button 
          text={data.ctaButton.text}
          href={data.ctaButton.link}
          icon="arrow-right"
          size="md"
          variant="primary"
        />
      </div>
    </div>
  {/if}
</div>
