// publik/src/pages/api/og/[slug].ts
import { supabase } from "@/lib/supabaseClient";
import { ImageResponse } from "@vercel/og";

// Konfigurasi OG Image (pakai Vercel OG, Next API bisa jalan di Vite pakai adapter server)
export const config = {
  runtime: "edge",
};

export default async function handler(req: Request) {
  const { pathname } = new URL(req.url);
  const slug = pathname.split("/").pop();

  if (!slug) {
    return new Response("Slug not found", { status: 400 });
  }

  const { data: post } = await supabase
    .from("posts")
    .select("title, thumbnail")
    .eq("slug", slug)
    .single();

  if (!post) {
    return new Response("Post not found", { status: 404 });
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#fff",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          fontSize: 40,
          fontWeight: "bold",
          padding: "40px",
          textAlign: "center",
        }}
      >
        {post.thumbnail ? (
          <img
            src={post.thumbnail}
            alt={post.title}
            style={{
              width: "100%",
              height: "60%",
              objectFit: "cover",
              borderRadius: "12px",
              marginBottom: "20px",
            }}
          />
        ) : null}
        <div>{post.title}</div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
