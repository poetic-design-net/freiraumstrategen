<script lang="ts">
    export let videoId: string;
</script>

<div class="relative w-full" style="padding-bottom: 56.25%;">
    <iframe 
        src={`https://www.youtube.com/embed/${videoId}`}
        class="absolute top-0 left-0 w-full h-full rounded-2xl" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
        allowfullscreen
    ></iframe>
</div>