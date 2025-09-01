import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "@/lib/supabaseClient";

const PostDetail = () => {
  const { slug } = useParams();
  const [post, setPost] = useState<any>(null);

  useEffect(() => {
    const fetchPost = async () => {
      // Ambil artikel beserta kategori & penulis
      const { data, error } = await supabase
        .from("posts")
        .select(
          `
          *,
          categories (id, name, slug),
          profiles (full_name, avatar_url)
        `
        )
        .eq("slug", slug)
        .single();

      if (error || !data) {
        console.error("Gagal ambil post:", error);
        return;
      }

      // Increment views via RPC
      const { error: rpcError } = await supabase.rpc("increment_post_views", {
        post_id: data.id,
      });
      if (rpcError) {
        console.error("Gagal increment views:", rpcError);
      }

      // Ambil ulang post biar views sinkron
      const { data: refreshed, error: refreshError } = await supabase
        .from("posts")
        .select(
          `
          *,
          categories (id, name, slug),
          profiles (full_name, avatar_url)
        `
        )
        .eq("id", data.id)
        .single();

      if (refreshError || !refreshed) {
        console.error("Gagal refresh post:", refreshError);
        setPost(data); // fallback
        return;
      }

      setPost(refreshed);
    };

    if (slug) fetchPost();
  }, [slug]);

  if (!post) return <p>Loading...</p>;

  const publishedAt = new Date(post.created_at).toLocaleString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="container mx-auto px-4 py-6 max-w-4xl">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 mb-4">
        <Link to="/" className="hover:underline">Home</Link> ›{" "}
        <Link to={`/kategori/${post.categories?.slug}`} className="hover:underline">
          {post.categories?.name}
        </Link>
      </div>

      {/* Judul */}
      <h1 className="text-3xl md:text-4xl font-bold mb-2">{post.title}</h1>

      {/* Info Penulis */}
      <div className="flex items-center text-sm text-gray-600 mb-6">
        {post.profiles?.avatar_url && (
          <img
            src={post.profiles.avatar_url}
            alt={post.profiles.full_name}
            className="w-8 h-8 rounded-full mr-2"
          />
        )}
        <span>{post.profiles?.full_name || "Redaksi"}</span>
        <span className="mx-2">•</span>
        <span>{publishedAt} WIB</span>
        <span className="mx-2">•</span>
        <span>{post.views}x dibaca</span>
      </div>

      {/* Gambar Utama */}
      {post.thumbnail && (
        <div className="mb-4">
          <img
            src={post.thumbnail}
            alt={post.title}
            className="rounded-lg w-full max-h-[480px] object-cover"
          />
          {post.caption && (
            <p className="text-xs text-gray-500 mt-2">{post.caption}</p>
          )}
        </div>
      )}

      {/* Isi Artikel */}
      <div
        className="prose prose-lg max-w-none leading-relaxed"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      {/* Share Buttons */}
      <div className="mt-8 border-t pt-4">
        <p className="text-sm text-gray-500 mb-2">Bagikan artikel ini:</p>
        <div className="flex gap-3">
          <a
            href={`https://wa.me/?text=${encodeURIComponent(window.location.href)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1 rounded bg-green-500 text-white text-sm"
          >
            WhatsApp
          </a>
          <a
            href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1 rounded bg-sky-500 text-white text-sm"
          >
            Twitter
          </a>
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1 rounded bg-blue-600 text-white text-sm"
          >
            Facebook
          </a>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
