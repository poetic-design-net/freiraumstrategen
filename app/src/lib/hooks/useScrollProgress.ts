import { onMount } from 'svelte';
import { writable } from 'svelte/store';

export function useScrollProgress() {
    const scrollProgress = writable(0);

    onMount(() => {
        const updateScrollProgress = () => {
            const section = document.querySelector('section:has(.sticky)') as HTMLElement;
            if (section) {
                const rect = section.getBoundingClientRect();
                const viewportHeight = window.innerHeight;
                const totalHeight = section.offsetHeight + viewportHeight;
                const scrolled = window.scrollY;
                scrollProgress.set(Math.min(Math.max(scrolled / totalHeight, 0), 1));
            }
        };

        if (typeof window !== 'undefined') {
            window.addEventListener('scroll', updateScrollProgress);
            return () => {
                window.removeEventListener('scroll', updateScrollProgress);
            };
        }
    });

    return scrollProgress;
}
