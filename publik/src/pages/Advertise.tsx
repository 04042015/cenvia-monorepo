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
  Star,
} from "lucide-react";

export default function Advertise() {
  return (
    <div className="w-full flex flex-col">
      {/* Hero Section */}
<div
  className="text-white py-20 text-center shadow-lg flex flex-col items-center justify-center rounded-3xl mx-6 mt-6"
  style={{ backgroundColor: "#EF2626" }}
>
  <h1 className="text-5xl md:text-6xl font-extrabold tracking-wide text-white">
    Advertise with CENVIA
  </h1>
  <p className="mt-4 text-lg md:text-xl text-gray-100 max-w-3xl mx-auto">
    Jangkau audiens yang tepat dengan beriklan di CENVIA. Media digital
    terpercaya untuk memperkuat brand Anda.
  </p>
</div>
        {/* Lengkungan bawah */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
          <svg
            viewBox="0 0 1440 120"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-[80px] md:h-[120px]"
          >
            <path
              d="M0,64L48,80C96,96,192,128,288,122.7C384,117,480,75,576,74.7C672,75,768,117,864,133.3C960,149,1056,139,1152,122.7C1248,107,1344,85,1392,74.7L1440,64L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
              fill="#ffffff"
            />
          </svg>
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

      {/* 4. Statistik */}
      <section className="py-16 px-6 bg-white dark:bg-gray-900">
        <div className="container mx-auto text-center max-w-4xl">
          <h2 className="text-3xl font-bold mb-6">Statistik & Target Audiens</h2>
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
        <div className="container mx-auto text-center max-w-6xl">
          <h2 className="text-3xl font-bold mb-12">Paket Iklan</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Starter",
                price: "Rp2 Juta",
                features: ["Banner Sidebar", "Durasi 1 Minggu", "Laporan Dasar"],
              },
              {
                title: "Professional",
                price: "Rp5 Juta",
                features: ["Header Banner", "Sponsored Content", "Durasi 1 Bulan", "Laporan Lengkap"],
              },
              {
                title: "Premium",
                price: "Rp10 Juta",
                features: ["Header + Sidebar", "Video Ads", "Custom Campaign", "Durasi 2 Bulan", "Full Support"],
              },
            ].map((pkg, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
                className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6 flex flex-col items-center"
              >
                <h3 className="text-xl font-bold mb-2">{pkg.title}</h3>
                <p className="text-3xl font-bold text-[#EF2626] mb-4">{pkg.price}</p>
                <ul className="space-y-2 mb-6">
                  {pkg.features.map((f, i) => (
                    <li key={i} className="text-gray-600 dark:text-gray-400">✔ {f}</li>
                  ))}
                </ul>
                <a
                  href="/contact"
                  className="bg-[#EF2626] text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
                >
                  Pilih Paket
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Testimoni */}
      <section className="py-16 px-6 bg-white dark:bg-gray-900">
        <div className="container mx-auto max-w-5xl text-center">
          <h2 className="text-3xl font-bold mb-12">Apa Kata Klien Kami</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                name: "PT Maju Jaya",
                quote:
                  "Beriklan di CENVIA sangat efektif. Brand kami dikenal luas hanya dalam hitungan minggu!",
              },
              {
                name: "Startup XYZ",
                quote:
                  "Layanan profesional, hasil nyata. Kami puas dengan kolaborasi bersama CENVIA.",
              },
            ].map((testi, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
                className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow flex flex-col items-center"
              >
                <Quote className="w-8 h-8 text-[#EF2626] mb-4" />
                <p className="italic mb-4 text-gray-700 dark:text-gray-300">
                  "{testi.quote}"
                </p>
                <p className="font-semibold text-[#EF2626]">{testi.name}</p>
                <div className="flex mt-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400" />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Proses Kerjasama */}
      <section className="py-16 px-6 bg-gray-50 dark:bg-gray-800">
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
                className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow"
              >
                <span className="font-bold text-[#EF2626] mr-2">{idx + 1}.</span>
                {step}
              </motion.li>
            ))}
          </ol>
        </div>
      </section>

      {/* 8. FAQ */}
      <section className="py-16 px-6 bg-white dark:bg-gray-900">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-8">FAQ</h2>
          <div className="space-y-4">
            <details className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg shadow">
              <summary className="font-medium cursor-pointer">
                Bagaimana cara memulai beriklan?
              </summary>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                Anda cukup menghubungi tim kami melalui halaman Contact dan pilih paket iklan yang sesuai.
              </p>
            </details>
            <details className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg shadow">
              <summary className="font-medium cursor-pointer">
                Apakah bisa custom campaign?
              </summary>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                Ya, kami menawarkan campaign sesuai kebutuhan spesifik brand Anda.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* 9. CTA Akhir dengan background melengkung */}
      <section className="relative bg-[#EF2626] text-white py-20 px-6 overflow-hidden">
        <div className="container mx-auto text-center relative z-10">
          <h2 className="text-3xl font-bold mb-6">Siap Promosikan Brand Anda?</h2>
          <p className="mb-6 text-lg text-white">
            Hubungi kami sekarang untuk strategi iklan yang maksimal dan efektif.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center bg-white text-[#EF2626] px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition"
          >
            Hubungi Kami
            <ArrowRight className="ml-2 w-5 h-5" />
          </a>
        </div>
        {/* Lengkungan atas */}
        <div className="absolute top-0 left-0 w-full overflow-hidden leading-none">
          <svg
            viewBox="0 0 1440 120"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-[80px] md:h-[120px] rotate-180"
          >
            <path
              d="M0,64L48,80C96,96,192,128,288,122.7C384,117,480,75,576,74.7C672,75,768,117,864,133.3C960,149,1056,139,1152,122.7C1248,107,1344,85,1392,74.7L1440,64L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
              fill="#ffffff"
            />
          </svg>
        </div>
      </section>
    </div>
  );
            }
