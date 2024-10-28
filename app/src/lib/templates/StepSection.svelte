<script lang="ts">
  import { onMount } from 'svelte';

  const steps = [
      {
        number: 1,
        title: "Sicherheit und persönliche Begleitung",
        description: "Tauche ein in die Welt mit einer individuellen Analyse und einem persönlichen Onboarding. Du wirst von der ersten Minute an die Hand genommen...",
        image: "https://plus.unsplash.com/premium_photo-1670249421324-232b654455d0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      },
      
      {
        number: 2,
        title: "Sicherheit und persönliche Begleitung",
        description: "Tauche ein in die Welt mit einer individuellen Analyse und einem persönlichen Onboarding. Du wirst von der ersten Minute an die Hand genommen...",
        image: "https://www.freiraumstrategen.com/wp-content/uploads/2023/04/trader_coaching_tobias.jpg"
      },
      {
        number: 3,
        title: "Sicherheit und persönliche Begleitung",
        description: "Tauche ein in die Welt mit einer individuellen Analyse und einem persönlichen Onboarding. Du wirst von der ersten Minute an die Hand genommen...",
        image: "https://plus.unsplash.com/premium_photo-1670249421324-232b654455d0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      }
    ];

    let activeStep = 0;
    let container: HTMLElement | null = null;

    function updateActiveStep() {
      if (!container) return;

      const stepElements = container.querySelectorAll('.step-content');
      const viewportHeight = window.innerHeight;
      const triggerPoint = viewportHeight * 0.25; // Hier können Sie den Trigger-Punkt anpassen

      for (let i = 0; i < stepElements.length; i++) {
        const rect = stepElements[i].getBoundingClientRect();
        if (rect.top < triggerPoint && rect.bottom > triggerPoint) {
          activeStep = i;
          break;
        }
      }
    }

    onMount(() => {
      updateActiveStep();
      window.addEventListener('scroll', updateActiveStep);
      window.addEventListener('resize', updateActiveStep);

      return () => {
        window.removeEventListener('scroll', updateActiveStep);
        window.removeEventListener('resize', updateActiveStep);
      };
    });
</script>

<div class="container px-4 overflow-visible">
  <div class="pb-32 text-center">
    <span class="inline-block py-1 px-3 mb-4 text-xs font-medium text-primary-900 bg-primary-50 rounded-full">Schritt für Schritt erklärt</span>
    <h1 class="font-heading text-5xl xs:text-6xl md:text-7xl font-medium text-light">
      <span class="font-thin">In wenigen Schritten </span>
      <span class="block"> zum Erfolg</span>
    </h1>
  </div>
  <div class="flex flex-col lg:flex-row">
    <div bind:this={container} class="w-full lg:w-1/2 space-y-16 md:space-y-32 lg:space-y-72">
      {#each steps as step, index}
        <div 
          class="step-content relative transition-all duration-300 ease-out"
          class:active={activeStep === index}
        >
          <div class="pl-12 relative">
            <div class="absolute left-0 top-0 w-8 h-8 rounded-full flex items-center justify-center bg-gray-700 text-white transition-colors duration-300 ease-out"
                 class:bg-primary-600={activeStep >= index}>
              {step.number}
            </div>
            <h3 class="text-2xl font-light mb-2">{step.title}</h3>
            <p class="text-gray-500">{step.description}</p>
          </div>
          <div class="mt-4 lg:hidden">
            <img
              src={step.image}
              alt={step.title}
              class="w-full h-auto object-cover rounded-lg shadow-md"
            />
          </div>
        </div>
      {/each}
    </div>
    <div class="hidden lg:block w-1/2 relative">
      <div class="sticky top-20 h-[40vh]">
        {#each steps as step, index}
          <img
            src={step.image}
            alt={step.title}
            class="absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ease-out rounded-lg"
            style="opacity: {activeStep === index ? 1 : 0}"
          />
        {/each}
      </div>
    </div>
  </div>
</div>

<style>
  .step-content {
    opacity: 0.5;
    transition: opacity 0.3s ease-out;
  }
  .step-content.active {
    opacity: 1;
  }
</style>
