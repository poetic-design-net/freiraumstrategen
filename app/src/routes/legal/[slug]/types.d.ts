import type { PortableTextBlock } from '@portabletext/types';

export interface LegalPage {
    title: string;
    content: PortableTextBlock[];
}

export interface PageData {
    query: string;
    params: { slug: string };
    options: {
        initial: LegalPage | null;
    };
}
