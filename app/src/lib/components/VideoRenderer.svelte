<script lang="ts">
  import { onMount } from "svelte";
  // Types für bessere TypeScript-Unterstützung
  interface VideoDetails {
    platform: 'youtube' | 'vimeo';
    id: string;
    embedUrl: string;
    thumbnailUrl?: string;
  }
  
  interface Props {
    portableText: {
      value?: {
        url: string;
        title?: string;
        description?: string;
      };
    };
  }
  
  export let portableText: Props['portableText'];
  
  // Lazy Loading Helper
  let isIntersecting = false;
  let container: HTMLElement;
  
  // Optimierte Funktion zum Extrahieren der Video-Details
  function getVideoDetails(url: string): VideoDetails | null {
    try {
      const urlObj = new URL(url);
      
      // YouTube
      if (urlObj.hostname.includes('youtube.com') || urlObj.hostname.includes('youtu.be')) {
        let videoId = '';
        
        if (urlObj.hostname.includes('youtube.com')) {
          videoId = urlObj.searchParams.get('v') || '';
        } else {
          videoId = urlObj.pathname.slice(1);
        }
        
        if (!videoId) return null;
        
        return {
          platform: 'youtube',
          id: videoId,
          embedUrl: `https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1&playsinline=1`,
          thumbnailUrl: `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`
        };
      }
      
      // Vimeo
      if (urlObj.hostname.includes('vimeo.com')) {
        const vimeoId = urlObj.pathname.slice(1);
        
        if (!vimeoId) return null;
        
        return {
          platform: 'vimeo',
          id: vimeoId,
          embedUrl: `https://player.vimeo.com/video/${vimeoId}?playsinline=1&transparent=0&title=0&portrait=0&byline=0&dnt=1`
        };
      }
    } catch (e) {
      console.error('Error parsing video URL:', e);
    }
    
    return null;
  }
  
  // Intersection Observer für Lazy Loading
  function setupIntersectionObserver() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            isIntersecting = true;
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: '50px'
      }
    );
    
    if (container) {
      observer.observe(container);
    }
    
    return () => observer.disconnect();
  }
  
  const videoUrl = portableText.value?.url || '';
  const videoDetails = getVideoDetails(videoUrl);
  const videoTitle = portableText.value?.title || `${videoDetails?.platform || 'Video'}-Player`;
  
  onMount(() => {
    setupIntersectionObserver();
  });
  </script>
  
  {#if videoDetails}
    <div 
      bind:this={container}
      class="video-container relative w-full pt-[56.25%] rounded-lg mt-12 mb-12"
    >
      {#if isIntersecting}
        <iframe
          class="absolute top-0 left-0 w-full h-full rounded-lg"
          src={videoDetails.embedUrl}
          title={videoTitle}
          loading="lazy"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      {:else}
        <!-- Thumbnail Placeholder -->
        {#if videoDetails.thumbnailUrl}
          <img
            src={videoDetails.thumbnailUrl}
            alt={`Thumbnail für ${videoTitle}`}
            class="absolute top-0 left-0 w-full h-full object-cover rounded-lg cursor-pointer"
            loading="lazy"
          />
          <div class="absolute inset-0 flex items-center justify-center">
            <button
              class="play-button bg-black bg-opacity-70 rounded-full p-4 hover:bg-opacity-90 transition-opacity"
              aria-label="Video abspielen"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                <path d="M8 5v14l11-7z"/>
              </svg>
            </button>
          </div>
        {/if}
      {/if}
    </div>
  {:else}
    <p class="error-message text-red-500">Video nicht verfügbar oder ungültige URL</p>
  {/if}
  
  <style>
    .video-container {
      background-color: #000;
    }
    
    .play-button:focus {
      outline: 2px solid #4299e1;
      outline-offset: 2px;
    }
    
    /* Verbesserte Zugänglichkeit */
    @media (prefers-reduced-motion: reduce) {
      .play-button {
        transition: none;
      }
    }
  </style>