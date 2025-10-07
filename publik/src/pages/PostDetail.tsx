// publik/src/pages/PostDetail.tsx
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import AdSlot from "@/components/ads/AdSlot";
import { supabase } from "@/lib/supabaseClient";
import dayjs from "dayjs";
import { toast } from "@/components/ui/use-toast";
import OneSignalButton from "@/components/OneSignalButton";
import { Helmet } from "react-helmet-async"; // ✅ Tambah Helmet

interface Post {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  thumbnail: string | null;
  views: number;
  created_at: string;
  published_at: string | null;
  category_id?: string;
  author: {
    full_name: string | null;
  } | null;
  category: {
    id: string;
    name: string;
    slug: string;
    color: string;
  } | null;
  tags?: string[];
}

const PostDetail = () => {
  const { slug } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [related, setRelated] = useState<Post[]>([]);
  const [recommended, setRecommended] = useState<Post[]>([]);
  const [others, setOthers] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPost = async () => {
      const { data, error } = await supabase
        .from("posts")
        .select(
          `id, title, slug, content, excerpt, thumbnail, views, created_at, published_at,
           category_id,
           author:profiles!posts_author_id_fkey(full_name),
           category:categories(id, name, slug, color)`
        )
        .eq("slug", slug)
        .eq("status", "published")
        .single();

      if (error || !data) {
        console.error("Gagal ambil post:", error);
        setPost(null);
        return;
      }

      try {
        await supabase.rpc("increment_post_views", { post_id: data.id });
      } catch (e) {
        console.warn("increment views failed", e);
      }

      setPost(data);

      const { data: relatedPosts } = await supabase
        .from("posts")
        .select("id, title, slug, thumbnail, category:categories(id, name, color)")
        .eq("category_id", data.category_id)
        .neq("id", data.id)
        .limit(8);
      if (relatedPosts) setRelated(relatedPosts);

      const { data: recommendedPosts } = await supabase
        .from("posts")
        .select("id, title, slug, thumbnail")
        .neq("id", data.id)
        .limit(8);
      if (recommendedPosts) setRecommended(recommendedPosts);

      const { data: otherPosts } = await supabase
        .from("posts")
        .select("id, title, slug, thumbnail")
        .neq("category_id", data.category_id)
        .limit(8);
      if (otherPosts) setOthers(otherPosts);
    };

    if (slug) fetchPost();
  }, [slug]);

  const [showFloatingShare, setShowFloatingShare] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowFloatingShare(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  if (!post) return <p className="text-center py-10">Loading...</p>;

  const shareUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/post/${post.slug}`
      : `/post/${post.slug}`;

  // ✅ Tambah ogImage
  const ogImage =
    typeof window !== "undefined"
      ? `${window.location.origin}/api/og/${post.slug}`
      : `/api/og/${post.slug}`;

  return (
    <div className="container mx-auto px-3 pt-20 pb-6 max-w-3xl">
      {/* ✅ Meta OG update */}
      <Helmet>
        <title>{post.title} | CENVIA</title>
        <meta name="description" content={post.excerpt || post.title} />

        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt || post.title} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:url" content={shareUrl} />
        <meta property="og:type" content="article" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.excerpt || post.title} />
        <meta name="twitter:image" content={ogImage} />
      </Helmet>

      {/* Breadcrumb */}
      <nav className="text-xs text-gray-500 mb-2 text-center">
        <Link to="/" className="hover:underline">Home</Link>
        {post.category && (
          <>
            <span className="mx-1">›</span>
            <Link
              to={`/category/${post.category?.slug || "#"}`}
              style={{ color: post.category?.color || "#000" }}
              className="font-medium hover:underline"
            >
              {post.category?.name || "Umum"}
            </Link>
          </>
        )}
        <span className="mx-1">›</span>
        <span className="text-gray-700">{post.title}</span>
      </nav>

      {/* Title */}
      <h1
  className="text-2xl sm:text-3xl font-extrabold mb-4 leading-snug text-center"
  style={{ color: post.category?.color || "#000" }}
>
  {post.title}
</h1>

      {/* Meta info */}
      <div className="flex flex-wrap justify-center items-center text-xs text-gray-600 mb-3 gap-2">
        <span className="font-medium">{post.author?.full_name || "Admin"}</span>
        <span>•</span>
        <span>{dayjs(post.published_at || post.created_at).format("DD MMMM YYYY")}</span>
        <span>•</span>
        <span>{post.views ?? 0} views</span>
      </div>

      {/* Share Section */}
<div className="text-center mb-4">
  <div className="flex justify-center flex-wrap gap-2 mt-2">
    {/* Facebook */}
  <a
    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
    target="_blank"
    rel="noopener noreferrer"
    className="bg-blue-600 hover:bg-blue-700 p-3 rounded-full shadow-lg flex items-center justify-center"
    title="Share to Facebook"
  >
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="18" height="18">
      <path d="M22.675 0h-21.35C.6 0 0 .6 0 1.326v21.348C0 23.4.6 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.794.143v3.24l-1.918.001c-1.504 0-1.795.716-1.795 1.765v2.316h3.587l-.467 3.622h-3.12V24h6.116C23.4 24 24 23.4 24 22.674V1.326C24 .6 23.4 0 22.675 0z"/>
    </svg>
  </a>
    {/* X / Twitter */}
    <a
      href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}`}
      target="_blank"
      rel="noopener noreferrer"
      className="p-2 rounded-full bg-black hover:bg-neutral-800 transition"
    >
      <img
        src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/x.svg"
        alt="X"
        className="w-4 h-4 invert"
      />
    </a>

    {/* WhatsApp */}
    <a
      href={`https://wa.me/?text=${encodeURIComponent(shareUrl)}`}
      target="_blank"
      rel="noopener noreferrer"
      className="p-2 rounded-full bg-green-500 hover:bg-green-600 transition"
    >
      <img
        src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/whatsapp.svg"
        alt="WhatsApp"
        className="w-4 h-4 invert"
      />
    </a>

    {/* Telegram */}
    <a
      href={`https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(post.title)}`}
      target="_blank"
      rel="noopener noreferrer"
      className="p-2 rounded-full bg-sky-600 hover:bg-sky-700 transition"
    >
      <img
        src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/telegram.svg"
        alt="Telegram"
        className="w-4 h-4 invert"
      />
    </a>

    {/* LinkedIn */}
    <a
      href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
      target="_blank"
      rel="noopener noreferrer"
      className="p-2 rounded-full bg-blue-800 hover:bg-blue-900 transition"
    >
      <img
        src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/linkedin.svg"
        alt="LinkedIn"
        className="w-4 h-4 invert"
      />
    </a>

    {/* Copy Link */}
    <button
      onClick={() => {
        try {
          navigator.clipboard.writeText(shareUrl);
          toast({ description: "Disalin!" });
        } catch (e) {
          toast({ description: "Gagal menyalin link" });
        }
      }}
      className="p-2 rounded-full bg-gray-600 hover:bg-gray-700 transition"
    >
      <img 
        src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/linktree.svg" 
        alt="Copy Link" 
        className="w-4 h-4 invert"
      />
    </button>
  </div>
