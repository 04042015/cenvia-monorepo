import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { supabase } from "@/lib/supabaseClient";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const schema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  excerpt: z.string().max(200, "Excerpt max 200 characters").optional(),
  content: z.string().min(10, "Content is required"),
  category_id: z.string().uuid("Please select a category"),
  status: z.enum(["draft", "published", "archived"]),
  image: z.any().optional(),
});

type FormData = z.infer<typeof schema>;

export function PostForm({ onSuccess }: { onSuccess?: () => void }) {
  const [categories, setCategories] = useState<{ id: string; name: string }[]>([]);
  const [uploading, setUploading] = useState(false);

  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { status: "draft" },
  });

  const title = watch("title");

  // Auto-generate slug
  useEffect(() => {
    if (title) {
      const slug = title
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-");
      setValue("slug", slug, { shouldValidate: true });
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
    const fileExt = file.name.split(".").pop();
    const fileName = `${crypto.randomUUID()}.${fileExt}`;
    const filePath = `posts/${fileName}`;

    const { error } = await supabase.storage.from("asset").upload(filePath, file);
    setUploading(false);

    if (error) throw error;

    const { data } = supabase.storage.from("asset").getPublicUrl(filePath);
    return data.publicUrl;
  };

  const onSubmit = async (formData: FormData) => {
    try {
      let imageUrl = null;

      if (formData.image && formData.image[0]) {
        imageUrl = await uploadImage(formData.image[0]);
      }

      // Cek slug unik
      let slug = (title || "").toLowerCase().replace(/\s+/g, "-");
      let suffix = 1;
      while (true) {
        const { data } = await supabase.from("posts").select("id").eq("slug", slug).single();
        if (!data) break; // slug unik
        slug = `${slug}-${suffix++}`;
      }

      const { error } = await supabase.from("posts").insert([
  {
    title: formData.title,
    slug,
    excerpt: formData.excerpt,
    content: formData.content,
    category_id: formData.category_id,
    status: formData.status,
    thumbnail: imageUrl,  // ✅ gunakan thumbnail
    author_id: (await supabase.auth.getUser()).data.user?.id, // ✅ ambil dari user login
    published_at: formData.status === "published" ? new Date().toISOString() : null,
  },
]);

      if (error) throw error;
      if (onSuccess) onSuccess();
    } catch (err) {
      console.error("Error creating post:", err);
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

      <div>
        <label className="block font-medium">Status</label>
        <Select onValueChange={(val) => setValue("status", val)} defaultValue="draft">
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="draft">Draft</SelectItem>
            <SelectItem value="published">Published</SelectItem>
            <SelectItem value="archived">Archived</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Slug disembunyikan, auto-generate */}
      <input type="hidden" {...register("slug")} />

      <Button type="submit" disabled={uploading}>
        {uploading ? "Uploading..." : "Create Post"}
      </Button>
    </form>
  );
}
