export async function GET() {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://kapi-ureticileri.web.app/</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
  </url>
  <url>
    <loc>https://kapi-ureticileri.web.app/about/</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
  </url>
  <url>
    <loc>https://kapi-ureticileri.web.app/hakkimizda/</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
  </url>
  <url>
    <loc>https://kapi-ureticileri.web.app/iletisim/</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
  </url>
  <url>
    <loc>https://kapi-ureticileri.web.app/pvc-kapilar/</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
  </url>
  <url>
    <loc>https://kapi-ureticileri.web.app/urunlerimiz/</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
  </url>
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}