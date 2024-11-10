<script lang="ts">
  import { onMount } from 'svelte';
  import gsap from 'gsap';

  onMount(() => {
    // Verzögerung hinzufügen
    setTimeout(() => {
      const tl = gsap.timeline({
        defaults: {
          duration: 0.8,
          ease: "power2.out"
        }
      });

      tl.to(".Logo-bird polygon, .Logo-bird path", {
        opacity: 1,
        scale: 1,
        transformOrigin: "center center",
        stagger: 0.1,
        ease: "back.out(1.7)"
      })
      .to(".Logo-text > *", {
        opacity: 1,
        stagger: 0.05,
        ease: "power2.out",
      }, "-=0.5");
    }, 100); // Kleine Verzögerung

    return () => {
      gsap.killTweensOf([".Logo-bird", ".Logo-text"]);
    };
  });
</script>

<style>
  /* Initial State */
  :global(.Logo-text > *) {
    opacity: 0;
  }
  :global(.Logo-bird polygon),
  :global(.Logo-bird path) {
    opacity: 0;
  }
</style>

<svg xmlns="http://www.w3.org/2000/svg" width="154.1px" height="52px" viewBox="0 0 154.1 52">
    <g class="Logo-bird">
        <polygon fill="#024358" points="47.2,16.8 47.2,9.9 54.9,16.8 	"></polygon>
        <linearGradient id="SVGID_1_" gradientUnits="userSpaceOnUse" x1="44.085" y1="10.8044" x2="42.2298" y2="20.3787">
            <stop offset="0" style="stop-color:#02657C"></stop>
            <stop offset="5.420738e-02" style="stop-color:#036078"></stop>
            <stop offset="0.2989" style="stop-color:#045066"></stop>
            <stop offset="0.524" style="stop-color:#03465C"></stop>
            <stop offset="0.7097" style="stop-color:#024358"></stop>
        </linearGradient>
        <polygon fill="url(#SVGID_1_)" points="38.5,13.7 47.2,9.9 47.2,21 	"></polygon>

            <linearGradient id="SVGID_00000019679129389979751630000014149395801671474584_" gradientUnits="userSpaceOnUse" x1="24.9946" y1="4.1511" x2="37.6263" y2="26.0299">
            <stop offset="0" style="stop-color:#067D87"></stop>
            <stop offset="1" style="stop-color:#024358"></stop>
        </linearGradient>
        <polygon fill="url(#SVGID_00000019679129389979751630000014149395801671474584_)" points="47.2,21 21.9,0 24.4,24.8 	"></polygon>

            <linearGradient id="SVGID_00000123426982763593254760000017979235071603104684_" gradientUnits="userSpaceOnUse" x1="0.2677" y1="-1.2822" x2="27.9824" y2="15.2649">
            <stop offset="0" style="stop-color:#067D87"></stop>
            <stop offset="1" style="stop-color:#024358"></stop>
        </linearGradient>
        <polygon fill="url(#SVGID_00000123426982763593254760000017979235071603104684_)" points="0,0 21.9,0 24.4,24.8 	"></polygon>

            <linearGradient id="SVGID_00000146478473025375996870000017387574293739566005_" gradientUnits="userSpaceOnUse" x1="36.4552" y1="35.5908" x2="35.8385" y2="23.6102">
            <stop offset="0" style="stop-color:#02657C"></stop>
            <stop offset="0.2864" style="stop-color:#04586F"></stop>
            <stop offset="0.7254" style="stop-color:#03485E"></stop>
            <stop offset="1" style="stop-color:#024358"></stop>
        </linearGradient>
        <polygon fill="url(#SVGID_00000146478473025375996870000017387574293739566005_)" points="24.4,24.8 47.2,21 28.6,37.6 	"></polygon>
        <polygon fill="#024358" points="24.4,24.8 24.3,52 31,44.8 	"></polygon>
    </g>
    <g class="Logo-text">
    <polygon fill="#02657C" points="49,33.4 51.2,33.4 51.2,27.1 56.4,27.1 56.4,25.1 51.2,25.1 51.2,20.6 57.7,20.6 57.7,18.6 49,18.6
        "></polygon>
    <path fill="#02657C" d="M70.8,23.3c0-2.4-1.3-4.7-4.6-4.7h-5.6v14.8h2.2v-5.5h1.7l3.8,5.5h2.6L67,27.9
        C69.7,27.5,70.8,25.4,70.8,23.3z M62.8,26v-5.4h3.4c1.4,0,2.4,1.1,2.4,2.7c0,1.6-0.8,2.7-2.9,2.7H62.8z"></path>
    <polygon fill="#02657C" points="76.8,27.2 82.6,27.2 82.6,25.1 76.8,25.1 76.8,20.6 83.5,20.6 83.5,18.6 74.6,18.6 74.6,33.4
        83.7,33.4 83.7,31.4 76.8,31.4 "></polygon>
    <rect x="87.2" y="18.6" fill="#02657C" width="2.2" height="14.8"></rect>
    <path fill="#02657C" d="M104.1,23.3c0-2.4-1.3-4.7-4.6-4.7h-5.6v14.8h2.2v-5.5h1.7l3.8,5.5h2.6l-3.9-5.6
        C103,27.5,104.1,25.4,104.1,23.3z M96.1,26v-5.4h3.4c1.4,0,2.4,1.1,2.4,2.7c0,1.6-0.8,2.7-2.9,2.7H96.1z"></path>
    <path fill="#02657C" d="M112,18.6l-5.6,14.8h2.3l1.4-3.8h6.2l1.4,3.8h2.3l-5.6-14.8H112z M110.8,27.7l2.4-6.4l2.4,6.4H110.8z"></path>
    <path fill="#02657C" d="M130.7,28.3c0,2.2-1.5,3.2-3.3,3.2c-1.8,0-3.2-1-3.2-3.2v-9.6H122v9.7c0,3.4,2.5,5.4,5.5,5.4s5.5-2,5.5-5.4
        v-9.7h-2.2L130.7,28.3L130.7,28.3z"></path>
    <polygon fill="#02657C" points="150.3,18.6 145.2,29.3 140.1,18.6 138.1,18.6 136.3,33.4 138.5,33.4 139.8,22.7 144.3,31.8
        146.1,31.8 150.6,22.7 151.9,33.4 154.1,33.4 152.3,18.6 "></polygon>
    <path fill="#02657C" d="M54.8,43.1l-2.1-0.5C50.3,42,50,40.7,50,39.9c0-1.8,1.8-3,3.6-3c1.9,0,3.4,1.1,3.6,2.9h1
        C58,37.4,56.1,36,53.6,36c-2.4,0-4.6,1.6-4.6,3.9c0,1.2,0.4,2.9,3.4,3.6l2.1,0.5c1.6,0.4,3.2,1.3,3.2,3c0,1.5-1.2,3.2-4,3.2
        c-2.2,0-3.6-1.5-3.8-3H49c0.2,2,2,4,4.8,4c3.4,0,5-2.3,5-4.2C58.7,44.8,57,43.6,54.8,43.1z"></path>
    <polygon fill="#02657C" points="58.3,37.1 63.2,37.1 63.2,51 64.2,51 64.2,37.1 69,37.1 69,36.2 58.3,36.2 "></polygon>
    <path fill="#02657C" d="M80,40.6c0-2.2-1.1-4.4-4.1-4.4h-5.5V51h1v-6h3l4.2,6h1.2l-4.2-6h0.3C78.9,45,80,42.9,80,40.6z M71.3,44.1
        v-7h4.5c2.2,0,3.1,1.7,3.1,3.5c0,1.8-0.9,3.5-3.4,3.5H71.3z"></path>
    <path fill="#02657C" d="M87,36.2L81.4,51h1l1.6-4h7.2l1.6,4h1l-5.6-14.8H87z M84.3,46.1l3.3-8.6l3.3,8.6H84.3z"></path>
    <polygon fill="#02657C" points="92.7,37.1 97.5,37.1 97.5,51 98.5,51 98.5,37.1 103.4,37.1 103.4,36.2 92.7,36.2 "></polygon>
    <polygon fill="#02657C" points="106.2,44.2 112.6,44.2 112.6,43.3 106.2,43.3 106.2,37.1 113.5,37.1 113.5,36.2 105.3,36.2
        105.3,51 113.7,51 113.7,50.1 106.2,50.1 "></polygon>
    <path fill="#02657C" d="M123.7,44.9h4.6l0,0.3c-0.4,3.4-2.8,5.1-5.8,5.1c-3.6,0-6.5-3-6.5-6.7s2.8-6.7,6.5-6.7
        c1.5,0,2.8,0.5,3.9,1.3l0.6-0.7c-1.2-1-2.8-1.6-4.5-1.6c-4.2,0-7.5,3.4-7.5,7.6c0,4.2,3.3,7.6,7.5,7.6c3.9,0,6.8-2.4,6.9-7.2h-5.6
        V44.9L123.7,44.9z"></path>
    <polygon fill="#02657C" points="132.7,44.2 139.1,44.2 139.1,43.3 132.7,43.3 132.7,37.1 139.9,37.1 139.9,36.2 131.7,36.2
        131.7,51 140.2,51 140.2,50.1 132.7,50.1 "></polygon>
    <polygon fill="#02657C" points="152.9,36.2 152.9,49.4 144.7,36.2 143.6,36.2 143.6,51 144.6,51 144.6,37.8 152.8,51 153.9,51
        153.9,36.2 "></polygon>
    </g>
</svg>