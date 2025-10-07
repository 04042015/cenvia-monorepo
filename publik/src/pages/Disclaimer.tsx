// src/pages/Disclaimer.tsx
"use client";

import { motion } from "framer-motion";
import {
  Info,
  FileText,
  CheckCircle,
  Link,
  Copyright,
  UserCheck,
  Mail,
} from "lucide-react";

export default function Disclaimer() {
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
          Disclaimer
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="mt-6 text-lg md:text-xl max-w-3xl mx-auto text-gray-100"
        >
          Pernyataan ini menjelaskan batas tanggung jawab{" "}
          <span className="font-semibold">CENVIA</span> atas seluruh konten yang
          dipublikasikan di situs ini.
        </motion.p>
      </section>

      {/* CONTENT */}
      <div className="max-w-5xl mx-auto px-6 py-20 space-y-16 text-gray-700 dark:text-gray-300">
        {[
          {
            icon: <Info className="w-8 h-8 text-red-600" />,
            title: "1. Sumber Informasi",
            desc: (
              <>
                Sebagian artikel di <span className="font-semibold">CENVIA</span>{" "}
                berasal dari rilis pers resmi lembaga atau instansi pemerintahan,
                serta sumber terpercaya lainnya yang bersifat publik. Artikel
                tersebut disunting dengan penyesuaian gaya bahasa tanpa mengubah
                makna pokoknya. CENVIA tidak berafiliasi langsung dengan instansi
                pemerintah mana pun kecuali dinyatakan tertulis.
              </>
            ),
          },
          {
            icon: <FileText className="w-8 h-8 text-red-600" />,
            title: "2. Konten Mandiri",
            desc: (
              <>
                Selain dari rilis resmi, <span className="font-semibold">CENVIA</span>{" "}
                juga menerbitkan artikel orisinal hasil tulisan tim redaksi, opini,
                atau analisis ringan. Isi dari artikel mandiri merupakan tanggung
                jawab penulis dan tidak selalu mencerminkan pandangan resmi CENVIA.
              </>
            ),
          },
          {
            icon: <CheckCircle className="w-8 h-8 text-red-600" />,
            title: "3. Ketepatan dan Tanggung Jawab",
            desc: (
              <>
                Informasi di situs ini dapat berubah sewaktu-waktu tanpa
                pemberitahuan. CENVIA tidak bertanggung jawab atas kerugian langsung
                maupun tidak langsung akibat penggunaan informasi di situs ini.
              </>
            ),
          },
          {
            icon: <Link className="w-8 h-8 text-red-600" />,
            title: "4. Tautan ke Situs Eksternal",
            desc: (
              <>
                Situs CENVIA dapat memuat tautan ke situs pihak ketiga. Kami tidak
                memiliki kendali atas isi, kebijakan, atau keandalan situs tersebut,
                dan tidak bertanggung jawab atas dampak dari akses ke tautan eksternal
                itu.
              </>
            ),
          },
          {
            icon: <Copyright className="w-8 h-8 text-red-600" />,
            title: "5. Hak Cipta",
            desc: (
              <>
                Seluruh materi dan desain situs dilindungi oleh undang-undang hak
                cipta. Penggunaan ulang sebagian atau seluruh isi CENVIA harus
                mencantumkan sumber dengan jelas.
              </>
            ),
          },
          {
            icon: <UserCheck className="w-8 h-8 text-red-600" />,
            title: "6. Persetujuan Pengguna",
            desc: (
              <>
                Dengan mengakses situs ini, Anda dianggap telah membaca dan menyetujui
                isi Disclaimer, Kebijakan Privasi, serta Ketentuan Layanan CENVIA.
              </>
            ),
          },
          {
            icon: <Mail className="w-8 h-8 text-red-600" />,
            title: "7. Kontak",
            desc: (
              <>
                Untuk pertanyaan, koreksi, atau klarifikasi, silakan hubungi kami
                melalui email:{" "}
                <a
                  href="mailto:redaksi@cenvia.id"
                  className="text-red-600 font-semibold hover:underline"
                >
                  redaksi@cenvia.id
                </a>
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

        <div className="text-center text-sm text-gray-500 dark:text-gray-400">
          Terakhir diperbarui:{" "}
          {new Date().toLocaleDateString("id-ID", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </div>
      </div>
    </div>
  );
        }
