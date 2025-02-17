import { client } from '$lib/sanity/client';
import type { RequestHandler } from './$types';

const baseUrl = 'https://www.freiraumstrategen.com';

async function fetchAllPages() {
  const query = `*[_type in ["page", "post", "landingPage"]] {
    _type,
    slug,
    _updatedAt
  }`;
  return await client.fetch(query);
}

const formatDate = (date: string) => {
  return new Date(date).toISOString().split('T')[0];
};

const getPageUrl = (page: any): string => {
  switch (page._type) {
    case 'post':
      return `${baseUrl}/post/${page.slug.current}`;
    case 'landingPage':
      return `${baseUrl}/${page.slug.current}`;
    default:
      return `${baseUrl}/${page.slug.current}`;
  }
};

export const GET: RequestHandler = async () => {
  const pages = await fetchAllPages();
  
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Statische Seiten -->
  <url>
    <loc>${baseUrl}</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${baseUrl}/die-freiraumstrategen</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/blog</loc>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/faq</loc>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>${baseUrl}/kontakt</loc>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>

  <!-- Dynamische Seiten -->
  ${pages
    .map(
      (page: any) => `
  <url>
    <loc>${getPageUrl(page)}</loc>
    <lastmod>${formatDate(page._updatedAt)}</lastmod>
    <changefreq>${page._type === 'post' ? 'weekly' : 'monthly'}</changefreq>
    <priority>${page._type === 'post' ? '0.6' : '0.5'}</priority>
  </url>`
    )
    .join('\n')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600'
    },
  });
};