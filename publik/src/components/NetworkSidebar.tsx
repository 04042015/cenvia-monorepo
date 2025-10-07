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

    if (isOpen) fetchCategories();
  }, [isOpen]);

  return (
    <>
      {/* Overlay */}
      {isOpen && <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />}

      {/* Sidebar */}
      <div
        className={`
          fixed top-0 right-0 w-full md:w-[480px] bg-white shadow-2xl z-50
          transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "translate-x-full"}
          max-h-[90vh] overflow-y-auto rounded-b-2xl
        `}
      >
        <div className="p-6 relative">
          {/* Header */}
          <div className="flex items-center justify-between mb-6 sticky top-0 bg-white z-50 pb-3">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-red-600 text-[26px]">
                network_intel_node
              </span>
              <h2 className="text-2xl font-bold text-gray-900">Network</h2>
            </div>

            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="hover:bg-gray-200 rounded-full p-2"
            >
              <X className="w-6 h-6 text-gray-800" />
            </Button>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b border-gray-200 pb-2">
              Connection
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {categories.map((cat) => (
                <a
                  key={cat.id}
                  href={`/category/${cat.slug}`}
                  className="flex items-center space-x-3 p-2 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors shadow-sm hover:shadow-md"
                >
                  {/* Icon bulat */}
                  {cat.icon ? (
                    <img
                      src={cat.icon}
                      alt={cat.name}
                      className="w-10 h-10 rounded-full object-cover border border-gray-200"
                    />
                  ) : (
                    <div
                      className="w-10 h-10 flex items-center justify-center text-white font-semibold text-lg rounded-full shadow-md"
                      style={{ backgroundColor: cat.color || "#2563eb" }}
                    >
                      {cat.name.charAt(0)}
                    </div>
                  )}

                  {/* Nama kategori */}
                  <span className="text-gray-900 font-medium text-base">
                    {cat.name}
                  </span>
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
