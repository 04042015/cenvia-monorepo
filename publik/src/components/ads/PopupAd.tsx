// publik/src/components/ads/PopupAd.tsx
"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function PopupAd() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const fetchPopupAd = async () => {
      const { data, error } = await supabase
        .from("popup_ads")
        .select("code")
        .eq("status", "active")
        .maybeSingle();

      if (error) {
        console.warn("❌ Gagal mengambil popup ad:", error);
        return;
      }

      if (!data || !data.code) {
        console.log("🚫 Tidak ada popup aktif");
        return;
      }

      console.log("✅ Popup ad ditemukan, menampilkan...");

      // Buat container popup
      const container = document.createElement("div");
      container.id = "popup-ad-container";
      container.style.position = "fixed";
      container.style.top = "0";
      container.style.left = "0";
      container.style.width = "100%";
      container.style.height = "100%";
      container.style.backgroundColor = "rgba(0,0,0,0.6)";
      container.style.display = "flex";
      container.style.justifyContent = "center";
      container.style.alignItems = "center";
      container.style.zIndex = "9999";

      // Bungkus konten + tombol close
      const wrapper = document.createElement("div");
      wrapper.style.position = "relative";
      wrapper.style.background = "#fff";
      wrapper.style.padding = "10px";
      wrapper.style.borderRadius = "8px";
      wrapper.style.maxWidth = "90%";
      wrapper.style.boxShadow = "0 4px 10px rgba(0,0,0,0.3)";
      wrapper.innerHTML = data.code;

      // Tombol close (X)
      const closeBtn = document.createElement("button");
      closeBtn.innerText = "×";
      closeBtn.style.position = "absolute";
      closeBtn.style.top = "5px";
      closeBtn.style.right = "10px";
      closeBtn.style.fontSize = "20px";
      closeBtn.style.background = "transparent";
      closeBtn.style.border = "none";
      closeBtn.style.cursor = "pointer";
      closeBtn.onclick = () => {
        setVisible(false);
        container.remove();
      };

      wrapper.appendChild(closeBtn);
      container.appendChild(wrapper);
      document.body.appendChild(container);

      // ✅ Eksekusi ulang script di dalam iklan
      const scripts = wrapper.querySelectorAll("script");
      scripts.forEach((oldScript) => {
        const newScript = document.createElement("script");
        if (oldScript.src) {
          newScript.src = oldScript.src;
          newScript.async = true;
        } else {
          newScript.text = oldScript.innerHTML;
        }
        oldScript.replaceWith(newScript);
      });
    };

    if (visible) {
      fetchPopupAd();
    }
  }, [visible]);

  return null;
    }
