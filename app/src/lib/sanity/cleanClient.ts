import { client } from './client';
import { cleanObject } from '$lib/utils/textCleaner';
import type { SanityClient } from '@sanity/client';

// Wrap the loadQuery function to clean data after fetching
export function createCleanLoadQuery(loadQuery: any) {
  return async function cleanLoadQuery(...args: any[]) {
    const result = await loadQuery(...args);
    return cleanObject(result);
  };
}

// Helper function to wrap any Sanity query result with cleaning
export async function fetchAndClean<T>(query: string, params?: any): Promise<T> {
  const result = await client.fetch<T>(query, params);
  return cleanObject(result);
}
