// publik/src/components/NetworkSidebar.tsx
import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabaseClient";

interface NetworkSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Category {
  id: string;
  name: string;
  slug: string;
  color: string;
  icon: string | null;
}

const NetworkSidebar = ({ isOpen, onClose }: NetworkSidebarProps) => {
  const [categories, setCategories] = useState<Category[]>([]);

  // 🔹 Fetch categories dari Supabase
  useEffect(() => {
    const fetchCategories = async () => {
      const { data, error } = await supabase
        .from("categories")
        .select("id, name, slug, color, icon")
        .order("name", { ascending: true });

      if (error) {
        console.error("Error fetching categories:", error);
      } else {
        setCategories(data || []);
      }
    };

    if (isOpen) {
      fetchCategories();
    }
  }, [isOpen]);

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
        fixed top-0 right-0 h-full w-full md:w-[480px] bg-white shadow-lg z-50 transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "translate-x-full"}
      `}
      >
        <div className="p-6 overflow-y-auto h-full">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-black">🌐 Network</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="hover:bg-gray-100"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold text-black mb-4 border-b border-gray-200 pb-2">
              Connection
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {categories.map((cat) => (
                <a
                  key={cat.id}
                  href={`/category/${cat.slug}`}
                  className="flex items-center gap-2 text-sm font-semibold text-black"
                >
                  {cat.icon ? (
                    <img
                      src={cat.icon}
                      alt={cat.name}
                      className="w-5 h-5 object-contain"
                    />
                  ) : (
                    <span>📁</span>
                  )}
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
