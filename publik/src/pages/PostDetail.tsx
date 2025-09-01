import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "@/lib/supabaseClient";
import dayjs from "dayjs";
import "dayjs/locale/id";

const PostDetail = () => {
  const { slug } = useParams();
  const [post, setPost] = useState<any>(null);

  useEffect(() => {
    const fetchPost = async () => {
      // Ambil artikel beserta author & kategori
      const { data, error } = await supabase
        .from("posts")
        .select(
          `
          *,
          author:profiles(id, full_name, avatar_url),
          category:categories(id, name, slug)
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
          author:profiles(id, full_name, avatar_url),
          category:categories(id, name, slug)
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

  return (
    <div className="container mx-auto p-4">
      {/* Judul */}
      <h1 className="text-3xl font-bold mb-2">{post.title}</h1>

      {/* Info meta */}
      <div className="flex flex-wrap items-center text-sm text-gray-500 gap-2 mb-6">
        {post.author?.full_name && (
          <>
            <span>{post.author.full_name}</span>
            <span>•</span>
          </>
        )}
        <span>
          {dayjs(post.published_at || post.created_at)
            .locale("id")
            .format("DD MMMM YYYY")}
        </span>
        <span>•</span>
        <span>{post.views} views</span>
        {post.category?.name && (
          <>
            <span>•</span>
            <span className="text-blue-600">{post.category.name}</span>
          </>
        )}
      </div>

      {/* Thumbnail */}
      {post.thumbnail && (
        <img
          src={post.thumbnail}
          alt={post.title}
          className="w-full rounded-lg mb-6"
        />
      )}

      {/* Konten */}
      <div
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </div>
  );
};

export default PostDetail;