</div>
      
      {/* Thumbnail */}
      {post.thumbnail && (
        <figure className="mb-4">
          <img src={post.thumbnail} alt={post.title} className="w-full max-w-3xl mx-auto rounded-lg shadow-sm" />
          {post.excerpt && (
            <figcaption className="text-xs text-gray-500 mt-1 italic text-center">
              {post.excerpt}
            </figcaption>
          )}
        </figure>
      )}

      {/* Artikel utama */}
<article className="prose prose-base max-w-none leading-relaxed text-left mb-6 article-body font-bold">
        {post.content
          ? post.content.split(/<\/p>/i).map((part, i) => {
              if (!part.trim()) return null;
              return (
                <div key={i}>
                  <div dangerouslySetInnerHTML={{ __html: part + "</p>" }} />
                  {i === 1 && (
                    <div className="my-4">
                      <AdSlot position="content" />
                    </div>
                  )}
                </div>
              );
            })
          : <p className="italic text-gray-500">Konten belum tersedia</p>}
      </article>

      {/* Related */}
{related.length > 0 && (
  <div className="border-l-4 border-gray-300 pl-3 mb-6">
    <h2 className="font-extrabold text-base mb-2">Baca Juga</h2>
    <ul className="space-y-1 text-blue-600 font-semibold">
      {related.slice(0, 2).map((p) => (
        <li key={p.id}>
          <Link to={`/post/${p.slug}`} className="hover:underline">
            {p.title}
          </Link>
        </li>
      ))}
    </ul>
  </div>
)}

{/* Tags */}
{post.tags && post.tags.length > 0 && (
  <div className="mb-6">
    <h3 className="font-semibold mb-2 text-sm">Tags:</h3>
    <div className="flex flex-wrap gap-2">
      {post.tags.map((tag, i) => (
        <Link
          key={i}
          to={`/tag/${tag}`}
          className="px-3 py-1 text-xs bg-gray-200 hover:bg-gray-300 rounded-full"
        >
          #{tag}
        </Link>
      ))}
    </div>
  </div>
)}

