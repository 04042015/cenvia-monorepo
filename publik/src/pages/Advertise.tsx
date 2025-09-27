// publik/src/pages/Advertise.tsx
"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Users,
  BarChart,
  Star,
  Target,
  Megaphone,
  Video,
  Rocket,
} from "lucide-react";

export default function Advertise() {
  return (
    <div className="h-screen w-full overflow-y-scroll snap-y snap-mandatory scroll-smooth">
      {/* HERO */}
      <section className="h-screen snap-start flex flex-col justify-center items-center text-center bg-gradient-to-r from-red-600 to-red-900 px-6">
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
          Bawa Brand Anda ke Level Berikutnya
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
          className="mt-6 text-lg md:text-xl max-w-3xl mx-auto text-gray-100"
        >
          CENVIA bukan sekadar ruang iklan. Kami adalah panggung di mana brand
          Anda tampil berkelas dan tak terlupakan.
        </motion.p>
      </section>

      {/* WHY CHOOSE US */}
      <section className="h-screen snap-start flex flex-col justify-center items-center bg-gray-50 dark:bg-gray-900 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">
            Mengapa Memilih CENVIA?
          </h2>
          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                icon: <Users className="w-12 h-12 text-red-600" />,
                title: "Audiens Nyata",
                desc: "Ribuan pembaca aktif yang selalu terhubung dengan konten kami.",
              },
              {
                icon: <BarChart className="w-12 h-12 text-red-600" />,
                title: "Strategi Tepat",
                desc: "Penempatan iklan yang presisi, menjangkau target paling relevan.",
              },
              {
                icon: <Star className="w-12 h-12 text-red-600" />,
                title: "Nilai Berkelas",
                desc: "Brand tampil elegan dengan positioning premium di platform kami.",
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 hover:shadow-2xl transition"
              >
                <div className="flex justify-center mb-6">{item.icon}</div>
                <h3 className="font-bold text-xl mb-4">{item.title}</h3>
                <p className="text-base text-gray-600 dark:text-gray-400">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* AD OPTIONS */}
      <section className="h-screen snap-start flex flex-col justify-center items-center bg-white dark:bg-gray-950 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-10">
            Pilihan Penempatan Iklan
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: <Target className="w-10 h-10 text-red-600 mx-auto" />, text: "Banner Eksklusif" },
              { icon: <Megaphone className="w-10 h-10 text-red-600 mx-auto" />, text: "Advertorial Premium" },
              { icon: <Video className="w-10 h-10 text-red-600 mx-auto" />, text: "Video Placement" },
              { icon: <Rocket className="w-10 h-10 text-red-600 mx-auto" />, text: "Custom Campaign" },
            ].map((opt, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
                className="bg-gray-50 dark:bg-gray-900 rounded-2xl shadow-xl p-8 hover:shadow-2xl transition"
              >
                {opt.icon}
                <p className="mt-4 font-semibold">{opt.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="h-screen snap-start flex flex-col justify-center items-center bg-gray-50 dark:bg-gray-900 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">
            Capaian & Jejak Kami
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
            {[
              ["10.000+", "Pembaca Bulanan"],
              ["70%", "Dominasi Usia 18–45"],
              ["50+", "Partner Brand & Media"],
              ["24/7", "Konten Fresh Setiap Hari"],
            ].map(([num, label], idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 hover:shadow-2xl transition"
              >
                <h3 className="text-4xl font-extrabold text-red-600">{num}</h3>
                <p className="mt-2 text-gray-600 dark:text-gray-400">{label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="h-screen snap-start flex flex-col justify-center items-center text-center bg-gradient-to-r from-red-700 to-red-900 px-6">
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-4xl font-bold mb-6 text-white"
        >
          Siap Kolaborasi dengan CENVIA?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mb-8 text-lg text-gray-100 max-w-2xl"
        >
          Jangan sekadar pasang iklan. Biarkan brand Anda menciptakan cerita
          yang membekas di hati audiens.
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
