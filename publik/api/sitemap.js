import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

export default async function handler(req, res) {
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

    res.setHeader('Content-Type', 'application/xml');
    res.status(200).send(sitemap);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
}
