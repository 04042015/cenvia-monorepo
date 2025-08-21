import { Facebook, Twitter, Instagram, Youtube, Linkedin } from "lucide-react";

const Footer = () => {
  const exploreCategories = [
    { name: "News", count: "2.1K" },
    { name: "Ekobiz", count: "892" },
    { name: "Spotlight", count: "1.5K" },
    { name: "Lifestyle", count: "1.2K" },
    { name: "Arena", count: "967" },
    { name: "Tekingame", count: "543" },
    { name: "Otogaz", count: "654" },
    { name: "Fadami", count: "432" },
    { name: "Hiling", count: "321" },
    { name: "Z Campus", count: "287" }
  ];


  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Logo and Description */}
          <div className="lg:col-span-1">
            <div className="flex items-center mb-4">
              <div className="bg-primary text-white p-2 rounded-lg mr-3">
                <div className="text-xl font-bold">📰</div>
              </div>
              <div>
                <h3 className="text-2xl font-bold">LANGSA</h3>
                <h4 className="text-lg">POST</h4>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed mb-6">
              Portal berita terdepan yang menyajikan informasi akurat, terpercaya, dan terkini untuk masyarakat Indonesia.
            </p>
            
            {/* Social Media */}
            <div className="flex items-center gap-3">
              <Facebook className="w-8 h-8 p-2 bg-blue-600 rounded hover:bg-blue-700 cursor-pointer transition-colors" />
              <Twitter className="w-8 h-8 p-2 bg-sky-500 rounded hover:bg-sky-600 cursor-pointer transition-colors" />
              <Instagram className="w-8 h-8 p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded hover:from-purple-600 hover:to-pink-600 cursor-pointer transition-all" />
              <Youtube className="w-8 h-8 p-2 bg-red-600 rounded hover:bg-red-700 cursor-pointer transition-colors" />
              <Linkedin className="w-8 h-8 p-2 bg-blue-700 rounded hover:bg-blue-800 cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Explore Our Site */}
          <div className="lg:col-span-2">
            <h3 className="text-xl font-bold mb-6 text-primary">EXPLORE Our Site</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {exploreCategories.map((category, index) => (
                <a
                  key={index}
                  href="#"
                  className="flex items-center justify-between p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors duration-200"
                >
                  <span className="font-medium">{category.name}</span>
                  <span className="text-sm text-gray-400">({category.count})</span>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-1">
            <h3 className="text-xl font-bold mb-6 text-primary">Quick Links</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Contact Us</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Advertise with Us</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">RSS Feed</a></li>
            </ul>
          </div>
        </div>

      </div>

      {/* Copyright */}
      <div className="bg-gray-950 py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between text-sm text-gray-400">
            <p>&copy; 2025 LangsaPost. All rights reserved.</p>
            <p>Powered by Indonesian Digital Media</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;