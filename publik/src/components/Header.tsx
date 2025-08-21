import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient"; // pastikan file ini sudah ada
import { Search, Facebook, Twitter, Instagram, Youtube, Linkedin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  onNetworkClick: () => void;
}

const Header = ({ onNetworkClick }: HeaderProps) => {
  const [navigationItems, setNavigationItems] = useState<string[]>([]);

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

  return (
    <header className="bg-primary text-primary-foreground">
      {/* ...bagian atas tetap sama... */}

      {/* Navigation */}
      <nav className="mt-4 border-t border-primary-foreground/20 pt-4">
        {/* Desktop Navigation */}
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

        {/* Mobile Navigation */}
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
