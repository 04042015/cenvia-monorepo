"use client";

import { motion } from "framer-motion";
import { PenTool, Users, Award, Heart, ShieldCheck } from "lucide-react";

export default function Editorial() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-800 dark:text-gray-200">
      {/* HERO */}
      <section className="mx-6 mt-6 rounded-3xl shadow-lg text-center bg-[#F04242] py-24 px-6">
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl font-extrabold tracking-wide text-white"
        >
          Tim Editorial CENVIA
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="mt-6 text-lg md:text-xl max-w-3xl mx-auto text-gray-100"
        >
          Setiap artikel di CENVIA lahir dari komitmen untuk menghadirkan informasi yang jujur, tajam, dan bermakna bagi pembaca.
        </motion.p>
      </section>

      {/* BODY */}
      <div className="max-w-5xl mx-auto px-6 py-20 space-y-20">
        <section>
          <h2 className="text-3xl font-bold mb-10 text-center">Nilai Utama Redaksi</h2>
          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                icon: <PenTool className="w-12 h-12 text-[#F04242]" />,
                title: "Ketajaman Analisis",
                desc: "Kami tidak hanya melaporkan fakta, tapi juga memberi konteks dan makna di balik peristiwa.",
              },
              {
                icon: <ShieldCheck className="w-12 h-12 text-[#F04242]" />,
                title: "Integritas Tanpa Kompromi",
                desc: "Setiap tulisan melewati proses verifikasi dan kurasi untuk menjaga keaslian informasi.",
              },
              {
                icon: <Heart className="w-12 h-12 text-[#F04242]" />,
                title: "Dedikasi untuk Pembaca",
                desc: "CENVIA menulis bukan untuk viralitas, tapi untuk kebermanfaatan dan kepercayaan publik.",
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
                className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8 text-center hover:shadow-2xl transition"
              >
                <div className="flex justify-center mb-6">{item.icon}</div>
                <h3 className="font-bold text-xl mb-3">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="text-center max-w-3xl mx-auto">
          <motion.h3
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold mb-6"
          >
            Dikelola Secara Independen
          </motion.h3>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            CENVIA adalah media independen yang dikelola langsung oleh pendiri dan editor utama.  
            Setiap konten ditulis, disunting, dan dikurasi secara personal dengan semangat idealisme jurnalistik.  
            Meskipun tim kecil, kami berdiri atas komitmen besar: menghadirkan berita dengan hati dan akurasi.
          </p>
        </section>

        {/* CTA */}
        <section className="mx-6 mb-10 rounded-3xl shadow-lg text-center bg-[#F04242] py-20 px-6">
          <motion.h2
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl font-bold mb-6 text-white"
          >
            Transparan. Independen. Bertanggung Jawab.
          </motion.h2>
          <p className="mb-8 text-lg text-gray-100 max-w-2xl mx-auto">
            Kami percaya jurnalisme adalah panggilan nurani. Terima kasih telah menjadi bagian dari perjalanan ini.
          </p>
        </section>
      </div>
    </div>
  );
        }
