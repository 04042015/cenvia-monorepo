// publik/api/og/[slug].tsx
import { ImageResponse } from "@vercel/og";

export const config = {
  runtime: "edge",
};

export default async function handler(req: Request) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug");
  if (!slug) {
    return new Response("Slug not found", { status: 400 });
  }

  // Panggil REST API Supabase langsung (bukan supabase-js client)
  const res = await fetch(
    `https://tkcabkygjxrijuusqopc.supabase.co/rest/v1/posts?slug=eq.${slug}&select=title,thumbnail`,
    {
      headers: {
        apikey: process.env.SUPABASE_PUBLISHABLE_KEY!,
        Authorization: `Bearer ${process.env.SUPABASE_PUBLISHABLE_KEY!}`,
      },
    }
  );

  const [data] = await res.json();

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          background: "white",
          width: "100%",
          height: "100%",
          padding: "40px",
          justifyContent: "center",
          alignItems: "center",
          fontSize: 36,
          textAlign: "center",
        }}
      >
        {data?.thumbnail && (
          <img
            src={data.thumbnail}
            width="600"
            style={{ borderRadius: 12, marginBottom: 20 }}
          />
        )}
        <span style={{ fontWeight: "bold", color: "#111" }}>
          {data?.title}
        </span>
      </div>
    ),
    { width: 1200, height: 630 }
  );
            }
publik/api/og/[slug].disabled.tsx
