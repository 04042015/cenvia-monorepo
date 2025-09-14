// publik/src/components/ads/AdsHeader.tsx
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

export default function AdsHeader() {
  const [ad, setAd] = useState<Ad | null>(null);

  useEffect(() => {
    const fetchAds = async () => {
      const today = new Date().toISOString().split("T")[0];
      const { data } = await supabase
        .from("ads")
        .select("*")
        .eq("status", "active")
        .eq("position", "header")
        .lte("start_date", today)
        .gte("end_date", today)
        .single();

      setAd(data || null);
    };
    fetchAds();
  }, []);

  if (!ad) return null;

  return (
    <div className="mb-6">
      <AdBanner {...ad} />
    </div>
  );
}
