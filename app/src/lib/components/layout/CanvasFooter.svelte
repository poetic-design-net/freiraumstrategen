<script lang="ts">
    export let data: {
        title: string;
        navigation?: Array<{
            label: string;
            anchor: string;
        }>;
    };

    function scrollToSection(anchor: string) {
        const element = document.getElementById(anchor);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    }
</script>

<footer class="relative bg-gray-900 text-white py-24">
    <div class="absolute inset-0 bg-gradient-to-b from-transparent to-black/30 pointer-events-none" />
    
    <div class="container mx-auto px-4">
        <div class="max-w-7xl mx-auto">
            <!-- Headline -->
            <div class="text-center mb-24">
                <h2 class="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                    Bereit für den<br>nächsten Schritt?
                </h2>
            </div>

            <!-- Grid Layout -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-12 border-t border-white/10 pt-12">
                <!-- Copyright Info -->
                <div class="col-span-1">
                    <p class="text-gray-400 text-sm leading-relaxed">
                        Summer-Academy ist eine Veranstaltung<br>
                        der Freiraum Strategen GmbH
                    </p>
                </div>

                <!-- Navigation -->
                {#if data.navigation}
                    <div class="col-span-1">
                        <nav class="flex flex-col items-end space-y-4">
                            {#each data.navigation as item}
                                <button
                                    class="text-gray-400 hover:text-white transition-all duration-300 text-right relative group"
                                    on:click={() => scrollToSection(item.anchor)}
                                >
                                    <span class="relative z-10">{item.label}</span>
                                    <div class="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 -z-10 transition-opacity duration-300 rounded" />
                                </button>
                            {/each}
                        </nav>
                    </div>
                {/if}
            </div>
        </div>
    </div>

    <!-- Decorative Elements -->
    <div class="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    <div class="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
</footer>

<style>
    footer {
        z-index: 1; /* Ensure footer is below video button */
    }

    h2 {
        background: linear-gradient(135deg, #ffffff 0%, #a3a3a3 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
    }

    @keyframes gradientMove {
        0% {
            background-position: 0% 50%;
        }
        50% {
            background-position: 100% 50%;
        }
        100% {
            background-position: 0% 50%;
        }
    }

    .gradient-border {
        position: relative;
        background-size: 200% 200%;
        animation: gradientMove 3s ease infinite;
    }
</style>