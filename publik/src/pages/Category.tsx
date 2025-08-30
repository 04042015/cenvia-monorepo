import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient"; // ✅ pastikan path sesuai project-mu

type Article = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  created_at: string;
};

const Category = () => {
  const { slug } = useParams();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      if (!slug) return;
      setLoading(true);

      const { data, error } = await supabase
        .from("articles")
        .select("id, title, slug, excerpt, created_at")
        .eq("category", slug) // ✅ ambil sesuai kategori
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching articles:", error.message);
      } else {
        setArticles(data || []);
      }

      setLoading(false);
    };

    fetchArticles();
  }, [slug]);

  if (loading) {
    return (
      <main className="p-6 font-abel">
        <h1 className="text-xl font-semibold">Kategori: {slug}</h1>
        <p className="text-gray-500 mt-2">Memuat artikel...</p>
      </main>
    );
  }

  return (
    <main className="p-6 font-abel">
      <h1 className="text-2xl font-bold mb-4 capitalize">Kategori: {slug}</h1>

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
