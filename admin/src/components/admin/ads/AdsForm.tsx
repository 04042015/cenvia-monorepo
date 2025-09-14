import React, { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function AdsForm() {
  const [formData, setFormData] = useState({
    title: "",
    image_url: "",
    link_url: "",
    description: "",
    position: "sidebar",
    status: "active",
    start_date: "",
    end_date: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const { error } = await supabase.from("ads").insert([formData]);

    if (error) {
      console.error("Error inserting ad:", error.message);
      setMessage("❌ Gagal menambahkan iklan: " + error.message);
    } else {
      setMessage("✅ Iklan berhasil ditambahkan!");
      setFormData({
        title: "",
        image_url: "",
        link_url: "",
        description: "",
        position: "sidebar",
        status: "active",
        start_date: "",
        end_date: "",
      });
    }
    setLoading(false);
  };

  return (
    <div className="max-w-xl mx-auto bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Tambah Iklan Baru</h2>

      {message && (
        <p
          className={`mb-4 text-sm ${
            message.startsWith("✅") ? "text-green-600" : "text-red-600"
          }`}
        >
          {message}
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Judul */}
        <div>
          <label className="block text-sm font-medium mb-1">Judul</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full border rounded p-2"
          />
        </div>

        {/* Gambar */}
        <div>
          <label className="block text-sm font-medium mb-1">URL Gambar</label>
          <input
            type="text"
            name="image_url"
            value={formData.image_url}
            onChange={handleChange}
            required
            className="w-full border rounded p-2"
          />
        </div>

        {/* Link */}
        <div>
          <label className="block text-sm font-medium mb-1">URL Link</label>
          <input
            type="text"
            name="link_url"
            value={formData.link_url}
            onChange={handleChange}
            required
            className="w-full border rounded p-2"
          />
        </div>

        {/* Deskripsi */}
        <div>
          <label className="block text-sm font-medium mb-1">Deskripsi</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={3}
            className="w-full border rounded p-2"
          />
        </div>

        {/* Posisi */}
        <div>
          <label className="block text-sm font-medium mb-1">Posisi</label>
          <select
            name="position"
            value={formData.position}
            onChange={handleChange}
            className="w-full border rounded p-2"
          >
            <option value="sidebar">Sidebar</option>
            <option value="header">Header</option>
            <option value="footer">Footer</option>
            <option value="article">Artikel</option>
          </select>
        </div>

        {/* Status */}
        <div>
          <label className="block text-sm font-medium mb-1">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full border rounded p-2"
          >
            <option value="active">Aktif</option>
            <option value="inactive">Nonaktif</option>
          </select>
        </div>

        {/* Tanggal Mulai */}
        <div>
          <label className="block text-sm font-medium mb-1">Tanggal Mulai</label>
          <input
            type="date"
            name="start_date"
            value={formData.start_date}
            onChange={handleChange}
            required
            className="w-full border rounded p-2"
          />
        </div>

        {/* Tanggal Berakhir */}
        <div>
          <label className="block text-sm font-medium mb-1">Tanggal Berakhir</label>
          <input
            type="date"
            name="end_date"
            value={formData.end_date}
            onChange={handleChange}
            required
            className="w-full border rounded p-2"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg"
        >
          {loading ? "Menyimpan..." : "Tambah Iklan"}
        </button>
      </form>
    </div>
  );
}
