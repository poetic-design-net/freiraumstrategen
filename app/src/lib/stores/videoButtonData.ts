import { writable } from 'svelte/store';
import type { SalesHeroVideo } from '$lib/types/salesHeroSection';

export type VideoButtonStore = {
  data: SalesHeroVideo | undefined;
  theme: { text: string } | undefined;
};

export const videoButtonData = writable<VideoButtonStore>({
  data: undefined,
  theme: undefined
});