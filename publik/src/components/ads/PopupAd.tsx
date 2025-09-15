"use client";
import { useState, useEffect } from "react";
import AdSlot from "@/components/ads/AdSlot";

export default function PopupAd() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white p-4 rounded shadow-lg max-w-md w-full relative">
        <button
          onClick={() => setShow(false)}
          className="absolute top-2 right-2 text-red-500"
        >
          ✕
        </button>
        <AdSlot position="popup" />
      </div>
    </div>
  );
}
