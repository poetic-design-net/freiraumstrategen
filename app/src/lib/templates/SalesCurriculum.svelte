<script lang="ts">
  import type { SalesCurriculumSection } from '$lib/types/salesCurriculumSection'
  import Icon from '$lib/components/icons/Icon.svelte'
  import CleanText from '$lib/components/CleanText.svelte'
  import Button from '$lib/components/Button.svelte'

  export let data: SalesCurriculumSection

  type ButtonVariant = 'primary' | 'secondary' | 'orange' | 'outline';

  $: bonusBoxStyle = {
    container: {
      orange: 'bg-orange-600',
      primary: 'bg-primary-800',
      gray: 'bg-gray-50'
    },
    text: {
      orange: 'text-white',
      primary: 'text-white',
      gray: 'text-gray-900'
    },
    button: {
      orange: 'orange' as ButtonVariant,
      primary: 'outline' as ButtonVariant,
      gray: 'outline' as ButtonVariant
    },
    imageOpacity: {
      orange: 'opacity-30',
      primary: 'opacity-5',
      gray: 'opacity-5'
    }
  }

  $: style = data.bonusBox?.style || 'orange'
</script>

<div class="relative z-10 container px-4 mx-auto">
  <div class="text-center mb-20">
    {#if data.badge}
      <CleanText 
        text={data.badge}
        className="inline-block py-1 px-3 mb-4 text-xs font-medium text-primary-900 bg-primary-50 rounded-full shadow"
      />
    {/if}
    <CleanText 
      text={data.title}
      tag="h2"
      className="text-4xl lg:text-5xl font-bold mb-6"
    />
    {#if data.subtitle}
      <CleanText 
        text={data.subtitle}
        tag="p"
        className="text-xl text-gray-600 max-w-3xl mx-auto"
      />
    {/if}
  </div>

  <!-- Modules Grid -->
  <div class="grid grid-cols-1 md:grid-cols-2 gap-16">
    {#each data.modules as module}
      <div class="group">
        <div class="relative p-8 bg-ultra-light rounded-3xl shadow hover:shadow-md transition-all duration-300">
          <!-- Week Badge -->
          <div class="absolute -top-4 left-8 px-4 py-2 bg-white rounded-full shadow-md">
            <CleanText 
              text={`Woche ${module.week}`}
              className="text-sm font-bold bg-gradient-to-r from-primary-700 to-primary-500 bg-clip-text text-transparent"
            />
          </div>

          <!-- Content -->
          <div class="mt-4">
            <CleanText 
              text={module.title}
              tag="h3"
              className="text-2xl font-bold mb-4 text-primary-800"
            />
            <CleanText 
              text={module.description}
              tag="p"
              className="text-gray-600 mb-6"
            />
            
            <div class="space-y-3">
              {#each module.topics as topic}
                <div class="flex items-start gap-3">
                  <Icon 
                    name="check" 
                    size={20} 
                    className="mt-1 text-primary-600 flex-shrink-0"
                    strokeWidth={2}
                  />
                  <CleanText 
                    text={topic}
                    className="text-gray-700"
                  />
                </div>
              {/each}
            </div>
          </div>
        </div>
      </div>
    {/each}
  </div>

  <!-- Bonus Box -->
  {#if data.bonusBox}
    <div class="mt-16 relative overflow-hidden rounded-3xl">
      <!-- Background with gradient -->
      <div class="absolute inset-0 {bonusBoxStyle.container[style]}">
        <img
          class="absolute top-0 left-0 w-full h-full {bonusBoxStyle.imageOpacity[style]} object-cover"
          src="saturn-assets/images/newsletter/bg-gradient-color-big.png"
          alt=""
        >
      </div>

      <!-- Content -->
      <div class="relative z-10 p-10 rounded-3xl text-center">
        <CleanText 
          text={data.bonusBox.title}
          tag="h3"
          className="text-3xl font-medium {bonusBoxStyle.text[style]} mb-6"
        />
        <CleanText 
          text={data.bonusBox.description}
          tag="p"
          className="{bonusBoxStyle.text[style]} mb-8 max-w-2xl mx-auto text-lg leading-relaxed"
        />
        {#if data.bonusBox.ctaButton}
          <Button 
            text={data.bonusBox.ctaButton.text}
            href={data.bonusBox.ctaButton.link}
            icon="arrow-right"
            size="md"
            variant={bonusBoxStyle.button[style]}
          />
        {/if}
      </div>
    </div>
  {/if}
</div>
