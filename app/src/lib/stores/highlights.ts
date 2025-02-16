import { writable, type Writable } from 'svelte/store';

export const isHighlightsAnimated: Writable<boolean> = writable(false);