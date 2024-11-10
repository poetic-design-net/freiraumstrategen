<script lang="ts">
  import MemberForm from '$lib/components/MemberForm.svelte';
  import { onMount } from 'svelte';
      import { gsap } from "gsap";
      import { ScrollTrigger, SplitText } from "gsap/all";

  gsap.registerPlugin(ScrollTrigger, SplitText);

  const headline = "Hole Dir kostenfreien Zugang zu unserem Mitgliederbereich";
  
  onMount(() => {
    const splitText = new SplitText(".headline", { type: "words" });
    gsap.set(splitText.words, { opacity: 0, y: 20 });
    gsap.set('.animate-paragraph', { opacity: 0, y: 20 });
    gsap.set('.animate-form', { opacity: 0, y: 20 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".headline-container",
        start: "top 80%",
        once: true,
        toggleActions: "play none none none"
      }
    });

    tl.to(splitText.words, {
      opacity: 1,
      y: 0,
      duration: 1,
      stagger: 0.15,
      ease: "power4.out",
    })
    .to('.animate-paragraph', {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power3.out",
    }, "-=0.5")
    .to('.animate-form', {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power3.out",
    }, "-=0.7");
  });
</script>

<div class="relative w-full min-h-screen flex items-center bg-orange-600 justify-center">
  <img 
    class="absolute top-0 left-0 w-full h-full opacity-30 object-cover" 
    src="saturn-assets/images/newsletter/bg-gradient-color-big.png" 
    alt=""
  >
  <div class="relative z-10 max-w-3xl mx-auto px-4 flex flex-col gap-12 headline-container py-20">
    <div class="text-center flex flex-col gap-8">
      <h4 class="headline font-heading text-4xl sm:text-5xl md:text-6xl text-gray-50 font-medium">
        {headline}
      </h4>
      <p class="text-lg font-semibold text-gray-50 animate-paragraph">
        Mit einem kostenfreien Mitglieder-Zugang hast Du unmittelbaren Zugriff auf den Online Videokurs "Trading für Einsteiger", das "OrderTool" für den MetaTrader4, das "Trading Journal" und erhältst unseren Newsletter
      </p>
    </div>
    <div class="animate-form">
      <MemberForm />
    </div>
  </div>
</div>