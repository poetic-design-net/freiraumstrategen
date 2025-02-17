<script lang="ts">
    import { onMount } from 'svelte';
    import Logo from '$lib/components/Logo.svelte';
    import Button from '$lib/components/Button.svelte';
    import Icon from '$lib/components/icons/Icon.svelte';
    import MobileMenu from '$lib/components/MobileMenuCanvas.svelte';
    import { headerStore } from '$lib/components/header/store';

    export let data: {
        title: string;
        navigation?: Array<{
            label: string;
            anchor: string;
        }>;
        ctaButton?: {
            text: string;
            url: string;
        };
    };

    // Aktiver Menüpunkt basierend auf Scroll-Position
    let activeSection = '';
    let lastScrollY = 0;
    let hasScrolled = false;

    function checkMobile() {
        headerStore.setMobile(window.innerWidth < 1280);
    }

    function handleScroll() {
        const currentScrollY = window.scrollY;
        
        // Update Header State
        headerStore.setScrolled(currentScrollY > 150);
        lastScrollY = currentScrollY;

        // Update Active Section
        if (typeof window === 'undefined') return;

        const sections = data.navigation?.map(item => document.getElementById(item.anchor)) || [];
        
        sections.forEach((section) => {
            if (!section) return;
            
            const rect = section.getBoundingClientRect();
            const offset = 100;

            if (rect.top <= offset && rect.bottom >= offset) {
                activeSection = section.id;
            }
        });
    }

    function scrollToSection(anchor: string) {
        const element = document.getElementById(anchor);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
        if ($headerStore.mobileNavOpen) {
            headerStore.toggleMobileNav();
        }
    }

    onMount(() => {
        checkMobile();
        window.addEventListener('resize', checkMobile);
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('resize', checkMobile);
            window.removeEventListener('scroll', handleScroll);
        };
    });
</script>

<header
    class="sticky top-0 w-full transition-all duration-300 bg-white"
    class:shadow={$headerStore.hasScrolled}
    style="z-index: 1000;"
>
    {#if $headerStore.isMobile}
        <nav class="relative py-6 bg-white">
            <div class="container px-4 mx-auto">
                <div class="flex items-center justify-between">
                    <a href="/" class="inline-block">
                        <Logo />
                    </a>
                    <button 
                        on:click={() => headerStore.toggleMobileNav()} 
                        class="ml-auto flex w-12 h-12 items-center justify-center hover:bg-gray-200 rounded-md"
                    >
                        <Icon name="menu" size={24} />
                    </button>
                </div>
            </div>
        </nav>
    {:else}
        <nav class="py-6 bg-white">
            <div class="container mx-auto px-4">
                <div class="flex items-center justify-between">
                    <!-- Logo -->
                    <a href="/" class="inline-block">
                        <Logo />
                    </a>

                    <!-- Desktop Navigation -->
                    <div class="hidden xl:flex items-center space-x-32">
                        {#if data.navigation}
                          {#each data.navigation as item}
                            <button
                              class="text-primary transition-colors"
                              style="--hover-color: var(--custom-green)"
                              class:active={activeSection === item.anchor}
                              on:click={() => scrollToSection(item.anchor)}
                            >
                              {item.label}
                            </button>
                          {/each}
                        {/if}
                      </div>

                    <!-- CTA Button -->
                    {#if data.ctaButton}
                        <div class="hidden xl:block">
                            <Button 
                                text={data.ctaButton.text}
                                href={data.ctaButton.url}
                                variant="primary"
                                size="md"
                            />
                        </div>
                    {/if}
                </div>
            </div>
        </nav>
    {/if}
    <MobileMenu navigationItems={data.navigation?.map(item => ({
      _key: item.anchor,
      title: item.label,
      path: `#${item.anchor}`,
      columns: []
    }))} />
</header>

<style lang="postcss">
    /* Header Animation Styles */
    header {
        transition: box-shadow 0.3s ease;
        will-change: box-shadow;
    }

    :root {
    --custom-green: #00DB7D;
  }

    /* Mobile Menu Animation */
    .burger-line {
        @apply absolute w-full h-0.5 bg-gray-600 transition-all duration-300;
        transform-origin: center;
    }
    button:hover {
    color: var(--hover-color);
  }
    .active {
    color: var(--custom-green);
  }
</style>