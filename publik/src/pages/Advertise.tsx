// publik/src/pages/Advertise.tsx
"use client";

import { motion } from "framer-motion";
import {
  Target,
  Users,
  MonitorPlay,
  FileText,
  Lightbulb,
  ArrowRight,
  Quote,
} from "lucide-react";

export default function Advertise() {
  return (
    <div className="w-full flex flex-col">
      {/* 1. Hero Section */}
      <section className="relative bg-[#EF2626] text-white py-20 px-6">
        <div className="container mx-auto text-center max-w-3xl">
          <motion.h1
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            Advertise with CENVIA
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-lg md:text-xl leading-relaxed"
          >
            Jangkau audiens yang tepat dengan beriklan di CENVIA. Media digital
            terpercaya untuk memperkuat brand Anda.
          </motion.p>
        </div>
      </section>

      {/* 2. Mengapa Beriklan */}
      <section className="py-16 px-6 bg-white dark:bg-gray-900">
        <div className="container mx-auto max-w-5xl text-center">
          <h2 className="text-3xl font-bold mb-12">Mengapa Beriklan di CENVIA?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Users,
                title: "Jangkauan Luas",
                desc: "Ribuan pembaca aktif setiap hari dari berbagai daerah di Indonesia.",
              },
              {
                icon: Target,
                title: "Audiens Tertarget",
                desc: "Konten kami menjangkau segmen pembaca yang relevan dengan kebutuhan bisnis Anda.",
              },
              {
                icon: Lightbulb,
                title: "Brand Awareness",
                desc: "Tingkatkan eksposur merek Anda melalui penempatan iklan strategis.",
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
                className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 shadow text-center"
              >
                <item.icon className="w-10 h-10 text-[#EF2626] mx-auto mb-4" />
                <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Opsi Iklan */}
      <section className="py-16 px-6 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto max-w-5xl text-center">
          <h2 className="text-3xl font-bold mb-12">Opsi Penempatan Iklan</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { icon: MonitorPlay, title: "Banner Ads", desc: "Header, Sidebar, Footer" },
              { icon: FileText, title: "Sponsored Content", desc: "Advertorial & artikel khusus" },
              { icon: MonitorPlay, title: "Video Ads", desc: "Format video untuk engagement tinggi" },
              { icon: Lightbulb, title: "Custom Campaign", desc: "Strategi unik sesuai brand" },
            ].map((opt, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
                className="bg-white dark:bg-gray-900 rounded-lg shadow p-6 flex flex-col items-center"
              >
                <opt.icon className="w-10 h-10 text-[#EF2626] mb-4" />
                <h3 className="font-semibold text-lg">{opt.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{opt.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Statistik & Target */}
      <section className="py-16 px-6 bg-white dark:bg-gray-900">
        <div className="container mx-auto text-center max-w-3xl">
          <h2 className="text-3xl font-bold mb-6">Statistik & Target Audiens</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            CENVIA memiliki basis pembaca yang terus bertumbuh dengan mayoritas
            berusia 18–45 tahun. Audiens kami aktif di platform digital, sehingga
            iklan Anda menjangkau target yang lebih relevan.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              ["10.000+", "Pembaca Harian"],
              ["65%", "Usia 18-35"],
              ["70%", "Pengguna Mobile"],
              ["50+", "Partner Brand"],
            ].map(([num, label], idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
              >
                <h3 className="text-3xl font-bold text-[#EF2626]">{num}</h3>
                <p className="text-gray-600 dark:text-gray-400">{label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Paket Harga */}
      <section className="py-16 px-6 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto max-w-6xl text-center">
          <h2 className="text-3xl font-bold mb-12">Paket Harga</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Basic",
                price: "Rp2.000.000",
                features: ["Banner Sidebar 7 Hari", "Laporan Mingguan", "Support Email"],
              },
              {
                title: "Standard",
                price: "Rp5.000.000",
                features: ["Banner Header 14 Hari", "Sponsored Content", "Priority Support"],
              },
              {
                title: "Premium",
                price: "Rp10.000.000",
                features: ["Banner Header 30 Hari", "2 Sponsored Content", "Full Report", "Custom Campaign"],
              },
            ].map((plan, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
                className="bg-white dark:bg-gray-900 rounded-xl shadow p-6 flex flex-col"
              >
                <h3 className="text-xl font-bold mb-2">{plan.title}</h3>
                <p className="text-2xl font-bold text-[#EF2626] mb-4">{plan.price}</p>
                <ul className="text-left space-y-2 flex-grow">
                  {plan.features.map((f, i) => (
                    <li key={i} className="text-gray-600 dark:text-gray-400">• {f}</li>
                  ))}
                </ul>
                <a
                  href="/contact"
                  className="mt-6 inline-block bg-[#EF2626] text-white px-4 py-2 rounded-lg font-medium hover:bg-red-700 transition"
                >
                  Pilih Paket
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Partner */}
      <section className="py-16 px-6 bg-white dark:bg-gray-900">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-12">Partner Kami</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center">
            {["brand1.png", "brand2.png", "brand3.png", "brand4.png", "brand5.png"].map(
              (logo, idx) => (
                <motion.img
                  key={idx}
                  src={`/logos/${logo}`}
                  alt={`partner-${idx}`}
                  className="mx-auto h-12 grayscale hover:grayscale-0 transition"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.2 }}
                />
              )
            )}
          </div>
        </div>
      </section>

      {/* 7. Testimoni */}
      <section className="py-16 px-6 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-12">Apa Kata Klien Kami</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                quote: "Beriklan di CENVIA sangat membantu meningkatkan brand awareness bisnis kami!",
                name: "Budi Santoso",
                role: "Marketing Manager",
              },
              {
                quote: "Trafik dari iklan di CENVIA benar-benar sesuai target. ROI sangat bagus.",
                name: "Siti Rahma",
                role: "CEO Startup",
              },
            ].map((t, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
                className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow relative"
              >
                <Quote className="absolute top-4 left-4 w-6 h-6 text-[#EF2626] opacity-30" />
                <p className="text-gray-700 dark:text-gray-300 mb-4 italic">"{t.quote}"</p>
                <h4 className="font-bold">{t.name}</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">{t.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Proses Kerjasama */}
      <section className="py-16 px-6 bg-white dark:bg-gray-900">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold text-center mb-8">Proses Kerjasama</h2>
          <ol className="space-y-6">
            {[
              "Hubungi tim kami melalui halaman Contact.",
              "Kami bantu merancang strategi iklan sesuai kebutuhan.",
              "Iklan dipublikasikan setelah kesepakatan dicapai.",
            ].map((step, idx) => (
              <motion.li
                key={idx}
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
                className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg shadow"
              >
                <span className="font-bold text-[#EF2626] mr-2">{idx + 1}.</span>
                {step}
              </motion.li>
            ))}
          </ol>
        </div>
      </section>

      {/* 9. FAQ */}
      <section className="py-16 px-6 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold text-center mb-8">FAQ</h2>
          <div className="space-y-4">
            {[
              {
                q: "Berapa lama proses iklan dipublikasikan?",
                a: "Biasanya dalam 1–3 hari kerja setelah kesepakatan dan pembayaran.",
              },
              {
                q: "Apakah saya bisa memilih posisi banner?",
                a: "Ya, posisi dapat dipilih sesuai paket yang tersedia.",
              },
              {
                q: "Apakah tersedia laporan performa iklan?",
                a: "Kami menyediakan laporan mingguan dan bulanan sesuai paket.",
              },
            ].map((faq, idx) => (
              <motion.details
                key={idx}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
                className="bg-white dark:bg-gray-900 rounded-lg p-4 shadow cursor-pointer"
              >
                <summary className="font-semibold">{faq.q}</summary>
                <p className="text-gray-600 dark:text-gray-400 mt-2">{faq.a}</p>
              </motion.details>
            ))}
          </div>
        </div>
      </section>

      {/* 10. CTA */}
      <section className="py-16 px-6 bg-[#EF2626] text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Siap Beriklan di CENVIA?</h2>
          <p className="mb-6 text-lg">
            Hubungi kami sekarang dan perluas jangkauan brand Anda.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center bg-white text-[#EF2626] px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition"
          >
            Hubungi Kami
            <ArrowRight className="ml-2 w-5 h-5" />
          </a>
        </div>
      </section>
    </div>
  );
            }
