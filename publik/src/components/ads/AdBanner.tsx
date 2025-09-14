import React from "react";

interface AdProps {
  title: string;
  image_url: string;
  link_url: string;
  description?: string;
}

export default function AdBanner({ title, image_url, link_url, description }: AdProps) {
  return (
    <div className="w-full my-4 p-2 border rounded-lg shadow-sm bg-white dark:bg-gray-900">
      <a href={link_url} target="_blank" rel="noopener noreferrer">
        <img src={image_url} alt={title} className="w-full rounded-lg mb-2" />
        <h3 className="font-semibold text-sm">{title}</h3>
        {description && (
          <p className="text-xs text-gray-600 dark:text-gray-400">{description}</p>
        )}
      </a>
    </div>
  );
}
