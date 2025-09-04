import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

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
  const [categoryName, setCategoryName] = useState<string>("");

  useEffect(() => {
    const fetchArticles = async () => {
      if (!slug) return;
      setLoading(true);

      // Ambil info kategori
      const { data: category } = await supabase
        .from("categories")
        .select("id, name, slug")
        .eq("slug", slug)
        .single();

      if (!category) {
        setArticles([]);
        setLoading(false);
        return;
      }

      setCategoryName(category.name);

      // Ambil artikel sesuai kategori
      const { data } = await supabase
        .from("posts")
        .select("id, title, slug, excerpt, created_at")
        .eq("status", "published")
        .eq("category_id", category.id)
        .order("created_at", { ascending: false });

      setArticles(data || []);
      setLoading(false);
    };

    fetchArticles();
  }, [slug]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-4">
          <Link
            to="/"
            className="inline-block px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
          >
            ← Kembali ke Beranda
          </Link>
        </div>

        {loading ? (
          <h1 className="text-xl font-semibold">Memuat kategori...</h1>
        ) : (
          <h1 className="text-2xl font-bold mb-4 capitalize">
            Kategori: {categoryName || slug}
          </h1>
        )}

        {loading ? (
          <p className="text-gray-500">Memuat artikel...</p>
        ) : articles.length === 0 ? (
          <p className="text-gray-600">Belum ada artikel di kategori ini.</p>
        ) : (
          <ul className="space-y-4">
            {articles.map((article) => (
              <li key={article.id} className="border-b pb-3">
                <Link
                  to={`/post/${article.slug}`}
                  className="text-lg font-semibold text-red-500 hover:underline"
                >
                  {article.title}
                </Link>
                <p className="text-sm text-gray-500 mt-1">{article.excerpt}</p>
                <span className="text-xs text-gray-400">
                  {new Date(article.created_at).toLocaleDateString("id-ID")}
                </span>
              </li>
            ))}
          </ul>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Category;
