// publik/src/components/Layout.tsx
import { ReactNode, useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { supabase } from "@/lib/supabaseClient";
import PopupAd from "@/components/ads/PopupAd";
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
        setAds(data || []);

        // Suntikkan script agar benar-benar dieksekusi
        (data || []).forEach((ad: Ad) => {
          const wrapper = document.createElement("div");
          wrapper.innerHTML = ad.script;

          const scripts = wrapper.querySelectorAll("script");
          scripts.forEach((oldScript) => {
            const newScript = document.createElement("script");
            if (oldScript.src) {
              newScript.src = oldScript.src;
            } else {
              newScript.textContent = oldScript.innerHTML;
            }
            document.body.appendChild(newScript);
          });
        });
      }
    };

    fetchAds();
  }, []);

  return (
    <div className="w-full min-h-screen flex flex-col bg-white">
      {/* Header */}
      <Header onNetworkClick={onNetworkClick || (() => {})} />
      <AdSlot position="header" /> {/* ✅ Iklan di header */}

      {/* Popup Ads ✅ muncul di semua halaman */}
      <PopupAd />

      {/* Main content */}
      <main className="flex-1 w-full container mx-auto px-4 py-6">
        <div className="grid grid-cols-12 gap-6">
          {/* Content */}
          <div className="col-span-12 lg:col-span-8 space-y-4">
            <AdSlot position="content" /> {/* ✅ Iklan dalam konten */}
            {children}
          </div>

          {/* Sidebar */}
          <aside className="col-span-12 lg:col-span-4 space-y-4">
            <AdSlot position="sidebar" /> {/* ✅ Iklan sidebar */}
          </aside>
        </div>
      </main>

      {/* Footer */}
      <AdSlot position="footer" /> {/* ✅ Iklan di footer */}
      <Footer />
    </div>
  );
}
