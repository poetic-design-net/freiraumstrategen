<script lang="ts">
  import type { SalesPricingSection } from '$lib/types/salesPricingSection'
  import CleanText from '$lib/components/CleanText.svelte'
  import Button from '$lib/components/Button.svelte'
  import Icon from '$lib/components/icons/Icon.svelte'
  import { getThemeStyles } from '$lib/utils/sections'

  export let data: SalesPricingSection

  // Get theme-based styles for content
  const theme = getThemeStyles(data.styles?.theme)
  // Use 80% opacity for the pricing box background
  const boxTheme = getThemeStyles(data.styles?.theme || 'light', 80)
</script>

<div class="relative z-10 container px-4 mx-auto">
  <div class="max-w-5xl mx-auto">
    <!-- Section Header -->
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

    <!-- Pricing Box -->
    <div class="relative">
      <!-- Content -->
      <div class="{boxTheme.background} rounded-2xl shadow-lg overflow-hidden">
        <div class="p-8 lg:p-12">
          <!-- Header -->
          <div class="text-center mb-12">
            {#if data.earlyBirdBadge}
              <div class="inline-block px-4 py-2 bg-primary-50 rounded-full mb-6">
                <CleanText 
                  text={data.earlyBirdBadge}
                  className="{theme.text} text-sm font-medium text-primary-800"
                />
              </div>
            {/if}
            <div class="flex items-center justify-center gap-4 mb-4">
              <CleanText 
                text={data.pricing.originalPrice}
                className="{theme.text} text-3xl font-light text-gray-400 line-through"
              />
              <CleanText 
                text={data.pricing.currentPrice}
                className="{theme.headings} text-5xl font-bold text-primary-800"
              />
            </div>
            <CleanText 
              text={data.pricing.paymentInfo}
              className="{theme.text}"
            />
          </div>

          <!-- Features Grid -->
          <div class="grid md:grid-cols-2 gap-6 mb-12">
            {#each data.features as feature}
              <div class="flex items-center gap-3">
                <Icon name="check" size={20} className="text-primary-600 flex-shrink-0" />
                <CleanText 
                  text={feature}
                  className="{theme.text}"
                />
              </div>
            {/each}
          </div>

          <!-- Bonuses - Using solid background for contrast -->
          <div class="bg-gray-100 rounded-xl p-8 mb-12 ">
            <h3 class="text-gray-900 text-xl font-bold mb-6">Bonus-Pakete im Wert von {data.bonuses.reduce((total, bonus) => total + parseInt(bonus.value.replace(/[^0-9]/g, '')), 0)}€</h3>
            <div class="space-y-6">
              {#each data.bonuses as bonus}
                <div class="flex items-center gap-6">
                  <div class="w-20 text-right">
                    <CleanText 
                      text={bonus.value}
                      className="font-bold text-primary-700"
                    />
                  </div>
                  <div class="flex-grow">
                    <CleanText 
                      text={bonus.title}
                      className="text-gray-800 font-bold mb-1"
                    />
                    <CleanText 
                      text={bonus.description}
                      className="text-gray-700 text-sm"
                    />
                  </div>
                </div>
              {/each}
            </div>
          </div>

          <!-- CTA -->
          {#if data.ctaButton}
            <div class="text-center">
              <div class="inline-block">
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

        <!-- Bottom Banner - Using solid background for contrast -->
        {#if data.guaranteeBox}
          <div class="bg-primary-800 text-white px-8 py-6 text-center">
            <CleanText 
              text={data.guaranteeBox.title}
              className="text-primary-200 font-medium mb-1 block"
            />
            <CleanText 
              text={data.guaranteeBox.description}
              className="text-sm text-primary-200"
            />
          </div>
        {/if}
      </div>
    </div>

    <!-- Trust Elements -->
    <div class="mt-16 text-center ">
      <div class="flex flex-wrap justify-center gap-8 text-sm ">
        {#each data.trustElements as element}
          <div class="flex items-center gap-2">
            <Icon name={element.icon} size={20} className="text-current" />
            <CleanText 
              text={element.text}
              className="{theme.text}"
            />
          </div>
        {/each}
      </div>
    </div>
  </div>
</div>
