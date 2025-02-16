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

<footer class="relative bg-primary-dark text-white py-12">
   
    
    <div class="container mx-auto px-4">
        <div class=" mx-auto">
            <!-- Headline -->


            <!-- Grid Layout -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
                <!-- Copyright Info -->
                <div class="col-span-1">
                    <p class="text-gray-200 text-sm leading-relaxed">
                        Die Summer Academy 2025 ist eine Veranstaltung der Freiraum Strategen GmbH
                    </p>
                   
                </div>

                <!-- Navigation -->
                {#if data.navigation}
                    <div class="col-span-1">
                        <nav class="flex md:justify-end space-x-4">
                            {#each data.navigation as item}
                                <button
                                    class="text-gray-200 text-sm hover:text-white transition-all duration-300 text-right relative group"
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
        <p class="text-gray-200 text-sm leading-relaxed pt-8">
            Risikohinweis: CFDs sind komplexe Instrumente und bergen aufgrund der Hebelwirkung ein hohes Risiko, schnell Geld zu verlieren. Die grosse Mehrheit der Konten von Kleinanlegern verliert beim Handel mit CFDs Geld. Sie sollten abwägen, ob Sie die Funktionsweise von CFDs verstehen und ob Sie es sich leisten können, das hohe Risiko einzugehen, Ihr Geld zu verlieren.
        </p>
    </div>

 
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