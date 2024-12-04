<script lang="ts">
    import type { ComingSoonSection } from '$lib/types/comingSoonSection';
    import Button from '$lib/components/Button.svelte';
    import SanityImage from '$lib/components/SanityImage.svelte';

    export let data: ComingSoonSection;

    const fallbackImage = '/assets/mesh-gradient.png';
</script>

<div class="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
    <div class="absolute inset-0">
        {#if data.backgroundImage}
            <SanityImage
                value={data.backgroundImage}
                customClass="w-full h-full object-cover filter blur-xl transform scale-110"
            />
        {:else}
            <img
                src={fallbackImage}
                alt="Coming Soon Background"
                class="w-full h-full object-cover filter blur-xl transform scale-110"
            />
        {/if}

        <!-- Gradient Overlay -->
        <div class="absolute inset-0 bg-black/50 backdrop-blur-sm backdrop-brightness-90 backdrop-contrast-110" />
    </div>

    <div class="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        {#if data.title}
            <h1 class="text-4xl sm:text-5xl lg:text-6xl font-medium text-white mb-8 animate-fade-in">
                {data.title}
            </h1>
        {/if}

        {#if data.subtitle}
            <p class="text-xl font-light sm:text-2xl text-white/90 mb-8 animate-fade-in-delay">
                {data.subtitle}
            </p>
        {/if}

        {#if data.button}
            <div class="mt-8 animate-fade-in-delay-2">
                <Button 
                    text={data.button.text} 
                    href={data.button.link} 
                    variant="primary"
                    size="lg"
                    icon="rocket"
                />
            </div>
        {/if}
    </div>
</div>

<style>
    @keyframes fade-in {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .animate-fade-in {
        animation: fade-in 1s ease-out forwards;
    }

    .animate-fade-in-delay {
        animation: fade-in 1s ease-out 0.3s forwards;
        opacity: 0;
    }

    .animate-fade-in-delay-2 {
        animation: fade-in 1s ease-out 0.6s forwards;
        opacity: 0;
    }
</style>
