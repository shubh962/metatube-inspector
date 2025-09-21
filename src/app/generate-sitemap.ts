import fs from "fs";
import path from "path";

const pages = ["/", "/about", "/tools"]; // add all your routes here

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map(
    (page) => `
  <url>
    <loc>https://metatube-inspector.vercel.app${page}</loc>
    <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
    <priority>${page === "/" ? "1.0" : "0.8"}</priority>
  </url>`
  )
  .join("")}
</urlset>`;

const publicPath = path.join(process.cwd(), "public", "sitemap.xml");
fs.writeFileSync(publicPath, sitemap);
console.log("✅ sitemap.xml generated in public folder");
