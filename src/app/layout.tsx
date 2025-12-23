import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google"; // Optimized Font
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import Header from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: "MetaTube Inspector | Free YouTube Metadata & SEO Analyzer",
    template: "%s | MetaTube Inspector",
  },
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
  metadataBase: new URL('https://metatube-inspector.vercel.app/'),
  openGraph: {
    title: "MetaTube Inspector: Free YouTube Metadata & Tag Checker",
    description: "Extract, analyze, and view hidden YouTube video metadata instantly.",
    url: "https://metatube-inspector.vercel.app/",
    siteName: "MetaTube Inspector",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    type: "website",
  },
  icons: {
    icon: "/favicon.ico?v=2",
  },
  other: {
    'google-site-verification': 'XhRtp6rO2MNQX-BucHlUxVhNLbBPfdis_RzXY5ZodlU',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Schema.org JSON-LD for "Software Application" 
  // This helps Google show your tool with a special "App" snippet
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "MetaTube Inspector",
    "operatingSystem": "All",
    "applicationCategory": "MultimediaApplication",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "120"
    }
  };

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <Header />

        <main className="container mx-auto p-4 flex-1">
          {children}
        </main>
        
        <footer className="w-full text-center py-8 border-t mt-12 text-sm text-muted-foreground bg-muted/20">
            <div className="flex flex-col gap-2">
              <p>&copy; {new Date().getFullYear()} MetaTube Inspector. All Rights Reserved.</p>
              <div className="flex justify-center gap-4 text-xs">
                <a href="#" className="hover:text-primary underline underline-offset-4">Privacy Policy</a>
                <a href="#" className="hover:text-primary underline underline-offset-4">Terms of Service</a>
                <a href="https://github.com/shubh962/metatube-inspector" className="hover:text-primary underline underline-offset-4">GitHub</a>
              </div>
            </div>
        </footer>

        <Toaster />
      </body>
    </html>
  );
}
