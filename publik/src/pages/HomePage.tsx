// publik/src/pages/HomePage.tsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/lib/supabaseClient";
import AdBanner from "@/components/ads/AdBanner";
import AdsInline from "@/components/ads/AdsInline"; // ✅ import AdsInline

interface Post {
  id: string;
  title: string;
  slug: string;
  thumbnail?: string | null;
  excerpt?: string | null;
}

interface Ad {
  id: string;
  title: string;
  image_url: string;
  link_url: string;
  description?: string | null;
  position: string;
  status: string;
}

export default function HomePage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [ads, setAds] = useState<Ad[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase
        .from("posts")
        .select("id, title, slug, thumbnail, excerpt")
        .eq("status", "published")
        .order("published_at", { ascending: false })
        .limit(10);

      if (!error) setPosts(data || []);
    };

    const fetchAds = async () => {
      const today = new Date().toISOString().split("T")[0];
      const { data, error } = await supabase
        .from("ads")
        .select("*")
        .eq("status", "active")
        .lte("start_date", today)
        .gte("end_date", today);

      if (!error) setAds(data || []);
    };

    Promise.all([fetchPosts(), fetchAds()]).finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <p className="text-center py-6">Loading...</p>;
  }

  // Filter iklan berdasarkan posisi
  const headerAds = ads.filter((ad) => ad.position === "header");
  const sidebarAds = ads.filter((ad) => ad.position === "sidebar");
  const footerAds = ads.filter((ad) => ad.position === "footer");

  return (
    <div className="space-y-6 pt-36 md:pt-32"> {/* ✅ Tambah padding-top biar tidak ketutupan header & breaking news */}
      {/* Header Ads */}
      {headerAds.length > 0 && (
        <div className="space-y-4">
          {headerAds.map((ad) => (
            <AdBanner key={ad.id} {...ad} />
          ))}
        </div>
      )}

      {/* Konten utama */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Artikel */}
        <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {posts.length === 0 ? (
            <p className="text-center py-6 text-gray-500">Belum ada artikel.</p>
          ) : (
            posts.map((post, index) => (
              <div key={post.id}>
                <Link
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
                    <h2 className="text-lg font-bold mb-2 line-clamp-2 leading-snug">
                      {post.title}
                    </h2>
                    {post.excerpt && (
                      <p className="text-sm text-gray-600 line-clamp-3">
                        {post.excerpt}
                      </p>
                    )}
                  </div>
                </Link>

                {/* ✅ AdsInline setelah artikel ke-2 */}
                {index === 1 && <AdsInline />}
              </div>
            ))
          )}
        </div>

        {/* Sidebar Ads */}
        <aside className="lg:col-span-1 space-y-4">
          {sidebarAds.map((ad) => (
            <AdBanner key={ad.id} {...ad} />
          ))}
        </aside>
      </div>

      {/* Footer Ads */}
      {footerAds.length > 0 && (
        <div className="space-y-4">
          {footerAds.map((ad) => (
            <AdBanner key={ad.id} {...ad} />
          ))}
        </div>
      )}
    </div>
  );
    }
