import type { APIRoute } from 'astro';

export const GET: APIRoute = () => {
  return new Response(`User-agent: *
Allow: /
Sitemap: https://kapi-ureticileri.vercel.app/sitemap-index.xml
`, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600'
    }
  });
};
