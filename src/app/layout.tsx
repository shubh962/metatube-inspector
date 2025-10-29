// src/app/layout.tsx

import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import Header from "@/components/Header";

// =================================================================
// 🚀 Metadata for the ENTIRE Website (Global SEO)
// =================================================================
export const metadata: Metadata = {
  // Title: General, but focused on the main tool theme
  title: {
    default: "MetaTube Inspector | Free YouTube Metadata & SEO Analyzer",
    template: "%s | MetaTube Inspector", // This template allows page.ts to override the title easily
  },
  
  // Description: Clear focus on YouTube analysis
  description: "MetaTube Inspector is a free online tool to extract, analyze, and view YouTube video metadata, tags, descriptions, and SEO details. Optimize your video strategy.",
  
  keywords: [
    "YouTube metadata checker",
    "YouTube SEO tool",
    "video tag extractor",
    "MetaTube Inspector",
    "YouTube analyzer",
    "YouTube video details",
    "free YouTube tool",
  ],

  // Canonical (handled by Next.js, but explicit canonical is good for root)
  metadataBase: new URL('https://metatube-inspector.vercel.app/'),
  
  openGraph: {
    title: "MetaTube Inspector: Free YouTube Metadata & Tag Checker",
    description: "Extract, analyze, and view hidden YouTube video metadata instantly.",
    url: "https://metatube-inspector.vercel.app/",
    siteName: "MetaTube Inspector",
    type: "website",
  },
  icons: {
    icon: "/favicon.ico?v=2",
  },

  // ⭐️ NEW: Google Site Verification Tag ⭐️
  other: {
    'google-site-verification': 'XhRtp6rO2MNQX-BucHlUxVhNLbBPfdis_RzXY5ZodlU',
  },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // Next.js automatically injects <head> content based on the metadata export
    <html lang="en">
      <body>
        <Header />

        {/* This is where the content from every page (page.tsx, page.ts) will render */}
        <main className="container mx-auto p-4 flex-1">
          {children}
        </main>
        
        {/* AdSense friendly footer/contact section should go here, but keep it simple */}
        <footer className="w-full text-center py-4 border-t mt-12 text-sm text-gray-500">
            &copy; {new Date().getFullYear()} MetaTube Inspector. All Rights Reserved.
        </footer>

        <Toaster />
      </body>
    </html>
  );
}
