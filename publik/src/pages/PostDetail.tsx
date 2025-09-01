import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "@/lib/supabaseClient";
import dayjs from "dayjs";

const PostDetail = () => {
  const { slug } = useParams();
  const [post, setPost] = useState<any>(null);

  useEffect(() => {
    const fetchPost = async () => {
      const { data, error } = await supabase
        .from("posts")
        .select(
          `
          *,
          author:profiles(full_name, avatar_url),
          category:categories(name, slug, color)
        `
        )
        .eq("slug", slug)
        .single();

      if (error || !data) {
        console.error("Gagal ambil post:", error);
        return;
      }

      // Increment views
      const { error: rpcError } = await supabase.rpc("increment_post_views", {
        post_id: data.id,
      });
      if (rpcError) console.error("Gagal increment views:", rpcError);

      // Ambil ulang biar sinkron views
      const { data: refreshed } = await supabase
        .from("posts")
        .select(
          `
          *,
          author:profiles(full_name, avatar_url),
          category:categories(name, slug, color)
        `
        )
        .eq("id", data.id)
        .single();

      setPost(refreshed || data);
    };

    if (slug) fetchPost();
  }, [slug]);

  if (!post) return <p>Loading...</p>;

  return (
    <div className="container mx-auto px-4 md:px-8 lg:px-20 py-6">
      {/* Thumbnail */}
      {post.thumbnail && (
        <img
          src={post.thumbnail}
          alt={post.title}
          className="w-full rounded-xl shadow mb-6 max-h-[500px] object-cover"
        />
      )}

      {/* Judul */}
      <h1 className="text-3xl md:text-4xl font-bold mb-3 leading-snug">
        {post.title}
      </h1>

      {/* Excerpt */}
      {post.excerpt && (
        <p className="text-lg text-gray-600 mb-4 italic">{post.excerpt}</p>
      )}

      {/* Meta info */}
      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-6">
        <span>{dayjs(post.published_at).format("DD MMMM YYYY HH:mm")}</span>
        <span>•</span>
        {post.author && (
          <span className="flex items-center gap-2">
            {post.author.avatar_url && (
              <img
                src={post.author.avatar_url}
                alt={post.author.full_name}
                className="w-6 h-6 rounded-full object-cover"
              />
            )}
            {post.author.full_name}
          </span>
        )}
        {post.category && (
          <>
            <span>•</span>
            <span
              className="px-2 py-1 rounded text-white text-xs font-medium"
              style={{ backgroundColor: post.category.color || "#333" }}
            >
              {post.category.name}
            </span>
          </>
        )}
        <span>•</span>
        <span>{post.views} views</span>
      </div>

      {/* Konten */}
      <div
        className="prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </div>
  );
};

export default PostDetail;
