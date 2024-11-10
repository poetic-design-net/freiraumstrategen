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

    const isLast = (item: any, array: any[]) => array.indexOf(item) === array.length - 1;
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

                <div class="w-full lg:w-1/2 px-4">
                    {#each posts.slice(1, 4) as post}
                        <a class="block md:flex group rounded-lg transition-colors p-4 -mx-4 first:pt-0" href={`/post/${post.slug.current}`}>
                            <div class="flex-shrink-0">
                                <div class="relative w-full md:w-48 aspect-[4/3] overflow-hidden rounded-lg">
                                    <img 
                                        src={urlFor(post.mainImage).url()} 
                                        alt={sanitizeText(post.title ?? '')} 
                                        class="w-full h-full object-cover"
                                    />
                                </div>
                            </div>
                            <div class="flex-grow md:ml-6 mt-4 md:mt-0">
                                <div class="flex items-center gap-4 mb-3">
                                    <span class="inline-block py-1 px-3 text-xs font-medium text-primary-900 bg-primary-50 rounded-full">{post.category.title}</span>
                                    <span class="text-xs text-gray-600">{formatDate(post._createdAt)}</span>  
                                </div>
                                <h4 class="text-xl font-medium group-hover:text-primary-800 mb-2">{post.title}</h4>
                                <p class="text-gray-700 text-sm">{post.excerpt?.slice(0, 100)}...</p>
                            </div>
                        </a>
                        {#if !isLast(post, posts.slice(1, 4))}
                            <div class="h-px bg-gray-100 my-4"></div>
                        {/if}
                    {/each}
                </div>

            <!-- Additional Posts -->
            {#if showContent}
                <div class="flex flex-wrap -mx-4 -mb-12 ">
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
                        class="relative group inline-block w-full sm:w-auto py-4 px-8 text-white font-medium rounded-md overflow-hidden bg-primary-800"
                    >
                        <div class="absolute top-0 right-full w-full h-full transform group-hover:translate-x-full group-hover:scale-102 transition duration-500 bg-primary-600"></div>
                        <div class="relative flex items-center justify-center"><span class="mr-4">Weitere Artikel anzeigen</span> <span>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-4">
                                <path fill-rule="evenodd" d="M12.53 16.28a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 0 1 1.06-1.06L12 14.69l6.97-6.97a.75.75 0 1 1 1.06 1.06l-7.5 7.5Z" clip-rule="evenodd" />
                              </svg>                                                  
                          </span></div>
                    </button>
                {/if}
            </div>
        </div>
    </div>
</section>