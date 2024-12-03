import { getContext, setContext } from 'svelte';
import { sanitizeText } from '$lib/utils';

const TEXT_CONTEXT_KEY = Symbol('text-sanitizer');

export function setSanitizerContext() {
  setContext(TEXT_CONTEXT_KEY, sanitizeText);
}

export function useSanitizer() {
  return getContext<typeof sanitizeText>(TEXT_CONTEXT_KEY);
}
