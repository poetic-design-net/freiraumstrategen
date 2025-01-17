<script lang="ts">
    import { onMount } from 'svelte';
    
    export let videoId: string;
    export let platform: 'youtube' | 'vimeo' = 'youtube';
    
    let isPlayerLoaded = false;
    let thumbnailUrl = '';
    let containerDiv: HTMLDivElement | undefined;
    
    function cleanVideoId(id: string) {
        if (!id) return '';
        return id.replace(/[\u200B-\u200D\uFEFF\u0000-\u001F\u007F-\u009F\s]/g, '');
    }

    function getVideoUrl(id: string, platform: 'youtube' | 'vimeo') {
        const cleanId = cleanVideoId(id);
        // Add additional parameters for better performance
        return platform === 'youtube'
            ? `https://www.youtube.com/embed/${cleanId}?autoplay=1&rel=0&modestbranding=1`
            : `https://player.vimeo.com/video/${cleanId}`;
    }

    function getThumbnailUrl(id: string) {
        // Get the highest quality thumbnail available
        return `https://i.ytimg.com/vi/${cleanVideoId(id)}/maxresdefault.jpg`;
    }

    function loadPlayer() {
        isPlayerLoaded = true;
    }

    onMount(() => {
        if (videoId) {
            thumbnailUrl = getThumbnailUrl(videoId);
            
            // Preload the thumbnail image
            const img = new Image();
            img.src = thumbnailUrl;
        }
    });

    $: videoUrl = getVideoUrl(videoId, platform);
</script>

<div 
    class="relative w-full" 
    style="padding-bottom: 56.25%;"
    bind:this={containerDiv}
>
    {#if videoId}
        {#if !isPlayerLoaded}
            <!-- Thumbnail with play button -->
            <button
                on:click={loadPlayer}
                class="absolute top-0 left-0 w-full h-full rounded-2xl overflow-hidden group"
                aria-label="Play video"
            >
                <img
                    src={thumbnailUrl}
                    alt="Video thumbnail"
                    class="w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                />
                <div class="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                    <div class="w-14 h-14 md:w-20 md:h-20 rounded-full bg-white/80 group-hover:bg-white/90 flex items-center justify-center transition-colors">
                        <svg 
                            class="w-6 h-6 md:w-8 md:h-8 text-primary-800 translate-x-0.5" 
                            viewBox="0 0 24 24"
                            fill="currentColor"
                        >
                            <path d="M8 5v14l11-7z"/>
                        </svg>
                    </div>
                </div>
            </button>
        {:else}
            <!-- YouTube Player (loaded only after click) -->
            <iframe 
                src={videoUrl}
                class="absolute top-0 left-0 w-full h-full rounded-2xl" 
                title="Video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowfullscreen
            ></iframe>
        {/if}
    {:else}
        <div class="absolute inset-0 flex items-center justify-center bg-black/50 rounded-2xl">
            <p class="text-white text-sm">Video ID nicht verfügbar</p>
        </div>
    {/if}
</div>
