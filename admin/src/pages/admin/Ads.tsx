// admin/src/pages/admin/Ads.tsx
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Pencil, Trash } from "lucide-react";

interface Ad {
  id: string;
  title: string;
  image_url: string;
  link: string;
  created_at: string;
}

export default function Ads() {
  const [ads, setAds] = useState<Ad[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAds();
  }, []);

  async function fetchAds() {
    setLoading(true);
    const { data, error } = await supabase
      .from("ads")
      .select("*")
      .order("created_at", { ascending: false });
    if (!error && data) setAds(data);
    setLoading(false);
  }

  async function handleDelete(id: string) {
    const { error } = await supabase.from("ads").delete().eq("id", id);
    if (!error) {
      setAds((prev) => prev.filter((ad) => ad.id !== id));
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Ads Management</h1>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          New Ad
        </Button>
      </div>

      {loading ? (
        <p>Loading ads...</p>
      ) : ads.length === 0 ? (
        <p className="text-muted-foreground">No ads yet.</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {ads.map((ad) => (
            <Card key={ad.id} className="overflow-hidden">
              <img
                src={ad.image_url}
                alt={ad.title}
                className="w-full h-40 object-cover"
              />
              <CardHeader>
                <CardTitle className="truncate">{ad.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex justify-between items-center">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.open(ad.link, "_blank")}
                >
                  Visit
                </Button>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm">
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(ad.id)}
                  >
                    <Trash className="w-4 h-4 text-red-500" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
