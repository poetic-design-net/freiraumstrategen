import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { cubicOut } from "svelte/easing";
import type { TransitionConfig } from "svelte/transition";
import type { PortableTextBlock } from '@portabletext/types'
import sanitizeHtml from 'sanitize-html';
import { cleanText, cleanObject } from './utils/textCleaner';

export { cleanText, cleanObject };

// Maintain backward compatibility with old sanitizeText function
export const sanitizeText = cleanText;
export const sanitizeTextWithType = cleanObject;

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function formatDate(date: string) {
	return new Date(date).toLocaleDateString('en-US', {
		month: 'long',
		day: 'numeric',
		year: 'numeric'
	});
}

// Default options for sanitize-html
const defaultSanitizeOptions = {
    allowedTags: [
        'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
        'p', 'br', 'hr',
        'ul', 'ol', 'li',
        'b', 'i', 'strong', 'em',
        'a', 'span',
        'blockquote',
        'code', 'pre'
    ],
    allowedAttributes: {
        'a': ['href', 'target', 'rel'],
        'span': ['class'],
        '*': ['class', 'id']
    },
    allowedSchemes: ['http', 'https', 'mailto'],
    transformTags: {
        'a': (tagName: string, attribs: { [key: string]: string }) => ({
            tagName,
            attribs: {
                ...attribs,
                target: '_blank',
                rel: 'noopener noreferrer'
            }
        })
    }
};

// Sanitizes HTML content to prevent XSS attacks
export function sanitizeHtmlContent(html: string | null | undefined, options = {}): string {
    if (!html) return '';
    
    const sanitizeOptions = {
        ...defaultSanitizeOptions,
        ...options
    };

    return sanitizeHtml(html, sanitizeOptions);
}

export function calculateReadingTime(content: string, wordsPerMinute: number = 200): number {
	const words = content.trim().split(/\s+/).length;
	const minutes = Math.ceil(words / wordsPerMinute);
	return Math.max(1, Math.min(minutes, 30)); // Begrenzt die Lesezeit auf maximal 30 Minuten
}

type FlyAndScaleParams = {
	y?: number;
	x?: number;
	start?: number;
	duration?: number;
};

export const flyAndScale = (
	node: Element,
	params: FlyAndScaleParams = { y: -8, x: 0, start: 0.95, duration: 150 }
): TransitionConfig => {
	const style = getComputedStyle(node);
	const transform = style.transform === "none" ? "" : style.transform;

	const scaleConversion = (
		valueA: number,
		scaleA: [number, number],
		scaleB: [number, number]
	) => {
		const [minA, maxA] = scaleA;
		const [minB, maxB] = scaleB;

		const percentage = (valueA - minA) / (maxA - minA);
		const valueB = percentage * (maxB - minB) + minB;

		return valueB;
	};

	const styleToString = (
		style: Record<string, number | string | undefined>
	): string => {
		return Object.keys(style).reduce((str, key) => {
			if (style[key] === undefined) return str;
			return str + `${key}:${style[key]};`;
		}, "");
	};

	return {
		duration: params.duration ?? 200,
		delay: 0,
		css: (t) => {
			const y = scaleConversion(t, [0, 1], [params.y ?? 5, 0]);
			const x = scaleConversion(t, [0, 1], [params.x ?? 0, 0]);
			const scale = scaleConversion(t, [0, 1], [params.start ?? 0.95, 1]);

			return styleToString({
				transform: `${transform} translate3d(${x}px, ${y}px, 0) scale(${scale})`,
				opacity: t
			});
		},
		easing: cubicOut
	};
};
