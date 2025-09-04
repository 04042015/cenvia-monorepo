// publik/src/pages/PostDetail.tsx
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "@/lib/supabaseClient";
import dayjs from "dayjs";
import {
  Facebook,
  Twitter,
  MessageCircle,
  Send,
  Linkedin,
  Link as LinkIcon,
  Share2,
} from "lucide-react";
import { FaReddit } from "react-icons/fa";

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
  author_id: string | null;
  author: {
    full_name: string;
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
          author_id, category_id,
          author:profiles!posts_author_id_fkey(full_name, avatar_url),
          category:categories(id, name, slug, color)
        `)
        .eq("slug", slug)
        .single();

      if (error) {
        console.error("Gagal ambil post:", error);
        return;
      }

      // increment views
      await supabase.rpc("increment_post_views", { post_id: data.id });
      setPost(data);

      // Related
      const { data: relatedPosts } = await supabase
        .from("posts")
        .select("id, title, slug, thumbnail, category:categories(id, name, color)")
        .eq("category_id", data.category_id)
        .neq("id", data.id)
        .limit(4);

      if (relatedPosts) setRelated(relatedPosts);

      // Recommended
      const { data: recommendedPosts } = await supabase
        .from("posts")
        .select("id, title, slug, thumbnail")
        .neq("id", data.id)
        .limit(4);

      if (recommendedPosts) setRecommended(recommendedPosts);

      // Others
      const { data: otherPosts } = await supabase
        .from("posts")
        .select("id, title, slug, thumbnail")
        .neq("category_id", data.category_id)
        .limit(4);

      if (otherPosts) setOthers(otherPosts);
    };

    if (slug) fetchPost();
  }, [slug]);

  if (!post) return <p className="text-center py-10">Loading...</p>;

  const shareUrl = `${window.location.origin}/post/${post.slug}`;
  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    alert("Link artikel berhasil disalin 📋");
  };

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-4 text-center">
        <Link to="/" className="hover:underline">Home</Link>
        <span className="mx-1">›</span>
        <Link
          to={`/category/${post.category.slug}`}
          style={{ color: post.category.color }}
          className="font-medium"
        >
          {post.category.name}
        </Link>
        <span className="mx-1">›</span>
        <span>{post.title}</span>
      </nav>

      {/* Title */}
      <h1
        className="text-3xl sm:text-4xl font-extrabold mb-3 leading-snug text-center"
        style={{ color: post.category.color }}
      >
        {post.title}
      </h1>

      {/* Meta info */}
      <div className="flex flex-wrap justify-center items-center text-sm text-gray-600 mb-5 gap-2">
        {post.author?.avatar_url && (
          <img
            src={post.author.avatar_url}
            alt={post.author.full_name}
            className="w-7 h-7 rounded-full object-cover"
          />
        )}
        {post.author?.full_name ? (
          <span className="font-medium">{post.author.full_name}</span>
        ) : (
          <span className="italic">Anonim</span>
        )}
        <span>•</span>
        <span>{dayjs(post.published_at || post.created_at).format("DD MMMM YYYY")}</span>
        <span>•</span>
        <span
          className="font-semibold"
          style={{ color: post.category.color }}
        >
          {post.category.name}
        </span>
        <span>•</span>
        <span>{post.views} views</span>
      </div>

      {/* Share */}
      <div className="text-center mb-6">
        <h3 className="font-semibold mb-2 flex items-center justify-center gap-2">
          <Share2 className="w-4 h-4" /> Bagikan
        </h3>
        <div className="flex justify-center flex-wrap gap-3">
          {/* share buttons */}
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
            target="_blank" rel="noopener noreferrer"
            className="p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700"
          >
            <Facebook className="w-5 h-5" />
          </a>
          <a
            href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(post.title)}`}
            target="_blank" rel="noopener noreferrer"
            className="p-2 rounded-full bg-sky-500 text-white hover:bg-sky-600"
          >
            <Twitter className="w-5 h-5" />
          </a>
          <a
            href={`https://wa.me/?text=${encodeURIComponent(post.title + " " + shareUrl)}`}
            target="_blank" rel="noopener noreferrer"
            className="p-2 rounded-full bg-green-500 text-white hover:bg-green-600"
          >
            <MessageCircle className="w-5 h-5" />
          </a>
          <a
            href={`https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(post.title)}`}
            target="_blank" rel="noopener noreferrer"
            className="p-2 rounded-full bg-blue-400 text-white hover:bg-blue-500"
          >
            <Send className="w-5 h-5" />
          </a>
          <a
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
            target="_blank" rel="noopener noreferrer"
            className="p-2 rounded-full bg-blue-700 text-white hover:bg-blue-800"
          >
            <Linkedin className="w-5 h-5" />
          </a>
          <a
            href={`https://www.reddit.com/submit?url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(post.title)}`}
            target="_blank" rel="noopener noreferrer"
            className="p-2 rounded-full bg-orange-600 text-white hover:bg-orange-700"
          >
            <FaReddit className="w-5 h-5" />
          </a>
          <button
            onClick={handleCopyLink}
            className="p-2 rounded-full bg-gray-600 text-white hover:bg-gray-700"
          >
            <LinkIcon className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Thumbnail */}
      {post.thumbnail && (
        <figure className="mb-6">
          <img
            src={post.thumbnail}
            alt={post.title}
            className="w-full max-w-3xl mx-auto rounded-lg shadow-md"
          />
          {post.excerpt && (
            <figcaption className="text-xs text-gray-500 mt-1 italic text-center">
              {post.excerpt}
            </figcaption>
          )}
        </figure>
      )}

      {/* Content */}
      <article
        className="prose prose-lg max-w-none text-justify mb-10"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      {/* Baca Juga */}
      {related.length > 0 && (
        <div className="border-l-4 border-red-500 pl-3 mb-10">
          <h2 className="font-bold text-lg mb-2">Baca Juga</h2>
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
        <div className="mb-10">
          <h3 className="font-semibold mb-2">Tags:</h3>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag, i) => (
              <span
                key={i}
                className="px-3 py-1 text-sm bg-gray-200 hover:bg-gray-300 rounded-full cursor-pointer"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Related / Recommended / Others */}
      <section className="mb-10">
        <h2 className="text-xl font-bold mb-4">Berita Terkait</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {related.map((p) => (
            <Link
              key={p.id}
              to={`/post/${p.slug}`}
              className="block border rounded-lg overflow-hidden hover:shadow-md transition"
            >
              {p.thumbnail && (
                <img src={p.thumbnail} alt={p.title} className="h-40 w-full object-cover" />
              )}
              <div className="p-3 text-sm font-medium">{p.title}</div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold mb-4">Rekomendasi Untukmu</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {recommended.map((p) => (
            <Link
              key={p.id}
              to={`/post/${p.slug}`}
              className="block border rounded-lg overflow-hidden hover:shadow-md transition"
            >
              {p.thumbnail && (
                <img src={p.thumbnail} alt={p.title} className="h-40 w-full object-cover" />
              )}
              <div className="p-3 text-sm font-medium">{p.title}</div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold mb-4">Berita Cenvia Lainnya</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {others.map((p) => (
            <Link
              key={p.id}
              to={`/post/${p.slug}`}
              className="block border rounded-lg overflow-hidden hover:shadow-md transition"
            >
              {p.thumbnail && (
                <img src={p.thumbnail} alt={p.title} className="h-40 w-full object-cover" />
              )}
              <div className="p-3 text-sm font-medium">{p.title}</div>
            </Link>
          ))}
        </div>
      </section>

  );
};

export default PostDetail;
