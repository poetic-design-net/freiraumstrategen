import type { LandingPageData } from '$lib/sanity/queries';

export interface PageData {
    query: string;
    params: { slug: string };
    options: {
        initial: LandingPageData | null;
    };
}

export interface RequestEvent {
    locals: {
        loadQuery: <T>(query: string, params?: Record<string, any>) => Promise<T>;
    };
    params: {
        landingPage: string;
    };
}
