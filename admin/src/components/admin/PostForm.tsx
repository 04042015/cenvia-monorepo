import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
// ✅ Samakan client supabase di seluruh project
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// (opsional, kalau kamu sudah punya hook auth sendiri, gunakan itu)
import { useAuth } from "@/hooks/useAuth";

const schema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  excerpt: z.string().max(200, "Excerpt max 200 characters").optional(),
  content: z.string().min(10, "Content is required"),
  category_id: z.string().uuid("Please select a category"),
  status: z.enum(["draft", "published", "archived"]),
  image: z.any().optional(),
  // slug tidak perlu divalidasi dari form; kita generate sendiri
});

type FormData = z.infer<typeof schema>;

const BUCKET_NAME = "assets"; // 🔁 ganti jika kamu membuat bucket dengan nama lain

export function PostForm({ onSuccess }: { onSuccess?: () => void }) {
  const [categories, setCategories] = useState<{ id: string; name: string }[]>([]);
  const [uploading, setUploading] = useState(false);
  const { user } = useAuth(); // pastikan hook ini return user.id

  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { status: "draft" },
  });

  const title = watch("title");

  // Auto-generate slug (bersihkan tanda baca yang bikin 406)
  useEffect(() => {
    if (title) {
      const slug = title
        .toLowerCase()
        .trim()
        .replace(/[^\p{L}\p{N}\s-]/gu, "") // hapus tanda baca (kompatibel Unicode)
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");
      // slug tidak diperlukan di form, tapi kalau mau simpan hidden bisa
      setValue("slug" as any, slug);
    }
  }, [title, setValue]);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      const { data, error } = await supabase.from("categories").select("id, name");
      if (!error && data) setCategories(data);
    };
    fetchCategories();
  }, []);

  // Upload ke Supabase storage
  const uploadImage = async (file: File) => {
    setUploading(true);
    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${crypto.randomUUID()}.${fileExt}`;
      const filePath = `posts/${fileName}`;

      const { error: uploadErr } = await supabase
        .storage
        .from("assets")
        .upload(filePath, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (uploadErr) {
        // Error ini termasuk "Bucket not found"
        throw uploadErr;
      }

      const { data } = supabase.storage.from("assets").getPublicUrl(filePath);
      return data.publicUrl; // hanya valid jika bucket PUBLIC
    } finally {
      setUploading(false);
    }
  };

  const onSubmit = async (formData: FormData) => {
    try {
      if (!user?.id) {
        throw new Error("User not authenticated. Please login first.");
      }

      let imageUrl: string | null = null;
      if (formData.image && formData.image[0]) {
        imageUrl = await uploadImage(formData.image[0]);
      }

      // Buat slug unik (bersih dari tanda baca)
      const baseSlug = (formData.title || "")
        .toLowerCase()
        .trim()
        .replace(/[^\p{L}\p{N}\s-]/gu, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");

      let slug = baseSlug;
      let suffix = 1;
      while (true) {
        const { data, error } = await supabase
          .from("posts")
          .select("id")
          .eq("slug", slug)
          .maybeSingle(); // hindari throw kalau tidak ada

        if (error) {
          // kalau ada error selain "no rows", keluarin biar kelihatan
          throw error;
        }
        if (!data) break; // slug unik
        slug = `${baseSlug}-${suffix++}`;
      }

      const { error: insertErr } = await supabase.from("posts").insert([
        {
          title: formData.title,
          slug,
          excerpt: formData.excerpt ?? null,
          content: formData.content,
          category_id: formData.category_id,
          status: formData.status,
          thumbnail: imageUrl,               // ✅ kolom yang benar
          author_id: user.id,                // ✅ kolom NOT NULL
          published_at: formData.status === "published" ? new Date().toISOString() : null,
        },
      ]);

      if (insertErr) throw insertErr;

      onSuccess?.();
    } catch (err) {
      console.error("Error creating post:", err);
      alert(
        err?.message?.includes("Bucket")
          ? `Storage bucket "${BUCKET_NAME}" tidak ditemukan. Buat dulu di Supabase Storage (Public), atau ganti BUCKET_NAME di kode.`
          : `Gagal membuat post: ${err?.message ?? err}`
      );
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block font-medium">Title</label>
        <Input {...register("title")} placeholder="Masukkan judul Berita" />
        {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
      </div>

      <div>
        <label className="block font-medium">Ringkasan</label>
        <Textarea {...register("excerpt")} placeholder="Deskripsi singkat..." />
        {errors.excerpt && <p className="text-red-500 text-sm">{errors.excerpt.message}</p>}
      </div>

      <div>
        <label className="block font-medium">Isi</label>
        <Textarea {...register("content")} placeholder="Tulis postingan Anda..." rows={8} />
        {errors.content && <p className="text-red-500 text-sm">{errors.content.message}</p>}
      </div>

      <div>
        <label className="block font-medium">Image</label>
        <Input type="file" accept="image/*" {...register("image")} />
        {uploading && <p className="text-sm text-gray-500">Uploading...</p>}
      </div>

      <div>
        <label className="block font-medium">Category</label>
        <Select onValueChange={(val) => setValue("category_id", val)} defaultValue="">
          <SelectTrigger>
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((cat) => (
              <SelectItem key={cat.id} value={cat.id}>
                {cat.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.category_id && <p className="text-red-500 text-sm">{errors.category_id.message}</p>}
      </div>

      {/* slug hidden kalau mau dipakai */}
      <input type="hidden" {...register("slug" as any)} />

      <Button type="submit" disabled={uploading}>
        {uploading ? "Uploading..." : "Create Post"}
      </Button>
    </form>
  );
}
