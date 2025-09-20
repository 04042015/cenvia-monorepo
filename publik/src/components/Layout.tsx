// publik/src/components/Layout.tsx
import { ReactNode, useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { supabase } from "@/lib/supabaseClient";
import AdSlot from "@/components/ads/AdSlot"; // ✅ import AdSlot

interface LayoutProps {
  children: ReactNode;
  onNetworkClick?: () => void;
}

interface Ad {
  id: string;
  position: string;
  script: string;
  status: boolean;
}

export default function Layout({ children, onNetworkClick }: LayoutProps) {
  const [ads, setAds] = useState<Ad[]>([]);

  useEffect(() => {
    const fetchAds = async () => {
      const { data, error } = await supabase
        .from("ads")
        .select("*")
        .eq("status", true);

      if (error) {
        console.error("Gagal mengambil iklan:", error);
      } else {
        // 🚫 filter iklan popup supaya tidak ikut aktif
        const filtered = (data || []).filter((ad: Ad) => ad.position !== "popup");
        setAds(filtered);
      }
    };

    fetchAds();
  }, []);

  return (
    <div className="w-full min-h-screen flex flex-col bg-white">
      {/* Header */}
      <Header onNetworkClick={onNetworkClick || (() => {})} />
      <AdSlot position="header" />

      {/* 🚫 Popup Ads sudah tidak dipakai */}
      {/* <PopupAd /> */}

      {/* Main content */}
      <main className="flex-1 w-full px-4 py-6 flex justify-center">
        <div className="grid grid-cols-12 gap-6 w-full max-w-6xl">
          {/* Left Ads */}
          <aside className="hidden lg:block col-span-2">
            <AdSlot position="left" />
          </aside>

          {/* Content */}
          <div className="col-span-12 lg:col-span-8 space-y-4">
            <AdSlot position="content" />
            {children}
          </div>

          {/* Right Ads */}
          <aside className="hidden lg:block col-span-2">
            <AdSlot position="right" />
          </aside>
        </div>
      </main>

      {/* Footer */}
      <AdSlot position="footer" />
      <Footer />
    </div>
  );
}
