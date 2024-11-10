<script lang="ts">
    let loading = false;
    let success = false;
    let error = '';
  
    type FormData = {
      firstName: string;
      lastName: string;
      phone: string;
      email: string;
    }
  
    let formData: FormData = {
      firstName: '',
      lastName: '',
      phone: '',
      email: ''
    };
  
    const ZAPIER_WEBHOOK_URL = import.meta.env.VITE_ZAPIER_WEBHOOK_URL;
  
    async function handleSubmit() {
      loading = true;
      error = '';
      
      if (!ZAPIER_WEBHOOK_URL) {
        error = 'Formular ist noch nicht vollständig konfiguriert.';
        loading = false;
        return;
      }
      
      try {
        const response = await fetch(ZAPIER_WEBHOOK_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });
  
        if (!response.ok || response.status !== 200) {
          throw new Error('Submission failed');
        }
  
        const data = await response.json();
        if (!data.success) {
          throw new Error('Webhook response indicates failure');
        }
  
        success = true;
        formData = { firstName: '', lastName: '', phone: '', email: '' };
        
      } catch (err) {
        error = 'Es ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut.';
        console.error('Submission error:', err);
      } finally {
        loading = false;
      }
    }
  </script>
  
  <form 
    on:submit|preventDefault={handleSubmit}
    class="w-full max-w-lg mx-auto flex flex-col gap-4"
  >
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <input 
        class="w-full py-3 px-4 text-sm text-gray-900 placeholder-gray-400 bg-white/90 border border-gray-200 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 rounded-lg transition-colors duration-200" 
        type="text" 
        placeholder="Vorname"
        bind:value={formData.firstName}
        required
        disabled={loading}
      >
      <input 
        class="w-full py-3 px-4 text-sm text-gray-900 placeholder-gray-400 bg-white/90 border border-gray-200 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 rounded-lg transition-colors duration-200" 
        type="text" 
        placeholder="Nachname"
        bind:value={formData.lastName}
        required
        disabled={loading}
      >
      <input 
        class="w-full py-3 px-4 text-sm text-gray-900 placeholder-gray-400 bg-white/90 border border-gray-200 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 rounded-lg transition-colors duration-200" 
        type="tel" 
        placeholder="Telefon"
        bind:value={formData.phone}
        required
        disabled={loading}
      >
      <input 
        class="w-full py-3 px-4 text-sm text-gray-900 placeholder-gray-400 bg-white/90 border border-gray-200 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 rounded-lg transition-colors duration-200" 
        type="email" 
        placeholder="E-Mail"
        bind:value={formData.email}
        required
        disabled={loading}
      >
    </div>
  
    <button 
      type="submit"
      class="relative w-full py-3 px-6 text-sm font-semibold text-dark shadow bg-gray-100 hover:bg-white disabled:bg-gray-600/50 rounded-lg transition-colors duration-200 disabled:cursor-not-allowed overflow-hidden"
      disabled={loading}
    >
      <div class="absolute inset-0 bg-black/10 transform origin-left transition-transform duration-300 ease-out scale-x-0 group-hover:scale-x-100"></div>
      <div class="relative flex items-center justify-center gap-2">
        {#if loading}
          <svg class="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span>Wird verarbeitet...</span>
        {:else}
          <span>Jetzt registrieren</span>
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
          </svg>
        {/if}
      </div>
    </button>
  
    {#if error}
      <div class="p-4 bg-red-50 border border-red-100 text-red-600 text-sm rounded-lg">
        {error}
      </div>
    {/if}
  
    {#if success}
      <div class="p-4 bg-green-50 border border-green-100 text-green-600 text-sm rounded-lg">
        Vielen Dank für Ihre Registrierung! Wir werden uns in Kürze bei Ihnen melden.
      </div>
    {/if}
  
    <p class="text-xs text-gray-200 text-center">
      Mit dem Absenden des Formulars stimmen Sie unserer 
      <a href="/datenschutz" class="underline hover:text-white">Datenschutzerklärung</a> 
      zu.
    </p>
  </form>