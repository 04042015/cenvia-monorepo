// publik/src/components/Layout.tsx
import { ReactNode, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { supabase } from "@/lib/supabaseClient";

interface LayoutProps {
  children: ReactNode;
  onNetworkClick?: () => void;
}

interface ScriptAd {
  id: string;
  code: string;
}

export default function Layout({ children, onNetworkClick }: LayoutProps) {
  useEffect(() => {
    fetchScripts();
  }, []);

  async function fetchScripts() {
    const { data, error } = await supabase.from("script_ads").select("*");
    if (!error && data) {
      data.forEach((ad: ScriptAd) => {
        // buat wrapper untuk parsing
        const wrapper = document.createElement("div");
        wrapper.innerHTML = ad.code;

        const scriptEl = wrapper.querySelector("script");
        if (scriptEl) {
          const script = document.createElement("script");
          script.type = "text/javascript";
          script.async = true;

          if (scriptEl.src) {
            script.src = scriptEl.src;
          } else if (scriptEl.innerHTML) {
            script.innerHTML = scriptEl.innerHTML;
          }

          document.body.appendChild(script);
        }
      });
    }
  }

  return (
    <div className="w-full min-h-screen flex flex-col bg-white">
      {/* Header */}
      <Header onNetworkClick={onNetworkClick || (() => {})} />

      {/* Main content */}
      <main className="flex-1 w-full container mx-auto px-4 py-6">
        {children}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
