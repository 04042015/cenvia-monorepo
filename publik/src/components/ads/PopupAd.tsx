"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

type PopupAd = {
  id: string;
  title: string | null;
  content_html: string | null;
  frequency_seconds: number | null;
  is_active: boolean;
};

export default function PopupAd() {
  const [ad, setAd] = useState<PopupAd | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchPopupAd = async () => {
      const { data, error } = await supabase
        .from("popup_ads")
        .select("*")
        .eq("is_active", true)
        .order("created_at", { ascending: false })
        .limit(1)
        .single();

      if (error) {
        console.warn("❌ Gagal mengambil popup ad:", error);
        return;
      }

      if (!data) {
        console.log("🚫 Tidak ada popup aktif");
        return;
      }

      const lastClosed = localStorage.getItem(`popup_closed_${data.id}`);
      const now = Date.now();

      // Cek frekuensi kemunculan
      if (
        !lastClosed ||
        (data.frequency_seconds &&
          now - parseInt(lastClosed) > data.frequency_seconds * 1000)
      ) {
        setAd(data);
        setIsOpen(true);
      }
    };

    fetchPopupAd();
  }, []);

  const handleClose = () => {
    if (ad) {
      localStorage.setItem(`popup_closed_${ad.id}`, Date.now().toString());
    }
    setIsOpen(false);
  };

  if (!isOpen || !ad) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full relative p-4">
        {/* Tombol Close */}
        <button
          onClick={handleClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-black text-xl"
        >
          ✕
        </button>

        {/* Judul Iklan */}
        {ad.title && (
          <h2 className="text-lg font-semibold mb-2 text-gray-800">
            {ad.title}
          </h2>
        )}

        {/* Konten HTML iklan */}
        <div
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: ad.content_html || "" }}
        />
      </div>
    </div>
  );
        }
