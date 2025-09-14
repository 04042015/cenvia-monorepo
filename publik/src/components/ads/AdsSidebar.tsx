// publik/src/components/ads/AdsSidebar.tsx
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import AdBanner from "./AdBanner";

interface Ad {
  id: string;
  title: string;
  image_url: string;
  link_url: string;
  description?: string | null;
  position: string;
  status: string;
  start_date?: string | null;
  end_date?: string | null;
}

export default function AdsSidebar() {
  const [ads, setAds] = useState<Ad[]>([]);

  useEffect(() => {
    const fetchAds = async () => {
      const today = new Date().toISOString().split("T")[0];
      const { data } = await supabase
        .from("ads")
        .select("*")
        .eq("status", "active")
        .eq("position", "sidebar")
        .lte("start_date", today)
        .gte("end_date", today);

      setAds(data || []);
    };
    fetchAds();
  }, []);

  if (ads.length === 0) return null;

  return (
    <aside className="space-y-4">
      {ads.map((ad) => (
        <AdBanner key={ad.id} {...ad} />
      ))}
    </aside>
  );
}
