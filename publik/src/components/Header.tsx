import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Search, Facebook, Twitter, Instagram, Youtube, Linkedin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  onNetworkClick: () => void;
}

const Header = ({ onNetworkClick }: HeaderProps) => {
  const [navigationItems, setNavigationItems] = useState<string[]>([]);
  const [breakingNews, setBreakingNews] = useState<string[]>([]);

  // 🔹 Fetch kategori
  useEffect(() => {
    const fetchCategories = async () => {
      const { data, error } = await supabase
        .from("categories")
        .select("name")
        .order("name", { ascending: true });

      if (error) {
        console.error("Error fetching categories:", error);
      } else {
        setNavigationItems(data.map((cat) => cat.name));
      }
    };

    fetchCategories();
  }, []);

  // 🔹 Fetch Breaking News (3 artikel terbaru)
  useEffect(() => {
    const fetchBreakingNews = async () => {
      const { data, error } = await supabase
        .from("posts")
        .select("title, slug")
        .eq("status", "published")
        .order("published_at", { ascending: false })
        .limit(3);

      if (error) {
        console.error("Error fetching breaking news:", error);
      } else if (data) {
        setBreakingNews(data.map((post) => post.title));
      }
    };

    fetchBreakingNews();
  }, []);

  return (
    <header className="bg-primary text-primary-foreground">
      {/* ✅ Breaking News Bar */}
      <div className="w-full bg-[#1a1a1a] text-white border-b border-primary-foreground/20">
        <div className="container mx-auto px-4 py-2 flex items-center justify-between text-sm">
          {/* Breaking News Marquee */}
          <div className="flex items-center gap-2 flex-1 overflow-hidden">
            <span className="flex items-center gap-1 font-bold text-sm whitespace-nowrap">
              <span className="material-symbols-outlined text-red-500">
                trending_up
             </span>
              BRAKING NEWS  |
            </span>
            <div className="overflow-hidden whitespace-nowrap w-full">
              <span className="animate-marquee inline-block">
                {breakingNews.length > 0
                  ? breakingNews.join(" • ")
                  : "Belum ada berita terbaru"}
              </span>
            </div>
          </div>

          {/* Follow Us (hanya desktop) */}
          <div className="hidden md:flex items-center gap-2 md:gap-4 shrink-0">
            <span className="text-xs">FOLLOW US:</span>
            <div className="flex items-center gap-2">
              <Facebook className="w-4 h-4 hover:text-gray-300 cursor-pointer" />
              <Twitter className="w-4 h-4 hover:text-gray-300 cursor-pointer" />
              <Instagram className="w-4 h-4 hover:text-gray-300 cursor-pointer" />
              <Youtube className="w-4 h-4 hover:text-gray-300 cursor-pointer" />
              <Linkedin className="w-4 h-4 hover:text-gray-300 cursor-pointer" />
            </div>
          </div>
        </div>
      </div>

      {/* ✅ Main header with logo & search */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo + Nama */}
          <div className="flex items-center gap-3">
            <img
              src="/icons/logo-cenvia.svg"
              alt="CENVIA"
              className="w-12 h-12 object-contain"
            />
            <div>
              <h1 className="text-3xl font-bold text-white">CENVIA</h1>
              <h2 className="text-sm text-gray-300 tracking-wide">Portal Berita</h2>
            </div>
          </div>

          {/* Search + Network Button */}
          <div className="flex items-center gap-2 flex-1 md:flex-none">
            <div className="relative w-full md:w-auto">
              <Input
                placeholder="Search..."
                className="w-full md:w-64 bg-white/10 border-white/20 text-white placeholder:text-white/70 pr-10"
              />
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/70" />
            </div>
            <Button
              variant="secondary"
              size="sm"
              className="shrink-0 bg-white text-primary hover:bg-white/90"
              onClick={onNetworkClick}
            >
              🌐 Network
            </Button>
          </div>
        </div>
      </div>

      {/* ✅ Navigation dari Supabase */}
      <nav className="mt-4 border-t border-primary-foreground/20 pt-4">
        {/* Desktop */}
        <ul className="hidden md:flex items-center gap-6 text-sm">
          {navigationItems.map((item, index) => (
            <li key={index}>
              <a
                href={`/category/${item.toLowerCase()}`}
                className="hover:text-white/80 transition-colors font-medium"
              >
                {item}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile */}
        <div className="md:hidden overflow-x-auto scrollbar-hide">
          <ul className="flex items-center gap-4 text-sm min-w-max pb-2">
            {navigationItems.map((item, index) => (
              <li key={index}>
                <a
                  href={`/category/${item.toLowerCase()}`}
                  className="hover:text-white/80 transition-colors font-medium whitespace-nowrap"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
