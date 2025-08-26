import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import NewsCard from "./NewsCard";
import { Link } from "react-router-dom"; // ✅ tambahkan

type Post = {
  id: string;
  title: string;
  slug: string; // ✅ tambahkan slug
  excerpt: string;
  thumbnail: string | null;
  category: { name: string } | null;
  published_at: string;
};

const NewsGrid = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase
        .from("posts")
        .select(`
          id,
          title,
          slug,  -- ✅ ambil slug dari Supabase
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

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map((post) => (
        <Link key={post.id} to={`/post/${post.slug}`}>
          <NewsCard
            id={post.id}
            title={post.title}
            excerpt={post.excerpt}
            image={post.thumbnail || "/placeholder.jpg"}
            category={post.category?.name || "Uncategorized"}
            timeAgo={new Date(post.published_at).toLocaleDateString()}
          />
        </Link>
      ))}
    </div>
  );
};

export default NewsGrid;
