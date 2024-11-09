<script lang="ts">
    import { useQuery } from '@sanity/svelte-loader';
    import type { PageData } from './$types';
    import ImageRenderer from '$lib/components/ImageRenderer.svelte';
    import { formatDate } from '$lib/utils';
    import { urlFor } from '$lib/sanity/image'; // Importiere die urlFor-Funktion
    import { sanitizeText } from '$lib/utils';

    export let data: PageData;
    const q = useQuery(data);
    $: ({ data: posts } = $q);
    $: console.log('Ein Post:', posts?.[0]?.mainImage);  // 

    let showContent = false;
</script>

<section class="relative py-20 overflow-hidden">
    <img class="absolute top-0 right-0 xl:mt-10 -mr-24 lg:-mr-0" src="saturn-assets/images/blog/star-circle-right.svg" alt="">
    <img class="hidden sm:block absolute bottom-0 left-0 -mb-48 lg:mb-0" src="saturn-assets/images/blog/blue-light-left.png" alt="">
    <div class="relative container px-4 mx-auto">
        <div class="max-w-xl lg:max-w-7xl mx-auto">
            <div class="max-w-2xl mx-auto mb-16 text-center">
                <span class="inline-block py-1 px-3 mb-4 text-xs font-semibold text-primary-900 bg-primary-50 rounded-full">BLOG</span>
                <h1 class="font-heading text-5xl xs:text-6xl md:text-7xl font-bold text-dark">
                    <span>News und</span>
                    <span class="font-thin">Artikel</span>
                </h1>
            </div>

            <!-- Featured Posts -->
            <div class="flex flex-wrap -mx-4 mb-18 ">
                {#if posts && posts[0]}
                    <div class="w-full lg:w-1/2 px-4 mb-12 lg:mb-0">
                        <a class="block group w-full" href={`/post/${posts[0].slug.current}`}>
                            <ImageRenderer value={posts[0].mainImage} />
                            <div class="flex my-4 items-center">    
                                <span class="inline-block py-1 px-3 text-xs font-medium text-primary-900 bg-primary-50 rounded-full s-iFvCgFMopxZa">{posts[0].category.title}</span>
                                <span class="inline-block mx-4">
                                    <svg width="1" height="24" viewBox="0 0 1 24" fill="none" xmlns="http://www.w3.org/2000/svg"><line x1="0.5" y1="2.18558e-08" x2="0.499999" y2="24" stroke="#3B5444"></line></svg>
                                </span>
                                <span class="text-xs">{formatDate(posts[0]._createdAt)}</span>
                                <span class="mx-3">
                                    <svg width="4" height="4" viewBox="0 0 4 4" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="2" cy="2" r="2" fill="#4B6354"></circle></svg>
                                </span>
                            </div>
                            <h4 class="text-3xl font-medium group-hover:text-primary-800 mb-3">{posts[0].title}</h4>
                            <p class="max-w-xl text-lg text-gray-700">{posts[0].excerpt}</p>
                        </a>
                    </div>
                {/if}

                <div class="w-full lg:w-1/2 px-4 rounded-lg">
                    {#each posts.slice(1, 4) as post}
                        <a class="block md:flex group mb-12" href={`/post/${post.slug.current}`}>
                            <div class="mt-8 md:mt-0">
                                <div class="relative w-full md:w-48 aspect-[4/3] sm:aspect-[16/9] md:h-40 overflow-hidden rounded-lg flex-shrink-0">
                                    <div class="absolute inset-0">
                                        <div class="w-full h-full">
                                            <img 
                                                src={urlFor(post.mainImage).url()} 
                                                alt={sanitizeText(post.title ?? '')} 
                                                class="w-full h-full object-cover"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="mt-4 md:mt-0 md:ml-8">
                                <div class="mb-4">
                                    <span class="inline-block py-1 px-3 text-xs font-medium text-primary-900 bg-primary-50 rounded-full s-iFvCgFMopxZa">{post.category.title}</span>
                                    <span class="text-xs mx-4">{formatDate(post._createdAt)}</span>  
                                </div>
                                  
                                <h4 class="text-xl font-medium group-hover:text-primary-800 mb-3">{post.title}</h4>
                                <p class="max-w-xl text-s text-gray-700">{post.excerpt?.slice(0, 100)}...</p>
                            </div>
                        </a>
                    {/each}
                </div>

            <!-- Additional Posts -->
            {#if showContent}
                <div class="flex flex-wrap -mx-4 -mb-12">
                    {#each posts.slice(4) as post}
                        <div class="w-full md:w-1/2 xl:w-1/4 px-4 mb-12 border-r border-gray-100">
                            <a class="block px-4 group" href={`/post/${post.slug.current}`}>
                                <div class="aspect-[4/3] mb-4 overflow-hidden rounded-lg"> <!-- Festes Aspect Ratio -->
                                    <div class="w-full h-full">
                                        <img 
                                            src={urlFor(post.mainImage).url()} 
                                            alt={post.title} 
                                            class="w-full h-full object-cover"
                                        />
                                    </div>
                                </div>
                                <div class="flex mb-4 items-center">
                                    <span class="inline-block py-1 px-3 text-xs font-medium text-primary-900 bg-primary-50 rounded-full s-iFvCgFMopxZa">{post.category.title}</span>
                                    <span class="text-xs">{formatDate(post._createdAt)}</span>
                                </div>
                                <h4 class="text-xl font-medium group-hover:text-primary-800 mb-4">{post.title}</h4>
                                <p class="text-gray-700">{post.excerpt}</p>
                            </a>
                        </div>
                    {/each}
                </div>
            {/if}
        </div> <!-- End of Additional Posts -->
            <!-- Show More Button -->
            <div class="text-center">
                {#if !showContent}
                    <button 
                        on:click={() => showContent = true}
                        class="relative group inline-block py-4 px-7 font-semibold text-primary-900 hover:text-primary-50 rounded-full bg-primary-50 transition duration-300 overflow-hidden"
                    >
                        <div class="absolute top-0 right-full w-full h-full bg-gray-900 transform group-hover:translate-x-full group-hover:scale-102 transition duration-500"></div>
                        <span class="relative">Weitere Artikel anzeigen</span>
                    </button>
                {/if}
            </div>
        </div>
    </div>
</section>