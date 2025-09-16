// publik/src/pages/About.tsx
"use client";

import {
  Users,
  Target,
  Briefcase,
  Globe,
  Award,
  CheckCircle,
  Mail,
  ArrowRight,
} from "lucide-react";

export default function About() {
  return (
    <div className="w-full flex flex-col">
      {/* 1. Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20 px-6">
        <div className="container mx-auto text-center max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Tentang CENVIA</h1>
          <p className="text-lg md:text-xl text-gray-100 leading-relaxed">
            Portal berita terpercaya yang menyajikan informasi akurat, independen, 
            dan relevan bagi masyarakat Indonesia.
          </p>
        </div>
      </section>

      {/* 2. Profil CEO */}
      <section className="py-16 px-6 bg-white dark:bg-gray-900">
        <div className="container mx-auto max-w-4xl text-center">
          <img
            src="/icons/founder.jpg"
            alt="M. Iggo Pramulia"
            className="mx-auto w-32 h-32 rounded-full object-cover mb-6 shadow-lg"
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
              <div
                key={idx}
                className="bg-white dark:bg-gray-900 shadow-md rounded-lg p-6 flex flex-col items-center"
              >
                <CheckCircle className="w-10 h-10 text-blue-600 mb-4" />
                <p className="font-medium">{misi}</p>
              </div>
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
          <div className="space-y-8 border-l-4 border-blue-600 pl-6">
            <div>
              <h3 className="font-bold">2025</h3>
              <p>CENVIA lahir sebagai portal berita digital independen.</p>
            </div>
            <div>
              <h3 className="font-bold">2026</h3>
              <p>Meluncurkan aplikasi mobile & memperluas jangkauan nasional.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Team Section */}
      <section className="py-16 px-6 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto text-center max-w-5xl">
          <h2 className="text-3xl font-bold mb-12">Tim Redaksi</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {["Redaktur", "Editor", "Developer"].map((role, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6"
              >
                <div className="w-20 h-20 mx-auto rounded-full bg-gray-200 dark:bg-gray-700 mb-4" />
                <h3 className="font-semibold">{role}</h3>
                <p className="text-sm text-gray-500">CENVIA Team</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Statistik */}
      <section className="py-16 px-6 bg-white dark:bg-gray-900">
        <div className="container mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            ["10.000+", "Pembaca Bulanan"],
            ["500+", "Artikel Dipublikasikan"],
            ["50+", "Partner Media"],
            ["24/7", "Update Berita"],
          ].map(([num, label], idx) => (
            <div key={idx}>
              <h3 className="text-3xl font-bold text-blue-600">{num}</h3>
              <p className="text-gray-600 dark:text-gray-400">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 7. Call to Action */}
      <section className="py-16 px-6 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Mari Terhubung</h2>
          <p className="mb-6 text-lg">
            Ikuti CENVIA di media sosial atau hubungi kami untuk kolaborasi.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center bg-white text-blue-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition"
          >
            Hubungi Kami
            <ArrowRight className="ml-2 w-5 h-5" />
          </a>
        </div>
      </section>

      {/* 8. Quote Section */}
      <section className="py-16 px-6 bg-gray-900 text-white text-center">
        <blockquote className="text-2xl italic max-w-3xl mx-auto">
          "Berita bukan sekadar informasi, tapi cahaya bagi masyarakat."
        </blockquote>
        <p className="mt-4">— M. Iggo Pramulia</p>
      </section>

      {/* 9–25 dibuat ringkas tapi ada */}
      <section className="py-16 px-6 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto grid gap-12">
          <div>
            <h2 className="text-2xl font-bold mb-4">Nilai Inti</h2>
            <ul className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {["Independen", "Objektif", "Cepat", "Global"].map((val) => (
                <li
                  key={val}
                  className="bg-white dark:bg-gray-900 rounded-lg p-4 text-center shadow"
                >
                  {val}
                </li>
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
