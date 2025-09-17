// publik/src/pages/Terms.tsx
"use client";

export default function Terms() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Hero Section */}
      <div
        className="text-white py-20 text-center shadow-lg flex flex-col items-center justify-center"
        style={{ backgroundColor: "#F04242" }}
      >
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-wide">
          Terms of Service
        </h1>
        <p className="mt-4 text-lg md:text-xl text-gray-100 max-w-3xl mx-auto">
          Syarat dan ketentuan penggunaan layanan CENVIA. Harap baca dengan
          seksama sebelum menggunakan situs kami.
        </p>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-6 py-16 text-gray-700 space-y-10 leading-relaxed">
        {/* Pendahuluan */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Pendahuluan
          </h2>
          <p>
            Dengan mengakses atau menggunakan layanan{" "}
            <span className="font-semibold">CENVIA</span>, Anda dianggap telah
            membaca, memahami, dan menyetujui syarat dan ketentuan yang
            berlaku. Jika Anda tidak setuju, mohon untuk tidak menggunakan
            layanan kami.
          </p>
        </section>

        {/* Penggunaan Layanan */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Penggunaan Layanan
          </h2>
          <ul className="list-disc list-inside space-y-2">
            <li>
              Layanan hanya boleh digunakan untuk tujuan yang sah dan sesuai
              hukum.
            </li>
            <li>
              Pengguna dilarang menyalahgunakan konten untuk aktivitas ilegal,
              plagiarisme, atau penyebaran informasi palsu.
            </li>
            <li>
              Kami berhak membatasi atau menghentikan akses pengguna yang
              melanggar syarat ini.
            </li>
          </ul>
        </section>

        {/* Konten */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Hak atas Konten
          </h2>
          <p>
            Semua konten yang dipublikasikan di situs{" "}
            <span className="font-semibold">CENVIA</span> dilindungi oleh hak
            cipta. Pengguna diperbolehkan membagikan konten dengan mencantumkan
            sumber. Penggunaan komersial tanpa izin tertulis dilarang.
          </p>
        </section>

        {/* Tanggung Jawab */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Batasan Tanggung Jawab
          </h2>
          <p>
            CENVIA tidak bertanggung jawab atas kerugian langsung maupun tidak
            langsung yang timbul akibat penggunaan informasi di situs ini.
            Kami berusaha menyajikan informasi yang akurat, namun tidak
            menjamin kelengkapan dan kebenarannya.
          </p>
        </section>

        {/* Perubahan Layanan */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Perubahan dan Pembaruan
          </h2>
          <p>
            Kami dapat memperbarui atau mengubah syarat layanan ini kapan saja
            tanpa pemberitahuan sebelumnya. Perubahan akan berlaku segera
            setelah dipublikasikan.
          </p>
        </section>

        {/* Hukum yang Berlaku */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Hukum yang Berlaku
          </h2>
          <p>
            Syarat layanan ini diatur sesuai hukum yang berlaku di Indonesia.
            Segala perselisihan akan diselesaikan sesuai ketentuan hukum yang
            berlaku.
          </p>
        </section>

        {/* Hubungi Kami */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Hubungi Kami
          </h2>
          <p>
            Jika Anda memiliki pertanyaan mengenai syarat layanan ini,
            silakan kunjungi halaman{" "}
            <a
              href="/contact"
              className="text-red-600 font-semibold hover:underline"
            >
              Contact Us
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
