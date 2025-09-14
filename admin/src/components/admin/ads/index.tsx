import { useState } from "react";
import AdsList from "./AdsList";
import AdsForm, { AdFormValues } from "./AdsForm";
import { Dialog } from "@/components/ui/dialog";

export default function AdsManagement() {
  const [open, setOpen] = useState(false);
  const [editingAd, setEditingAd] = useState<any | null>(null);

  const handleEdit = (ad: any) => {
    setEditingAd(ad);
    setOpen(true);
  };

  const handleSuccess = () => {
    setOpen(false);
    setEditingAd(null);
    window.location.reload(); // refresh list setelah save
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">Ads Management</h1>
        <button
          onClick={() => {
            setEditingAd(null);
            setOpen(true);
          }}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          + Tambah Iklan
        </button>
      </div>

      <AdsList onEdit={handleEdit} />

      <Dialog open={open} onOpenChange={setOpen}>
        <div className="bg-white p-6 rounded shadow-lg max-w-lg w-full">
          <h2 className="text-lg font-semibold mb-4">
            {editingAd ? "Edit Iklan" : "Tambah Iklan"}
          </h2>
          <AdsForm
            initialData={editingAd || undefined}
            onSuccess={handleSuccess}
            onCancel={() => setOpen(false)}
          />
        </div>
      </Dialog>
    </div>
  );
}
