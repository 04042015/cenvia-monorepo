import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";

interface Post {
  id: string;
  title: string;
  slug: string;
}

export default function HomePage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase
        .from("posts")
        .select("id, title, slug")
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

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">🚀 React Router Minimal</h1>
      <nav className="mb-6">
        <Link to="/" className="mr-4 text-blue-600">Home</Link>
        <Link to="/post" className="text-blue-600">Post</Link>
      </nav>

      {loading ? (
        <p>Loading posts...</p>
      ) : posts.length === 0 ? (
        <p className="text-gray-500">Belum ada artikel.</p>
      ) : (
        <ul className="space-y-2">
          {posts.map((post) => (
            <li key={post.id}>
              <Link
                to={`/post/${post.slug}`}
                className="text-blue-600 hover:underline"
              >
                {post.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
