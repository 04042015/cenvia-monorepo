// publik/src/components/ads/PopupAd.tsx
"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

interface ScriptAd {
  id: string;
  position: string;
  script: string;
  status: boolean;
}

export default function PopupAd() {
  const [popupAd, setPopupAd] = useState<ScriptAd | null>(null);

  useEffect(() => {
    const fetchPopup = async () => {
      const { data, error } = await supabase
        .from("script_ads")
        .select("*")
        .eq("status", true)
        .eq("position", "popup")
        .single();

      if (error) {
        console.error("Gagal mengambil popup ad:", error);
      } else {
        setPopupAd(data);
      }
    };

    fetchPopup();
  }, []);

  useEffect(() => {
    if (popupAd?.script) {
      const script = document.createElement("script");
      script.innerHTML = popupAd.script;
      script.async = true;
      document.body.appendChild(script);

      return () => {
        document.body.removeChild(script);
      };
    }
  }, [popupAd]);

  return null; // tidak perlu render elemen
}
