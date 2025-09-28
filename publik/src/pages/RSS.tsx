// publik/src/pages/RSS.tsx
"use client";

import { motion } from "framer-motion";
import {
  Rss,
  Zap,
  CheckCircle2,
  BookOpenText,
  Info,
  Mail,
} from "lucide-react";

export default function RSS() {
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
          RSS Feed
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="mt-6 text-lg md:text-xl max-w-3xl mx-auto text-gray-100"
        >
          Dapatkan update berita terbaru dari{" "}
          <span className="font-semibold">CENVIA</span> langsung melalui RSS Feed.
        </motion.p>
      </section>

      {/* CONTENT */}
      <div className="max-w-5xl mx-auto px-6 py-20 space-y-16 text-gray-700 dark:text-gray-300">
        {[
          {
            icon: <Rss className="w-8 h-8 text-red-600" />,
            title: "Apa itu RSS?",
            desc: (
              <>
                <span className="font-semibold">
                  RSS (Really Simple Syndication)
                </span>{" "}
                adalah format umpan berita yang memungkinkan Anda untuk menerima
                pembaruan konten terbaru dari <span className="font-semibold">CENVIA</span>{" "}
                secara otomatis tanpa harus membuka situs setiap saat.
              </>
            ),
          },
          {
            icon: <Zap className="w-8 h-8 text-red-600" />,
            title: "Keuntungan Menggunakan RSS Feed",
            desc: (
              <ul className="list-disc list-inside space-y-2">
                <li>Update berita terbaru secara otomatis.</li>
                <li>Bisa dibaca dari aplikasi pembaca RSS di perangkat Anda.</li>
                <li>Akses cepat tanpa terganggu iklan atau tampilan berlebihan.</li>
                <li>Sesuaikan konten sesuai kategori favorit Anda.</li>
              </ul>
            ),
          },
          {
            icon: <BookOpenText className="w-8 h-8 text-red-600" />,
            title: "Cara Menggunakan RSS Feed CENVIA",
            desc: (
              <ol className="list-decimal list-inside space-y-2">
                <li>
                  Gunakan aplikasi pembaca RSS seperti{" "}
                  <span className="italic">Feedly, Inoreader</span>, atau browser
                  dengan dukungan RSS.
                </li>
                <li>
                  Salin URL RSS CENVIA berikut:{" "}
                  <code className="bg-gray-200 dark:bg-gray-800 px-2 py-1 rounded text-sm">
                    https://cenvia.com/rss
                  </code>
                </li>
                <li>
                  Tempelkan URL tersebut ke aplikasi pembaca RSS Anda untuk mulai
                  menerima update.
                </li>
              </ol>
            ),
          },
          {
            icon: <Info className="w-8 h-8 text-red-600" />,
            title: "Catatan",
            desc: (
              <>
                RSS Feed <span className="font-semibold">CENVIA</span> hanya digunakan
                untuk tujuan pribadi dan non-komersial.  
                Untuk penggunaan lebih lanjut seperti agregator atau sindikasi
                konten, silakan hubungi tim kami.
              </>
            ),
          },
          {
            icon: <Mail className="w-8 h-8 text-red-600" />,
            title: "Hubungi Kami",
            desc: (
              <>
                Jika Anda memiliki pertanyaan mengenai penggunaan RSS Feed, silakan
                kunjungi halaman{" "}
                <a
                  href="/contact"
                  className="text-red-600 font-semibold hover:underline"
                >
                  Contact Us
                </a>{" "}
                untuk informasi lebih lanjut.
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
