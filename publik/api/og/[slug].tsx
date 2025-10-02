// publik/api/og/[slug].ts
import { ImageResponse } from "@vercel/og";
import { supabase } from "@/lib/supabaseClient";

export const config = {
  runtime: "edge",
};

export default async function handler(req) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug");
  if (!slug) {
    return new Response("Slug not found", { status: 400 });
  }

  const { data } = await supabase
    .from("posts")
    .select("title, thumbnail")
    .eq("slug", slug)
    .single();

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
        <span style={{ fontWeight: "bold", color: "#111" }}>{data?.title}</span>
      </div>
    ),
    { width: 1200, height: 630 }
  );
                   }
