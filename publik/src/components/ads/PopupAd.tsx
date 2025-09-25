// publik/src/components/ads/PopupAd.tsx
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
      const slot = document.getElementById("popup-ad-slot");
      if (!slot) return;

      // Kosongkan slot dulu (biar ga dobel inject)
      slot.innerHTML = "";

      // Parsing HTML string
      const container = document.createElement("div");
      container.innerHTML = popupCode;

      // Copy semua child ke slot
      Array.from(container.childNodes).forEach((node) => {
        if (node.nodeName === "SCRIPT") {
          const oldScript = node as HTMLScriptElement;
          const newScript = document.createElement("script");

          if (oldScript.src) {
            newScript.src = oldScript.src;
            newScript.async = true;
          } else {
            newScript.textContent = oldScript.textContent;
          }

          slot.appendChild(newScript);
        } else {
          slot.appendChild(node);
        }
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
        <div id="popup-ad-slot" className="w-full h-full text-center" />
      </div>
    </div>
  );
          }
