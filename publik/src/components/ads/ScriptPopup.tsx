"use client";

import { useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function ScriptPopup() {
  useEffect(() => {
    const fetchScriptAd = async () => {
      const { data, error } = await supabase
        .from("script_ads")
        .select("code")
        .eq("status", "active")
        .maybeSingle();

      if (error) {
        console.error("❌ Gagal fetch script ad:", error);
        return;
      }

      if (data?.code) {
        console.log("✅ Menyuntikkan script popup lama");

        // Bungkus HTML string
        const container = document.createElement("div");
        container.innerHTML = data.code;

        // Eksekusi semua script
        container.querySelectorAll("script").forEach((oldScript) => {
          const newScript = document.createElement("script");

          if (oldScript.src) {
            newScript.src = oldScript.src;
            newScript.async = true;
          } else {
            newScript.textContent = oldScript.textContent;
          }

          document.body.appendChild(newScript); // langsung ke body
        });
      } else {
        console.log("🚫 Tidak ada script popup aktif");
      }
    };

    fetchScriptAd();
  }, []);

  return null; // tidak render apa2
    }
