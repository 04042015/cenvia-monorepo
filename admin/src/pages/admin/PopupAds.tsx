// admin/src/pages/admin/PopupAds.tsx
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
import { Textarea } from "@/components/ui/textarea";
import { Plus, Pencil, Trash } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface PopupAd {
  id: string;
  title: string;
  content_html: string;
  frequency_seconds: number;
  created_at: string;
}

export default function PopupAds() {
  const [ads, setAds] = useState<PopupAd[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editAd, setEditAd] = useState<PopupAd | null>(null);
  const [form, setForm] = useState({
    title: "",
    content_html: "",
    frequency_seconds: 60,
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchAds();
  }, []);

  async function fetchAds() {
    setLoading(true);
    const { data, error } = await supabase
      .from("popup_ads")
      .select("*")
      .order("created_at", { ascending: false });
    if (!error && data) setAds(data);
    setLoading(false);
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function resetForm() {
    setForm({ title: "", content_html: "", frequency_seconds: 60 });
    setEditAd(null);
  }

  async function handleSubmit() {
    if (!form.title || !form.content_html) {
      toast({ title: "Error", description: "Please fill all fields." });
      return;
    }

    const payload = {
      title: form.title,
      content_html: form.content_html,
      frequency_seconds: Number(form.frequency_seconds),
    };

    if (editAd) {
      const { error } = await supabase
        .from("popup_ads")
        .update(payload)
        .eq("id", editAd.id);
      if (!error) {
        toast({ title: "Popup Ad updated successfully" });
        fetchAds();
        setOpen(false);
        resetForm();
      }
    } else {
      const { error } = await supabase.from("popup_ads").insert([payload]);
      if (!error) {
        toast({ title: "Popup Ad created successfully" });
        fetchAds();
        setOpen(false);
        resetForm();
      }
    }
  }

  async function handleDelete(id: string) {
    const { error } = await supabase.from("popup_ads").delete().eq("id", id);
    if (!error) {
      setAds((prev) => prev.filter((ad) => ad.id !== id));
      toast({ title: "Popup Ad deleted" });
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Popup Ads Management</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={() => {
                resetForm();
                setOpen(true);
              }}
            >
              <Plus className="w-4 h-4 mr-2" />
              New Popup Ad
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editAd ? "Edit Popup Ad" : "New Popup Ad"}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="Popup title"
                />
              </div>
              <div>
                <Label htmlFor="content_html">Content (HTML)</Label>
                <Textarea
                  id="content_html"
                  name="content_html"
                  value={form.content_html}
                  onChange={handleChange}
                  placeholder="<img src='...'> or any HTML"
                  rows={6}
                />
              </div>
              <div>
                <Label htmlFor="frequency_seconds">Frequency (seconds)</Label>
                <Input
                  type="number"
                  id="frequency_seconds"
                  name="frequency_seconds"
                  value={form.frequency_seconds}
                  onChange={handleChange}
                  placeholder="60"
                />
              </div>
              <Button className="w-full" onClick={handleSubmit}>
                {editAd ? "Update Popup" : "Create Popup"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* List */}
      {loading ? (
        <p>Loading popup ads...</p>
      ) : ads.length === 0 ? (
        <p className="text-muted-foreground">No popup ads yet.</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {ads.map((ad) => (
            <Card key={ad.id} className="overflow-hidden">
              <CardHeader>
                <CardTitle className="truncate">{ad.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex justify-between items-center">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    navigator.clipboard.writeText(ad.content_html).then(() =>
                      toast({ title: "Copied HTML to clipboard" })
                    )
                  }
                >
                  Copy HTML
                </Button>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setEditAd(ad);
                      setForm({
                        title: ad.title,
                        content_html: ad.content_html,
                        frequency_seconds: ad.frequency_seconds,
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
