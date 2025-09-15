// admin/src/components/admin/ads/AdsForm.tsx
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";

const schema = z.object({
  title: z.string().min(3, "Judul minimal 3 karakter"),
  code: z.string().min(10, "Script code harus diisi"),
  position: z.string().min(3, "Posisi harus dipilih"),
  // ❌ status tidak ada di form, otomatis diisi "active"
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
      code: "",
      position: "sidebar",
    },
  });

  useEffect(() => {
    if (initialData) reset(initialData);
  }, [initialData, reset]);

  const onSubmit = async (values: AdFormValues) => {
    // ✅ paksa selalu ada status = "active"
    const payload = {
      ...values,
      status: "active",
    };

    if (initialData) {
      await supabase.from("script_ads").update(payload).eq("id", initialData.id);
    } else {
      await supabase.from("script_ads").insert([payload]);
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

      {/* Script Code */}
      <div>
        <label className="block mb-1 font-medium">Script Code</label>
        <textarea
          {...register("code")}
          rows={4}
          className="w-full border p-2 rounded font-mono"
        />
        {errors.code && <p className="text-red-500">{errors.code.message}</p>}
      </div>

      {/* Posisi */}
      <div>
        <label className="block mb-1 font-medium">Posisi</label>
        <select {...register("position")} className="w-full border p-2 rounded">
          <option value="sidebar">Sidebar</option>
          <option value="header">Header</option>
          <option value="footer">Footer</option>
          <option value="popup">Popup</option>
          <option value="homepage">Homepage</option>
        </select>
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
