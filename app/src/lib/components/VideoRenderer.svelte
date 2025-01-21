<script lang="ts">
export let portableText;
  
const videoUrl = portableText.value?.url || '';

// Funktion zum Extrahieren der Video-ID und Platform
function getVideoDetails(url: string) {
  // YouTube
  if (url.includes('youtube.com') || url.includes('youtu.be')) {
    let videoId = '';
    if (url.includes('v=')) {
      videoId = url.split('v=')[1];
      // Handle additional parameters
      const ampersandPosition = videoId.indexOf('&');
      if (ampersandPosition !== -1) {
        videoId = videoId.substring(0, ampersandPosition);
      }
    } else if (url.includes('youtu.be/')) {
      videoId = url.split('youtu.be/')[1];
    }
    return {
      platform: 'youtube',
      id: videoId,
      embedUrl: `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&playsinline=1`
    };
  }

  // Vimeo
  if (url.includes('vimeo.com')) {
    const vimeoId = url.split('vimeo.com/')[1];
    return {
      platform: 'vimeo',
      id: vimeoId,
      embedUrl: `https://player.vimeo.com/video/${vimeoId}?playsinline=1&transparent=0&title=0&portrait=0&byline=0&dnt=1`
    };
  }

  return null;
}

const videoDetails = getVideoDetails(videoUrl);
</script>

{#if videoDetails}
<iframe
  class="w-full aspect-[16/9] rounded-lg mt-12 mb-12"
  src={videoDetails.embedUrl}
  title={`${videoDetails.platform === 'youtube' ? 'YouTube' : 'Vimeo'}-Video`}
  frameborder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowfullscreen
></iframe>
{:else}
<p class="error-message">Video nicht verfügbar oder ungültige URL</p>
{/if}
