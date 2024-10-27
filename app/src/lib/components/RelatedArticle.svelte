<script lang="ts">
    import { urlFor } from '$lib/sanity/image';
    
    export let article: {
      title: string;
      slug: { current: string };
      mainImage?: { asset: { _ref: string; _type: string } };
    };
  </script>
  
  <a href={`/post/${article.slug.current}`} class="group block">
    <div class="mb-4 overflow-hidden rounded-lg">
      {#if article.mainImage}
        <img
          class="w-full h-48 object-cover transition duration-300 group-hover:scale-105"
          src={urlFor(article.mainImage).width(400).height(300).url()}
          alt={article.title}
        />
      {:else}
        <div class="w-full h-48 bg-primary-700"></div>
      {/if}
    </div>
    <h3 class="text-lg font-semibold text-white group-hover:text-primary-500 transition duration-300">
      {article.title}
    </h3>
  </a>
