// publik/src/pages/Editorial.tsx
"use client";
import React from "react";

export default function Editorial() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-gray-100">
      <div className="container mx-auto px-6 py-16">
        <h1 className="text-4xl md:text-5xl font-extrabold text-red-500 mb-6 text-center drop-shadow-md">
          Tim Redaksi CENVIA
        </h1>
        <p className="max-w-3xl mx-auto text-center text-gray-300 leading-relaxed mb-12">
          CENVIA adalah portal berita independen yang lahir dari semangat untuk
          menyajikan informasi yang akurat, berimbang, dan inspiratif bagi
          masyarakat Indonesia. Seluruh konten di sini dikelola langsung oleh
          pendiri sekaligus editor utama, yang berkomitmen menjaga integritas dan
          kualitas setiap tulisan yang diterbitkan.
        </p>

        <div className="bg-gray-800/60 p-8 rounded-2xl shadow-lg max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold text-white mb-4">
            Visi Redaksi
          </h2>
          <p className="text-gray-300 leading-relaxed mb-6">
            Menjadi media digital terpercaya yang menghadirkan berita dan
            informasi dengan perspektif jernih, mendalam, dan bermanfaat untuk
            publik. CENVIA percaya bahwa media bukan sekadar penyampai kabar,
            tetapi juga penggerak perubahan sosial melalui kekuatan informasi
            yang benar.
          </p>

          <h2 className="text-2xl font-semibold text-white mb-4">
            Misi Redaksi
          </h2>
          <ul className="list-disc list-inside text-gray-300 space-y-2">
            <li>Menjaga independensi dalam setiap pemberitaan.</li>
            <li>
              Menyajikan informasi yang berbasis data dan mengedepankan etika
              jurnalistik.
            </li>
            <li>
              Mengembangkan gaya penulisan yang segar, inspiratif, dan mudah
              dipahami pembaca.
            </li>
            <li>
              Memberikan ruang bagi opini dan suara publik yang konstruktif.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
