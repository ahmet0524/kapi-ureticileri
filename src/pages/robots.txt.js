export async function GET() {
  const robotsTxt = `User-agent: *
Allow: /

Sitemap: https://kapi-ureticileri.web.app/sitemap-index.xml`;

  return new Response(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600'
    }
  });
}