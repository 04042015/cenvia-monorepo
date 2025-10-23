// publik/scripts/generate-sitemap.mjs
import fs from "fs";
import fetch from "node-fetch";

async function generateSitemap() {
  try {
    // Deteksi apakah sedang di Vercel
    if (process.env.VERCEL) {
      console.log("⚠️ Skip generate sitemap di environment Vercel.");
      return;
    }

    const res = await fetch("https://cenvia.vercel.app/api/sitemap");
    if (!res.ok) throw new Error(`Gagal fetch sitemap: ${res.statusText}`);

    const xml = await res.text();
    fs.writeFileSync("./public/sitemap.xml", xml.trim());
    console.log("✅ sitemap.xml berhasil digenerate!");
  } catch (err) {
    console.error("❌ Gagal generate sitemap:", err.message);
  }
}

generateSitemap();
