// publik/api/sitemap.js
// Compatible for Vercel serverless functions (CommonJS style)
const fetch = (...args) => import('node-fetch').then(({default: f}) => f(...args));

module.exports = async (req, res) => {
  try {
    const SUPABASE_URL = process.env.SUPABASE_URL;
    const SUPABASE_KEY = process.env.SUPABASE_PUBLISHABLE_KEY || process.env.SUPABASE_ANON_KEY;

    if (!SUPABASE_URL || !SUPABASE_KEY) {
      console.error('Missing SUPABASE env vars:', { SUPABASE_URL: !!SUPABASE_URL, SUPABASE_KEY: !!SUPABASE_KEY });
      res.setHeader('Content-Type', 'application/xml; charset=utf-8');
      res.status(500).send(`<?xml version="1.0" encoding="UTF-8"?><error><message>Server misconfiguration: missing SUPABASE env vars</message></error>`);
      return;
    }

    // simple safe fetch to Supabase REST endpoint (no supabase-js heavy dependency)
    // adjust table name / select columns if needed
    const url = `${SUPABASE_URL}/rest/v1/posts?select=slug,updated_at&status=eq.published&order=updated_at.desc`;
    const r = await fetch(url, {
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`
      }
    });

    if (!r.ok) {
      const text = await r.text().catch(()=>'<no-body>');
      console.error('Supabase fetch failed', r.status, text);
      res.setHeader('Content-Type', 'application/xml; charset=utf-8');
      res.status(500).send(`<?xml version="1.0" encoding="UTF-8"?><error><message>Failed to fetch posts from Supabase</message></error>`);
      return;
    }

    const posts = await r.json();

    const BASE_URL = 'https://cenvia.vercel.app';
    const urls = (posts || []).map(post => `
      <url>
        <loc>${BASE_URL}/post/${escapeXml(post.slug)}</loc>
        <lastmod>${(post.updated_at ? new Date(post.updated_at).toISOString() : new Date().toISOString())}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.8</priority>
      </url>`).join('');

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${BASE_URL}</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  ${urls}
</urlset>`;

    res.setHeader('Content-Type', 'application/xml; charset=utf-8');
    // cache 1 hour on Vercel edge
    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate');
    res.status(200).send(sitemap.trim());
  } catch (err) {
    console.error('Unhandled error in sitemap handler:', err);
    res.setHeader('Content-Type', 'application/xml; charset=utf-8');
    res.status(500).send(`<?xml version="1.0" encoding="UTF-8"?><error><message>Internal Server Error</message></error>`);
  }
};

// small helper to escape XML special chars
function escapeXml(str) {
  if (!str) return '';
  return String(str).replace(/[<>&'"]/g, function (c) {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case '\'': return '&apos;';
      case '"': return '&quot;';
    }
  });
      }
