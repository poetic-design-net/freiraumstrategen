<script lang="ts">
    import { onMount } from 'svelte';
    import { fade, fly } from 'svelte/transition';
    import Button from '$lib/components/Button.svelte';

    let visible = false;

    import YouTubePlayer from '$lib/components/YouTubePlayer.svelte';
    
    // Für eine URL wie "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    const videoId = "0PflAFaf6VQ";

    onMount(() => {
        visible = true;
    });
  </script>




      <div class="max-w-3xl mx-auto text-center">
        <span class="inline-block py-1 px-3 mb-4 text-xs font-medium text-primary-900 bg-primary-50 rounded-full">VORTEILE</span>
        <h1 class="font-heading text-5xl xs:text-6xl md:text-7xl font-medium text-gray-900 mb-6">
          <span>Die Vorteile </span>
          <span class="font-thin block">unserer Trading-Ausbildung</span>
        </h1>
        <p class="text-gray-500 text-sm mb-24 flex items-center justify-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
            <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
          </svg>
          Für mehr Details bewegen Sie die Maus über die einzelnen Vorteile
        </p>
      </div>
      <div class="relative">
        
      </div>
      <div class="max-w-7xl mx-auto">
        <div class="flex flex-wrap -mx-4 items-center">
          <div class="w-full lg:w-1/5 px-4 lg:pb-10 mb-16 lg:mb-0">
            <div class="mx-auto max-w-sm">
              <div class="flex items-center pb-12 mb-12 border-b border-gray-100 group relative">
                <!-- Original Feature Content -->
                <div class="absolute -right-2 -top-6 transform -translate-y-1/2 w-2 h-2">
                  <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                  <span class="relative inline-flex rounded-full h-2 w-2 bg-orange-600"></span>
                </div>
                <div class="flex flex-shrink-0 w-16 h-16 mr-6 items-center justify-center bg-gray-100 rounded-full">
                        
 
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#006775" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
                  </svg>
                </div>
                <div>
                  <h3 class="text-xl font-medium max-w-[160px] leading-tight">Praxisorientiert & Effektiv</h3>
                  <span class="text-sm text-gray-500 font-light mt-1 block">Von erfahrenen Tradern entwickelt</span>
                </div>
              
                <!-- Hover Box -->
                <div class="absolute left-0 bottom-full mb-2 bg-white rounded-xl shadow-2xl p-6 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-10 w-80">
                  <div class="relative">
            
                    
                    <!-- Content -->
                    <h4 class="text-lg font-semibold text-gray-900 mb-2">Praxisorientiert & Effektiv</h4>
                    <p class="text-gray-600 text-sm leading-relaxed">
                      Unsere Ausbildung basiert auf jahrelanger Handelserfahrung. Sie lernen:
                    </p>
                    <ul class="mt-3 space-y-2">
                      <li class="flex items-center text-sm text-gray-600">
                        <svg class="w-4 h-4 mr-2 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
                        </svg>
                        Bewährte Trading-Strategien
                      </li>
                      <li class="flex items-center text-sm text-gray-600">
                        <svg class="w-4 h-4 mr-2 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
                        </svg>
                        Echte Marktsituationen
                      </li>
                      <li class="flex items-center text-sm text-gray-600">
                        <svg class="w-4 h-4 mr-2 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
                        </svg>
                        Direkte Umsetzbarkeit
                      </li>
                    </ul>
                    <div class="mt-4">
                      <Button size="sm" variant="orange" href="/blog/praxisorientiert-und-effektiv" text="Zum Artikel"/>
                    </div>
                  
                  </div>
                </div>
              </div>
              <div class="flex items-center pb-12 mb-12 border-b border-gray-100 group relative">
                <div class="flex flex-shrink-0 w-16 h-16 mr-6 items-center justify-center bg-gray-100 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="#006775" class="size-6">
                    <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clip-rule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 class="text-xl font-medium max-w-[160px] leading-tight">Strukturiert & Nachvollziehbar</h3>
                  <span class="text-sm text-gray-500 font-light  mt-1 block">Klare Lernpfade für jeden Level</span>
                </div>
              </div>
              <div class="flex items-center">
                <div class="flex flex-shrink-0 w-16 h-16 mr-6 items-center justify-center bg-gray-100 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="#006775" class="size-6">
                    <path fill-rule="evenodd" d="M12.577 4.878a.75.75 0 0 1 .919-.53l4.78 1.281a.75.75 0 0 1 .531.919l-1.281 4.78a.75.75 0 0 1-1.449-.387l.81-3.022a19.407 19.407 0 0 0-5.594 5.203.75.75 0 0 1-1.139.093L7 10.06l-4.72 4.72a.75.75 0 0 1-1.06-1.061l5.25-5.25a.75.75 0 0 1 1.06 0l3.074 3.073a20.923 20.923 0 0 1 5.545-4.931l-3.042-.815a.75.75 0 0 1-.53-.919Z" clip-rule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 class="text-xl font-medium max-w-[160px] leading-tight">Professionelle Strategien</h3>
                  <span class="text-sm text-gray-500 font-light  mt-1 block">Bewährte Handelsmethoden</span>
                </div>
              </div>
            </div>
          </div>
          <div class="w-full lg:w-3/5 px-16 mb-16 lg:mb-0">
            <div class="max-w-4xl mx-auto">  
              <YouTubePlayer {videoId} />
            </div>  
          </div>
          <div class="w-full lg:w-1/5 px-4 lg:pb-10">
            <div class="mx-auto max-w-sm">
              <div class="flex items-center pb-12 mb-12 border-b border-gray-100">
                <div class="flex flex-shrink-0 w-16 h-16 mr-6 items-center justify-center bg-gray-100 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#006775" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
                  </svg>
                </div>
                <div>
                  <h3 class="text-xl font-medium max-w-[160px] leading-tight">Live-Trading Sessions</h3>
                  <span class="text-sm text-gray-500 font-light mt-1 block">Echte Trades in Echtzeit</span>
                </div>
              </div>
              <div class="flex items-center pb-12 mb-12 border-b border-gray-100">
                <div class="flex flex-shrink-0 w-16 h-16 mr-6 items-center justify-center bg-gray-100 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#006775" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
                  </svg>
                </div>
                <div>
                  <h3 class="text-xl font-medium max-w-[160px] leading-tight">Community Support</h3>
                  <span class="text-sm text-gray-500 font-light  mt-1 block">Austausch mit Gleichgesinnten</span>
                </div>
              </div>
              <div class="flex items-center">
                <div class="flex flex-shrink-0 w-16 h-16 mr-6 items-center justify-center bg-gray-100 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#006775" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205 3 1m1.5.5-1.5-.5M6.75 7.364V3h-3v18m3-13.636 10.5-3.819" />
                  </svg>
                </div>
                <div>
                  <h3 class="text-xl font-medium max-w-[160px] leading-tight">Sicheres Risikomanagement</h3>
                  <span class="text-sm text-gray-500 font-light  mt-1 block">Professionelle Absicherung</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
