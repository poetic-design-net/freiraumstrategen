<script lang="ts">
  import { urlFor } from '$lib/sanity/image'
  
  export let data: {
    metaTitle?: string
    metaDescription?: string
    openGraphImage?: {
      asset: any
      alt?: string
    }
    keywords?: string[]
    canonicalUrl?: string
  }

  const defaultTitle = 'Die Freiraumstrategen - Trading Academy'
  const defaultDescription = 'Lerne zeiteffizientes Trading mit den Freiraumstrategen. Professionelle Trading-Ausbildung für deinen Erfolg an der Börse.'
  
  $: title = data?.metaTitle || defaultTitle
  $: description = data?.metaDescription || defaultDescription
  $: ogImage = data?.openGraphImage?.asset ? urlFor(data.openGraphImage).width(1200).height(630).url() : undefined
  $: keywords = data?.keywords?.join(', ')
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="description" content={description} />
  
  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website" />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  {#if ogImage}
    <meta property="og:image" content={ogImage} />
    {#if data.openGraphImage?.alt}
      <meta property="og:image:alt" content={data.openGraphImage.alt} />
    {/if}
  {/if}
  
  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={title} />
  <meta name="twitter:description" content={description} />
  {#if ogImage}
    <meta name="twitter:image" content={ogImage} />
    {#if data.openGraphImage?.alt}
      <meta name="twitter:image:alt" content={data.openGraphImage.alt} />
    {/if}
  {/if}
  
  <!-- Additional SEO -->
  {#if keywords}
    <meta name="keywords" content={keywords} />
  {/if}
  {#if data.canonicalUrl}
    <link rel="canonical" href={data.canonicalUrl} />
  {/if}
</svelte:head>
