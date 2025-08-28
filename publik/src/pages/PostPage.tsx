import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

interface Post {
  id: string;
  title: string;
  content: string | null;
}

export default function PostPage() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      const { data, error } = await supabase
        .from("posts")
        .select("id, title, content")
        .eq("slug", slug)
        .eq("status", "published")
        .single();

      if (error) {
        console.error("Error fetching post:", error);
      } else {
        setPost(data);
      }
      setLoading(false);
    };

    if (slug) fetchPost();
  }, [slug]);

  if (loading) return <p>Loading...</p>;
  if (!post) return <p>Artikel tidak ditemukan.</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <div
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: post.content || "" }}
      />
    </div>
  );
}
