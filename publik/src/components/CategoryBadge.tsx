import { cn } from "@/lib/utils";

interface CategoryBadgeProps {
  category: string; // pakai string bebas, sesuai kategori dari Supabase
  className?: string;
}

const CategoryBadge = ({ category, className }: CategoryBadgeProps) => {
  return (
    <span 
      className={cn(
        "inline-block px-2 py-1 text-xs font-bold rounded bg-primary text-white",
        className
      )}
    >
      {category}
    </span>
  );
};

export default CategoryBadge;
