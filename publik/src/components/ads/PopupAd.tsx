// publik/src/components/ads/PopupAd.tsx
"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

interface ScriptAd {
  id: string;
  title: string;
  code: string;
  position: string;
  status: string;
}

export default function PopupAd() {
  const [ads, setAds] = useState<ScriptAd[]>([]);

  useEffect(() => {
    async function fetchPopupAds() {
      const { data, error } = await supabase
        .from("script_ads")
        .select("*")
        .eq("position", "popup")
        .eq("status", "active");

      if (!error && data) {
        setAds(data);

        // ✅ Inject popup scripts ke body
        data.forEach((ad) => {
          const wrapper = document.createElement("div");
          wrapper.innerHTML = ad.code;

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

          // ✅ Sisipkan juga elemen HTML non-script (misal <div>, <style>, dsb.)
          Array.from(wrapper.children).forEach((el) => {
            if (el.tagName.toLowerCase() !== "script") {
              document.body.appendChild(el);
            }
          });
        });
      }
    }

    fetchPopupAds();
  }, []);

  return null; // Tidak ada UI langsung, hanya inject script/HTML
}
