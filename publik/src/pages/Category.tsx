import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

type Article = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  created_at: string;
  categories?: {
    name: string;
    slug: string;
  };
};

const Category = () => {
  const { slug } = useParams();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [categoryName, setCategoryName] = useState<string>("");

  useEffect(() => {
    const fetchArticles = async () => {
      if (!slug) return;
      setLoading(true);

      // 1. Ambil ID kategori dari slug
      const { data: category, error: catError } = await supabase
        .from("categories")
        .select("id, name, slug")
        .eq("slug", slug)
        .single();

      if (catError || !category) {
        console.error("Kategori tidak ditemukan:", catError?.message);
        setArticles([]);
        setLoading(false);
        return;
      }

      setCategoryName(category.name);

      // 2. Query posts berdasarkan category_id
      const { data, error } = await supabase
        .from("posts")
        .select(
          `
          id,
          title,
          slug,
          excerpt,
          created_at,
          categories (
            name,
            slug
          )
        `
        )
        .eq("status", "published")
        .eq("category_id", category.id) // ✅ filter berdasarkan kategori
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching posts:", error.message);
      } else {
        setArticles(data || []);
      }

      setLoading(false);
    };

    fetchArticles();
  }, [slug]);

  if (loading) {
    return (
      <main className="p-6">
        <h1 className="text-xl font-semibold">Kategori: {slug}</h1>
        <p className="text-gray-500 mt-2">Memuat artikel...</p>
      </main>
    );
  }

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4 capitalize">
        Kategori: {categoryName || slug}
      </h1>

      {articles.length === 0 ? (
        <p className="text-gray-600">Belum ada artikel di kategori ini.</p>
      ) : (
        <ul className="space-y-4">
          {articles.map((article) => (
            <li key={article.id} className="border-b pb-3">
              <a
                href={`/post/${article.slug}`}
                className="text-lg font-semibold text-red-500 hover:underline"
              >
                {article.title}
              </a>
              <p className="text-sm text-gray-500 mt-1">{article.excerpt}</p>
              <span className="text-xs text-gray-400">
                {new Date(article.created_at).toLocaleDateString("id-ID")}
              </span>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
};

export default Category;
