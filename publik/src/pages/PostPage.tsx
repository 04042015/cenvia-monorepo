import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

interface Post {
  id: string;
  title: string;
  slug: string;
  content: string | null;
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
        .select("id, title, slug, content")
        .eq("slug", slug)
        .eq("status", "published")
        .single();

      if (error) {
        console.warn("Artikel tidak ditemukan:", error.message);
        setPost(null);
      } else {
        setPost(data);
      }
      setLoading(false);
    };

    if (slug) fetchPost();
  }, [slug]);

  if (loading) {
    return <p className="text-center py-10">Loading...</p>;
  }

  if (!post) {
    return <p className="text-center py-10 text-gray-500">Artikel belum ditemukan.</p>;
  }

  return (
    <div className="container mx-auto px-4 py-10 max-w-3xl">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <div
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: post.content || "" }}
      />
    </div>
  );
}
