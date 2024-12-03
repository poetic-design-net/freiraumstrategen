/**
 * Removes zero-width spaces and other special characters from a string
 */
export function cleanString(str: string | undefined | null): string {
  if (!str) return '';
  
  return str
    // Remove zero-width spaces and other special characters
    .replace(/[\u200B-\u200D\uFEFF]/g, '')
    // Remove zero-width non-joiner and joiner
    .replace(/[\u200C\u200D]/g, '')
    // Remove other invisible characters and control characters
    .replace(/[\u0000-\u001F\u007F-\u009F\u2000-\u200F\u2028-\u202F\u205F-\u206F]/g, '')
    // Normalize whitespace
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Cleans all string properties in an object recursively
 */
export function cleanObject<T>(obj: T): T {
  if (!obj || typeof obj !== 'object') return obj;

  if (Array.isArray(obj)) {
    return obj.map(item => cleanObject(item)) as unknown as T;
  }

  const result = {} as T;
  
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === 'string') {
      (result as any)[key] = cleanString(value);
    } else if (value && typeof value === 'object') {
      (result as any)[key] = cleanObject(value);
    } else {
      (result as any)[key] = value;
    }
  }

  return result;
}
