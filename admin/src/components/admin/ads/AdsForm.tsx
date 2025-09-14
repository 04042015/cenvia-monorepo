// admin/src/components/admin/ads/AdsForm.tsx
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";

const schema = z.object({
  title: z.string().min(3, "Judul minimal 3 karakter"),
  image_url: z.string().url("Masukkan URL gambar yang valid"),
  link_url: z.string().url("Masukkan URL link yang valid"),
  description: z.string().optional(),
  position: z.enum(["sidebar", "header", "footer"]),
  status: z.enum(["active", "inactive"]),
  start_date: z.string(),
  end_date: z.string(),
});

export type AdFormValues = z.infer<typeof schema>;

interface Props {
  initialData?: any;
  onSuccess: () => void;
  onCancel: () => void;
}

export default function AdsForm({ initialData, onSuccess, onCancel }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AdFormValues>({
    resolver: zodResolver(schema),
    defaultValues: initialData || {
      title: "",
      image_url: "",
      link_url: "",
      description: "",
      position: "sidebar",
      status: "active",
      start_date: "",
      end_date: "",
    },
  });

  useEffect(() => {
    if (initialData) reset(initialData);
  }, [initialData, reset]);

  const onSubmit = async (values: AdFormValues) => {
    if (initialData) {
      await supabase.from("ads").update(values).eq("id", initialData.id);
    } else {
      await supabase.from("ads").insert([values]);
    }
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Judul */}
      <div>
        <label className="block mb-1 font-medium">Judul</label>
        <input {...register("title")} className="w-full border p-2 rounded" />
        {errors.title && <p className="text-red-500">{errors.title.message}</p>}
      </div>

      {/* Gambar */}
      <div>
        <label className="block mb-1 font-medium">Gambar (URL)</label>
        <input {...register("image_url")} className="w-full border p-2 rounded" />
        {errors.image_url && <p className="text-red-500">{errors.image_url.message}</p>}
      </div>

      {/* Link */}
      <div>
        <label className="block mb-1 font-medium">Link (URL)</label>
        <input {...register("link_url")} className="w-full border p-2 rounded" />
        {errors.link_url && <p className="text-red-500">{errors.link_url.message}</p>}
      </div>

      {/* Deskripsi */}
      <div>
        <label className="block mb-1 font-medium">Deskripsi</label>
        <textarea {...register("description")} className="w-full border p-2 rounded" />
      </div>

      {/* Posisi */}
      <div>
        <label className="block mb-1 font-medium">Posisi</label>
        <select {...register("position")} className="w-full border p-2 rounded">
          <option value="sidebar">Sidebar</option>
          <option value="header">Header</option>
          <option value="footer">Footer</option>
        </select>
      </div>

      {/* Status */}
      <div>
        <label className="block mb-1 font-medium">Status</label>
        <select {...register("status")} className="w-full border p-2 rounded">
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      {/* Periode */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block mb-1 font-medium">Tanggal Mulai</label>
          <input type="date" {...register("start_date")} className="w-full border p-2 rounded" />
        </div>
        <div>
          <label className="block mb-1 font-medium">Tanggal Akhir</label>
          <input type="date" {...register("end_date")} className="w-full border p-2 rounded" />
        </div>
      </div>

      {/* Action */}
      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Batal
        </Button>
        <Button type="submit">{initialData ? "Update" : "Tambah"}</Button>
      </div>
    </form>
  );
}
