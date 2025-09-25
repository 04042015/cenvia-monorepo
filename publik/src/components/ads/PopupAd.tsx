"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function PopupAd() {
  const [popupCode, setPopupCode] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const fetchPopupAd = async () => {
      const { data, error } = await supabase
        .from("popup_ads")
        .select("code")
        .eq("status", "active")
        .maybeSingle();

      if (error) {
        console.error("❌ Gagal fetch popup ad:", error);
        return;
      }

      if (data && data.code) {
        setPopupCode(data.code);
        setVisible(true);
      } else {
        console.log("🚫 Tidak ada popup aktif");
      }
    };

    fetchPopupAd();
  }, []);

  useEffect(() => {
    if (popupCode) {
      // Buat container sementara untuk parsing HTML
      const container = document.createElement("div");
      container.innerHTML = popupCode;

      // Jalankan semua <script> manual
      const scripts = container.querySelectorAll("script");
      scripts.forEach((oldScript) => {
        const newScript = document.createElement("script");
        if (oldScript.src) {
          newScript.src = oldScript.src;
          newScript.async = true;
        } else {
          newScript.textContent = oldScript.textContent;
        }
        document.getElementById("popup-ad-slot")?.appendChild(newScript);
      });
    }
  }, [popupCode]);

  if (!visible) return null;

  return (
    <div
      id="popup-ad-container"
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50"
    >
      <div className="relative bg-white p-4 rounded-lg shadow-lg max-w-xs w-full">
        {/* Tombol X */}
        <button
          onClick={() => setVisible(false)}
          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
        >
          ✕
        </button>

        {/* Slot iklan */}
        <div id="popup-ad-slot" className="w-full h-full text-center">
          {/* Script iklan akan disuntikkan di sini */}
        </div>
      </div>
    </div>
  );
}
