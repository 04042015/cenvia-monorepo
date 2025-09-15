// publik/src/components/ads/AdSlot.tsx
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
    // Inject setiap script agar benar-benar dieksekusi
    ads.forEach((ad) => {
      const container = document.getElementById(`ad-slot-${ad.id}`);
      if (container) {
        container.innerHTML = ""; // kosongkan dulu

        // buat wrapper
        const wrapper = document.createElement("div");
        wrapper.innerHTML = ad.code;
        container.appendChild(wrapper);

        // eksekusi ulang semua <script>
        const scripts = wrapper.getElementsByTagName("script");
        for (let i = 0; i < scripts.length; i++) {
          const oldScript = scripts[i];
          const newScript = document.createElement("script");

          if (oldScript.src) {
            newScript.src = oldScript.src;
          }
          if (oldScript.innerHTML) {
            newScript.innerHTML = oldScript.innerHTML;
          }

          container.appendChild(newScript);
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
