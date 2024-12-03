/**
 * Removes zero-width spaces and other invisible characters from text
 * This includes:
 * - Zero-width space (&#8203; or \u200B)
 * - Zero-width non-joiner (&#8204; or \u200C)
 * - Zero-width joiner (&#8205; or \u200D)
 * - Word joiner (&#8288; or \u2060)
 * - Left-to-right mark (&#8206; or \u200E)
 * - Right-to-left mark (&#8207; or \u200F)
 * - Object replacement character (&#65532; or \uFFFC)
 * - Byte order mark (&#65279; or \uFEFF)
 */
export function cleanText(text: string | undefined | null): string {
    if (!text) return '';
    
    return text
        // Remove all zero-width spaces and invisible characters
        .replace(/[\u200B-\u200F\u2060\uFEFF\uFFFC]/g, '')
        // Remove HTML entities (named)
        .replace(/&(?:ZeroWidthSpace|zwj|zwnj);/g, '')
        // Remove HTML entities (decimal)
        .replace(/&#(?:8203|8204|8205|8288|8206|8207|65279|65532);/g, '')
        // Remove HTML entities (hexadecimal, case-insensitive)
        .replace(/&#x(?:200B|200C|200D|2060|200E|200F|FEFF|FFFC);/gi, '')
        // Remove any remaining zero-width spaces that might be encoded differently
        .replace(/[\u200B\u200C\u200D\u2060\u200E\u200F\uFEFF\uFFFC]/g, '');
}

/**
 * Cleans all string properties in an object recursively
 */
export function cleanObject<T>(value: T): T {
    if (!value) return value;

    // Handle strings
    if (typeof value === 'string') {
        return cleanText(value) as T;
    }

    // Handle arrays
    if (Array.isArray(value)) {
        return value.map(item => cleanObject(item)) as T;
    }

    // Handle objects
    if (value && typeof value === 'object') {
        const cleaned: any = {};
        for (const [key, val] of Object.entries(value)) {
            cleaned[key] = cleanObject(val);
        }
        return cleaned as T;
    }

    // Return unchanged for other types
    return value;
}

// Export a function to check if a string contains zero-width spaces (for debugging)
export function hasZeroWidthSpaces(text: string): boolean {
    const zeroWidthPattern = /[\u200B-\u200F\u2060\uFEFF\uFFFC]|&(?:ZeroWidthSpace|zwj|zwnj);|&#(?:8203|8204|8205|8288|8206|8207|65279|65532);|&#x(?:200B|200C|200D|2060|200E|200F|FEFF|FFFC);/gi;
    return zeroWidthPattern.test(text);
}
