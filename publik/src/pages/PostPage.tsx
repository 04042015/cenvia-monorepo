import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

console.log("🔥 Rendered PostPage")

interface Post {
  id: string;
  title: string;
  slug: string;
  content: string | null;
  excerpt: string | null;
  thumbnail: string | null;
  published_at: string | null;
  views: number;
  categories: {
    id: string;
    name: string;
    slug: string;
  } | null;
  profiles: {
    user_id: string;
    full_name: string | null;
    avatar_url: string | null;
  } | null;
}

export default function PostPage() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("posts")
        .select(`
          id,
          title,
          slug,
          content,
          excerpt,
          thumbnail,
          published_at,
          views,
          categories (
            id,
            name,
            slug
          ),
          profiles:author_id (
            user_id,
            full_name,
            avatar_url
          )
        `)
        .eq("slug", slug)
        .eq("status", "published")
        .single();

      if (error) {
        console.error("Error fetching post:", error);
        setPost(null);
      } else {
        setPost(data);
      }
      setLoading(false);
    };

    if (slug) fetchPost();
  }, [slug]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-10 text-center text-gray-500">
        Loading...
      </div>
    );
  }

  if (!post) {
    return (
      <div className="container mx-auto px-4 py-10 text-center text-gray-500">
        Artikel tidak ditemukan.
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10 max-w-3xl">
      {/* Thumbnail */}
      {post.thumbnail && (
        <img
          src={post.thumbnail}
          alt={post.title}
          className="w-full h-72 object-cover rounded-xl mb-6"
        />
      )}

      {/* Judul */}
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>

      {/* Meta info */}
      <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
        {post.profiles?.avatar_url && (
          <img
            src={post.profiles.avatar_url}
            alt={post.profiles.full_name || "Author"}
            className="w-8 h-8 rounded-full"
          />
        )}
        <span>{post.profiles?.full_name || "Unknown Author"}</span>
        <span>•</span>
        <span>
          {post.published_at
            ? new Date(post.published_at).toLocaleDateString("id-ID", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })
            : ""}
        </span>
        <span>•</span>
        <span>{post.views} views</span>
      </div>

      {/* Konten */}
      <div
        className="prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: post.content || "" }}
      />
    </div>
  );
}
