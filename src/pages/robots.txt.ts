export function GET() {
  const body = `User-agent: *
Allow: /
Sitemap: https://kapi-ureticileri.vercel.app/sitemap-index.xml`;

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600'
    }
  });
}
