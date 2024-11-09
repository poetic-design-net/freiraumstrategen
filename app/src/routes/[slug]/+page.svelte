<script lang="ts">
	import { PortableText } from '@portabletext/svelte';
	import { useQuery } from '@sanity/svelte-loader';
	import { formatDate, sanitizeText, calculateReadingTime } from '$lib/utils';
	import ImageRenderer from '$lib/components/ImageRenderer.svelte';
	import VideoRenderer from '$lib/components/VideoRenderer.svelte';		
	import type { PageData } from './$types';
	import type { PortableTextComponents } from '@portabletext/svelte';
	import { onMount, onDestroy } from 'svelte';
	import CustomListItem from '$lib/components/CustomListItem.svelte';
	import ContentImageRenderer from '$lib/components/ContentImageRenderer.svelte';
	


	export let data: PageData;
	const q = useQuery(data);
	$: ({ data: post } = $q);
	function sanitizeAltText(text: string) {
  	return text.replace(/[\u200B-\u200D\uFEFF]/g, ''); // Entfernt Zero-Width-Space und ähnliche Zeichen
}

let toc: { id: string; text: string }[] = [];
let activeHeadingId: string | null = null;
let readingTime: number;

function generateTOC() {
    const h2Elements = document.querySelectorAll('.post-content h2');
    toc = Array.from(h2Elements).map((heading, index) => {
        const id = `heading-${index}`;
        heading.id = id;
        return {
            id: id,
            text: heading.textContent || ''
        };
    });
}

function sanitizePortableText(blocks: any[]): any[] {
  return blocks.map(block => {
    if (block._type === 'block') {
      return {
        ...block,
        children: block.children.map((child: any) => {
          if (child._type === 'span') {
            return {
              ...child,
              text: sanitizeText(child.text)
            };
          }
          return child;
        })
      };
    }
    return block;
  });
}

$: sanitizedBody = sanitizePortableText(post.body);


$: {
  const contentForReadingTime = [
    post?.title,
    post?.excerpt,
    ...(post?.body?.map(block => block.children?.map(child => child.text).join(' ') || '') || [])
  ].filter(Boolean).join(' ');

  const sanitizedContent = sanitizeText(contentForReadingTime);

  readingTime = calculateReadingTime(sanitizedContent);
}

function setupIntersectionObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    activeHeadingId = entry.target.id;
                }
            });
        }, { rootMargin: '-60px 0px -90% 0px' });

        document.querySelectorAll('.post-content h2').forEach(heading => {
            observer.observe(heading);
        });
    }

    onMount(() => {
        generateTOC();
        setupIntersectionObserver();
    });




	const portableTextComponents: PortableTextComponents = {
		types: {
			image: ContentImageRenderer,
			video: VideoRenderer,
			},
   			 listItem: {
      			bullet: CustomListItem, // Verwende die benutzerdefinierte Komponente für Listenelemente
				normal: CustomListItem, 
   		 },
	  };
