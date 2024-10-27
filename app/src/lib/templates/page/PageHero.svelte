<script lang="ts">
    export let heroData;
    const { title, subtitle, backgroundImage } = heroData;
    import { sanitizeText } from '$lib/utils';
</script>

<section class="hero" style="background-image: url({backgroundImage.asset.url});">
    <div class="hero__content">
        <h1>{sanitizeText(title)}</h1>
        <p>{sanitizeText(subtitle)}</p>
    </div>
</section>
