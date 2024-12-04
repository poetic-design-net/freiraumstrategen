<script lang="ts">
  import type { SalesWhyContentSection } from '$lib/types/salesWhyContentSection'
  import type { PortableTextComponents } from '@portabletext/svelte'
  import PortableTextContent from '$lib/components/PortableTextContent.svelte'
  import ContentImageRenderer from '$lib/components/ContentImageRenderer.svelte'
  import VideoRenderer from '$lib/components/VideoRenderer.svelte'
  import CustomListItem from '$lib/components/CustomListItem.svelte'
  import PortableTextButton from '$lib/components/PortableTextButton.svelte'
  import Icon from '$lib/components/icons/Icon.svelte'
  import CleanText from '$lib/components/CleanText.svelte'
  import { cleanText } from '$lib/utils/textCleaner'
  import { onMount } from 'svelte'
  import { browser } from '$app/environment'
  import { getSectionClasses, getThemeStyles } from '$lib/utils/sections'

  let gsap: any
  let ScrollTrigger: any

  export let data: SalesWhyContentSection

  // Get theme-based styles while preserving section-specific styling
  const sectionClasses = getSectionClasses('salesWhyContentSection', data.styles)
  const theme = getThemeStyles(data.styles?.theme)

  let statsContainer: HTMLElement
  let statsElements: HTMLElement[] = []
  let cleanup: (() => void) | undefined

  function sanitizePortableText(blocks: any[]): any[] {
    return blocks.map(block => {
      if (block._type === 'block') {
        return {
          ...block,
          children: block.children.map((child: any) => {
            if (child._type === 'span') {
              return {
                ...child,
                text: cleanText(child.text)
              };
            }
            return child;
          })
        };
      }
      return block;
    });
  }

  function extractNumberAndSuffix(value: string): { number: number; suffix: string } {
    const match = value.match(/^(\d+)(.*)$/)
    if (match) {
      return {
        number: parseInt(match[1]),
        suffix: match[2]
      }
    }
    return { number: 0, suffix: value }
  }

  function animateValue(element: HTMLElement, start: number, end: number, suffix: string, duration: number) {
    const range = end - start
    const startTime = performance.now()
    
    function update() {
      const currentTime = performance.now()
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      const current = Math.floor(start + (range * easeOutQuart))
      
      element.textContent = `${current}${suffix}`
      
      if (progress < 1) {
        requestAnimationFrame(update)
      }
    }
    
    update()
  }

  onMount(() => {
    if (!browser || !statsContainer || !data.stats?.length) {
      return;
    }

    const initializeGSAP = async () => {
      // Dynamically import GSAP only on the client side
      const gsapModule = await import('gsap')
      const scrollTriggerModule = await import('gsap/ScrollTrigger')
      
      gsap = gsapModule.default
      ScrollTrigger = scrollTriggerModule.ScrollTrigger
      gsap.registerPlugin(ScrollTrigger)

      // Set initial state for stats
      statsElements.forEach((statEl) => {
        gsap.set(statEl, { 
          opacity: 0,
          y: 20,
          scale: 0.9
        })
      })

      // Create scroll trigger for stats section
      const statsTrigger = ScrollTrigger.create({
        trigger: statsContainer,
        start: "top 80%",
        onEnter: () => {
          // Create a timeline for better control
          const tl = gsap.timeline()

          // Add container animation to timeline
          tl.from(statsContainer, {
            opacity: 0,
            y: 30,
            duration: 0.6,
            ease: "power2.out"
          })

          // Animate each stat with a timeline
          statsElements.forEach((statEl, index) => {
            if (!data.stats?.[index]) return

            const valueEl = statEl.querySelector('.stat-value') as HTMLElement
            const labelEl = statEl.querySelector('.stat-label') as HTMLElement

            // Extract number and suffix from the value
            const { number, suffix } = extractNumberAndSuffix(data.stats[index].value)

            // Add stat animations to timeline
            tl.to(statEl, {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.4,
              ease: "back.out(1.7)"
            }, `-=0.2`) // Overlap slightly with previous animation

            // Start counter animation
            tl.add(() => {
              animateValue(valueEl, 0, number, suffix, 2000)
            }, `-=0.2`)

            // Fade in label
            tl.to(labelEl, {
              opacity: 1,
              y: 0,
              duration: 0.3,
              ease: "power2.out"
            }, `-=0.1`)
          })
        },
        once: true
      })

      cleanup = () => {
        statsTrigger.kill()
      }
    }

    initializeGSAP()

    return () => {
      if (cleanup) cleanup()
    }
  })

  const portableTextComponents: PortableTextComponents = {
    types: {
      image: ContentImageRenderer,
      video: VideoRenderer,
      button: PortableTextButton
    },
    listItem: {
      bullet: CustomListItem,
      normal: CustomListItem,
    },
    marks: {},
    block: {}
  };

  $: sanitizedLeftContent = data.leftColumnContent ? sanitizePortableText(data.leftColumnContent) : [];
  $: sanitizedRightContent = data.rightColumnContent ? sanitizePortableText(data.rightColumnContent) : [];
</script>

<section class="relative w-full {sectionClasses}">
  <div class="relative z-10 container px-4 mx-auto">
    <div class="max-w-lg lg:max-w-3xl xl:max-w-5xl mx-auto">
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
      </div>

      <div class="flex flex-wrap -mx-4">
        <!-- Left Column -->
        <div class="w-full lg:w-1/2 px-4 mb-12 lg:mb-0">
          <div class="max-w-lg transform">
            <PortableTextContent 
              value={sanitizedLeftContent} 
              components={portableTextComponents}
              customClass="{theme.text} text-lg"
            />
          </div>
        </div>

        <!-- Right Column -->
        <div class="w-full lg:w-1/2 px-4">
          <div class="max-w-lg transform">
            <PortableTextContent 
              value={sanitizedRightContent} 
              components={portableTextComponents}
              customClass="{theme.text} text-lg"
            />
            
            {#if data.bulletPoints && data.bulletPoints.length > 0}
              <ul class="space-y-4 mt-6">
                {#each data.bulletPoints as point}
                  <li class="flex items-start space-x-3 group">
                    <span class="flex-shrink-0 mt-1">
                      <Icon 
                        name="check" 
                        size={18} 
                        className="text-primary-600"
                      />
                    </span>
                    <CleanText 
                      text={point}
                      className="{theme.text} text-lg transform group-"
                    />
                  </li>
                {/each}
              </ul>
            {/if}
          </div>
        </div>
      </div>

      {#if data.stats && data.stats.length > 0}
        <!-- Stats with enhanced animations -->
        <div 
          bind:this={statsContainer}
          class="relative mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 p-8 rounded-2xl bg-gradient-to-br from-white to-gray-50 shadow-lg"
        >
          <!-- Animated background effect -->
          <div class="absolute inset-0 bg-gradient-to-br from-primary-50/30 to-transparent rounded-2xl 
            animate-pulse [animation-duration:3s]"></div>

          {#each data.stats as stat, i}
            <div 
              bind:this={statsElements[i]}
              class="relative text-center transform transition-all duration-300 hover:scale-105 hover:shadow-xl 
                rounded-md p-4 bg-white/80 backdrop-blur-sm"
            >
              <div class="stat-value text-3xl lg:text-4xl font-bold text-primary-800 mb-2">
                {stat.value}
              </div>
              <CleanText 
                text={stat.label}
                className="stat-label text-sm {theme.text} opacity-0"
              />
            </div>
          {/each}
        </div>
      {/if}
    </div>
  </div>
</section>
