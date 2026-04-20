import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://ai-blog-writer.vercel.app", lastModified: new Date(), changeFrequency: "daily", priority: 1 },
    { url: "https://ai-blog-writer.vercel.app/generate", lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: "https://ai-blog-writer.vercel.app/pricing", lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
  ];
}
