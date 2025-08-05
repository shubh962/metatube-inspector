import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import { Inter } from 'next/font/google'
import { cn } from '@/lib/utils';
import { ThemeProvider } from '@/components/theme-provider';
import { SocialBarAd } from '@/components/social-bar-ad';

const inter = Inter({ subsets: ['latin'], variable: "--font-sans" })
export const metadata: Metadata = {
  title: 'MetaTube Inspector – Extract YouTube Metadata Instantly',
  description: 'MetaTube Inspector lets you extract titles, thumbnails, tags, and full metadata from any YouTube video. 100% free, fast & easy to use.',
  keywords: [
    'YouTube metadata extractor',
    'extract YouTube video data',
    'YouTube tag viewer',
    'YouTube description parser',
    'meta tag finder for YouTube',
    'YouTube title fetcher',
    'MetaTube Inspector'
  ],
  robots: 'index, follow',
  verification: {
    google: 'XhRtp6rO2MNQX-BucHlUxVhNLbBPfdis_RzXY5ZodlU'
  },
  metadataBase: new URL('https://metatube-inspector.vercel.app'),
  openGraph: {
    title: 'MetaTube Inspector – Extract YouTube Metadata Instantly',
    description: 'Analyze any YouTube video’s title, thumbnail, description, tags, and more in one click. Free, fast, and powerful.',
    url: 'https://metatube-inspector.vercel.app',
    siteName: 'MetaTube Inspector',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'MetaTube Inspector – YouTube Metadata Extractor',
    description: 'Extract YouTube video titles, descriptions, tags, and thumbnails instantly. Built for creators & researchers.',
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(
        "min-h-screen bg-background font-sans antialiased",
        inter.variable
      )}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
        <SocialBarAd />
      </body>
    </html>
  );
}
