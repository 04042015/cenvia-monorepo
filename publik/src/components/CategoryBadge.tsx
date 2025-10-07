// publik/src/components/CategoryBadge.tsx
import { cn } from "@/lib/utils";

interface CategoryBadgeProps {
  category: string; // pakai string bebas, sesuai kategori dari Supabase
  className?: string;
}

// Warna otomatis per kategori
const categoryColors: Record<string, string> = {
  Ekonomi: "bg-green-600 hover:bg-green-700",
  Hiburan: "bg-purple-600 hover:bg-purple-700",
  Internasional: "bg-blue-900 hover:bg-blue-950",
  Kesehatan: "bg-cyan-400 hover:bg-cyan-500 text-black",
  Langsa: "bg-green-500 hover:bg-green-600",
  Loker: "bg-yellow-400 hover:bg-yellow-500 text-black",
  Nasional: "bg-red-600 hover:bg-red-700",
  Olahraga: "bg-orange-500 hover:bg-orange-600",
  Otomotif: "bg-red-800 hover:bg-red-900",
  Pendidikan: "bg-sky-400 hover:bg-sky-500 text-black",
  Politik: "bg-red-900 hover:bg-red-950",
  Teknologi: "bg-sky-500 hover:bg-sky-600 text-black",
  Zodiak: "bg-indigo-900 hover:bg-indigo-950",
  default: "bg-gray-500 hover:bg-gray-600",
};

const CategoryBadge = ({ category, className }: CategoryBadgeProps) => {
  const colorClass =
    categoryColors[category as keyof typeof categoryColors] ||
    categoryColors.default;

  return (
    <span
      className={cn(
        "inline-block px-2 py-1 text-xs font-bold rounded text-white transition-colors duration-200",
        colorClass,
        className
      )}
    >
      {category}
    </span>
  );
};

export default CategoryBadge;
