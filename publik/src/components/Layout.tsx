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

export default function Layout({ children, onNetworkClick }: LayoutProps) {
  return (
    <div className="w-full min-h-screen flex flex-col bg-white">
      {/* Header */}
      <Header onNetworkClick={onNetworkClick || (() => {})} />
      <AdSlot position="header" />

      {/* ✅ Popup Ads hanya ambil dari tabel script_ads */}
      <PopupAd />

      {/* Main content */}
      <main className="flex-1 w-full px-4 py-6 flex justify-center">
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
