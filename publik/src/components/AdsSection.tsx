// publik/src/components/AdsSection.tsx
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

interface Ad {
  id: string;
  title: string;
  image_url: string;
  link_url: string;
  description?: string | null;
  position?: string | null;
  status?: string | null;
  start_date?: string | null;
  end_date?: string | null;
}

export default function AdsSection() {
  const [ads, setAds] = useState<Ad[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAds = async () => {
      const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
      const { data, error } = await supabase
        .from("ads")
        .select("*")
        .eq("status", "active")
        .lte("start_date", today)
        .gte("end_date", today);

      if (error) {
        console.error("Error fetching ads:", error);
      } else {
        setAds(data || []);
      }
      setLoading(false);
    };

    fetchAds();
  }, []);

  if (loading) {
    return <p className="text-center py-6">Loading iklan...</p>;
  }

  if (ads.length === 0) {
    return null; // tidak tampil apa-apa kalau tidak ada iklan
  }

  return (
    <div className="my-8 space-y-6">
      {ads.map((ad) => (
        <a
          key={ad.id}
          href={ad.link_url}
          target="_blank"
          rel="noopener noreferrer"
          className="block border rounded-lg overflow-hidden hover:shadow-md transition"
        >
          {ad.image_url && (
            <img
              src={ad.image_url}
              alt={ad.title}
              className="w-full h-56 object-cover"
            />
          )}
          <div className="p-4">
            <h3 className="text-lg font-semibold">{ad.title}</h3>
            {ad.description && (
              <p className="text-sm text-gray-600">{ad.description}</p>
            )}
          </div>
        </a>
      ))}
    </div>
  );
}
