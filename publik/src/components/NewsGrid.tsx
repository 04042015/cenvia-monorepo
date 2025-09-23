import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import NewsCard from "./NewsCard";
import { useNavigate } from "react-router-dom";

type Post = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  thumbnail: string | null;
  category: { name: string } | null;
  published_at: string;
};

const NewsGrid = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase
        .from("posts")
        .select(`
          id,
          title,
          slug,
          excerpt,
          thumbnail,
          published_at,
          category:categories(name)
        `)
        .eq("status", "published")
        .order("published_at", { ascending: false })
        .limit(12);

      if (error) {
        console.error("Error fetching posts:", error);
      } else {
        setPosts(data || []);
      }
      setLoading(false);
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (posts.length === 0) {
    return <div className="text-center text-gray-500">Belum ada artikel.</div>;
  }

  const handleClick = async (slug: string) => {
    // ✅ Ambil script popup dari Supabase
    const { data: ad, error } = await supabase
      .from("script_ads")
      .select("code")
      .eq("position", "popup")
      .eq("status", "active")
      .maybeSingle();

    const adWin = window.open(
      "",
      "adWindow",
      "width=600,height=400"
    );

    if (adWin) {
      adWin.document.write(`
        <html>
          <head><title>Advertisement</title></head>
          <body style="margin:0;padding:0;overflow:hidden;">
            ${ad?.code || "<p>Tidak ada iklan popup</p>"}
          </body>
        </html>
      `);
      adWin.document.close();
    }

    // setelah popup ditutup, redirect ke artikel
    const checkClosed = setInterval(() => {
      if (adWin && adWin.closed) {
        clearInterval(checkClosed);
        navigate(`/post/${slug}`);
      }
    }, 500);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map((post) => (
        <div key={post.id} onClick={() => handleClick(post.slug)}>
          <NewsCard
            slug={post.slug}
            title={post.title}
            excerpt={post.excerpt}
            image={post.thumbnail || "/placeholder.jpg"}
            category={post.category?.name || "Uncategorized"}
            timeAgo={new Date(post.published_at).toLocaleDateString("id-ID")}
          />
        </div>
      ))}
    </div>
  );
};

export default NewsGrid;
