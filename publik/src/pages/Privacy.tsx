// publik/src/pages/Privacy.tsx
"use client";

import { motion } from "framer-motion";
import {
  Shield,
  User,
  Database,
  Lock,
  Share2,
  KeyRound,
  RefreshCcw,
  Mail,
} from "lucide-react";

export default function Privacy() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950">
      {/* HERO */}
      <section className="mx-6 mt-6 rounded-3xl shadow-lg text-center bg-gradient-to-r from-red-600 to-red-900 py-20 px-6">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-6xl font-extrabold tracking-wide text-white"
        >
          Privacy Policy
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="mt-6 text-lg md:text-xl max-w-3xl mx-auto text-gray-100"
        >
          Kebijakan privasi ini menjelaskan bagaimana{" "}
          <span className="font-semibold">CENVIA</span> mengumpulkan, menggunakan,
          melindungi, dan membagikan informasi pribadi Anda.
        </motion.p>
      </section>

      {/* CONTENT */}
      <div className="max-w-5xl mx-auto px-6 py-20 space-y-16 text-gray-700 dark:text-gray-300">
        {[
          {
            icon: <Shield className="w-8 h-8 text-red-600" />,
            title: "Pendahuluan",
            desc: (
              <>
                Kami di <span className="font-semibold">CENVIA</span> sangat menghargai
                privasi Anda. Dokumen ini menjelaskan komitmen kami dalam
                melindungi data pribadi pengguna dan memastikan informasi Anda
                tetap aman.
              </>
            ),
          },
          {
            icon: <User className="w-8 h-8 text-red-600" />,
            title: "Informasi yang Kami Kumpulkan",
            desc: (
              <ul className="list-disc list-inside space-y-2">
                <li>
                  <span className="font-semibold">Data Identitas:</span> Nama, email,
                  dan nomor telepon saat Anda menghubungi kami.
                </li>
                <li>
                  <span className="font-semibold">Data Teknis:</span> Alamat IP,
                  browser, perangkat, serta aktivitas ketika mengunjungi website.
                </li>
                <li>
                  <span className="font-semibold">Preferensi:</span> Kategori berita
                  atau konten yang sering diakses.
                </li>
              </ul>
            ),
          },
          {
            icon: <Database className="w-8 h-8 text-red-600" />,
            title: "Bagaimana Kami Menggunakan Data",
            desc: (
              <>
                Data pribadi yang kami kumpulkan digunakan untuk tujuan berikut:
                <ul className="list-decimal list-inside space-y-2 mt-2">
                  <li>Meningkatkan kualitas layanan dan konten yang disajikan.</li>
                  <li>Mengirimkan berita, pembaruan, atau informasi promosi.</li>
                  <li>Menganalisis trafik dan pola penggunaan situs.</li>
                </ul>
              </>
            ),
          },
          {
            icon: <Lock className="w-8 h-8 text-red-600" />,
            title: "Keamanan dan Perlindungan Data",
            desc: (
              <>
                Kami menerapkan teknologi enkripsi dan prosedur keamanan standar
                industri untuk melindungi data Anda.  
                Namun, harap diingat bahwa tidak ada metode transmisi online
                yang 100% aman.
              </>
            ),
          },
          {
            icon: <Share2 className="w-8 h-8 text-red-600" />,
            title: "Berbagi Informasi dengan Pihak Ketiga",
            desc: (
              <>
                Kami tidak menjual atau menyewakan data pribadi Anda.  
                Namun, informasi tertentu dapat dibagikan dengan mitra terpercaya
                untuk keperluan analisis dan peningkatan layanan.
              </>
            ),
          },
          {
            icon: <KeyRound className="w-8 h-8 text-red-600" />,
            title: "Hak Anda Sebagai Pengguna",
            desc: (
              <ul className="list-disc list-inside space-y-2">
                <li>Mengakses dan memperbarui informasi pribadi Anda.</li>
                <li>Meminta penghapusan data tertentu.</li>
                <li>Menolak menerima email promosi (unsubscribe).</li>
              </ul>
            ),
          },
          {
            icon: <RefreshCcw className="w-8 h-8 text-red-600" />,
            title: "Perubahan Kebijakan",
            desc: (
              <>
                Kami dapat memperbarui kebijakan ini dari waktu ke waktu.  
                Perubahan signifikan akan kami informasikan melalui situs resmi
                atau email.
              </>
            ),
          },
          {
            icon: <Mail className="w-8 h-8 text-red-600" />,
            title: "Hubungi Kami",
            desc: (
              <>
                Jika Anda memiliki pertanyaan terkait kebijakan privasi ini,
                silakan kunjungi halaman{" "}
                <a
                  href="/contact"
                  className="text-red-600 font-semibold hover:underline"
                >
                  Contact Us
                </a>
                .
              </>
            ),
          },
        ].map((item, idx) => (
          <motion.section
            key={idx}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: idx * 0.2 }}
            className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8 hover:shadow-2xl transition"
          >
            <div className="flex items-center gap-3 mb-4">
              {item.icon}
              <h2 className="text-2xl font-bold">{item.title}</h2>
            </div>
            <div className="text-base leading-relaxed">{item.desc}</div>
          </motion.section>
        ))}
      </div>
    </div>
  );
          }
