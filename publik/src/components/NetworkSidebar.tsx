import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

// --- Supabase client ---
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL!,
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY!
);

interface Category {
  id: string;
  name: string;
  slug: string;
  logo: string | null;
}

interface NetworkSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const NetworkSidebar = ({ isOpen, onClose }: NetworkSidebarProps) => {
  const [categories, setCategories] = useState<Category[]>([]);

  // Ambil data kategori dari Supabase
  useEffect(() => {
    const fetchCategories = async () => {
      const { data, error } = await supabase
        .from("categories")
        .select("id, name, slug, logo");

      if (error) {
        console.error("Error fetching categories:", error);
      } else {
        setCategories(data || []);
      }
    };

    fetchCategories();
  }, []);

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed top-0 right-0 h-full w-80 bg-white shadow-lg z-50 
          transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "translate-x-full"}
        `}
      >
        <div className="p-6 overflow-y-auto h-full">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-800">🌐 Network</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="hover:bg-gray-100"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* KANAL Section */}
          <div>
            <h3 className="text-lg font-semibold text-primary mb-4 border-b border-gray-200 pb-2">
              KATEGORI
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {categories.map((cat) => (
                <a
                  key={cat.id}
                  href={`/${cat.slug}`}
                  className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg hover:bg-primary hover:text-white transition-all duration-200 text-sm font-medium"
                >
                  <img
                    src={cat.logo || "/icons/default.svg"}
                    alt={cat.name}
                    className="w-5 h-5 object-contain"
                  />
                  {cat.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NetworkSidebar;
