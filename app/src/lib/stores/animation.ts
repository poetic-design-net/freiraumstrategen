import { writable } from 'svelte/store';
import type gsap from 'gsap';

// Initialisiere mit null und erstelle Timeline später
export const heroTimeline = writable<gsap.core.Timeline | null>(null);