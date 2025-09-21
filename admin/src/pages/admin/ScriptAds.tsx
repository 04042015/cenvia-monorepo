// admin/src/pages/admin/ScriptAds.tsx
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
import { Textarea } from "@/components/ui/textarea";

interface ScriptAd {
  id: string;
  title: string;
  code: string;
  position:
    | "sidebar"
    | "header"
    | "footer"
    | "left"
    | "right"
    | "popup"
    | "homepage";
  created_at: string;
}

export default function ScriptAds() {
  const [ads, setAds] = useState<ScriptAd[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editAd, setEditAd] = useState<ScriptAd | null>(null);
  const [form, setForm] = useState({
    title: "",
    code: "",
    position: "sidebar",
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchAds();
  }, []);

  async function fetchAds() {
    setLoading(true);
    const { data, error } = await supabase
      .from("script_ads")
      .select("*")
      .order("created_at", { ascending: false });
    if (!error && data) setAds(data);
    setLoading(false);
  }

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function resetForm() {
    setForm({ title: "", code: "", position: "sidebar" });
    setEditAd(null);
  }

  async function handleSubmit() {
    if (!form.title || !form.code) {
      toast({ title: "Error", description: "Please fill all fields." });
      return;
    }

    if (editAd) {
      // Update
      const { error } = await supabase
        .from("script_ads")
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
      const { error } = await supabase.from("script_ads").insert([form]);
      if (!error) {
        toast({ title: "Ad created successfully" });
        fetchAds();
        setOpen(false);
        resetForm();
      }
    }
  }

  async function handleDelete(id: string) {
    const { error } = await supabase.from("script_ads").delete().eq("id", id);
    if (!error) {
      setAds((prev) => prev.filter((ad) => ad.id !== id));
      toast({ title: "Ad deleted" });
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Script Ads Management</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={() => {
                resetForm();
                setOpen(true);
              }}
            >
              <Plus className="w-4 h-4 mr-2" />
              New Script Ad
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editAd ? "Edit Script Ad" : "New Script Ad"}
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
                  placeholder="Ad title"
                />
              </div>
              <div>
                <Label htmlFor="code">Script Code</Label>
                <Textarea
                  id="code"
                  name="code"
                  value={form.code}
                  onChange={handleChange}
                  placeholder="<script src='...'></script>"
                  rows={6}
                />
              </div>
              <div>
                <Label htmlFor="position">Position</Label>
                <select
                  id="position"
                  name="position"
                  value={form.position}
                  onChange={handleChange}
                  className="w-full border rounded p-2"
                >
                  <option value="sidebar">Sidebar</option>
                  <option value="header">Header</option>
                  <option value="footer">Footer</option>
                  <option value="left">Left</option>
                  <option value="right">Right</option>
                  <option value="popup">Popup</option>
                  <option value="homepage">Homepage</option>
                </select>
              </div>
              <Button className="w-full" onClick={handleSubmit}>
                {editAd ? "Update Script Ad" : "Create Script Ad"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* List */}
      {loading ? (
        <p>Loading ads...</p>
      ) : ads.length === 0 ? (
        <p className="text-muted-foreground">No script ads yet.</p>
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
                    navigator.clipboard.writeText(ad.code).then(() =>
                      toast({ title: "Copied script to clipboard" })
                    )
                  }
                >
                  Copy Code
                </Button>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setEditAd(ad);
                      setForm({
                        title: ad.title,
                        code: ad.code,
                        position: ad.position || "sidebar",
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
