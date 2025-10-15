import { Helmet } from "react-helmet-async";

interface NewsSchemaProps {
  article: {
    title: string;
    description: string;
    imageUrl: string;
    slug: string;
    publishedAt: string;
    updatedAt?: string;
  };
}

/**
 * Komponen ini menghasilkan struktur data JSON-LD (schema.org)
 * untuk setiap artikel berita agar bisa dibaca Google News & Rich Results.
 */
export default function NewsSchema({ article }: NewsSchemaProps) {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "headline": article.title,
    "image": [article.imageUrl],
    "datePublished": article.publishedAt,
    "dateModified": article.updatedAt || article.publishedAt,
    "author": {
      "@type": "Person",
      "name": "Tim Cenvia",
      "url": "https://cenvia.vercel.app/tim"
    },
    "publisher": {
      "@type": "Organization",
      "name": "CENVIA",
      "logo": {
        "@type": "ImageObject",
        "url":
          "https://kuoawzlabmwhvfcahcfm.supabase.co/storage/v1/object/public/assets/logo-cenvia.jpg"
      }
    },
    "description": article.description,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://cenvia.vercel.app/posts/${article.slug}`
    }
  };

  return (
    <Helmet>
      {/* Struktur data untuk Google News */}
      <script type="application/ld+json">
        {JSON.stringify(schemaData)}
      </script>
    </Helmet>
  );
        }