{/* Related news */}
<section className="mb-6">
  <h2 className="text-lg font-extrabold mb-3">Berita Terkait</h2>
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
    {related.map((p) => (
      <Link
        key={p.id}
        to={`/post/${p.slug}`}
        className="block border rounded-lg overflow-hidden hover:shadow-md transition"
      >
        {p.thumbnail && (
          <img
            src={p.thumbnail}
            alt={p.title}
            className="h-36 w-full object-cover"
          />
        )}
        <div className="p-2 text-sm font-semibold">{p.title}</div>
      </Link>
    ))}
  </div>
</section>

{/* Recommended */}
<section className="mb-6">
  <h2 className="text-lg font-extrabold mb-3">Rekomendasi Untukmu</h2>
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
    {recommended.map((p) => (
      <Link
        key={p.id}
        to={`/post/${p.slug}`}
        className="block border rounded-lg overflow-hidden hover:shadow-md transition"
      >
        {p.thumbnail && (
          <img
            src={p.thumbnail}
            alt={p.title}
            className="h-36 w-full object-cover"
          />
        )}
        <div className="p-2 text-sm font-semibold">{p.title}</div>
      </Link>
    ))}
  </div>
</section>

{/* Other */}
<section className="mb-6">
  <h2 className="text-lg font-extrabold mb-3">Berita Cenvia Lainnya</h2>
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
    {others.map((p) => (
      <Link
        key={p.id}
        to={`/post/${p.slug}`}
        className="block border rounded-lg overflow-hidden hover:shadow-md transition"
      >
        {p.thumbnail && (
          <img
            src={p.thumbnail}
            alt={p.title}
            className="h-36 w-full object-cover"
          />
        )}
        <div className="p-2 text-sm font-semibold">{p.title}</div>
      </Link>
    ))}
  </div>
</section>

      {/* Newsletter */}
      <div className="mt-6 p-3 border rounded-lg bg-gray-50 text-center">
        <p className="text-sm font-medium mb-2">Subscribe untuk update berita terbaru</p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const form = e.target as HTMLFormElement;
            const input = form.elements.namedItem("email") as HTMLInputElement;
            const email = input.value;
            if (!email) {
              alert("Masukkan email dulu");
              return;
            }
            supabase.from("subscribers").insert([{ email }])
              .then(() => {
                alert("Terima kasih, email tersimpan");
                input.value = "";
              })
              .catch(() => {
                alert("Gagal menyimpan, coba lagi");
              });
          }}
          className="flex justify-center gap-0"
        >
          <input
            name="email"
            type="email"
            placeholder="Email anda"
            className="border px-2 py-1 rounded-l-md text-sm w-2/3"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-3 py-1 text-sm rounded-r-md"
          >
            Subscribe
          </button>
        </form>
      </div>

      {/* 🔄 Floating Share Buttons */}
<div className="fixed bottom-4 right-4 flex flex-col gap-3 z-50">
  {/* Facebook */}
  <a
    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
    target="_blank"
    rel="noopener noreferrer"
    className="bg-blue-600 hover:bg-blue-700 p-3 rounded-full shadow-lg flex items-center justify-center"
    title="Share to Facebook"
  >
    <img
      src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/facebook.svg"
      alt="Facebook"
      className="w-5 h-5 invert"
    />
  </a>

  {/* Twitter */}
  <a
    href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}`}
    target="_blank"
    rel="noopener noreferrer"
    className="bg-sky-500 hover:bg-sky-600 p-3 rounded-full shadow-lg flex items-center justify-center"
    title="Share to Twitter"
  >
    <img
      src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/x.svg"
      alt="Twitter"
      className="w-5 h-5 invert"
    />
  </a>

  {/* WhatsApp */}
  <a
    href={`https://api.whatsapp.com/send?text=${encodeURIComponent(window.location.href)}`}
    target="_blank"
    rel="noopener noreferrer"
    className="bg-green-500 hover:bg-green-600 p-3 rounded-full shadow-lg flex items-center justify-center"
    title="Share to WhatsApp"
  >
    <img
      src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/whatsapp.svg"
      alt="WhatsApp"
      className="w-5 h-5 invert"
    />
  </a>

  {/* Copy Link */}
  <button
    onClick={handleCopyLink}
    className="bg-gray-700 hover:bg-gray-800 p-3 rounded-full shadow-lg flex items-center justify-center"
    title="Copy Link"
  >
    <img
      src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/link.svg"
      alt="Copy Link"
      className="w-5 h-5 invert"
    />
  </button>
</div>           
      )}
      
      <div className="mt-6 text-center">
        <OneSignalButton />
      </div>
    </div>
  );
};

export default PostDetail;
