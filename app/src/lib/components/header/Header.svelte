<script lang="ts">
  import { onMount } from 'svelte';
  import { useQuery } from '@sanity/svelte-loader';
  import { navigationQuery } from '$lib/sanity/queries';
  import type { HeaderProps, Navigation } from './types';
  import { headerStore } from './store';
  import Logo from '$lib/components/Logo.svelte';
  import Icon from '$lib/components/icons/Icon.svelte';
  import DesktopNavigation from './DesktopNavigation.svelte';
  import MobileMenu from './MobileMenu.svelte';
  import HeaderActions from './HeaderActions.svelte';

  export let data: HeaderProps['data'];

  const navigation = useQuery<Navigation>(
    data.navigationQuery,
    {},
    data.navigationOptions
  );

  $: navigationItems = $navigation?.data?.items || [];

  let lastScrollY = 0;

  function checkMobile() {
    headerStore.setMobile(window.innerWidth < 1280);
  }

  function handleScroll() {
    const currentScrollY = window.scrollY;
    headerStore.setHeaderVisibility(lastScrollY > currentScrollY || currentScrollY < 150);
    headerStore.setScrolled(currentScrollY > 150);
    lastScrollY = currentScrollY;
  }

  onMount(() => {
    checkMobile();
    window.addEventListener('resize', checkMobile);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('scroll', handleScroll);
    };
  });
</script>

<div class="h-[100px]"></div>
<header 
  class="header fixed w-full transition-all duration-300 bg-white"
  class:translate-y-0={$headerStore.isHeaderVisible}
  class:pointer-events-none={!$headerStore.isHeaderVisible && !$headerStore.mobileNavOpen}
  class:-translate-y-full={!$headerStore.isHeaderVisible && !$headerStore.mobileNavOpen}
  class:shadow={$headerStore.hasScrolled}
  style="top: 0; left: 0; right: 0; z-index: 50;">

  {#if $headerStore.isMobile}
    <nav class="relative py-6 bg-white z-50">
      <div class="container px-4 mx-auto">
        <div class="flex items-center justify-between">
          <a href="/" class="inline-block">
            <Logo />
          </a>
          <button 
            on:click={() => headerStore.toggleMobileNav()} 
            class="ml-auto flex w-12 h-12 items-center justify-center hover:bg-gray-200 rounded-md"
          >
            <Icon name="menu" size={24} />
          </button>
        </div>
      </div>
    </nav>
  {:else}
    <DesktopNavigation items={navigationItems}>
      <div slot="logo">
        <a href="/" class="inline-block">
          <Logo />
        </a>
      </div>
      <div slot="actions">
        <HeaderActions />
      </div>
    </DesktopNavigation>
  {/if}
</header>

<!-- Mobile Menu rendered outside header -->
{#if $headerStore.isMobile}
  <MobileMenu navigationItems={navigationItems} />
{/if}
