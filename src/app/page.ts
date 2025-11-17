// src/app/page.ts
import { Metadata } from 'next';

// Define SEO Keywords for YouTube Metadata Inspection Niche
const SEO_KEYWORDS = [
    // Primary Keywords (High Intent)
    "youtube metadata inspector",
    "youtube tags viewer",
    "youtube seo checker",
    "youtube video keyword tool",
    "free youtube metadata extractor",
    
    // Secondary Keywords (Related Tools/Functionality)
    "youtube description viewer",
    "youtube thumbnail downloader",
    "check youtube video tags",
    "youtube video analysis tool",
    "view youtube video source data",
    
    // Long-tail & Content Focus
    "how to find youtube video tags",
    "youtube title and description checker",
    "youtube competitor analysis tool",
    "best youtube seo analysis",
    "online youtube metadata tool",
];

// --- Export Metadata for Next.js ---
export const metadata: Metadata = {
  title: 'MetaTube Inspector: Free YouTube Metadata, Tags & SEO Checker',
  description: 'Instantly extract full YouTube video metadata, including hidden tags, description, channel info, and high-resolution thumbnails. Analyze video SEO for free.',
  keywords: SEO_KEYWORDS,
  openGraph: {
    title: 'MetaTube Inspector: Free YouTube Metadata, Tags & SEO Checker',
    description: 'Instantly extract full YouTube video metadata, including hidden tags, description, channel info, and high-resolution thumbnails. Analyze video SEO for free.',
    url: 'YOUR_PRODUCTION_URL', // Replace with your actual domain
    siteName: 'MetaTube Inspector',
    images: [
      {
        url: 'YOUR_SOCIAL_IMAGE_URL', // Add a URL to your social sharing image (e.g., 1200x630)
        width: 1200,
        height: 630,
        alt: 'MetaTube Inspector Thumbnail'
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MetaTube Inspector: Free YouTube Metadata, Tags & SEO Checker',
    description: 'Instantly extract full YouTube video metadata, including hidden tags, description, channel info, and high-resolution thumbnails. Analyze video SEO for free.',
    // images: ['YOUR_TWITTER_IMAGE_URL'], // Optional: Add a Twitter-specific image URL
  },
};
