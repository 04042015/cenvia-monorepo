// publik/src/pages/Privacy.tsx
"use client";

export default function Privacy() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Hero Section */}
      <div
        className="text-white py-20 text-center shadow-lg flex flex-col items-center justify-center"
        style={{ backgroundColor: "#F04242" }}
      >
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-wide">
          Privacy Policy
        </h1>
        <p className="mt-4 text-lg md:text-xl text-gray-100 max-w-3xl mx-auto">
          Kebijakan privasi ini menjelaskan bagaimana CENVIA mengumpulkan,
          menggunakan, melindungi, dan membagikan informasi pribadi Anda.
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
            Kami di <span className="font-semibold">CENVIA</span> sangat
            menghargai privasi Anda. Dokumen ini menjelaskan komitmen kami
            dalam melindungi data pribadi pengguna dan memastikan informasi
            Anda tetap aman.
          </p>
        </section>

        {/* Informasi yang Dikumpulkan */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Informasi yang Kami Kumpulkan
          </h2>
          <ul className="list-disc list-inside space-y-2">
            <li>
              <span className="font-semibold">Data Identitas:</span> Nama, email,
              dan nomor telepon saat Anda menghubungi kami.
            </li>
            <li>
              <span className="font-semibold">Data Teknis:</span> Alamat IP,
              browser, perangkat, serta aktivitas ketika mengunjungi website.
            </li>
            <li>
              <span className="font-semibold">Preferensi:</span> Kategori berita
              atau konten yang sering diakses.
            </li>
          </ul>
        </section>

        {/* Penggunaan Data */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Bagaimana Kami Menggunakan Data
          </h2>
          <p>
            Data pribadi yang kami kumpulkan digunakan untuk tujuan berikut:
          </p>
          <ul className="list-decimal list-inside space-y-2 mt-2">
            <li>Meningkatkan kualitas layanan dan konten yang disajikan.</li>
            <li>Mengirimkan berita, pembaruan, atau informasi promosi.</li>
            <li>Menganalisis trafik dan pola penggunaan situs.</li>
          </ul>
        </section>

        {/* Perlindungan Data */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Keamanan dan Perlindungan Data
          </h2>
          <p>
            Kami menerapkan teknologi enkripsi dan prosedur keamanan standar
            industri untuk melindungi data Anda. Namun, harap diingat bahwa
            tidak ada metode transmisi online yang 100% aman.
          </p>
        </section>

        {/* Berbagi Data */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Berbagi Informasi dengan Pihak Ketiga
          </h2>
          <p>
            Kami tidak menjual atau menyewakan data pribadi Anda. Namun,
            informasi tertentu dapat dibagikan dengan mitra terpercaya untuk
            keperluan analisis dan peningkatan layanan.
          </p>
        </section>

        {/* Hak Pengguna */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Hak Anda Sebagai Pengguna
          </h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Mengakses dan memperbarui informasi pribadi Anda.</li>
            <li>Meminta penghapusan data tertentu.</li>
            <li>Menolak menerima email promosi (unsubscribe).</li>
          </ul>
        </section>

        {/* Perubahan Kebijakan */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Perubahan Kebijakan
          </h2>
          <p>
            Kami dapat memperbarui kebijakan ini dari waktu ke waktu.
            Perubahan signifikan akan kami informasikan melalui situs resmi
            atau email.
          </p>
        </section>

        {/* Hubungi Kami */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Hubungi Kami
          </h2>
          <p>
            Jika Anda memiliki pertanyaan terkait kebijakan privasi ini,
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
