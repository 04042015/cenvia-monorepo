// publik/src/components/Footer.tsx
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
    <footer className="bg-gray-900 text-white border-t border-gray-800">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
          {/* Logo and Description */}
          <div className="lg:col-span-1">
            <div className="flex items-center mb-4">
              <img
                src="/icons/logo-cenvia.svg"
                alt="CENVIA"
                className="w-12 h-12 mr-3 rounded-lg"
              />
              <div>
                <h3 className="text-2xl font-extrabold text-white drop-shadow-sm tracking-wide">
                  CENVIA
                </h3>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed mb-6">
              Portal berita terkini yang menyajikan informasi akurat, terpercaya,
              dan aktual untuk masyarakat Indonesia.
            </p>

            {/* Social Media */}
            <div className="flex items-center gap-3">
              <FooterIcon icon={<Facebook />} color="bg-blue-600" />
              <FooterIcon icon={<Twitter />} color="bg-sky-500" />
              <FooterIcon
                icon={<Instagram />}
                color="bg-gradient-to-r from-purple-500 to-pink-500"
              />
              <FooterIcon icon={<Youtube />} color="bg-red-600" />
              <FooterIcon icon={<Linkedin />} color="bg-blue-700" />
            </div>
          </div>

          {/* Explore Our Site */}
          <div className="lg:col-span-2">
            <h3 className="text-xl font-bold mb-6 text-white uppercase tracking-wide">
              Explore Our Site
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  to={`/category/${category.slug}`}
                  className="flex items-center justify-between p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-all duration-200"
                >
                  <span className="font-medium">{category.name}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-1">
            <h3 className="text-xl font-bold mb-6 text-white uppercase tracking-wide">
              Quick Links
            </h3>
            <ul className="space-y-3">
              <FooterLink to="/about" text="About Us" />
              <FooterLink to="/contact" text="Contact Us" />
              <FooterLink to="/privacy" text="Privacy Policy" />
              <FooterLink to="/terms" text="Terms of Service" />
              <FooterLink to="/disclaimer" text="Disclaimer" />
              <FooterLink to="/advertise" text="Advertise with Us" />
              <FooterLink to="/rss" text="RSS Feed" />
              {/* ✅ Tambahan penting untuk SEO & kepercayaan */}
              <FooterLink to="/editorial" text="Editorial Team" />
              <FooterLink to="/career" text="Career" />
              <FooterLink to="/partnership" text="Partnership" />
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="bg-gray-950 py-4 border-t border-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between text-sm text-gray-400">
            <p>&copy; {new Date().getFullYear()} CENVIA. All rights reserved.</p>
            <p className="mt-2 md:mt-0">Powered by Indonesian Digital Media</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

function FooterLink({ to, text }: { to: string; text: string }) {
  return (
    <li>
      <Link
        to={to}
        className="text-gray-300 hover:text-red-400 transition-colors duration-200 flex items-center group"
      >
        <span className="mr-2 text-red-400 opacity-0 group-hover:opacity-100 transition-opacity">
          →
        </span>
        {text}
      </Link>
    </li>
  );
}

function FooterIcon({
  icon,
  color,
}: {
  icon: JSX.Element;
  color: string;
}) {
  return (
    <div
      className={`w-10 h-10 flex items-center justify-center rounded-full cursor-pointer transition-all duration-200 hover:scale-110 ${color} hover:brightness-110`}
    >
      {icon}
    </div>
  );
}

export default Footer;
