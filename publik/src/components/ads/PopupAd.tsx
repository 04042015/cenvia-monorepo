// publik/src/components/ads/PopupAd.tsx
"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

interface Ad {
  id: string;
  title: string;
  script: string;
  position: string;
  status: boolean;
}

export default function PopupAd() {
  const [ads, setAds] = useState<Ad[]>([]);

  useEffect(() => {
    async function fetchPopupAds() {
      const { data, error } = await supabase
        .from("ads")
        .select("*")
        .eq("position", "popup")
        .eq("status", true);

      if (!error && data) {
        setAds(data);

        // Suntikkan script popup
        data.forEach((ad) => {
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
    }

    fetchPopupAds();
  }, []);

  return null; // tidak ada UI khusus, hanya inject script
}
