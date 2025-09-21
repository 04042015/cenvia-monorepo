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

      if (error) {
        console.error("❌ Gagal ambil ads:", error);
      } else {
        console.log(`✅ Ads ditemukan untuk posisi "${position}":`, data);
        setAds(data || []);
      }
    };
    fetchAds();
  }, [position]);

  useEffect(() => {
    ads.forEach((ad) => {
      if (
        (ad.position === "popup" || ad.position === "global") &&
        (!ad.code || ad.code.trim() === "")
      ) {
        console.warn(`⚠️ Script kosong di posisi ${ad.position}, dilewati.`);
        return;
      }

      const container = document.getElementById(`ad-slot-${ad.id}`);
      if (container) {
        container.innerHTML = ""; // kosongkan dulu

        const wrapper = document.createElement("div");
        wrapper.className = "ad-container"; // ✅ wrapper dengan style default
        wrapper.innerHTML = ad.code;
        container.appendChild(wrapper);

        console.log(`🚀 Menyuntikkan ad "${ad.title}" di posisi ${ad.position}`);

        const scripts = wrapper.getElementsByTagName("script");
        for (let i = 0; i < scripts.length; i++) {
          const oldScript = scripts[i];
          const newScript = document.createElement("script");

          if (oldScript.src) {
            newScript.src = oldScript.src;
            console.log(`🔗 Memuat external script: ${oldScript.src}`);
          }
          if (oldScript.innerHTML) {
            newScript.innerHTML = oldScript.innerHTML;
            console.log("📜 Menyuntikkan inline script");
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
          className={`my-4 flex justify-center ${
            ad.position === "popup" || ad.position === "global"
              ? "hidden"
              : ""
          }`}
        />
      ))}
    </>
  );
}
