import { cn } from "@/lib/utils";

interface CategoryBadgeProps {
  category: "News" | "Spotlight" | "Lifestyle" | "Arena" | "Ekobiz";
  className?: string;
}

const CategoryBadge = ({ category, className }: CategoryBadgeProps) => {
  const getStyle = (cat: string) => {
    switch (cat) {
      case "News":
        return "bg-category-news text-white";
      case "Spotlight":
        return "bg-category-spotlight text-white";
      case "Lifestyle":
        return "bg-category-lifestyle text-white";
      case "Arena":
        return "bg-orange-500 text-white";
      case "Ekobiz":
        return "bg-blue-500 text-white";
      default:
        return "bg-category-news text-white";
    }
  };

  return (
    <span 
      className={cn(
        "inline-block px-2 py-1 text-xs font-bold rounded",
        getStyle(category),
        className
      )}
    >
      {category}
    </span>
  );
};

export default CategoryBadge;