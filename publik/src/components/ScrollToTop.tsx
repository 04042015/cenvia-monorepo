// publik/src/components/ScrollToTop.tsx
"use client";

import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Komponen global untuk mengatur posisi scroll.
 * Setiap kali route/pathname berubah, halaman akan otomatis scroll ke atas.
 * Dibuat untuk meningkatkan UX pada navigasi website single-page (SPA).
 */
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll dengan animasi halus setiap kali pindah halaman
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [pathname]);

  return null; // Tidak merender apa-apa ke DOM
};

export default ScrollToTop;
