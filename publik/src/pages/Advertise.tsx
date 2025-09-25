// publik/src/pages/Advertise.tsx
"use client";

import { motion } from "framer-motion";
import { ArrowRight, Users, BarChart, Star } from "lucide-react";

export default function Advertise() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950">
      {/* Hero Section */}
      <section className="mx-6 mt-6 rounded-3xl shadow-lg text-center bg-gradient-to-r from-pink-500 to-red-700 py-20 px-6">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-extrabold tracking-wide text-white"
        >
          Advertise with CENVIA
        </motion.h1>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="mt-4 text-2xl md:text-4xl font-semibold text-white"
        >
          Siap Promosikan Brand Anda?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
          className="mt-6 text-lg md:text-xl max-w-3xl mx-auto text-gray-100"
        >
          Jangkau audiens yang tepat dengan beriklan di CENVIA. Media digital
          terpercaya untuk memperkuat brand Anda.
        </motion.p>
      </section>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 py-16 space-y-16 text-gray-700 dark:text-gray-300">
        {/* Mengapa Beriklan */}
        <section>
          <h2 className="text-3xl font-bold mb-10 text-center">
            Mengapa Beriklan di CENVIA?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Users className="w-10 h-10 text-red-600" />,
                title: "Jangkauan Luas",
                desc: "Ribuan pembaca aktif setiap hari dari berbagai daerah di Indonesia.",
              },
              {
                icon: <BarChart className="w-10 h-10 text-red-600" />,
                title: "Audiens Tertarget",
                desc: "Konten kami menjangkau segmen pembaca yang relevan dengan kebutuhan bisnis Anda.",
              },
              {
                icon: <Star className="w-10 h-10 text-red-600" />,
                title: "Brand Awareness",
                desc: "Tingkatkan eksposur merek Anda melalui penempatan iklan strategis.",
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
                className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition"
              >
                <div className="flex justify-center mb-4">{item.icon}</div>
                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Opsi Iklan */}
        <section>
          <h2 className="text-3xl font-bold mb-6 text-center">
            Opsi Penempatan Iklan
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            {[
              "🎯 Banner Ads (Header, Sidebar, Footer)",
              "📢 Sponsored Content / Advertorial",
              "📌 Video Ads",
              "💡 Custom Campaign",
            ].map((opt, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
                className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6 hover:shadow-xl transition"
              >
                <p className="font-medium">{opt}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Statistik */}
        <section>
          <h2 className="text-3xl font-bold mb-10 text-center">
            Statistik & Target Audiens
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              ["10.000+", "Pembaca Bulanan"],
              ["70%", "Usia 18–45 tahun"],
              ["50+", "Partner Media"],
              ["24/7", "Update Konten"],
            ].map(([num, label], idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
                className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6 hover:shadow-xl transition"
              >
                <h3 className="text-3xl font-bold text-red-600">{num}</h3>
                <p className="text-gray-600 dark:text-gray-400">{label}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Proses Kerjasama */}
        <section>
          <h2 className="text-3xl font-bold mb-8 text-center">
            Proses Kerjasama
          </h2>
          <ol className="space-y-6 max-w-2xl mx-auto">
            {[
              "Hubungi tim kami melalui halaman Contact Us.",
              "Kami akan membantu merancang strategi iklan sesuai kebutuhan.",
              "Iklan dipublikasikan setelah kesepakatan dicapai.",
            ].map((step, idx) => (
              <motion.li
                key={idx}
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
                className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-4 hover:shadow-xl transition"
              >
                <span className="font-bold text-red-600 mr-2">{idx + 1}.</span>
                {step}
              </motion.li>
            ))}
          </ol>
        </section>
      </div>

      {/* CTA */}
      <section className="mx-6 mb-6 rounded-3xl shadow-lg text-center bg-gradient-to-r from-pink-500 to-red-700 py-16 px-6">
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-3xl font-bold mb-6 text-white"
        >
          Tertarik untuk Beriklan di CENVIA?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mb-6 text-lg text-gray-100"
        >
          Hubungi tim kami sekarang untuk mendapatkan penawaran terbaik.
        </motion.p>
        <a
          href="/contact"
          className="inline-flex items-center bg-white text-red-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition"
        >
          Hubungi Kami
          <ArrowRight className="ml-2 w-5 h-5" />
        </a>
      </section>
    </div>
  );
            }
