// publik/src/components/Layout.tsx
import { ReactNode, useEffect, useState } from "react";
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
  const [scripts, setScripts] = useState<ScriptAd[]>([]);

  useEffect(() => {
    fetchScripts();
  }, []);

  async function fetchScripts() {
    const { data, error } = await supabase.from("script_ads").select("*");
    if (!error && data) setScripts(data);
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

      {/* Inject Script Ads */}
      {scripts.map((ad) => (
        <div
          key={ad.id}
          dangerouslySetInnerHTML={{ __html: ad.code }}
        />
      ))}
    </div>
  );
}
