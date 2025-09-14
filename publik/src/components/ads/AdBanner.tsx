// publik/src/components/ads/AdBanner.tsx
interface AdBannerProps {
  id: string;
  title: string;
  image_url: string;
  link_url: string;
  description?: string | null;
  position: string;
  status: string;
}

export default function AdBanner({
  title,
  image_url,
  link_url,
  description,
}: AdBannerProps) {
  return (
    <a
      href={link_url}
      target="_blank"
      rel="noopener noreferrer"
      className="block border rounded-lg overflow-hidden hover:shadow-md transition"
    >
      {image_url && (
        <img
          src={image_url}
          alt={title}
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-3">
        <h3 className="text-base font-semibold">{title}</h3>
        {description && (
          <p className="text-sm text-gray-600 mt-1">{description}</p>
        )}
      </div>
    </a>
  );
}
