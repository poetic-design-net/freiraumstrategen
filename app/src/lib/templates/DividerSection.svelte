<script lang="ts">
  import type { DividerSection } from '$lib/types/dividerSection'
  import CleanText from '$lib/components/CleanText.svelte'

  export let data: DividerSection
</script>

{#if data.enabled !== false}
  <section class="relative w-full bg-primary-800 py-18">
    {#if data.headlineGreen}
      <div class="container mx-auto px-4 ">
        <h2 class="text-center text-2xl md:text-4xl lg:text-6xl font-bold uppercase text-green">
          <CleanText text={data.headlineGreen} />
        </h2>
      </div>
    {/if}

    {#if data.headlineWhite}
      <div class="container mx-auto px-4 ">
        <h2 class="text-center text-2xl md:text-4xl lg:text-6xl font-bold uppercase text-white">
          <CleanText text={data.headlineWhite} />
        </h2>
      </div>
    {/if}
  </section>
{/if}