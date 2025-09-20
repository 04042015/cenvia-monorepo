// publik/src/components/ads/PopupAd.tsx
"use client";

import { useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function PopupAd() {
  useEffect(() => {
    const fetchPopupAd = async () => {
      const { data, error } = await supabase
        .from("script_ads")
        .select("*")
        .eq("status", "active")
        .eq("position", "popup")
        .maybeSingle();

      if (error) {
        console.warn("❌ Gagal mengambil popup ad:", error);
        return;
      }

      if (!data || !data.code) {
        console.log("🚫 Tidak ada popup aktif");
        return;
      }

      console.log("✅ Popup ad ditemukan, menyuntikkan script...");

      // Hapus popup lama kalau ada
      const oldPopup = document.getElementById("popup-ad-container");
      if (oldPopup) oldPopup.remove();

      // Buat container baru
      const container = document.createElement("div");
      container.id = "popup-ad-container";
      document.body.appendChild(container);

      // Cari URL src dari data.code
      const match = data.code.match(/src=["']([^"']+)["']/);
      if (match) {
        const script = document.createElement("script");
        script.type = "text/javascript";
        script.async = true;
        script.src = match[1]; // ✅ ambil src dari Supabase
        container.appendChild(script);
      } else {
        console.warn("⚠️ Script popup tidak valid:", data.code);
      }
    };

    fetchPopupAd();
  }, []);

  return null; // tidak render apapun
}
