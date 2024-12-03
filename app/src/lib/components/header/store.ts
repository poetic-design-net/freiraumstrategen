import { writable } from 'svelte/store';

interface HeaderState {
  isHeaderVisible: boolean;
  hasScrolled: boolean;
  isMobile: boolean;
  mobileNavOpen: boolean;
  activeMenu: string | null;
  isMenuVisible: boolean;
  isFirstOpen: boolean;
}

const createHeaderStore = () => {
  const { subscribe, set, update } = writable<HeaderState>({
    isHeaderVisible: true,
    hasScrolled: false,
    isMobile: false,
    mobileNavOpen: false,
    activeMenu: null,
    isMenuVisible: false,
    isFirstOpen: true
  });

  return {
    subscribe,
    setHeaderVisibility: (isVisible: boolean) => 
      update(state => ({ ...state, isHeaderVisible: isVisible })),
    setScrolled: (hasScrolled: boolean) => 
      update(state => ({ ...state, hasScrolled })),
    setMobile: (isMobile: boolean) => 
      update(state => ({ ...state, isMobile })),
    toggleMobileNav: () => 
      update(state => ({ ...state, mobileNavOpen: !state.mobileNavOpen })),
    closeMobileNav: () => 
      update(state => ({ ...state, mobileNavOpen: false })),
    setActiveMenu: (menuKey: string | null) => 
      update(state => ({ ...state, activeMenu: menuKey })),
    setMenuVisibility: (isVisible: boolean) => 
      update(state => ({ ...state, isMenuVisible: isVisible })),
    setFirstOpen: (isFirst: boolean) => 
      update(state => ({ ...state, isFirstOpen: isFirst })),
    reset: () => set({
      isHeaderVisible: true,
      hasScrolled: false,
      isMobile: false,
      mobileNavOpen: false,
      activeMenu: null,
      isMenuVisible: false,
      isFirstOpen: true
    })
  };
};

export const headerStore = createHeaderStore();
