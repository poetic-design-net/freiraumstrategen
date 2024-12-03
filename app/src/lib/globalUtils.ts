import { sanitizeText } from '$lib/utils';

// Make sanitizeText globally available
declare global {
  function sanitizeText(text: string): string;
}

// Assign the function to the global scope
(globalThis as any).sanitizeText = sanitizeText;
