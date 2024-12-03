import { setPreviewing } from '@sanity/visual-editing/svelte';
import type { LayoutLoad } from './$types';
import { cleanText } from '$lib/utils/textCleaner';
import { hasAnimationPlayed } from '$lib/stores/animationState';

// Make cleanText globally available
(globalThis as any).cleanText = cleanText;

export const prerender = true;
export const ssr = true;

interface EventData {
  navigationQuery: string;
  navigationOptions: {
    initial: any;
  };
  preview?: boolean;
}

export const load: LayoutLoad = async (event) => {
  const data = event.data as EventData;
  const { navigationQuery, navigationOptions } = data;
  
  // Check if preview data exists and set it
  if (data.preview !== undefined) {
    setPreviewing(data.preview);
  }

  return {
    navigationQuery,
    navigationOptions
  };
};
