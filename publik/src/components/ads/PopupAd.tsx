// publik/src/components/ads/PopupAd.tsx
"use client";

import { useEffect, useState, useRef } from "react";
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
  const [visible, setVisible] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchPopupAds() {
      const { data, error } = await supabase
        .from("script_ads")
        .select("*")
        .eq("position", "popup")
        .eq("status", "active");

      if (!error && data && data.length > 0) {
        setAds(data);
      }
    }

    fetchPopupAds();
  }, []);

  useEffect(() => {
    if (!ads.length || !containerRef.current) return;

    // inject script ke dalam container agar bisa dieksekusi
    containerRef.current.innerHTML = ads[0].code;

    const scripts = containerRef.current.querySelectorAll("script");
    scripts.forEach((oldScript) => {
      const newScript = document.createElement("script");

      if (oldScript.src) newScript.src = oldScript.src;
      if (oldScript.type) newScript.type = oldScript.type;
      if (oldScript.textContent) newScript.textContent = oldScript.textContent;

      oldScript.parentNode?.replaceChild(newScript, oldScript);
    });
  }, [ads]);

  if (!ads.length || !visible) return null;

  return (
    <div className="popup-ad">
      <button className="popup-close" onClick={() => setVisible(false)}>
        ✕
      </button>
      <div ref={containerRef}></div>
    </div>
  );
}
