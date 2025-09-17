// publik/src/pages/Advertise.tsx
"use client";

export default function Advertise() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Hero Section */}
      <div
        className="text-white py-20 text-center shadow-lg flex flex-col items-center justify-center"
        style={{ backgroundColor: "#F04242" }}
      >
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-wide">
          Advertise with Us
        </h1>
        <p className="mt-4 text-lg md:text-xl text-gray-100 max-w-3xl mx-auto">
          Jangkau audiens yang tepat dengan beriklan di CENVIA. Media digital
          terpercaya untuk memperkuat brand Anda.
        </p>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-6 py-16 text-gray-700 space-y-10 leading-relaxed">
        {/* Mengapa Beriklan */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Mengapa Beriklan di CENVIA?
          </h2>
          <ul className="list-disc list-inside space-y-2">
            <li>
              <span className="font-semibold">Jangkauan Luas:</span> Ribuan
              pembaca aktif setiap hari dari berbagai daerah di Indonesia.
            </li>
            <li>
              <span className="font-semibold">Audiens Tertarget:</span> Konten
              kami menjangkau segmen pembaca yang relevan dengan kebutuhan
              bisnis Anda.
            </li>
            <li>
              <span className="font-semibold">Brand Awareness:</span> Tingkatkan
              eksposur merek Anda melalui penempatan iklan strategis.
            </li>
          </ul>
        </section>

        {/* Opsi Iklan */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Opsi Penempatan Iklan
          </h2>
          <p>
            Kami menawarkan berbagai pilihan format iklan untuk menyesuaikan
            kebutuhan promosi Anda:
          </p>
          <ul className="list-disc list-inside space-y-2 mt-3">
            <li>🎯 Banner Ads (Header, Sidebar, Footer)</li>
            <li>📢 Sponsored Content / Advertorial</li>
            <li>📌 Video Ads</li>
            <li>💡 Custom Campaign (sesuai kebutuhan brand)</li>
          </ul>
        </section>

        {/* Statistik & Target */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Statistik & Target Audiens
          </h2>
          <p>
            CENVIA memiliki basis pembaca yang terus bertumbuh dengan mayoritas
            berusia 18–45 tahun. Kami juga melayani audiens yang aktif di
            platform digital sehingga iklan Anda akan menjangkau target yang
            lebih relevan.
          </p>
        </section>

        {/* Proses Kerjasama */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Proses Kerjasama
          </h2>
          <ol className="list-decimal list-inside space-y-2">
            <li>Hubungi tim kami melalui halaman Contact Us.</li>
            <li>Kami akan membantu merancang strategi iklan sesuai kebutuhan.</li>
            <li>Iklan dipublikasikan setelah kesepakatan dicapai.</li>
          </ol>
        </section>

        {/* Hubungi Kami */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Hubungi Kami</h2>
          <p>
            Tertarik untuk bekerja sama? Silakan kunjungi halaman{" "}
            <a
              href="/contact"
              className="text-red-600 font-semibold hover:underline"
            >
              Contact Us
            </a>{" "}
            untuk informasi lebih lanjut mengenai paket iklan.
          </p>
        </section>
      </div>
    </div>
  );
}
