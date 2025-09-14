// admin/src/pages/admin/Ads.tsx
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Plus, Pencil, Trash } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

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
  const [open, setOpen] = useState(false);
  const [editAd, setEditAd] = useState<Ad | null>(null);
  const [form, setForm] = useState({ title: "", image_url: "", link: "" });
  const { toast } = useToast();

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

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function resetForm() {
    setForm({ title: "", image_url: "", link: "" });
    setEditAd(null);
  }

  async function handleSubmit() {
    if (!form.title || !form.image_url || !form.link) {
      toast({ title: "Error", description: "Please fill all fields." });
      return;
    }

    if (editAd) {
      // Update
      const { error } = await supabase
        .from("ads")
        .update(form)
        .eq("id", editAd.id);
      if (!error) {
        toast({ title: "Ad updated successfully" });
        fetchAds();
        setOpen(false);
        resetForm();
      }
    } else {
      // Insert
      const { error } = await supabase.from("ads").insert([form]);
      if (!error) {
        toast({ title: "Ad created successfully" });
        fetchAds();
        setOpen(false);
        resetForm();
      }
    }
  }

  async function handleDelete(id: string) {
    const { error } = await supabase.from("ads").delete().eq("id", id);
    if (!error) {
      setAds((prev) => prev.filter((ad) => ad.id !== id));
      toast({ title: "Ad deleted" });
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Ads Management</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={() => {
                resetForm();
                setOpen(true);
              }}
            >
              <Plus className="w-4 h-4 mr-2" />
              New Ad
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editAd ? "Edit Ad" : "New Ad"}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="Ad title"
                />
              </div>
              <div>
                <Label htmlFor="image_url">Image URL</Label>
                <Input
                  id="image_url"
                  name="image_url"
                  value={form.image_url}
                  onChange={handleChange}
                  placeholder="https://..."
                />
              </div>
              <div>
                <Label htmlFor="link">Link</Label>
                <Input
                  id="link"
                  name="link"
                  value={form.link}
                  onChange={handleChange}
                  placeholder="https://..."
                />
              </div>
              <Button className="w-full" onClick={handleSubmit}>
                {editAd ? "Update Ad" : "Create Ad"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* List */}
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
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setEditAd(ad);
                      setForm({
                        title: ad.title,
                        image_url: ad.image_url,
                        link: ad.link,
                      });
                      setOpen(true);
                    }}
                  >
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
