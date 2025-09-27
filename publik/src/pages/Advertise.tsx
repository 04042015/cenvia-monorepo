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
  Gift,
  Crown,
  Sparkles,
} from "lucide-react";

export default function Advertise() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950">
      {/* HERO */}
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

      <div className="max-w-6xl mx-auto px-6 py-20 space-y-24 text-gray-700 dark:text-gray-300">
        {/* WHY CHOOSE US */}
        <section>
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
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
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 text-center hover:shadow-2xl transition"
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

        {/* AD OPTIONS */}
        <section>
          <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center">
            Pilihan Penempatan Iklan
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              {
                icon: <Target className="w-10 h-10 text-red-600 mx-auto" />,
                text: "Banner Eksklusif",
              },
              {
                icon: <Megaphone className="w-10 h-10 text-red-600 mx-auto" />,
                text: "Advertorial Premium",
              },
              {
                icon: <Video className="w-10 h-10 text-red-600 mx-auto" />,
                text: "Video Placement",
              },
              {
                icon: <Rocket className="w-10 h-10 text-red-600 mx-auto" />,
                text: "Custom Campaign",
              },
            ].map((opt, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
                className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8 hover:shadow-2xl transition group"
              >
                <div className="group-hover:scale-110 transition">{opt.icon}</div>
                <p className="mt-4 font-semibold">{opt.text}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* PRICING PACKAGES (WITHOUT PRICE) */}
        <section>
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            Paket Iklan CENVIA
          </h2>
          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                icon: <Gift className="w-12 h-12 text-red-600 mx-auto" />,
                title: "Paket Starter",
                desc: "Pasang iklan banner di halaman utama. Harga langsung hubungi tim kami.",
                bonus: "Bonus 1x promosi di Instagram Story.",
              },
              {
                icon: <Crown className="w-12 h-12 text-red-600 mx-auto" />,
                title: "Paket Premium",
                desc: "Advertorial khusus di kategori pilihan. Harga langsung hubungi tim kami.",
                bonus: "Bonus 1x posting feed Instagram + penempatan di newsletter mingguan.",
              },
              {
                icon: <Sparkles className="w-12 h-12 text-red-600 mx-auto" />,
                title: "Paket Eksklusif",
                desc: "Custom campaign full branding di platform kami. Harga langsung hubungi tim kami.",
                bonus: "Bonus: liputan khusus + video placement premium.",
              },
            ].map((pkg, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 hover:shadow-2xl transition text-center"
              >
                {pkg.icon}
                <h3 className="mt-6 text-xl font-bold">{pkg.title}</h3>
                <p className="mt-4 text-gray-600 dark:text-gray-400">{pkg.desc}</p>
                <p className="mt-4 text-sm italic text-red-600">{pkg.bonus}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* STATS */}
        <section>
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            Capaian & Jejak Kami
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
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
        </section>

        {/* STORYTELLING */}
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

        {/* PROCESS */}
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
          Siap Kolaborasi dengan CENVIA?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mb-8 text-lg text-gray-100 max-w-2xl mx-auto"
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
