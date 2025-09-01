import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "@/lib/supabaseClient";

const PostDetail = () => {
  const { slug } = useParams();
  const [post, setPost] = useState<any>(null);

  useEffect(() => {
    const fetchPost = async () => {
      // Ambil artikel berdasarkan slug
      const { data, error } = await supabase
        .from("posts")
        .select("*")
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
        .select("*")
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
      <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
      <p className="text-gray-500 text-sm mb-6">Views: {post.views}</p>
      <div
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </div>
  );
};

export default PostDetail;
