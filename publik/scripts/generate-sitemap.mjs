import fs from "fs";
import fetch from "node-fetch";

async function generateSitemap() {
  try {
    const res = await fetch("https://cenvia.vercel.app/api/sitemap");
    if (!res.ok) throw new Error(`Gagal fetch sitemap: ${res.statusText}`);

    const xml = await res.text();

    // simpan hasilnya ke public/sitemap.xml
    fs.writeFileSync("./public/sitemap.xml", xml.trim());
    console.log("✅ sitemap.xml berhasil digenerate!");
  } catch (err) {
    console.error("❌ Gagal generate sitemap:", err.message);
    process.exit(1);
  }
}

generateSitemap();
