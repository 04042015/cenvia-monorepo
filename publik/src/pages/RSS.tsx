// publik/src/pages/RSS.tsx
"use client";

export default function RSS() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Hero Section */}
      <div
        className="text-white py-20 text-center shadow-lg flex flex-col items-center justify-center"
        style={{ backgroundColor: "#F04242" }}
      >
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-wide">
          RSS Feed
        </h1>
        <p className="mt-4 text-lg md:text-xl text-gray-100 max-w-3xl mx-auto">
          Dapatkan update berita terbaru dari CENVIA langsung melalui RSS Feed.
        </p>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-6 py-16 text-gray-700 space-y-10 leading-relaxed">
        {/* Apa itu RSS */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Apa itu RSS?</h2>
          <p>
            <span className="font-semibold">RSS (Really Simple Syndication)</span> 
            adalah format umpan berita yang memungkinkan Anda untuk menerima 
            pembaruan konten terbaru dari CENVIA secara otomatis tanpa harus 
            membuka situs setiap saat.
          </p>
        </section>

        {/* Keuntungan */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Keuntungan Menggunakan RSS Feed
          </h2>
          <ul className="list-disc list-inside space-y-2">
            <li> Update berita terbaru secara otomatis.</li>
            <li> Bisa dibaca dari aplikasi pembaca RSS di perangkat Anda.</li>
            <li> Akses cepat tanpa terganggu iklan atau tampilan berlebihan.</li>
            <li> Sesuaikan konten sesuai kategori favorit Anda.</li>
          </ul>
        </section>

        {/* Cara Menggunakan */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Cara Menggunakan RSS Feed CENVIA
          </h2>
          <ol className="list-decimal list-inside space-y-2">
            <li>
              Gunakan aplikasi pembaca RSS seperti{" "}
              <span className="italic">Feedly, Inoreader,</span> atau browser 
              dengan dukungan RSS.
            </li>
            <li>
              Salin URL RSS CENVIA berikut:{" "}
              <code className="bg-gray-200 px-2 py-1 rounded text-sm">
                https://cenvia.com/rss
              </code>
            </li>
            <li>
              Tempelkan URL tersebut ke aplikasi pembaca RSS Anda untuk mulai
              menerima update.
            </li>
          </ol>
        </section>

        {/* Catatan */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Catatan</h2>
          <p>
            RSS Feed CENVIA hanya digunakan untuk tujuan pribadi dan non-komersial.
            Untuk penggunaan lebih lanjut seperti agregator atau sindikasi konten,
            silakan hubungi tim kami.
          </p>
        </section>

        {/* Hubungi Kami */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Hubungi Kami</h2>
          <p>
            Jika Anda memiliki pertanyaan mengenai penggunaan RSS Feed, silakan
            kunjungi halaman{" "}
            <a
              href="/contact"
              className="text-red-600 font-semibold hover:underline"
            >
              Contact Us
            </a>{" "}
            untuk informasi lebih lanjut.
          </p>
        </section>
      </div>
    </div>
  );
}
