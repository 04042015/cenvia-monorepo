import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import NewsCard from "./NewsCard";

type Article = {
  id: number;
  title: string;
  image_url: string | null;
  category: string;
  created_at: string;
  excerpt: string;
};

const NewsGrid = () => {
  const [newsData, setNewsData] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      const { data, error } = await supabase
        .from("posts")
        .select("id, title, image_url, category, created_at, excerpt, status")
        .eq("status", "published")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching news:", error.message);
      } else {
        setNewsData(data || []);
      }
      setLoading(false);
    };

    fetchNews();
  }, []);

  if (loading) return <p className="text-center py-10">Loading berita...</p>;
  if (!loading && newsData.length === 0)
    return <p className="text-center py-10">Belum ada berita tersedia.</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {newsData.map((article) => (
        <NewsCard
          key={article.id}
          id={article.id}
          title={article.title}
          image={article.image_url || "/default-news.jpg"}
          category={article.category}
          timeAgo={new Date(article.created_at).toLocaleDateString("id-ID", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })}
          excerpt={article.excerpt}
        />
      ))}
    </div>
  );
};

export default NewsGrid;
