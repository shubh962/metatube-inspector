import { MetadataRoute } from "next";
const blogSlugs = [
  "how-to-find-youtube-tags",
  "thumbnail-psychology-guide",
];

// 2. Apne naye Tools yahan add karte rahein
const toolSlugs = [
  "youtube-tag-extractor",
  "thumbnail-downloader",
  "description-analyzer",
  // "ai-tag-generator",
];

const staticPages = [
  "",
  "/about",
  "/privacy-policy",
  "/terms-of-service",
  "/blog",
  "/contact",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://metatube-inspector.vercel.app"; 
  const currentDate = new Date().toISOString().split("T")[0];

  // Static Pages Logic
  const staticEntries: MetadataRoute.Sitemap = staticPages.map((page) => ({
    url: `${baseUrl}${page}`,
    lastModified: currentDate,
    changeFrequency: page === "" || page === "/blog" ? "daily" : "weekly",
    priority: page === "" ? 1.0 : page === "/blog" ? 0.85 : 0.6,
  }));

  // Tools Logic (Future-proof)
  const toolEntries: MetadataRoute.Sitemap = toolSlugs.map((slug) => ({
    url: `${baseUrl}/tools/${slug}`, // Agar aap tools folder use kar rahe hain
    lastModified: currentDate,
    changeFrequency: "daily",
    priority: 0.9,
  }));

  // Blog Logic
  const blogEntries: MetadataRoute.Sitemap = blogSlugs.map((slug) => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: currentDate,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...staticEntries, ...toolEntries, ...blogEntries];
}
