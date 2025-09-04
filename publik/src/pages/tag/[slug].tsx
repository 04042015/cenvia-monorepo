// publik/src/pages/TagDetail.tsx
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

const TagDetail = () => {
  const { slug } = useParams();
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    const fetchTagPosts = async () => {
      const { data, error } = await supabase
        .from("tags")
        .select(`
          id, name, slug,
          posts:post_tags(post:posts(id, title, slug, thumbnail))
        `)
        .eq("slug", slug)
        .single();

      if (!error && data) setPosts(data.posts.map((p: any) => p.post));
    };
    if (slug) fetchTagPosts();
  }, [slug]);

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">Artikel dengan tag: {slug}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts.map((p) => (
          <Link
            key={p.id}
            to={`/post/${p.slug}`}
            className="border rounded-lg p-3 hover:shadow"
          >
            {p.thumbnail && (
              <img
                src={p.thumbnail}
                alt={p.title}
                className="h-40 w-full object-cover rounded"
              />
            )}
            <h2 className="mt-2 font-medium">{p.title}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TagDetail;
