// publik/src/pages/PostDetail.tsx
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import AdSlot from "@/components/ads/AdSlot";
import { supabase } from "@/lib/supabaseClient";
import dayjs from "dayjs";
import {
  Facebook,
  Twitter,
  MessageCircle,
  Send,
  Linkedin,
  Link as LinkIcon,
} from "lucide-react";
import { toast } from "@/components/ui/use-toast";

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
  author: {
    full_name: string | null;
    avatar_url: string | null;
  } | null;
  category: {
    id: string;
    name: string;
    slug: string;
    color: string;
  };
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
        .select(`
          id, title, slug, content, excerpt, thumbnail, views, created_at, published_at,
          category_id,
          author:profiles!posts_author_id_fkey(full_name, avatar_url),
          category:categories(id, name, slug, color)
        `)
        .eq("slug", slug)
        .eq("status", "published")
        .single();

      if (error) {
        console.error("Gagal ambil post:", error);
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

  if (!post) return <p className="text-center py-10">Loading...</p>;

  const shareUrl = `${window.location.origin}/post/${post.slug}`;

  return (
    <div className="container mx-auto px-3 pt-3 pb-6 max-w-3xl">
      {/* Breadcrumb */}
      <nav className="text-xs text-gray-500 mb-2 text-center">
        <Link to="/" className="hover:underline">Home</Link>
        <span className="mx-1">›</span>
        <Link
          to={`/category/${post.category.slug}`}
          style={{ color: post.category.color }}
          className="font-medium hover:underline"
        >
          {post.category.name}
        </Link>
        <span className="mx-1">›</span>
        <span className="text-gray-700">{post.title}</span>
      </nav>

      {/* Title */}
      <h1
        className="text-2xl sm:text-3xl font-extrabold mb-2 leading-tight text-center"
        style={{ color: post.category.color }}
      >
        {post.title}
      </h1>

      {/* Meta info */}
      <div className="flex flex-wrap justify-center items-center text-xs text-gray-600 mb-3 gap-2">
        {post.author?.avatar_url && (
          <img
            src={post.author.avatar_url}
            alt={post.author.full_name || "Admin"}
            className="w-6 h-6 rounded-full object-cover"
          />
        )}
        <span className="font-medium">{post.author?.full_name || "Admin"}</span>
        <span>•</span>
        <span>{dayjs(post.published_at || post.created_at).format("DD MMMM YYYY")}</span>
        <span>•</span>
        <span>{post.views ?? 0} views</span>
      </div>

      {/* Share Section */}
      <div className="text-center mb-4">
        <div className="flex justify-center flex-wrap gap-2 mt-2">
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 text-xs"
            aria-label="Share ke Facebook"
          >
            <Facebook className="w-4 h-4" />
          </a>
          <a
            href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full bg-sky-500 text-white hover:bg-sky-600 text-xs"
            aria-label="Share ke Twitter"
          >
            <Twitter className="w-4 h-4" />
          </a>
          <a
            href={`https://wa.me/?text=${encodeURIComponent(shareUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full bg-green-500 text-white hover:bg-green-600 text-xs"
            aria-label="Share ke WhatsApp"
          >
            <MessageCircle className="w-4 h-4" />
          </a>
          <a
            href={`https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(post.title)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full bg-sky-700 text-white hover:bg-sky-800 text-xs"
            aria-label="Share ke Telegram"
          >
            <Send className="w-4 h-4" />
          </a>
          <a
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full bg-blue-800 text-white hover:bg-blue-900 text-xs"
            aria-label="Share ke LinkedIn"
          >
            <Linkedin className="w-4 h-4" />
          </a>
          <button
            onClick={() => {
              navigator.clipboard.writeText(shareUrl);
              toast({ description: "Link berhasil disalin!" });
            }}
            className="p-2 rounded-full bg-gray-600 text-white hover:bg-gray-700 text-xs"
            aria-label="Salin Link"
          >
            <LinkIcon className="w-4 h-4" />
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

      {/* Article */}
<article className="prose prose-base max-w-none leading-relaxed text-justify mb-6 article-body">
  {post.content
    .split(/<\/p>/i) // pecah berdasarkan <p>
    .map((part, i) => {
      if (!part.trim()) return null;

      return (
        <div key={i}>
          <div dangerouslySetInnerHTML={{ __html: part + "</p>" }} />
          {/* ✅ sisipkan iklan setelah paragraf ke-2 */}
          {i === 1 && (
            <div className="my-4">
              <AdSlot position="content" />
            </div>
          )}
        </div>
      );
    })}
</article>

      {/* Pull quote */}
      {post.excerpt && (
        <blockquote className="pull-quote bg-gray-50 p-3 border-l-4 border-gray-300 italic mb-6">
          {post.excerpt}
        </blockquote>
      )}

      {/* Related */}
      {related.length > 0 && (
        <div className="border-l-4 border-gray-300 pl-3 mb-6">
          <h2 className="font-bold text-base mb-2">Baca Juga</h2>
          <ul className="space-y-1 text-blue-600">
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
              <Link key={i} to={`/tag/${tag}`} className="px-3 py-1 text-xs bg-gray-200 hover:bg-gray-300 rounded-full">
                #{tag}
              </Link>
            ))}
          </div>
        </div>
      )}
     
      {/* Related news */}
      <section className="mb-6">
        <h2 className="text-lg font-bold mb-3">Berita Terkait</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {related.map((p) => (
            <Link key={p.id} to={`/post/${p.slug}`} className="block border rounded-lg overflow-hidden hover:shadow-md transition">
              {p.thumbnail && <img src={p.thumbnail} alt={p.title} className="h-36 w-full object-cover" />}
              <div className="p-2 text-sm font-medium">{p.title}</div>
            </Link>
          ))}
        </div>
      </section>

      {/* Recommended */}
      <section className="mb-6">
        <h2 className="text-lg font-bold mb-3">Rekomendasi Untukmu</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {recommended.map((p) => (
            <Link key={p.id} to={`/post/${p.slug}`} className="block border rounded-lg overflow-hidden hover:shadow-md transition">
              {p.thumbnail && <img src={p.thumbnail} alt={p.title} className="h-36 w-full object-cover" />}
              <div className="p-2 text-sm font-medium">{p.title}</div>
            </Link>
          ))}
        </div>
      </section>

      {/* Other news */}
      <section className="mb-6">
        <h2 className="text-lg font-bold mb-3">Berita Cenvia Lainnya</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {others.map((p) => (
            <Link key={p.id} to={`/post/${p.slug}`} className="block border rounded-lg overflow-hidden hover:shadow-md transition">
              {p.thumbnail && <img src={p.thumbnail} alt={p.title} className="h-36 w-full object-cover" />}
              <div className="p-2 text-sm font-medium">{p.title}</div>
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
    </div>
  )
};

export default PostDetail;
