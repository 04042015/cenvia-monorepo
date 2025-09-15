import { Clock } from "lucide-react";
import CategoryBadge from "./CategoryBadge";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

interface NewsCardProps {
  slug: string; // ✅ untuk routing detail
  title: string;
  image: string;
  category: string;
  timeAgo: string;
  excerpt: string;
  className?: string;
}

const NewsCard = ({
  slug,
  title,
  image,
  category,
  timeAgo,
  excerpt,
  className,
}: NewsCardProps) => {
  const navigate = useNavigate();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();

    // tujuan artikel
    const targetPath = `/post/${slug}`;

    // kasih jeda biar iklan sempat muncul
    setTimeout(() => {
      navigate(targetPath);
    }, 500);
  };

  return (
    <a
      href={`/post/${slug}`}
      onClick={handleClick}
      className={cn(
        "group cursor-pointer bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 block",
        className
      )}
    >
      <div className="relative overflow-hidden rounded-t-lg">
        <img
          src={image}
          alt={title}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {/* Category badge */}
        <div className="absolute top-3 left-3">
          <CategoryBadge category={category} />
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-bold text-lg leading-tight text-gray-900 group-hover:text-primary transition-colors mb-2">
          {title}
        </h3>

        <p className="text-gray-600 text-sm leading-relaxed mb-3 line-clamp-2">
          {excerpt}
        </p>

        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Clock className="w-4 h-4" />
          <span>{timeAgo}</span>
        </div>
      </div>
    </a>
  );
};

export default NewsCard;
