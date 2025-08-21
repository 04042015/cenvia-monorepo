import { Search, Facebook, Twitter, Instagram, Youtube, Linkedin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  onNetworkClick: () => void;
}

const Header = ({ onNetworkClick }: HeaderProps) => {
  const navigationItems = [
    "News",
    "Ekobiz", 
    "Spotlight",
    "Lifestyle",
    "Arena",
    "Tekingame",
    "Otogaz",
    "Fadami",
    "Hiling",
    "Z Campus"
  ];

  return (
    <header className="bg-primary text-primary-foreground">
      {/* Top bar with breaking news and social icons */}
      <div className="bg-primary border-b border-primary-foreground/20">
        <div className="container mx-auto px-4 py-2">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2 flex-1 overflow-hidden">
              <div className="bg-white text-primary px-3 py-1 rounded text-xs font-bold shrink-0">
                ⚡ BREAKING NEWS
              </div>
              <div className="hidden md:block overflow-hidden">
                <span className="breaking-news-scroll inline-block">
                  Pemerintah Umumkan Kebijakan Baru untuk Perekonomian Nasional • DPR Setujui RUU Omnibus Law Terbaru • Indonesia Raih Medali Emas di Kejuaraan Dunia
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2 md:gap-4 shrink-0">
              <span className="text-xs hidden lg:block">RABU, 13/08/2025 | FOLLOW US:</span>
              <span className="text-xs lg:hidden">FOLLOW:</span>
              <div className="flex items-center gap-1 md:gap-2">
                <Facebook className="w-3 h-3 hover:text-white/80 cursor-pointer" />
                <Twitter className="w-3 h-3 hover:text-white/80 cursor-pointer" />
                <Instagram className="w-3 h-3 hover:text-white/80 cursor-pointer" />
                <Youtube className="w-3 h-3 hover:text-white/80 cursor-pointer" />
                <Linkedin className="w-3 h-3 hover:text-white/80 cursor-pointer" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main header with logo and navigation */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <div className="bg-white text-primary p-3 rounded-lg mr-4">
              <div className="text-2xl font-bold">📰</div>
            </div>
            <div>
              <h1 className="text-3xl font-bold">LANGSA</h1>
              <h2 className="text-xl">POST</h2>
            </div>
          </div>

          {/* Search */}
          <div className="hidden md:flex items-center gap-2">
            <div className="relative">
              <Input 
                placeholder="Search..." 
                className="w-64 bg-white/10 border-white/20 text-white placeholder:text-white/70 pr-10"
              />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/70" />
            </div>
            <Button 
              variant="secondary" 
              size="sm" 
              className="bg-white text-primary hover:bg-white/90"
              onClick={onNetworkClick}
            >
              🌐 Network
            </Button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="mt-4 border-t border-primary-foreground/20 pt-4">
          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center gap-6 text-sm">
            {navigationItems.map((item, index) => (
              <li key={index}>
                <a 
                  href="#" 
                  className="hover:text-white/80 transition-colors font-medium"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
          
          {/* Mobile Navigation - Horizontal Scroll */}
          <div className="md:hidden overflow-x-auto scrollbar-hide">
            <ul className="flex items-center gap-4 text-sm min-w-max pb-2">
              {navigationItems.map((item, index) => (
                <li key={index}>
                  <a 
                    href="#" 
                    className="hover:text-white/80 transition-colors font-medium whitespace-nowrap"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;