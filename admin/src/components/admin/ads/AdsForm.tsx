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
  status: z.enum(["active", "inactive"]),
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
      status: "active",
    },
  });

  useEffect(() => {
    if (initialData) reset(initialData);
  }, [initialData, reset]);

  const onSubmit = async (values: AdFormValues) => {
    if (initialData) {
      await supabase.from("script_ads").update(values).eq("id", initialData.id);
    } else {
      await supabase.from("script_ads").insert([values]);
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
