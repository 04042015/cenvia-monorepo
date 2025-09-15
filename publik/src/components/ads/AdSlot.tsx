// publik/src/components/ads/AdSlot.tsx
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

export default function AdSlot({ position }: { position: string }) {
  const [ads, setAds] = useState<Ad[]>([]);

  useEffect(() => {
    const fetchAds = async () => {
      const { data, error } = await supabase
        .from("ads")
        .select("*")
        .eq("position", position)
        .eq("status", true);

      if (!error && data) {
        setAds(data);
      }
    };
    fetchAds();
  }, [position]);

  useEffect(() => {
    // Inject setiap script agar benar-benar dieksekusi
    ads.forEach((ad) => {
      const container = document.getElementById(`ad-slot-${ad.id}`);
      if (container) {
        container.innerHTML = ad.script;
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
