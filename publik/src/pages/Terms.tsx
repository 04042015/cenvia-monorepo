// publik/src/pages/Terms.tsx
"use client";

import { motion } from "framer-motion";
import { Shield, FileText, Scale, RefreshCcw, BookOpen, Mail } from "lucide-react";

export default function Terms() {
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
          Terms of Service
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="mt-6 text-lg md:text-xl max-w-3xl mx-auto text-gray-100"
        >
          Syarat dan ketentuan penggunaan layanan <span className="font-semibold">CENVIA</span>.  
          Mohon dibaca dengan seksama sebelum menggunakan situs kami.
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
                Dengan mengakses atau menggunakan layanan{" "}
                <span className="font-semibold">CENVIA</span>, Anda dianggap telah membaca,
                memahami, dan menyetujui syarat dan ketentuan yang berlaku.  
                Jika tidak setuju, mohon untuk tidak menggunakan layanan kami.
              </>
            ),
          },
          {
            icon: <FileText className="w-8 h-8 text-red-600" />,
            title: "Penggunaan Layanan",
            desc: (
              <ul className="list-disc list-inside space-y-2">
                <li>Layanan hanya boleh digunakan untuk tujuan yang sah dan sesuai hukum.</li>
                <li>Dilarang menyalahgunakan konten untuk aktivitas ilegal, plagiarisme, atau penyebaran informasi palsu.</li>
                <li>Kami berhak membatasi atau menghentikan akses pengguna yang melanggar syarat ini.</li>
              </ul>
            ),
          },
          {
            icon: <BookOpen className="w-8 h-8 text-red-600" />,
            title: "Hak atas Konten",
            desc: (
              <>
                Semua konten di <span className="font-semibold">CENVIA</span> dilindungi oleh hak cipta.  
                Konten boleh dibagikan dengan mencantumkan sumber. Penggunaan komersial tanpa izin tertulis dilarang.
              </>
            ),
          },
          {
            icon: <Scale className="w-8 h-8 text-red-600" />,
            title: "Batasan Tanggung Jawab",
            desc: (
              <>
                <span className="font-semibold">CENVIA</span> tidak bertanggung jawab atas kerugian langsung maupun tidak langsung
                yang timbul akibat penggunaan informasi di situs ini.  
                Kami berusaha menyajikan informasi yang akurat, namun tidak menjamin kelengkapan dan kebenarannya.
              </>
            ),
          },
          {
            icon: <RefreshCcw className="w-8 h-8 text-red-600" />,
            title: "Perubahan dan Pembaruan",
            desc: (
              <>
                Kami dapat memperbarui atau mengubah syarat layanan ini kapan saja tanpa pemberitahuan sebelumnya.  
                Perubahan berlaku segera setelah dipublikasikan.
              </>
            ),
          },
          {
            icon: <Scale className="w-8 h-8 text-red-600" />,
            title: "Hukum yang Berlaku",
            desc: (
              <>
                Syarat layanan ini diatur sesuai hukum yang berlaku di Indonesia.  
                Segala perselisihan akan diselesaikan sesuai ketentuan hukum yang berlaku.
              </>
            ),
          },
          {
            icon: <Mail className="w-8 h-8 text-red-600" />,
            title: "Hubungi Kami",
            desc: (
              <>
                Jika Anda memiliki pertanyaan mengenai syarat layanan ini, silakan kunjungi halaman{" "}
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
