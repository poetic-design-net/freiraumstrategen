<script lang="ts">
  import { fly } from 'svelte/transition';
  import { cubicOut } from 'svelte/easing';
  import { onMount } from 'svelte';
  import ContactForm from '$lib/components/ContactForm.svelte';


  let currentIndex = 0;
  let container: HTMLElement;
  let cardWidth: number;
  let visibleCards: number;

</script>




  <div class="container px-4 mx-auto">
    <div class="max-w-7xl mx-auto">
      <div class="flex flex-wrap -mx-4 xl:items-center">
        <div class="w-full lg:w-1/2 xl:w-1/2 px-4 order-last lg:order-first">
          <div class="relative max-w-xl mx-auto lg:mx-0 lg:max-w-3xl h-full">
            <img class="block w-full h-166 lg:h-full object-cover rounded-lg" src="assets/hero_home-old.jpg" alt="">
            <div class="absolute bottom-0 w-full left-0 p-4 sm:p-6">
              <div class="p-6 sm:p-10 backdrop-blur-md backdrop-filter bg-black bg-opacity-30 rounded-5xl">
                <div class="overflow-hidden">
                 
                </div>

              </div>
            </div>
          </div>
        </div>
        <div class="w-full lg:w-1/2 xl:w-1/2 px-4 mb-16 lg:mb-0">
          <div class="max-w-lg lg:py-20 mx-auto lg:mr-0">
            <h3 class="font-heading text-4xl text-gray-900 font-semibold mb-4">Schreib uns eine Nachricht</h3>
            <p class="text-lg text-gray-500 mb-10">Wir freuen uns von Dir zu hören!</p>
            <ContactForm />
            <div class="flex my-6 items-center">
              <div class="w-full h-px bg-gray-300"></div>
              <span class="mx-4 text-sm font-semibold text-primary-600">oder</span>
              <div class="w-full h-px bg-gray-300"></div>
            </div>
            <div class="flex flex-wrap mb-6 items-center -mx-2">
              <div class="w-full md:w-1/2 p-2 mb-3 md:mb-0">
                <a class="inline-flex w-full shadow  py-3 px-4 items-center justify-center border border-gray-50 rounded-lg  hover:border-gray-300 transition duration-100" href="#">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
                  </svg>
                  
                  <span class="ml-4 text-sm font-ligh text-gray-600">Strategiegespräch</span>
                </a>
              </div>
              <div class="w-full md:w-1/2 p-2 ">
                <a class="inline-flex w-full shadow py-3 px-4 items-center justify-center border border-gray-50 rounded-lg  hover:border-gray-300 transition duration-100" href="#">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                  </svg>
                  
                  <span class="ml-4 text-sm font-regular text-gray-600">E-Mail senden</span>
                </a>
              </div>
              <div class="w-full md:w-1/2 p-2">
                <a class="inline-flex w-full shadow py-3 px-4 items-center justify-center border border-gray-50 rounded-lg  hover:border-gray-300 transition duration-100" href="#">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" />
                  </svg>
                  
                  
                  <span class="ml-4 text-sm font-regular text-gray-600">Fragen & Antworten</span>
                </a>
              </div>
              <div class="w-full md:w-1/2 p-2">
                <a class="inline-flex w-full py-3 shadow px-4 items-center justify-center border border-gray-50 rounded-lg  hover:border-gray-300 transition duration-100" href="#">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                  </svg>
                  
                  
                  <span class="ml-4 text-sm font-medium text-gray-600">Termin Buchen</span>
                </a>
              </div>
            </div>
            
           
          
          </div>
        </div>
      </div>
    </div>
  </div>




<style>
  .hide-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  .hide-scrollbar::-webkit-scrollbar {
    display: none;
  }
</style>




