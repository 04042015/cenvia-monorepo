// publik/src/components/Layout.tsx
import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import AdSlot from "@/components/ads/AdSlot";
import PopupAd from "@/components/ads/PopupAd"; // ✅ import PopupAd

interface LayoutProps {
  children: ReactNode;
  onNetworkClick?: () => void;
}

export default function LayoutTight({ children, onNetworkClick }: LayoutProps) {
  return (
    <div className="w-full min-h-screen flex flex-col bg-white">
      {/* Header */}
      <Header onNetworkClick={onNetworkClick || (() => {})} />

      {/* ✅ Header AdSlot dengan tinggi stabil */}
      <AdSlot position="header" className="min-h-[90px]" />

      {/* ✅ Popup Ads */}
      <PopupAd />

      {/* ✅ Homepage Ad */}
      <AdSlot position="homepage" />

      {/* Main content (sangat rapat, tanpa pt) */}
      <main className="flex-1 w-full px-4 pb-6 flex justify-center">
        <div className="grid grid-cols-12 gap-6 w-full max-w-6xl">
          {/* Left Ads */}
          <aside className="hidden lg:block col-span-2">
            <AdSlot position="left" />
          </aside>

          {/* Content */}
          <div className="col-span-12 lg:col-span-8 space-y-4">
            <AdSlot position="content" />
            {children}
          </div>

          {/* Right Ads */}
          <aside className="hidden lg:block col-span-2">
            <AdSlot position="right" />
          </aside>
        </div>
      </main>

      {/* Footer */}
      <AdSlot position="footer" />
      <Footer />
    </div>
  );
}
