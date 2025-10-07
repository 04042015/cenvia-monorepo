// src/pages/Disclaimer.tsx
import { motion } from "framer-motion";

export default function Disclaimer() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950 text-gray-800 dark:text-gray-200 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto bg-white dark:bg-gray-900 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700 p-8"
      >
        <h1 className="text-3xl sm:text-4xl font-extrabold mb-6 text-center text-blue-600 dark:text-blue-400">
          Disclaimer – Cenvia
        </h1>

        <p className="mb-4 text-base leading-relaxed">
          Seluruh konten yang dipublikasikan di situs <strong>Cenvia</strong> disajikan
          untuk tujuan informasi umum dan edukasi publik. Cenvia tidak memberikan
          jaminan atas keakuratan, kelengkapan, atau ketepatan waktu informasi yang
          ditampilkan, meskipun telah diupayakan sebaik mungkin.
        </p>

        <Section
          title="1. Sumber Informasi"
          content={`Sebagian artikel di Cenvia berasal dari rilis pers resmi lembaga atau instansi pemerintahan, serta sumber terpercaya lainnya yang bersifat publik. Artikel tersebut disunting atau disajikan ulang dengan penyesuaian gaya bahasa, tanpa mengubah makna pokok dari sumber aslinya. Cenvia tidak berafiliasi secara langsung dengan instansi pemerintah mana pun, kecuali dinyatakan lain secara tertulis.`}
        />

        <Section
          title="2. Konten Mandiri"
          content={`Selain dari rilis resmi, Cenvia juga menerbitkan artikel orisinal hasil tulisan tim redaksi, opini, atau analisis ringan. Isi dari artikel mandiri tersebut merupakan tanggung jawab penulis dan tidak selalu mencerminkan pandangan resmi Cenvia.`}
        />

        <Section
          title="3. Ketepatan dan Tanggung Jawab"
          content={`Informasi yang tersedia di situs ini dapat berubah sewaktu-waktu tanpa pemberitahuan terlebih dahulu. Cenvia tidak bertanggung jawab atas kerugian — baik langsung maupun tidak langsung — yang timbul akibat penggunaan informasi di situs ini.`}
        />

        <Section
          title="4. Tautan ke Situs Eksternal"
          content={`Situs Cenvia dapat memuat tautan ke situs pihak ketiga. Kami tidak memiliki kendali atas isi, kebijakan, atau keandalan situs tersebut, dan tidak bertanggung jawab atas kerugian apa pun yang mungkin timbul dari akses ke situs eksternal tersebut.`}
        />

        <Section
          title="5. Hak Cipta"
          content={`Seluruh materi dan desain situs dilindungi oleh undang-undang hak cipta. Setiap penggunaan kembali sebagian atau seluruh isi dari Cenvia harus mencantumkan sumber dengan jelas.`}
        />

        <Section
          title="6. Persetujuan Pengguna"
          content={`Dengan mengakses situs ini, Anda dianggap telah membaca dan menyetujui isi Disclaimer ini beserta Kebijakan Privasi dan Ketentuan Layanan Cenvia.`}
        />

        <Section
          title="7. Kontak"
          content={`Untuk pertanyaan, koreksi, atau klarifikasi, silakan hubungi kami melalui: redaksi@cenvia.id`}
        />

        <div className="mt-10 text-center text-sm text-gray-500 dark:text-gray-400">
          Terakhir diperbarui: {new Date().toLocaleDateString("id-ID", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </div>
      </motion.div>
    </div>
  );
}

function Section({ title, content }: { title: string; content: string }) {
  return (
    <div className="mb-6">
      <h2 className="font-bold text-lg text-blue-700 dark:text-blue-400 mb-2">
        {title}
      </h2>
      <p className="text-base leading-relaxed">{content}</p>
    </div>
  );
          }
