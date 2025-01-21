    <script lang="ts">
    export let videoId: string;
    export let platform: 'youtube' | 'vimeo' = 'youtube';
    export let autoplay = false;
    
    function cleanVideoId(id: string) {
        if (!id) return '';
        return id.replace(/[---\s]/g, '');
    }

function getVideoUrl(id: string, platform: 'youtube' | 'vimeo', shouldAutoplay: boolean) {
    const cleanId = cleanVideoId(id);
    const autoplayParam = shouldAutoplay ? '&autoplay=1' : '';

    if (platform === 'youtube') {
        return `https://www.youtube.com/embed/${cleanId}?rel=0&modestbranding=1&playsinline=1${autoplayParam}`;
    } else {
        return `https://player.vimeo.com/video/${cleanId}?playsinline=1&transparent=0&title=0&portrait=0&byline=0&dnt=1${autoplayParam}`;
    }
}

    $: videoUrl = getVideoUrl(videoId, platform, autoplay);
</script>

<div class="relative w-full h-full">
    {#if videoId}
        <iframe 
            src={videoUrl}
            class="absolute inset-0 w-full h-full" 
            title="Video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowfullscreen
        ></iframe>
    {:else}
        <div class="absolute inset-0 flex items-center justify-center bg-black/50">
            <p class="text-white text-sm">Video ID nicht verfügbar</p>
        </div>
    {/if}
</div>
