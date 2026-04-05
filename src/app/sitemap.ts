import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://metatube-inspector.vercel.app';
  
  const tools = [
    '', // Home page
    '/about',
    '/contact',
    '/privacy-policy',
    '/terms-of-service',
    // '/youtube-title-generator', <-- Aise naye tools add karein
  ];

  return tools.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: route === '' ? 'daily' : 'monthly',
    priority: route === '' ? 1.0 : 0.8,
  }));
}
