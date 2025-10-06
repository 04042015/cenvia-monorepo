// publik/src/pages/CategoryPage.tsx
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  thumbnail: string | null;
  published_at: string | null;
  categories: {
    id: string;
    name: string;
    slug: string;
  } | null;
}

const CategoryPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("posts")
        .select(`
          id,
          title,
          slug,
          excerpt,
          thumbnail,
          published_at,
          categories (
            id,
            name,
            slug
          )
        `)
        .eq("status", "published")
        .eq("categories.slug", slug) // filter kategori
        .order("published_at", { ascending: false });

      if (error) {
        console.error("Error fetching posts:", error);
      } else {
        setPosts(data || []);
      }
      setLoading(false);
    };

    if (slug) fetchPosts();
  }, [slug]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-10 text-center text-gray-500 pt-20">
        Loading...
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10 pt-20">
      {/* Judul kategori */}
      <h1 className="text-3xl font-bold mb-6">
        {posts.length > 0 ? posts[0].categories?.name : "Kategori"}
      </h1>

      {/* Kalau belum ada artikel */}
      {posts.length === 0 ? (
        <p className="text-gray-500">Belum ada artikel di kategori ini.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <a
              key={post.id}
              href={`/post/${post.slug}`}
              className="block bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden"
            >
              {post.thumbnail && (
                <img
                  src={post.thumbnail}
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-4">
                <h2 className="text-lg font-semibold mb-2">{post.title}</h2>
                <p className="text-sm text-gray-600 line-clamp-2">
                  {post.excerpt || ""}
                </p>
                <p className="text-xs text-gray-400 mt-2">
                  {post.published_at
                    ? new Date(post.published_at).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })
                    : ""}
                </p>
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
