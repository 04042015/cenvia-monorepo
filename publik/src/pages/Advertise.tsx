// publik/src/pages/Advertise.tsx
"use client";

import { motion } from "framer-motion";
import { ArrowRight, Users, BarChart, Star, Sparkles, Globe, Rocket } from "lucide-react";

export default function Advertise() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950">
      {/* Hero Section */}
      <section className="mx-6 mt-6 rounded-3xl shadow-lg text-center bg-gradient-to-r from-red-600 to-red-900 py-24 px-6">
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl font-extrabold tracking-wide text-white drop-shadow-xl"
        >
          Advertise with CENVIA
        </motion.h1>
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="mt-6 text-2xl md:text-4xl font-semibold text-white/90"
        >
          Siap Promosikan Brand Anda ke Level Berikutnya?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
          className="mt-6 text-lg md:text-xl max-w-3xl mx-auto text-gray-100"
        >
          Lebih dari sekadar iklan, CENVIA adalah medium untuk membangun jejak digital
          yang melekat kuat di benak audiens Anda.
        </motion.p>
      </section>

      {/* Mengapa Beriklan */}
      <div className="max-w-6xl mx-auto px-6 py-20 space-y-24 text-gray-700 dark:text-gray-300">
        <section>
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            Mengapa CENVIA Adalah Pilihan Utama?
          </h2>
          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                icon: <Users className="w-12 h-12 text-red-600" />,
                title: "Audiens Nyata",
                desc: "Komunitas pembaca aktif yang setiap harinya terhubung dengan konten kami.",
              },
              {
                icon: <BarChart className="w-12 h-12 text-red-600" />,
                title: "Strategi Tepat",
                desc: "Kami menempatkan iklan Anda secara strategis agar menjangkau target paling relevan.",
              },
              {
                icon: <Star className="w-12 h-12 text-red-600" />,
                title: "Nilai Berkelas",
                desc: "Setiap brand akan tampil elegan dengan positioning premium di platform kami.",
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
                className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8 text-center hover:shadow-2xl transition"
              >
                <div className="flex justify-center mb-6">{item.icon}</div>
                <h3 className="font-bold text-xl mb-4">{item.title}</h3>
                <p className="text-base text-gray-600 dark:text-gray-400">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Opsi Iklan */}
        <section>
          <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center">
            Pilihan Penempatan Iklan
          </h2>
          <p className="max-w-3xl mx-auto mb-12 text-center text-lg text-gray-600 dark:text-gray-400">
            Setiap brand memiliki cara unik untuk bersinar. Kami menawarkan berbagai opsi
            fleksibel untuk memastikan pesan Anda sampai dengan cara paling berkelas.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              "🎯 Banner Eksklusif (Header, Sidebar, Footer)",
              "📢 Sponsored Content / Advertorial Premium",
              "🎥 Video Placement",
              "🚀 Custom Campaign Kreatif",
            ].map((opt, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
                className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8 hover:shadow-2xl transition"
              >
                <p className="font-semibold">{opt}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Statistik */}
        <section>
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            Capaian & Jejak Kami
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
            {[
              ["10.000+", "Pembaca Bulanan Aktif"],
              ["70%", "Dominan Usia 18–45 Tahun"],
              ["50+", "Partner Brand & Media"],
              ["24/7", "Konten Selalu Fresh"],
            ].map(([num, label], idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
                className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8 hover:shadow-2xl transition"
              >
                <h3 className="text-4xl font-extrabold text-red-600">{num}</h3>
                <p className="mt-2 text-gray-600 dark:text-gray-400">{label}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Storytelling Section */}
        <section>
          <div className="bg-gradient-to-r from-red-700 via-red-800 to-red-900 rounded-3xl shadow-2xl text-center py-20 px-8 text-white">
            <motion.h2
              initial={{ opacity: 0, y: -40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-5xl font-extrabold mb-6"
            >
              Ciptakan Impact, Bukan Sekadar Iklan
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="max-w-3xl mx-auto text-lg text-gray-100"
            >
              Brand hebat bukan hanya terlihat, tetapi juga terasa. 
              Bersama CENVIA, iklan Anda menjadi pengalaman yang berkesan,
              bukan sekadar tayangan lewat.
            </motion.p>
          </div>
        </section>

        {/* Proses Kerjasama */}
        <section>
          <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center">
            Bagaimana Prosesnya?
          </h2>
          <ol className="space-y-6 max-w-3xl mx-auto">
            {[
              "Hubungi tim kami melalui halaman Contact Us.",
              "Kami bantu merancang strategi kampanye sesuai karakter brand Anda.",
              "Iklan Anda tayang eksklusif setelah kesepakatan dicapai.",
            ].map((step, idx) => (
              <motion.li
                key={idx}
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
                className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 hover:shadow-2xl transition text-lg"
              >
                <span className="font-bold text-red-600 mr-3">{idx + 1}.</span>
                {step}
              </motion.li>
            ))}
          </ol>
        </section>
      </div>

      {/* CTA */}
      <section className="mx-6 mb-10 rounded-3xl shadow-lg text-center bg-gradient-to-r from-red-600 to-red-900 py-20 px-6">
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-4xl font-bold mb-6 text-white"
        >
          Tertarik untuk Beriklan?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mb-8 text-lg text-gray-100 max-w-2xl mx-auto"
        >
          Mari bicarakan bagaimana iklan Anda bisa menjadi cerita yang
          tak terlupakan di benak audiens.
        </motion.p>
        <a
          href="/contact"
          className="inline-flex items-center bg-white text-red-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition text-lg"
        >
          Hubungi Kami
          <ArrowRight className="ml-3 w-6 h-6" />
        </a>
      </section>
    </div>
  );
        }
