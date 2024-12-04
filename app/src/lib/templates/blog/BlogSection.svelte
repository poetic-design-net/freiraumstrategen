<script lang="ts">
    import ImageRenderer from '$lib/components/ImageRenderer.svelte';
    import Icon from '$lib/components/icons/Icon.svelte';
    import { formatDate, sanitizeText } from '$lib/utils';
    import { urlFor } from '$lib/sanity/image';

    // Accept posts as a prop instead of querying directly
    export let posts: any[] = [];
    // Optional props for customization
    export let eyebrow: string = "BLOG";
    export let title: string = "News und";
    export let titleAccent: string = "Artikel";
    export let maxPosts: number = 4;

    let showContent = false;

    const isLast = (item: any, array: any[]) => array.indexOf(item) === array.length - 1;
</script>


<div class="container px-4 mx-auto">
    <div class="max-w-7xl mx-auto">
            <div class="max-w-2xl mx-auto mb-16 text-center">
                <span class="inline-block py-1 px-3 mb-4 text-xs font-semibold text-primary-900 bg-primary-50 rounded-full shadow">{eyebrow}</span>
                <h1 class="font-heading tracking-tight text-4xl sm:text-5xl font-medium ">
                    <span>{title}</span>
                    <span class="font-thin">{titleAccent}</span>
                </h1>
            </div>

            <div class="relative">
                <!-- Blog Content -->
                <div class="transition-all duration-500">
                    <!-- Featured Posts -->
                    <div class="flex flex-wrap -mx-4 mb-18">
                        {#if posts && posts[0]}
                            <div class="w-full lg:w-1/2 px-4 mb-12 lg:mb-0">
                                <a class="block group w-full" href={`/post/${posts[0].slug.current}`}>
                                    <div class="mb-12">
                                        <ImageRenderer value={posts[0].mainImage} />
                                    </div>
                                    <div class="flex mb-4 items-center">    
                                        <span class="inline-block py-1 px-3 text-xs font-medium text-primary-900 bg-primary-50 shadow rounded-full">{posts[0].category.title}</span>
                                        <span class="inline-block mx-4">
                                            <Icon name="vertical-line" size={24} className="text-primary-900" />
                                        </span>
                                        <span class="text-xs ">{formatDate(posts[0]._createdAt)}</span>
                                    </div>
                                    <h4 class="font-heading tracking-tight text-3xl font-medium  group-hover:text-gray-800 transition duration-200 mb-3">{posts[0].title}</h4>
                                    <p class="text-lg text-gray-600">{posts[0].excerpt}</p>
                                </a>
                            </div>
                        {/if}

                        <div class="w-full lg:w-1/2 px-4">
                            {#each posts.slice(1, maxPosts) as post}
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
                                    <div class="flex-grow md:ms-6 mt-4 md:mt-0">
                                        <div class="flex items-center gap-4 mb-3">
                                            <span class="inline-block py-1 px-3 text-xs font-medium text-primary-900 shadow bg-primary-50 rounded-full">{post.category.title}</span>
                                            <span class="text-xs ">{formatDate(post._createdAt)}</span>  
                                        </div>
                                        <h4 class="text-xl font-medium  group-hover:text-gray-800 transition duration-200 mb-2">{post.title}</h4>
                                        <p class="text-gray-600 text-sm">{post.excerpt?.slice(0, 100)}...</p>
                                    </div>
                                </a>
                                {#if !isLast(post, posts.slice(1, maxPosts))}
                                    <div class="h-px bg-white/10 my-4"></div>
                                {/if}
                            {/each}
                        </div>
                    </div>
                </div>
            </div>

               
            </div>
        </div>
