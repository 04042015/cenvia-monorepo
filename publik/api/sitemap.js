import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_PUBLISHABLE_KEY
);

export async function GET(req, res) {
  try {
    const { data: posts, error } = await supabase
      .from('posts') // ganti sesuai nama tabel
      .select('slug, updated_at');

    if (error) {
      console.error(error);
      return res.status(500).send('Error fetching posts');
    }

    const urls = posts.map(post => `
      <url>
        <loc>https://cenvia.vercel.app/post/${post.slug}</loc>
        <lastmod>${new Date(post.updated_at).toISOString()}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.8</priority>
      </url>
    `).join('');

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>https://cenvia.vercel.app/</loc>
        <changefreq>daily</changefreq>
        <priority>1.0</priority>
      </url>
      ${urls}
    </urlset>`;

    res.setHeader('Content-Type', 'application/xml; charset=utf-8');
res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate');
res.status(200).send(sitemap.trim());
  } 
  catch (err) {
  console.error(err);
  const errorXML = `<?xml version="1.0" encoding="UTF-8"?>
  <error>
    <message>Internal Server Error</message>
  </error>`;
  res.setHeader('Content-Type', 'application/xml; charset=utf-8');
  res.status(500).send(errorXML);
  }
}
