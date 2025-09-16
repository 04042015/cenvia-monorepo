import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Facebook, Twitter, Instagram, Youtube, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";

type Category = {
  id: string;
  name: string;
  slug: string;
};

const Footer = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const { data, error } = await supabase
        .from("categories")
        .select("id, name, slug")
        .limit(10);

      if (!error && data) setCategories(data);
    };

    fetchCategories();
  }, []);

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Logo and Description */}
          <div className="lg:col-span-1">
            <div className="flex items-center mb-4">
              <img
                src="/icons/logo-cenvia.svg"
                alt="CENVIA"
                className="w-12 h-12 mr-3 rounded-lg"
              />
              <div>
                <h3 className="text-2xl font-bold text-white">CENVIA</h3>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed mb-6">
              Portal berita terkini yang menyajikan informasi akurat, terpercaya, dan aktual untuk masyarakat Indonesia.
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
              {categories.map((category) => (
                <Link
                  key={category.id}
                  to={`/category/${category.slug}`}
                  className="flex items-center justify-between p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors duration-200"
                >
                  <span className="font-medium">{category.name}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-1">
            <h3 className="text-xl font-bold mb-6 text-primary">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link to="/about" className="text-gray-300 hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link to="/privacy" className="text-gray-300 hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-gray-300 hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link to="/advertise" className="text-gray-300 hover:text-white transition-colors">Advertise with Us</Link></li>
              <li><Link to="/rss" className="text-gray-300 hover:text-white transition-colors">RSS Feed</Link></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="bg-gray-950 py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between text-sm text-gray-400">
            <p>&copy; 2025 CENVIA. All rights reserved.</p>
            <p>Powered by Indonesian Digital Media</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
