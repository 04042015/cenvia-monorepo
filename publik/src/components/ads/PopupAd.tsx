"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

interface ScriptAd {
  id: string;
  name: string;
  script_code: string;
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

        // Suntikkan script popup
        data.forEach((ad) => {
          const wrapper = document.createElement("div");
          wrapper.innerHTML = ad.script_code;

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
