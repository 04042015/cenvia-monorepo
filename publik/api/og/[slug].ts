// api/og/[slug].ts
import { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY! // pakai service role biar bisa read tanpa RLS masalah
);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { slug } = req.query;

  if (!slug || typeof slug !== "string") {
    return res.status(400).send("Slug is required");
  }

  // Ambil artikel dari Supabase
  const { data: post, error } = await supabase
    .from("posts")
    .select("title, excerpt, thumbnail, slug")
    .eq("slug", slug)
    .single();

  if (error || !post) {
    return res.status(404).send("Post not found");
  }

  const siteUrl = "https://cenvia.vercel.app"; // ganti sesuai domainmu
  const postUrl = `${siteUrl}/post/${post.slug}`;

  // HTML dengan OG meta tag
  const html = `
    <!DOCTYPE html>
    <html lang="id">
    <head>
      <meta charset="utf-8">
      <title>${post.title}</title>
      <meta name="description" content="${post.excerpt}">

      <!-- Open Graph -->
      <meta property="og:title" content="${post.title}" />
      <meta property="og:description" content="${post.excerpt}" />
      <meta property="og:image" content="${post.thumbnail}" />
      <meta property="og:url" content="${postUrl}" />
      <meta property="og:type" content="article" />

      <!-- Twitter Card -->
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="${post.title}" />
      <meta name="twitter:description" content="${post.excerpt}" />
      <meta name="twitter:image" content="${post.thumbnail}" />

      <meta http-equiv="refresh" content="0; url=${postUrl}" />
    </head>
    <body>
      <p>Redirecting to <a href="${postUrl}">${postUrl}</a></p>
    </body>
    </html>
  `;

  res.setHeader("Content-Type", "text/html");
  return res.status(200).send(html);
}
