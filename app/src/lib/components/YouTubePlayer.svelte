<script lang="ts">
    export let videoId: string;
    export let platform: 'youtube' | 'vimeo' = 'youtube';
    
    function cleanVideoId(id: string): string {
        if (!id) return '';
        
        // Remove all invisible characters and whitespace
        const cleanId = id.replace(/[\u200B-\u200D\uFEFF\u0000-\u001F\u007F-\u009F\s]/g, '');
        
        // Return cleaned ID
        return cleanId;
    }

    function getVideoUrl(id: string, platform: 'youtube' | 'vimeo'): string {
        const cleanId = cleanVideoId(id);
        return platform === 'youtube' 
            ? `https://www.youtube.com/embed/${cleanId}`
            : `https://player.vimeo.com/video/${cleanId}`;
    }

    $: videoUrl = getVideoUrl(videoId, platform);
</script>

<div class="relative w-full" style="padding-bottom: 56.25%;">
    {#if videoId}
        <iframe 
            src={videoUrl}
            class="absolute top-0 left-0 w-full h-full rounded-2xl" 
            title="Video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowfullscreen
        ></iframe>
    {:else}
        <div class="absolute inset-0 flex items-center justify-center bg-black/50 rounded-2xl">
            <p class="text-white text-sm">Video ID nicht verfügbar</p>
        </div>
    {/if}
</div>
