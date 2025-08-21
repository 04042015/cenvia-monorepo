import NewsCard from "./NewsCard";
import politicsImage from "@/assets/news-politics.jpg";
import economyImage from "@/assets/news-economy.jpg";
import sportsImage from "@/assets/news-sports.jpg";
import lifestyleImage from "@/assets/news-lifestyle.jpg";

const NewsGrid = () => {
  const newsData = [
    {
      id: 1,
      title: "Menteri Keuangan Bahas Strategi Baru Pemulihan Ekonomi Nasional",
      image: politicsImage,
      category: "News" as const,
      timeAgo: "12 Agu 2025 • 16 hours ago",
      excerpt: "Menteri Keuangan Sri Mulyani mengumumkan serangkaian strategi baru untuk mempercepat pemulihan ekonomi nasional pasca pandemi. Strategi ini meliputi stimulus fiskal yang lebih tepat sasaran dan reformasi struktural jangka panjang."
    },
    {
      id: 2,
      title: "Penjelasan KPK Kenapa Kuota Haji Tambahan 2024 Dinilai Tak Sesuai Aturan",
      image: economyImage,
      category: "News" as const,
      timeAgo: "12 Agu 2025 • 16 hours ago",
      excerpt: "Komisi Pemberantasan Korupsi memberikan penjelasan terkait evaluasi kuota haji tambahan tahun 2024 yang dinilai tidak sesuai dengan prosedur yang telah ditetapkan dalam regulasi keagamaan."
    },
    {
      id: 3,
      title: "Kasus Pencemaran Nama Baik Ternyata Ini yang Dilaporkan Nurul Azizah",
      image: lifestyleImage,
      category: "Spotlight" as const,
      timeAgo: "12 Agu 2025 • 17 hours ago",
      excerpt: "Putri mantan Presiden Joko Widodo, Nurul Azizah, mengklarifikasi laporan pencemaran nama baik yang dilayangkan kepadanya. Ia menjelaskan kronologi dan alasan di balik tindakan hukum tersebut."
    },
    {
      id: 4,
      title: "Jisoo BLACKPINK Rilis MV yang Diam-diam Syuting di Rainforest Wild Asia",
      image: sportsImage,
      category: "Spotlight" as const,
      timeAgo: "12 Agu 2025 • 16 hours ago",
      excerpt: "Member BLACKPINK, Jisoo, mengejutkan penggemar dengan merilis music video solo terbaru yang ternyata syuting secara diam-diam di kawasan Rainforest Wild Asia dengan konsep yang sangat unik."
    },
    {
      id: 5,
      title: "Oasis Bintara TNI AD Dehan Kasiman Meninggal saat Jalani Pendidikan di Pusdiktop",
      image: economyImage,
      category: "News" as const,
      timeAgo: "12 Agu 2025 • 17 hours ago",
      excerpt: "Bintara TNI Angkatan Darat Dehan Kasiman dikabarkan meninggal dunia saat menjalani pendidikan di Pusat Pendidikan Komando Teritorial. Pihak TNI AD tengah menyelidiki penyebab kejadian tersebut."
    },
    {
      id: 6,
      title: "Tim Nasional Indonesia Berhasil Lolos ke Semifinal Piala Asia",
      image: sportsImage,
      category: "Arena" as const,
      timeAgo: "12 Agu 2025 • 18 hours ago",
      excerpt: "Timnas Indonesia sukses melaju ke semifinal Piala Asia setelah mengalahkan tuan rumah dengan skor 2-1. Pencapaian ini menjadi yang terbaik dalam sejarah sepak bola Indonesia di turnamen kontinental."
    },
    {
      id: 7,
      title: "Tren Kuliner Street Food Indonesia Mendunia di Festival Gastronomi",
      image: lifestyleImage,
      category: "Lifestyle" as const,
      timeAgo: "12 Agu 2025 • 19 hours ago",
      excerpt: "Festival Gastronomi Internasional menampilkan tren kuliner street food Indonesia yang semakin mendunia. Berbagai makanan khas nusantara berhasil memikat perhatian food blogger dan chef internasional."
    },
    {
      id: 8,
      title: "Bursa Efek Indonesia Catat Rekor Tertinggi dalam Sejarah",
      image: politicsImage,
      category: "Ekobiz" as const,
      timeAgo: "12 Agu 2025 • 20 hours ago",
      excerpt: "Indeks Harga Saham Gabungan (IHSG) di Bursa Efek Indonesia mencatat rekor tertinggi sepanjang masa. Kenaikan ini didorong oleh optimisme investor terhadap prospek ekonomi Indonesia yang semakin membaik."
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {newsData.map((article) => (
        <NewsCard 
          key={article.id}
          {...article}
        />
      ))}
    </div>
  );
};

export default NewsGrid;