</script>


  <section class="relative py-12 md:py-24">
	<div class="container px-4 mx-auto">
	  <div class="flex flex-wrap -mx-4 ">
			<div class="w-full lg:w-1/3 lg:pt-24 px-4 lg:sticky lg:top-0 lg:h-[100dvh]">
				<h4 class="font-medium text-white text-lg mb-5">INHALTSVERZEICHNIS</h4>
				<ul class="mb-12">
					{#each toc as item}
					<li class="pb-3">
						<a 
							class="inline-block px-6 text-lg font-light transition-colors duration-200 ease-in-out {activeHeadingId === item.id ? 'text-primary-500' : 'text-white hover:text-primary-500'}" 
							href="#{item.id}"
						>
							{item.text}
						</a>
					</li>
					{/each}
				</ul>
			</div>
			<div class="w-full lg:w-2/3 px-4">
				<a class="inline-flex mb-12 items-center font-medium text-sm text-white hover:text-primary-500" href="/">
						<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M15.4167 10H5M5 10L10 5M5 10L10 15" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
						</svg>
						<span class="ml-2">Zurück zum Blog</span>
				</a>
				<div class="mb-12">
					{#if post.mainImage}
					  <ImageRenderer value={post.mainImage} />
					{:else}
					  <img 
						class="block w-full rounded-lg mb-12" 
						src="../assets/hero_home-old.jpg" 
						alt={`Cover image for ${post.title}`}
					  />
					{/if}	
				  </div>
				<div class="flex mb-4 items-center">
					<span class="inline-block py-1 px-3 text-xs font-medium text-primary-900 bg-primary-50 rounded-full s-iFvCgFMopxZa">{post.category.title}</span>
					<span class="inline-block mx-4">
						<svg width="1" height="24" viewBox="0 0 1 24" fill="none" xmlns="http://www.w3.org/2000/svg"><line x1="0.5" y1="2.18558e-08" x2="0.499999" y2="24" stroke="#3B5444"></line></svg>
					</span>
					<span class="text-xs text-white">{formatDate(post._createdAt)}</span>
					<span class="mx-3">
						<svg width="4" height="4" viewBox="0 0 4 4" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="2" cy="2" r="2" fill="#4B6354"></circle></svg>
					</span>
					<span class="text-xs text-white">{readingTime} min Lesezeit</span>
				</div>
				<h2 class="font-heading tracking-tight text-4xl sm:text-5xl font-medium text-white pt-1 mb-12">{post.title}</h2>
				<div class="mb-12 post-content">

						{#if sanitizedBody}
						  <div class="text-lg text-gray-200 mb-6">
							<PortableText
								components={portableTextComponents}
								value={sanitizedBody}
							/>
						  </div>
						{/if}
					
					<div class="py-4 px-6 border border-white border-opacity-20 bg-primary-800 rounded-lg">
						<span class="inline-block mr-2 text-sm text-primary-100">Du hast Interesse an mehr Tipps wie diesem?</span>
						<a class="group inline-flex items-center text-sm font-medium text-primary-200 hover:text-white transition duration-100" href="/">
							<span class="mr-2">Abonniere unseren Newsletter</span>
							<span class="transform group-hover:translate-x-1 transition duration-100">
								<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path d="M4.99984 10H15.4165M15.4165 10L10.4165 5M15.4165 10L10.4165 15" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
								</svg>
							</span>
						</a>
					</div>
				</div>
				<div class="flex items-center justify-center">
					<a class="group inline-flex mr-12 items-center text-white hover:text-primary-600" href="/">
						<div class="flex items-center justify-center h-16 w-16 border border-white border-opacity-20 group-hover:border-primary-600 rounded-full">
							<svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M16.9724 20H4.6C4.26863 20 4 19.7314 4 19.4V9.6C4 9.26863 4.26863 9 4.6 9H7.36762C8.07015 9 8.72116 8.6314 9.0826 8.02899L11.793 3.51161C12.3779 2.53688 13.7554 2.44422 14.4655 3.33186C14.8002 3.75025 14.9081 4.30635 14.7541 4.81956L13.7317 8.22759C13.6162 8.61256 13.9045 9 14.3064 9H18.8815C20.2002 9 21.158 10.254 20.811 11.5262L18.9019 18.5262C18.6646 19.3964 17.8743 20 16.9724 20Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path>
							<path d="M7.5 20L7.5 9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
						</svg>
						</div>
						<span class="ml-3">256</span>
					</a>
					<a class="group inline-flex items-center text-white hover:text-primary-600" href="/">
						<div class="flex items-center justify-center h-16 w-16 border border-white border-opacity-20 group-hover:border-primary-600 rounded-full">
							<svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M12.5 22C18.0228 22 22.5 17.5228 22.5 12C22.5 6.47715 18.0228 2 12.5 2C6.97715 2 2.5 6.47715 2.5 12C2.5 13.8214 2.98697 15.5291 3.83782 17L3 21.5L7.5 20.6622C8.97087 21.513 10.6786 22 12.5 22Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
							</svg>
						</div>
						<span class="ml-3">10</span>
					</a>
				</div>
			</div>
		</div>
	</div>
  </section>


<style>
  section {
    background: radial-gradient(446.50% 301.92% at 50.09% 3.49%, #002c33 13.21%, #0b8695 27.92%, #000 34.17%) !important;
  }
</style>