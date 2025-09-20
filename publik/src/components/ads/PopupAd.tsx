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
        .maybeSingle(); // ✅ supaya tidak error 406

      if (error) {
        console.warn("Gagal mengambil popup ad:", error);
        return;
      }

      // Jika tidak ada popup aktif, jangan lakukan apa-apa
      if (!data || !data.code) {
        console.log("🚫 Tidak ada popup aktif");
        return;
      }

      console.log("✅ Popup ad ditemukan, menyuntikkan script...");

      // Hapus dulu popup lama
      const oldPopup = document.getElementById("popup-ad-container");
      if (oldPopup) oldPopup.remove();

      // Buat container popup
      const container = document.createElement("div");
      container.id = "popup-ad-container";
      document.body.appendChild(container);

      // Masukkan script iklan
      container.innerHTML = data.code;

      // Eksekusi ulang semua <script>
      const scripts = container.getElementsByTagName("script");
      for (let i = 0; i < scripts.length; i++) {
        const oldScript = scripts[i];
        const newScript = document.createElement("script");

        if (oldScript.src) {
          newScript.src = oldScript.src;
        }
        if (oldScript.innerHTML) {
          newScript.innerHTML = oldScript.innerHTML;
        }

        container.appendChild(newScript);
      }
    };

    fetchPopupAd();
  }, []);

  return null; // 🚫 Tidak render apapun di React, hanya inject ke <body>
}
