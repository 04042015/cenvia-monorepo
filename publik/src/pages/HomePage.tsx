// publik/src/pages/HomePage.tsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/lib/supabaseClient";

interface Post {
  id: string;
  title: string;
  slug: string;
  thumbnail?: string | null;
  excerpt?: string | null;
}

export default function HomePage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase
        .from("posts")
        .select("id, title, slug, thumbnail, excerpt")
        .eq("status", "published")
        .order("published_at", { ascending: false })
        .limit(10);

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
    return <p className="text-center py-6">Loading posts...</p>;
  }

  if (posts.length === 0) {
    return <p className="text-center py-6 text-gray-500">Belum ada artikel.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map((post) => (
        <Link
          key={post.id}
          to={`/post/${post.slug}`}
          className="block border rounded-lg overflow-hidden hover:shadow-md transition"
        >
          {post.thumbnail && (
            <img
              src={post.thumbnail}
              alt={post.title}
              className="h-48 w-full object-cover"
            />
          )}
          <div className="p-4">
            <h2 className="text-lg font-bold mb-2">{post.title}</h2>
            {post.excerpt && (
              <p className="text-sm text-gray-600">{post.excerpt}</p>
            )}
          </div>
        </Link>
      ))}
    </div>
  );
            }
