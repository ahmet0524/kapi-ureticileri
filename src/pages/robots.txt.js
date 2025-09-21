export async function GET() {
  return new Response(`User-agent: *
Allow: /

Sitemap: https://kapi-ureticileri.netlify.app/sitemap-index.xml`, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8'
    }
  });
}