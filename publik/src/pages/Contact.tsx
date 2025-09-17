// publik/src/pages/Contact.tsx
"use client";
import { Mail, Phone, MapPin, Send } from "lucide-react";

export default function Contact() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Hero Section */}
<div
  className="text-white py-20 text-center shadow-lg flex flex-col items-center justify-center"
  style={{ backgroundColor: "#EF2626" }}
>
  <h1 className="text-5xl md:text-6xl font-extrabold tracking-wide text-white">
    CENVIA
  </h1>
  <p className="mt-4 text-lg md:text-xl text-gray-100 max-w-2xl mx-auto">
    Hubungi kami untuk pertanyaan, masukan, ataupun kerjasama.
  </p>
</div>

      {/* Contact Section */}
      <div className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-12">
        {/* Contact Info */}
        <div className="space-y-8">
          <h2 className="text-2xl font-bold text-gray-800 border-b-4 border-red-600 inline-block pb-2">
            Kontak Langsung
          </h2>
          <div className="space-y-6 text-gray-700">
            <div className="flex items-center space-x-4">
              <Mail className="text-red-600 w-6 h-6" />
              <p>
                <span className="font-semibold">Email Umum:</span>{" "}
                cenvia.info@gmail.com
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Phone className="text-red-600 w-6 h-6" />
              <p>
                <span className="font-semibold">Telepon:</span> +62 812-3456-7890
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <MapPin className="text-red-600 w-6 h-6" />
              <p>
                <span className="font-semibold">Alamat Redaksi:</span> Jakarta,
                Indonesia
              </p>
            </div>
          </div>

          <h3 className="text-xl font-semibold text-gray-800 mt-10">
            Departemen
          </h3>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>
              <span className="font-semibold">Redaksi:</span>{" "}
              cenvia.info@gmail.com
            </li>
            <li>
              <span className="font-semibold">Pemasaran & Iklan:</span>{" "}
              cenvia.info@gmail.com
            </li>
            <li>
              <span className="font-semibold">Kerja Sama & Media Partner:</span>{" "}
              cenvia.info@gmail.com
            </li>
          </ul>
        </div>

        {/* Contact Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Kirim Pesan
          </h2>
          <form className="space-y-5">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Nama
              </label>
              <input
                type="text"
                placeholder="Nama Anda"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-600 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Email
              </label>
              <input
                type="email"
                placeholder="Email Anda"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-600 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Pesan
              </label>
              <textarea
                rows={5}
                placeholder="Tulis pesan Anda di sini..."
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-600 focus:outline-none"
              ></textarea>
            </div>
            <button
              type="submit"
              className="flex items-center justify-center gap-2 w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-lg shadow-md transition-all"
            >
              <Send className="w-5 h-5" />
              Kirim Pesan
            </button>
          </form>
        </div>
      </div>
    </div>
  );
                }
