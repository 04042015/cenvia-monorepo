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

export default function AdSlot({ position }: { position: string }) {
  const [ads, setAds] = useState<ScriptAd[]>([]);

  useEffect(() => {
    const fetchAds = async () => {
      const { data, error } = await supabase
        .from("script_ads")
        .select("*")
        .eq("position", position)
        .eq("status", "active");

      if (!error && data) {
        setAds(data);
      }
    };
    fetchAds();
  }, [position]);

  useEffect(() => {
    // Inject setiap script_code ke DOM
    ads.forEach((ad) => {
      const container = document.getElementById(`ad-slot-${ad.id}`);
      if (container) {
        container.innerHTML = ad.script_code;
        const scripts = container.getElementsByTagName("script");
        for (let i = 0; i < scripts.length; i++) {
          const oldScript = scripts[i];
          const newScript = document.createElement("script");
          if (oldScript.src) {
            newScript.src = oldScript.src;
          } else {
            newScript.text = oldScript.innerHTML;
          }
          oldScript.parentNode?.replaceChild(newScript, oldScript);
        }
      }
    });
  }, [ads]);

  if (!ads.length) return null;

  return (
    <>
      {ads.map((ad) => (
        <div
          key={ad.id}
          id={`ad-slot-${ad.id}`}
          className="my-4 flex justify-center"
        />
      ))}
    </>
  );
}
