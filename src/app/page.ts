// src/app/page.ts
import { Metadata } from 'next';

const SEO_KEYWORDS = [
    "youtube metadata inspector",
    "youtube tags viewer",
    "youtube seo checker",
    "youtube video keyword tool",
    "free youtube metadata extractor",
    "youtube description viewer",
    "youtube thumbnail downloader",
    "how to find youtube video tags",
    "taskguru online tools",
    "metatube inspector vercel"
];

export const metadata: Metadata = {
  title: 'MetaTube Inspector: Free YouTube Metadata, Tags & SEO Checker',
  description: 'Instantly extract full YouTube video metadata, including hidden tags, description, channel info, and high-resolution thumbnails. Analyze video SEO for free.',
  keywords: SEO_KEYWORDS,
  metadataBase: new URL('https://metatube-inspector.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'MetaTube Inspector: Free YouTube Metadata, Tags & SEO Checker',
    description: 'Extract hidden YouTube tags and analyze video SEO instantly with MetaTube Inspector.',
    url: 'https://metatube-inspector.vercel.app',
    siteName: 'MetaTube Inspector',
    images: [
      {
        url: '/og-image.png', // Make sure this file exists in your /public folder
        width: 1200,
        height: 630,
        alt: 'MetaTube Inspector Tool'
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MetaTube Inspector | YouTube SEO Tool',
    description: 'The professional choice for YouTube metadata analysis.',
    images: ['/og-image.png'],
  },
  other: {
    'google-site-verification': 'XhRtp6rO2MNQX-BucHlUxVhNLbBPfdis_RzXY5ZodlU',
  },
};
