<script lang="ts">
  import type { SalesCurriculumSection } from '$lib/types/salesCurriculumSection'
  import { generateICalEvent } from '$lib/types/salesCurriculumSection'
  import Icon from '$lib/components/icons/Icon.svelte'
  import CleanText from '$lib/components/CleanText.svelte'
  import Button from '$lib/components/Button.svelte'
  import { getThemeStyles } from '$lib/utils/sections'
  import { slide } from 'svelte/transition'

  export let data: SalesCurriculumSection

  function downloadCalendar() {
    console.log('Modules with dates:', modulesWithDates);
    
    const events = modulesWithDates
      .map(module => {
        const event = generateICalEvent(module);
        console.log('Generated event for module:', module, 'Event:', event);
        return event;
      })
      .join('\r\n');

    console.log('Final events string:', events);
    if (!events) {
      console.log('No events to export');
      return;
    }

    const calendar = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Die Freiraumstrategen//Curriculum Calendar//DE',
      'CALSCALE:GREGORIAN',
      events,
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([calendar], { type: 'text/calendar' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'curriculum.ics';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  }

  // Get theme-based styles for content
  const theme = getThemeStyles(data.styles?.theme)

  type ButtonVariant = 'primary' | 'secondary' | 'orange' | 'outline';

  // Track expanded state of modules
  let expandedModules: Set<number> = new Set()

  function toggleModule(index: number) {
    if (expandedModules.has(index)) {
      expandedModules.delete(index)
    } else {
      expandedModules.add(index)
    }
    expandedModules = expandedModules // trigger reactivity
  }

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
      orange: 'outline' as ButtonVariant,
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
  
  // Calculate number of modules with dates
  $: modulesWithDates = data.modules.filter(m => m.date && m.startTime && m.endTime)
</script>

<div class="relative z-10 container px-4 mx-auto">
    <div class="text-center space-y-4 mb-16">
    {#if data.badge}
      <CleanText 
        text={data.badge}
        className="inline-block py-1 px-3 text-xs font-medium text-primary-900 bg-primary-50 rounded-full shadow"
      />
    {/if}
    <CleanText 
      text={data.title}
      tag="h2"
        className="{theme.headings} text-4xl lg:text-5xl font-bold max-w-3xl mx-auto"
    />
    {#if data.subtitle}
      <CleanText 
        text={data.subtitle}
        tag="p"
        className="{theme.text} text-xl max-w-3xl mx-auto"
      />
    {/if}
    <div class="flex flex-col items-center gap-4">
      <p class="text-gray-500 text-sm">Klicke auf ein Modul, um mehr Details zu sehen</p>
      {#if modulesWithDates.length > 0}
        <Button
          text={`${modulesWithDates.length} ${modulesWithDates.length === 1 ? 'Termin' : 'Termine'} in Kalender exportieren`}
          icon="clock"
          variant="orange"
          size="sm"
          on:click={downloadCalendar}
        />
      {/if}
    </div>
  </div>

  <!-- Modules Grid -->
  <div class="grid grid-cols-1 {data.layout !== 'single-column' ? 'md:grid-cols-2' : ''} gap-16">
    {#each data.modules || [] as module, i}
      <div class="group h-full">
        <div 
          class="relative p-8 bg-ultra-light rounded-lg shadow hover:shadow-lg transition-all duration-300 h-full flex flex-col cursor-pointer hover:bg-gray-50"
          on:click={() => toggleModule(i)}
          on:keydown={(e) => e.key === 'Enter' && toggleModule(i)}
          role="button"
          tabindex="0"
        >
          <!-- Week Badge and Module Badge -->
          <div class="absolute -top-4 inset-x-8 flex justify-between">
            <div class="h-6 w-6 flex justify-center items-center bg-ultra-light rounded-full shadow-md">
              <CleanText 
                text={`${module.week}`}
                className="text-xs font-medium text-primary-700"
              />
            </div>
            {#if module.badge}
              <div class="px-3 py-1.5 flex items-center gap-1.5 bg-primary-50 rounded-full shadow-md">
                {#if module.badgeIcon}
                  <Icon 
                    name={module.badgeIcon} 
                    size={16} 
                    className="text-primary-700"
                  />
                {/if}
                <CleanText 
                  text={module.badge}
                  className="text-xs font-medium text-primary-700"
                />
              </div>
            {/if}
          </div>

          <!-- Content -->
          <div class="mt-4 flex-1 flex flex-col">
            <div class="flex justify-between items-center mb-4">
              <CleanText 
                text={module.title}
                tag="h3"
                className="{theme.headings} text-2xl font-bold"
              />
              <div class="w-6 h-6 flex items-center justify-center rounded-full bg-gray-50 hover:bg-gray-100 transition-all duration-200 border border-gray-100">
                <Icon 
                  name="close"
                  size={14} 
                  className="text-primary-600/80 flex-shrink-0 transition-all duration-200 {expandedModules.has(i) ? '' : 'rotate-45'}"
                  strokeWidth={1.5}
                />
              </div>
            </div>

            {#if expandedModules.has(i)}
              <div transition:slide>
                <CleanText 
                  text={module.description}
                  tag="p"
                  className={theme.text}
                />

                {#if module.date && module.startTime && module.endTime}
                  <div class="flex items-center gap-2 mt-4 text-primary-600">
                    <Icon name="clock" size={16} />
                    <p class="text-sm">
                      {new Date(module.date).toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' })}
                      {' '}{module.startTime} - {module.endTime} Uhr
                    </p>
                  </div>
                {/if}
                
                <div class="space-y-3 mt-6">
                  {#each module.topics || [] as topic}
                    <div class="flex items-start gap-3">
                      <Icon 
                        name="check" 
                        size={20} 
                        className="mt-1 text-primary-600 flex-shrink-0"
                        strokeWidth={2}
                      />
                      <CleanText 
                        text={topic}
                        className="{theme.text}"
                      />
                    </div>
                  {/each}
                </div>
                
              </div>
            {/if}
          </div>
        </div>
      </div>
    {/each}
  </div>

  <!-- Bonus Box -->
  {#if data.bonusBox?.title && data.bonusBox?.description}
    <div class="mt-16 relative overflow-hidden rounded-lg">
      <!-- Background with gradient -->
      <div class="absolute inset-0 {bonusBoxStyle.container[style]}">
        <img
          class="absolute top-0 left-0 w-full h-full {bonusBoxStyle.imageOpacity[style]} object-cover"
          src="saturn-assets/images/newsletter/bg-gradient-color-big.png"
          alt=""
        >
      </div>

      <!-- Content -->
      <div class="relative z-10 p-10 rounded-lg text-center space-y-6">
        <CleanText 
          text={data.bonusBox.title}
          tag="h3"
          className="{theme.headings} text-3xl font-medium {bonusBoxStyle.text[style]} mx-auto max-w-4xl"
        />
        <CleanText 
          text={data.bonusBox.description}
          tag="p"
          className="{theme.text} {bonusBoxStyle.text[style]} max-w-2xl mx-auto text-lg leading-relaxed"
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
