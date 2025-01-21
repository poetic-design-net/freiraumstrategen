import { writable } from 'svelte/store';
import type { SalesHeroVideo } from '$lib/types/salesHeroSection';

interface VideoButtonState {
  data: SalesHeroVideo | null;
  theme?: { text: string };
  isLandingPage: boolean;
}

export const videoButtonStore = writable<VideoButtonState>({
  data: null,
  theme: undefined,
  isLandingPage: false
});