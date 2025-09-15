// admin/src/components/admin/ads/AdsList.tsx
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";

interface Ad {
  id: string;
  title: string;
  position: string;
  status: string;
  created_at: string;
  code: string;
}

interface Props {
  onEdit: (ad: Ad) => void;
}

export default function AdsList({ onEdit }: Props) {
  const [ads, setAds] = useState<Ad[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAds = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("script_ads")
      .select("*")
      .order("created_at", { ascending: false });
    if (!error) setAds(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchAds();
  }, []);

  const handleDelete = async (id: string) => {
    await supabase.from("script_ads").delete().eq("id", id);
    fetchAds();
  };

  if (loading) return <p>Loading iklan...</p>;

  return (
    <div className="overflow-x-auto border rounded">
      <table className="min-w-full text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 text-left">Judul</th>
            <th className="p-2">Posisi</th>
            <th className="p-2">Status</th>
            <th className="p-2">Tanggal Dibuat</th>
            <th className="p-2">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {ads.map((ad) => (
            <tr key={ad.id} className="border-t">
              <td className="p-2">{ad.title}</td>
              <td className="p-2 text-center">{ad.position}</td>
              <td className="p-2 text-center">{ad.status}</td>
              <td className="p-2 text-center">
                {new Date(ad.created_at).toLocaleDateString()}
              </td>
              <td className="p-2 flex gap-2 justify-center">
                <Button size="sm" onClick={() => onEdit(ad)}>
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleDelete(ad.id)}
                >
                  Hapus
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
