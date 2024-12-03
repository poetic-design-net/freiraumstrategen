<script lang="ts">
    import Icon from './icons/Icon.svelte';

    let loading = false;
    let success = false;
    let error = '';
  
    export let successMessage = 'Vielen Dank für Ihre Registrierung! Wir werden uns in Kürze bei Ihnen melden.';
    export let errorMessage = 'Es ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut.';

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
  
    const KEAP_API_URL = import.meta.env.VITE_KEAP_API_URL;
    const KEAP_API_KEY = import.meta.env.VITE_KEAP_API_KEY;
  
    async function handleSubmit() {
      loading = true;
      error = '';
      
      if (!KEAP_API_URL || !KEAP_API_KEY) {
        error = 'Formular ist noch nicht vollständig konfiguriert.';
        loading = false;
        return;
      }
      
      try {
        // Transform data to Keap's expected format
        const keapData = {
          contact: {
            given_name: formData.firstName,
            family_name: formData.lastName,
            email_addresses: [
              {
                email: formData.email,
                field: 'EMAIL1'
              }
            ],
            phone_numbers: [
              {
                number: formData.phone,
                field: 'PHONE1'
              }
            ]
          }
        };

        const response = await fetch(`${KEAP_API_URL}/contacts`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${KEAP_API_KEY}`,
            'Accept': 'application/json'
          },
          body: JSON.stringify(keapData)
        });
  
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Submission failed');
        }
  
        success = true;
        formData = { firstName: '', lastName: '', phone: '', email: '' };
        
      } catch (err) {
        error = errorMessage;
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
          <Icon name="spinner" size={20} className="animate-spin" />
          <span>Wird verarbeitet...</span>
        {:else}
          <span>Jetzt registrieren</span>
          <Icon name="arrow-right-long" size={20} />
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
        {successMessage}
      </div>
    {/if}
  
    <p class="text-xs text-gray-200 text-center">
      Mit dem Absenden des Formulars stimmen Sie unserer 
      <a href="/datenschutz" class="underline hover:text-white">Datenschutzerklärung</a> 
      zu.
    </p>
  </form>
