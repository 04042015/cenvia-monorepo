// publik/src/pages/About.tsx
"use client";

import { motion } from "framer-motion";
import {
  Users,
  Target,
  CheckCircle,
  ArrowRight,
} from "lucide-react";

export default function About() {
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
            Tentang CENVIA
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-lg md:text-xl leading-relaxed"
          >
            Portal berita terpercaya yang menyajikan informasi akurat, independen,
            dan relevan bagi masyarakat Indonesia.
          </motion.p>
        </div>
      </section>

      {/* 2. Profil CEO */}
      <section className="py-16 px-6 bg-white dark:bg-gray-900">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.img
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.7 }}
            src="https://kuoawzlabmwhvfcahcfm.supabase.co/storage/v1/object/public/assets/pas%20photo%20M.%20Iggo%20Pramulia_page-0001%20(1).jpg"
            alt="M. Iggo Pramulia"
            className="mx-auto w-32 h-32 rounded-full object-cover mb-6 shadow-lg border-4 border-[#EF2626]"
          />
          <h2 className="text-2xl font-bold mb-2">M. Iggo Pramulia</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-4">
            Founder & CEO CENVIA
          </p>
          <blockquote className="italic text-lg text-gray-700 dark:text-gray-300">
            "Saya percaya informasi yang akurat adalah hak semua orang."
          </blockquote>
        </div>
      </section>

      {/* 2b. Team Section */}
      <section className="py-16 px-6 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto max-w-5xl text-center">
          <h2 className="text-3xl font-bold mb-12">Tim Kami</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { role: "Penulis", name: "M. Iggo Pramulia" },
              { role: "Editor", name: "M. Iggo Pramulia" },
            ].map((member, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
                className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6 flex flex-col items-center"
              >
                <img
                  src="https://kuoawzlabmwhvfcahcfm.supabase.co/storage/v1/object/public/assets/pas%20photo%20M.%20Iggo%20Pramulia_page-0001%20(1).jpg"
                  alt={member.name}
                  className="w-24 h-24 rounded-full object-cover mb-4 border-2 border-[#EF2626] shadow"
                />
                <h3 className="font-semibold text-lg">{member.name}</h3>
                <p className="text-gray-500 dark:text-gray-400">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Visi & Misi */}
      <section className="py-16 px-6 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto max-w-5xl text-center">
          <h2 className="text-3xl font-bold mb-12">Visi & Misi</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              "Menyajikan berita terpercaya",
              "Mengutamakan independensi",
              "Menghadirkan informasi aktual",
            ].map((misi, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
                className="bg-white dark:bg-gray-900 shadow-md rounded-lg p-6 flex flex-col items-center"
              >
                <CheckCircle className="w-10 h-10 text-[#EF2626] mb-4" />
                <p className="font-medium">{misi}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Timeline / Sejarah */}
      <section className="py-16 px-6 bg-white dark:bg-gray-900">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-12">
            Perjalanan Kami
          </h2>
          <div className="space-y-8 border-l-4 border-[#EF2626] pl-6">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="font-bold">2025</h3>
              <p>CENVIA lahir sebagai portal berita digital independen.</p>
            </motion.div>
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h3 className="font-bold">2026</h3>
              <p>Meluncurkan aplikasi mobile & memperluas jangkauan nasional.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 5. Statistik */}
      <section className="py-16 px-6 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            ["10.000+", "Pembaca Bulanan"],
            ["500+", "Artikel Dipublikasikan"],
            ["50+", "Partner Media"],
            ["24/7", "Update Berita"],
          ].map(([num, label], idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
            >
              <h3 className="text-3xl font-bold text-[#EF2626]">{num}</h3>
              <p className="text-gray-600 dark:text-gray-400">{label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 6. CTA */}
      <section className="py-16 px-6 bg-[#EF2626] text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Mari Terhubung</h2>
          <p className="mb-6 text-lg">
            Ikuti CENVIA di media sosial atau hubungi kami untuk kolaborasi.
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

      {/* 7. Quote */}
      <section className="py-16 px-6 bg-gray-900 text-white text-center">
        <motion.blockquote
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-2xl italic max-w-3xl mx-auto"
        >
          "Berita bukan sekadar informasi, tapi cahaya bagi masyarakat."
        </motion.blockquote>
        <p className="mt-4">— M. Iggo Pramulia</p>
      </section>

      {/* 8. Nilai Inti + FAQ */}
      <section className="py-16 px-6 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto grid gap-12">
          <div>
            <h2 className="text-2xl font-bold mb-4">Nilai Inti</h2>
            <ul className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {["Independen", "Objektif", "Cepat", "Global"].map((val) => (
                <motion.li
                  key={val}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="bg-white dark:bg-gray-900 rounded-lg p-4 text-center shadow"
                >
                  {val}
                </motion.li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">FAQ</h2>
            <div className="space-y-4">
              <details className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow">
                <summary className="font-medium cursor-pointer">
                  Apakah CENVIA independen?
                </summary>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  Ya, kami tidak terafiliasi dengan pihak politik manapun.
                </p>
              </details>
              <details className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow">
                <summary className="font-medium cursor-pointer">
                  Bagaimana cara menghubungi redaksi?
                </summary>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  Hubungi kami melalui halaman Contact.
                </p>
              </details>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">Transparansi</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Kami berkomitmen menjaga independensi, transparansi, dan
              akuntabilitas dalam setiap berita.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
      }
